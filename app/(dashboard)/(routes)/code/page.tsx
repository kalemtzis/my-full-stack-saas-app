"use client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { ChatCompletionMessageParam } from "openai/resources";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ArrowDown, BotIcon, Divide, Loader, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Header from "@/components/header";
import UserAvatar from "@/components/user-avatar";
import ReactMarkdown from "react-markdown";

const CodePage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
  const isLoading = form.formState.isSubmitting;
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionMessageParam = {
        role: "user",
        content: values.prompt,
      };

      const newMessages = [...messages, userMessage];

      const res = await fetch("/api/code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: newMessages,
        }),
      });

      if (!res.ok) throw new Error("Failed fetch");

      const data = await res.json();

      setMessages([...newMessages, data]);

      form.reset();
    } catch (error) {
      // TODO: Toester | Pro Modal
      console.error("Error Request");
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-900 via-slate-950 to-emerald-900 flex flex-col items-center justify-center p-4 gap-8">
      <Header title="Code Assistant" description="" />

      <div className="px-2 py-2 rounded-full text-sm bg-green-500/20 text-green-300 border border-green-500/30">
        🟢 AI Ready
      </div>

      <div className="w-full max-w-dvh bg-gradient-to-r from-gray-800/90 to-gray-700/90 backdrop-blur-md border border-gray-600 rounded-3xl p-6 shadow-2xl">
        <div className="h-80 overflow-y-auto border-b border-gray-600 mb-6 p-4 bg-gradient-to-b from-gray-900/50 to-gray-800/50 rounded-2xl">
          {messages.map((msg, idx) => (
            <div
              key={`${msg.role}-${idx}`}
              className={cn(
                "p-3 m-2 rounded-2xl text-wrap",
                msg.role === "user"
                  ? "bg-gradient-to-r from-blue-600 to-emerald-500 text-white ml-auto text-right max-w-xs"
                  : "bg-gradient-to-r from-emerald-600 to-indigo-600 text-white max-w-lg"
              )}
            >
              <div className="mb-1 font-semibold">
                {msg.role === "user" ? <UserAvatar /> : <BotIcon />}
              </div>
      
              <ReactMarkdown
                key={`${msg.role}-${idx}`}
                components={{
                  pre: ({ ...props }) => (
                    <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                      <pre {...props} />
                    </div>
                  ),
                  code: ({ ...props }) => (
                    <code className="bg-black/10 rounded-lg p1" {...props} />
                  ),
                  div: ({ ...props }) => (
                    <div
                      className="text-sm overflow-hidden leading-7"
                      {...props}
                    />
                  ),
                }}
              >
                {msg.content?.toString() || ""}
              </ReactMarkdown>
            </div>
          ))}

          {isLoading && (
            <div className="p-3 m-2 rounded-2xl max-w-xs bg-gradient-to-r from-emerald-600 to-indigo-600 text-white">
              <div className="flex items-center gap-2">
                <div className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full">
                  <Loader className="w-4 h-4" />
                </div>
                Thinking...
              </div>
            </div>
          )}

          <div ref={messagesEndRef}></div>
        </div>

        {messages.length === 0 && !isLoading && (
          <div className="text-center text-gray-400 my-4">
            Start the conversation by typing a message below.
            <ArrowDown className="h-4 w-full mt-2 animate-bounce duration-500" />
          </div>
        )}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col md:flex-row items-center justify-center w-full gap-2"
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      className="px-4 py-3 bg-gray-700/80 border border-gray-600 rounded-2xl 
                        text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:shadow-xl focus:shadow-sky-400/80
                        focus:ring-sky-500 transition duration-400 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isLoading}
                      placeholder="Type your message..."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              disabled={isLoading}
              className="px-6 py-3 bg-gradient-to-r from-sky-400 to-emerald-400 hover:opacity-80 text-white 
                font-semibold rounded-2xl transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin w-4 sm:w-full sm:mt-1 h-4 border-2 border-white border-t-white rounded-full">
                    <Loader />
                  </div>
                </div>
              ) : (
                <Send />
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CodePage;
