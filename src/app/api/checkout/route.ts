import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createPixPayment } from "@/lib/abacatepay";
import { GIFT_LIST } from "@/lib/data";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { giftId, method, guestName, guestEmail } = body;

    if (!giftId || !method || !guestEmail || !guestName) {
      return NextResponse.json({ error: "Dados obrigatórios ausentes" }, { status: 400 });
    }

    const gift = GIFT_LIST.find((g) => g.id === giftId);
    if (!gift) {
      return NextResponse.json({ error: "Presente não encontrado" }, { status: 404 });
    }

    if (gift.reserved) {
      return NextResponse.json({ error: "Este presente já foi reservado" }, { status: 409 });
    }

    const amountInCents = Math.round(gift.price * 100);

    // ── Stripe (cartão de crédito) ────────────────────────────────────────────
    if (method === "stripe") {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "brl",
              product_data: {
                name: gift.name,
                description: gift.description,
                images: [],
                metadata: { giftId, guestName, guestEmail },
              },
              unit_amount: amountInCents,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        customer_email: guestEmail,
        metadata: {
          giftId,
          guestName,
          guestEmail,
          paymentMethod: "stripe",
        },
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/obrigado?session_id={CHECKOUT_SESSION_ID}&gift=${encodeURIComponent(gift.name)}&method=stripe`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/presentes?canceled=true`,
        locale: "pt-BR",
      });

      return NextResponse.json({ url: session.url, method: "stripe" });
    }

    // ── AbacatePay (Pix) ──────────────────────────────────────────────────────
    if (method === "pix") {
      const payment = await createPixPayment({
        amount: amountInCents,
        externalId: `gift-${giftId}-${Date.now()}`,
        description: `Presente: ${gift.name} – Chá de Casa Nova`,
        customer: {
          name: guestName,
          email: guestEmail,
        },
        expiresIn: 3600, // 1 hora
      });

      return NextResponse.json({
        method: "pix",
        paymentId: payment.id,
        pixCode: payment.pixCode,
        pixQrCode: payment.pixQrCode,
        expiresAt: payment.expiresAt,
        gift: { id: gift.id, name: gift.name, price: gift.price },
      });
    }

    return NextResponse.json({ error: "Método de pagamento inválido" }, { status: 400 });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json(
      { error: "Erro ao processar pagamento" },
      { status: 500 }
    );
  }
}
