import { stripe } from "@/lib/stripe";
import { addCredits } from "@/lib/userActions";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (req: Request) => {
  const body = await req.text();
  const signature = (await headers()).get('Stripe-Signature') as string;
  
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    )
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown Webhook error"
    return new NextResponse(`Webook Error: ${errorMessage}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === 'checkout.session.completed') {
    const userId = session?.metadata?.userId;
    const amount = parseInt(session?.metadata?.amount || "0");


    if (!userId || !amount) {
      console.error("WEBHOOK_ERROR", "Missing UserId or amount in metadata.", {userId, amount});
      return new NextResponse('User id and amount is required', { status: 400 });
    }
    
    try {
      await addCredits(amount, userId);
    } catch (error) {
      console.error("[WEBHOOK_DB_ERROR]", {userId, amount, error})
      return new NextResponse("Error processing checkout", { status: 500 });
    }
  }

  setTimeout(() => {}, 1000);

  return NextResponse.json({}, { status: 200});
}