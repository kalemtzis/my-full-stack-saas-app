"use client";
import { useProModal } from "@/hooks/use-pro-modal";
import { useEffect, useState } from "react";
import { MAX_FREE_API_USES } from "@/constants";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { Zap } from "lucide-react";

interface FreeCounterProps {
  apiCount: number;
  isPro: boolean;
}

const FreeCounter = ({ apiCount = 0, isPro = false }: FreeCounterProps) => {
  const [mounted, setMounted] = useState(false);
  const proModal = useProModal();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (isPro) return null;

  return (
    <div className="border-0">
      <div className="flex flex-row justify-center items-center gap-2">
        <div>
          <p className="text-sm text-muted-foreground">
            {apiCount} / {MAX_FREE_API_USES} Free Uses
          </p>
          <Progress
            value={(apiCount / MAX_FREE_API_USES) * 100}
            className="h-3"
          />
        </div>
        
        <Button variant='premium' onClick={proModal.onOpen} className="">
          <Zap className="h-2 w-2 fill-yellow-600 text-yellow-400 animate-pulse" />
        </Button>
      </div>
    </div>
  );
};

export default FreeCounter;
