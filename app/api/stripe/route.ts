import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const settingsUrl = absoluteUrl('/settings');

export async function GET() {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if(!userId || !user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const creditAmount = 100;
    const unitAmount = creditAmount * 10;

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settingsUrl,
      cancel_url: settingsUrl,
      payment_method_types: ['card'],
      mode: 'payment',
      billing_address_collection: 'auto',
      customer_email: user.emailAddresses[0].emailAddress,
      line_items: [
        {
          price_data: {
            currency: "EUR",
            product_data: {
              name: "Credits",
              description: `Amount: ${creditAmount} Credits`,
            },
            unit_amount: unitAmount,
          },
          quantity: 1
        }
      ],
      metadata: {
        userId,
        amount: creditAmount.toString()
      }
    })

    return NextResponse.json({ url: stripeSession.url });
    
  } catch (error) {
    console.error("[STRIPE_ERROR]", error);
    const errorMessage = error instanceof Stripe.errors.StripeError ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}