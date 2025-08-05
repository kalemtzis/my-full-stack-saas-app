"use client";

import { cn } from "@/lib/utils";
import { Coins, Plus } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface CreditsContainerProps {
  userCreditsAmount?: number;
  isPro?: boolean
}

const CreditsContainer = ({
  userCreditsAmount = 0,
  isPro = false
}: CreditsContainerProps) => {
  const [loading, setLoading] = useState(false);

  const redirectToAddCredit = async () => {
    try {
      setLoading(true);

      const res = await axios.get("/api/stripe");

      console.log(res.data);

      window.location.href = res.data.url;
    } catch (error: unknown) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (isPro) return null

  return (
    <div className="flex flex-row items-center justify-end gap-1">
      <div className="font-medium text-sm">Credits: {userCreditsAmount}</div>
      <div className="mr-1">
        <Coins className="w-4.5 h-4.5 text-yellow-400" />
      </div>
      <div className="items-center justify-center flex border border-white/10 rounded-md ml-1">
        <button
          onClick={redirectToAddCredit}
          className="bg-blend-normal hover:opacity-80 cursor-pointer disabled:opacity-50"
          disabled={loading}
        >
          <Plus className={cn("w-4.5 h-4.5", loading && "animate-spin")} />
        </button>
      </div>
    </div>
  );
};

export default CreditsContainer;
