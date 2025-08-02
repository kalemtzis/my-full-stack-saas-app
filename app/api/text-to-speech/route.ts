import { checkUserApiLimit, increaseApiLimit } from "@/lib/userActions";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { userId } = await auth();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const { message } = await req.json();

    if (!message)
      return new NextResponse("Message are required", { status: 400 });

    if (!process.env.EDENAI_API_TOKEN)
      return new NextResponse("EdenAI API key not configured", { status: 500 });

    const permission = await checkUserApiLimit();

    if (!permission) return new NextResponse('Free uses expired', { status: 403 });

    const res = await fetch("https://api.edenai.run/v2/audio/text_to_speech/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        authorization: `Bearer ${process.env.EDENAI_API_TOKEN}`,
      },
      body: JSON.stringify({
        response_as_dict: false,
        attributes_as_list: false,
        show_base_64: true,
        show_original_response: false,
        rate: 0,
        pitch: 0,
        volume: 0,
        sampling_rate: 0,
        providers: ["openai"],
        text: message,
        language: "en",
        option: "MALE",
      }),
    });

    await increaseApiLimit();

    const data = await res.json(); 

    return NextResponse.json(data);
  } catch (error) {
    console.error("[TEXT_TO_SPEECH_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
