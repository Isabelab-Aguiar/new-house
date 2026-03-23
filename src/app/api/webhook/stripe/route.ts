import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { sendGiftConfirmationEmail } from "@/lib/resend";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const { giftName, guestName, guestEmail, giftId } = session.metadata || {};
    const giftPrice = (session.amount_total || 0) / 100;

    if (guestEmail && guestName) {
      try {
        await sendGiftConfirmationEmail({
          guestName,
          guestEmail,
          giftName: giftName || "Presente",
          giftPrice,
          paymentMethod: "stripe",
          transactionId: session.id,
        });
      } catch (err) {
        console.error("Failed to send email:", err);
      }
    }
  }

  return NextResponse.json({ received: true });
}
