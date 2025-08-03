import { createUser, deleteUser, updateUser } from "@/lib/userActions";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const event = await verifyWebhook(req);

    if (!process.env.CLERK_WEBHOOK_SECRET) {
      return new NextResponse("CLERCK WEBHOOK SECRET not configured", {
        status: 500,
      });
    }

    const eventType = event.type;

    if (eventType === "user.created") {
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

    if (eventType === "user.updated") {
      const { id, first_name, last_name, username, image_url } = event.data;

      const updatedUser = await updateUser(id, {
        firstName: first_name!,
        lastName: last_name!,
        username: username!,
        photo: image_url,
      });

      return NextResponse.json({ message: "OK", user: updatedUser });
    }

    if (eventType === "user.deleted") {
      const { id } = event.data;

      const deletedUser = await deleteUser(id!);

      return NextResponse.json({ message: "OK", user: deletedUser });
    }

    return new NextResponse("Webhook recieved", { status: 200 });
  } catch (error) {
    console.error("Error verifying webhook", error);
    return new NextResponse("Error verifying webhook", { status: 500 });
  }

  return new NextResponse(null, { status: 200 });
};
