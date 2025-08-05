import prismadb from "@/lib/database/prismadb";
import { createUser, deleteUser, getUserById, updateUser } from "@/lib/userActions";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const event = await verifyWebhook(req, {
      signingSecret: process.env.CLERK_WEBHOOK_SIGNING_SECRET,
    });

    if (!process.env.CLERK_WEBHOOK_SIGNING_SECRET) {
      return new NextResponse("CLERCK WEBHOOK SECRET not configured", {
        status: 500,
      });
    }

    const { type, data } = event;

    if (type === "user.created") {
      const {
        id,
        email_addresses,
        image_url,
        first_name,
        last_name,
        username,
      } = event.data;

      const newUser = await createUser({
        clerkId: id,
        email: email_addresses[0].email_address,
        username: username!,
        firstName: first_name,
        lastName: last_name!,
        photo: image_url,
      });

      return NextResponse.json({ message: "OK", user: newUser });
    }

    if (type === "user.updated") {
      return NextResponse.json({ message: "OK" });
    }

    if (type === "user.deleted") {
      const user = await getUserById(data.id!);

      if (!user) return NextResponse.json('User not found', { status: 401 });

      await prismadb.user.delete({
        where: {
          id: user.id,
          userId: user.userId
        }
      })

      return NextResponse.json({ message: "OK", user: user });
    }

    return new NextResponse("Webhook recieved", { status: 200 });
  } catch (error) {
    console.error("Error verifying webhook", error);
    return new NextResponse("Error verifying webhook", { status: 500 });
  }
};
