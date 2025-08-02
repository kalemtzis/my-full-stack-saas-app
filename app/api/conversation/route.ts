import { checkUserApiLimit, increaseApiLimit } from "@/lib/userActions";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.GITHUB_TOKEN,
  baseURL: "https://models.github.ai/inference",
});

const assistMessage = {
  role: "system",
  content: "You are a helpful assistant.",
};

export const POST = async (req: Request) => {
  if (!openai.apiKey)
    return new NextResponse("OpenAI API Key is missing", { status: 500 });

  const { userId } = await auth();

  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const { messages } = await req.json();

  if (!messages)
    return new NextResponse("Messages are required", { status: 400 });

  const permission = await checkUserApiLimit();

  if (!permission)
    return new NextResponse("Free uses expired", { status: 403 });

  try {
    const res = await openai.chat.completions.create({
      model: "openai/gpt-4.1",
      temperature: 0.7,
      messages: [assistMessage, ...messages],
    });

    await increaseApiLimit();

    return NextResponse.json(res.choices[0].message);
  } catch (error) {
    console.error("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
