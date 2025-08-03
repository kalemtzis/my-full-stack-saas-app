"use-client";

import { useProModal } from "@/hooks/use-pro-modal";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Plus, Zap } from "lucide-react";
import { redirect } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const ProModal = () => {
  const proModal = useProModal();
  const [loading, setLoading] = useState(false);

  const redirectToAddCredit = async () => {
    try {
      setLoading(true);

      const res = await axios.get("/api/stripe");

      window.location.href = res.data.url;
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-row font-bold gap-x-2 gap-y-4 pb-2">
            Upgrade to aiPower
            <Badge className="uppercase text-sm py-1">pro</Badge>
          </DialogTitle>

          <DialogDescription asChild>
            <div className="text-center pt-2 space-y-2 text-zinc-900 font-medium overflow-y-auto">
              Describe the premium features
            </div>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogContent className="flex items-center justify-center gap-2 flex-row">
            <Button
              onClick={() => redirect("/subscription")}
              disabled={loading}
              size="lg"
              className="w-full cursor-pointer"
            >
              Upgrade
              <Zap className="w-4 h-4 ml-2 fill-yellow" />
            </Button>
            <Button
              onClick={redirectToAddCredit}
              disabled={loading}
              size="lg"
              className="w-full cursor-pointer"
            >
              Add Credits
              <Plus className="w-4 h-4 ml-2 fill-white" />
            </Button>
          </DialogContent>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;
