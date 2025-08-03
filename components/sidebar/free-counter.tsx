'use client'
import { MAX_FREE_API_USES } from "@/constants";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { Zap } from "lucide-react";
import { useRouter } from "next/navigation";

interface FreeCounterProps {
  apiCount: number;
  isPro: boolean;
}

const FreeCounter = ({ apiCount = 0, isPro = false }: FreeCounterProps) => {
  const router = useRouter();
  if (isPro) return null;

  return (
    <div className="border-0">
      <div className="flex flex-row justify-center items-center gap-3">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">
            {apiCount} / {MAX_FREE_API_USES} Free Uses
          </p>
          <Progress
            value={(apiCount / MAX_FREE_API_USES) * 100}
            className="h-3 bg-white/20"
          />
        </div>
        
        <Button variant='premium' onClick={() => router.push('/subscription')} aria-label="Upgrade to Pro">
          <Zap className="h-2 w-2 fill-yellow-600 text-yellow-400 animate-pulse" />
        </Button>
      </div>
    </div>
  );
};

export default FreeCounter;
