import prismadb from "@/lib/database/prismadb";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const settingUrl = absoluteUrl("/settings");

export const GET = async () => {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user)
      return new NextResponse("Unauthorized", { status: 401 });

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settingUrl,
      cancel_url: settingUrl,
      payment_method_types: ["card"],
      mode: "payment",
      billing_address_collection: "auto",
      customer_email: user.emailAddresses[0].emailAddress,
      line_items: [
        {
          price_data: {
            currency: "EUR",
            product_data: {
              name: "Add Credits",
              description: "amount: 100",
            },
            unit_amount: 999,
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
      },
    });

    const userInfo = await prismadb.user.findUnique({
      where: {
        userId: userId
      }
    });

    if (!userInfo) {
      await prismadb.user.create({
        data: {
          userId: userId,
          credits: 100
        }
      })
    } else {
      await prismadb.user.update({
        where: {
          userId: userId
        },
        data: {
          credits: userInfo.credits + 100
        }
      })
    }

    return new NextResponse(JSON.stringify({ url: stripeSession.url }));
  } catch (error) {
    console.error("[STRIPE_ERROR]", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
};
