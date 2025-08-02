"use client";
import Header from "@/components/header";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader, StopCircle, Volume } from "lucide-react";
import { useProModal } from "@/hooks/use-pro-modal";

const TextToSpeechPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });
  const isLoading = form.formState.isSubmitting;
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const router = useRouter();
  const [audioUrl, SetAudioUrl] = useState("");
  const audioRef = useRef<HTMLAudioElement>(null);
  const proModal = useProModal();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const onSumbit = async (values: z.infer<typeof formSchema>) => {
    if (values.prompt.length > 1000) {
      toast.dismiss("Your prompt must be less than 1000 characters");
      return;
    }

    console.log(values.prompt);

    try {
      const res = await fetch("/api/text-to-speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: values.prompt,
        }),
      });

      if (!res.ok) throw new Error("Failed Fetch");

      //const data = await res.json();

      setMessages((prev) => [...prev, values.prompt]);
      //SetAudioUrl(data[0].audio_resource_url);
      SetAudioUrl('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');

      form.reset();
    } catch (error: any) {
      if (error.response.status === 403) {
        proModal.onOpen();
      }
      toast.error("Something went wrong!");
    } finally {
      router.refresh();
    }
  };

  const stopMusic = () => {
    if (audioRef.current) {
      SetAudioUrl("");
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-3 gap-6">
      <Header title="Text To Speech" description="" />

      <div className="px-4 py-2 rounded-full text-sm font-medium bg-green-500/20 text-green-300 border border-green-500/30">
        🟢 AI Ready
      </div>

      <div className="w-full max-w-2xl bg-gradient-to-r from-gray-800/90 to-gray-700/90 backdrop-blur-md border border-gray-600 rounded-3xl p-6 shadow-2xl">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSumbit)}
            className="flex flex-col items-center justify-center gap-2"
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Textarea
                      rows={6}
                      className="w-full overflow-y-auto p-4 bg-gray-700/80 border border-gray-600 rounded-2xl text-white placeholder-gray-400
                                focus:outline-none focus:ring-2 focus:ring-fuchsia-400 transition duration-300 disabled:opacity-50 resize-none
                                shadow-xl focus:shadow-fuchsia-700/70"
                      placeholder="Enter your text to conver to speech... (max 1000 characters)"
                      {...field}
                      maxLength={1000}
                    />
                  </FormControl>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-gray-400">
                      {field.value.length}/1000 characters
                    </span>
                  </div>
                </FormItem>
              )}
            />

            <div className="flex gap-3 mt-4">
              <Button
                className="flex-1 px-6 py-3 bg-gradient-to-r from-rose-500 to-purple-500 hover:opacity-80 text-white font-semibold rounded-2xl transition
                              disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                disabled={isLoading}
                type="submit"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin w-4 h-4 rounded-full">
                      <Loader />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Volume /> Speak
                  </div>
                )}
              </Button>
            </div>
          </form>
        </Form>

        {audioUrl && (
          <div className="flex justify-end">
            <audio ref={audioRef} autoPlay>
              <source src={audioUrl} />
            </audio>

            <Button
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:opaity-80 
                      text-white font-semibold rounded-2xl border border-neutral-500/30 transition cursor-pointer"
              onClick={stopMusic}
            >
              <StopCircle />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextToSpeechPage;
