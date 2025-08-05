"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { SidebarMenuAction } from "../ui/sidebar";
import { LogOut, MoreHorizontal, Settings, User } from "lucide-react";
import Image from "next/image";
import { SignOutButton } from "@clerk/nextjs";
import { ClerkUser } from "@/types";

interface ProfileCardProps {
  user: ClerkUser;
}

const ProfileCard = ({ user }: ProfileCardProps) => {
  return (
    <div className="w-full flex items-center justify-between  flex-row gap-2 mt-3">
      <div className="space-x-2">
        {user.photoUrl ? (
          <Image
            src={user.photoUrl}
            alt="avatar"
            width={30}
            height={30}
            className="rounded-md avatar border-0.5 border-black"
          />
        ) : (
          <User />
        )}

        <span className="text-muted-foreground text-sm">{user.username}</span>
      </div>
     
      <DropdownMenu>
        <DropdownMenuTrigger
          className="cursor-pointer justify-center items-center rounded-full hover:bg-white/30 border-b border-white/20"
        >
            <MoreHorizontal className="text-white" /> 
        </DropdownMenuTrigger>

        <DropdownMenuContent
          side="right"
          align="end"
          className="ml-3 bg-white/10 border backdrop-blur-md border-white/20"
        >
          <DropdownMenuItem asChild className="cursor-pointer">
            <a href="/settings" className="hover:bg-white/30">
              <Settings />
              <span className="text-sm text-white">Manage your account</span>
            </a>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer hover:bg-black" asChild>
            <SignOutButton>
              <div className="w-full flex flex-row items-center justify-start">
                <button className="hover:bg-white/20">
                  <LogOut />
                </button>
                <p className="text-white">Log Out</p>
              </div>
            </SignOutButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
     
    </div>
  );
};

export default ProfileCard;
