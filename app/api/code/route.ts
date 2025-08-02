import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources";

const openai = new OpenAI({
  apiKey: process.env.GITHUB_TOKEN,
  baseURL: "https://models.github.ai/inference",
});

const instructionMessage: ChatCompletionMessageParam = {
  role: "system",
  content:
    "You are a code generator. You must answer only in markdown code snippets. Use code comments and text for explanations.",
};

export const POST = async (req: Request) => {
  try {
    const { userId } = await auth();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const { messages } = await req.json();

    if (!messages) return new NextResponse("Messages are required", { status: 400 });

    const res = await openai.chat.completions.create({
      model: 'openai/gpt-4.1',
      messages: [instructionMessage, ...messages]
    });

    return NextResponse.json(res.choices[0].message);
  } catch (error) {
    console.error("[CODE_ERROR]", error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};
