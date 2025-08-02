import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.GITHUB_TOKEN,
  baseURL: "https://models.github.ai/inference",
});

export const POST = async (req: Request) => {
  try {
    const { userId } = await auth();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const { message } = await req.json();

    if (!message)
      return new NextResponse("Message are required", { status: 400 });

    if (!openai.apiKey)
      return new NextResponse("OpenAI API key not configured", { status: 500 });

    const res = await openai.audio.speech.create({
      model: "openai/gpt-4o-mini-tts",
      voice: "alloy",
      input: message,
    });

    return NextResponse.json(res);
  } catch (error) {
    console.error("[TEXT_TO_SPEECH_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
