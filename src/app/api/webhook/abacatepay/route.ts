import { NextRequest, NextResponse } from "next/server";
import { sendGiftConfirmationEmail } from "@/lib/resend";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("x-webhook-secret");

  // Validate webhook secret
  if (signature !== process.env.ABACATEPAY_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let payload;
  try {
    payload = JSON.parse(body);
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  // AbacatePay sends status COMPLETED when Pix is paid
  if (payload.status === "COMPLETED" || payload.event === "billing.paid") {
    const { customer, products, id: transactionId } = payload.data || payload;
    const guestEmail = customer?.email;
    const guestName = customer?.name;
    const giftName = products?.[0]?.name || "Presente";
    const giftPrice = (products?.[0]?.price || 0) / 100;

    if (guestEmail && guestName) {
      try {
        await sendGiftConfirmationEmail({
          guestName,
          guestEmail,
          giftName,
          giftPrice,
          paymentMethod: "pix",
          transactionId: transactionId || crypto.randomUUID(),
        });
      } catch (err) {
        console.error("Failed to send email:", err);
      }
    }
  }

  return NextResponse.json({ received: true });
}
