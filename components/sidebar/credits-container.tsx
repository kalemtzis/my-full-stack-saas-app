'use client'

import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useState } from "react";

interface CreditsContainerProps {
  userCreditsAmount: number;
  isPro: boolean;
}

const CreditsContainer = ({ userCreditsAmount, isPro }: CreditsContainerProps) => {
  const [loading, setLoading] = useState(false);

  if (isPro) return null;
  
  const redirectToAddCredit = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/stripe", {
        method: "GET",
      });

      if (!res.ok) throw new Error("Fetch failed");

      const data = await res.json();

      window.location.href = data.url;
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-row items-center justify-end gap-1">
      <div className="font-medium text-sm">Credits: {userCreditsAmount}</div>
      <div className="items-center justify-center flex border border-white/10 rounded-md ml-1">
        <button
          onClick={redirectToAddCredit}
          className="bg-blend-nornal hover:opacity-50 cursor-pointer"
        >
          <Plus className={cn("w-4.5 h-4.5", loading && "animate-spin")} />
        </button>
      </div>
    </div>
  );
};

export default CreditsContainer;
