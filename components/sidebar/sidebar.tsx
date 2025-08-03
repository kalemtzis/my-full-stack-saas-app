"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import {
  devTools,
  fileTools,
  imageTools,
  mainRoutes,
  textTools,
  videoTools,
  voiceTools,
} from "@/constants";
import { useAuth, useUser } from "@clerk/nextjs";
import {
  Frame,
  HandHelping,
  LogOut,
  MoreHorizontal,
  Plus,
  Send,
  Settings,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import MenuItem from "./menu-item";
import GroupMenuItem from "./group-menu-item";
import { cn } from "../../lib/utils";
import { useState } from "react";
import { redirect } from "next/navigation";
import FreeCounter from "./free-counter";
import { Badge } from "../ui/badge";
import CreditsContainer from "./credits-container";

interface AppSidebarProps {
  className?: string;
  userApiUses: number;
  userCreditsAmount: number;
}

const AppSidebar = ({
  className,
  userApiUses,
  userCreditsAmount,
}: AppSidebarProps) => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const [loading, setLoading] = useState(false);
  const { has, userId } = useAuth();

  let isPro = false;
  if (userId) isPro = has({ plan: 'pro' });

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
    <Sidebar
      collapsible="none"
      className={cn(
        "h-screen flex flex-col bg-white/10 backdrop-blur-sm rounded-r-2xl border-r border-white/20 text-white",
        className
      )}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="flex flex-row items-center justify-between">
              <div className="flex space-x-1 items-center">
                <Frame />
                <span className="text-xl font-bold">aiPower</span>
              </div>
              <div>
                <Badge>
                  {isPro ? "Pro" : "Free"}
                </Badge>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="overflow-x-hidden overflow-y-auto flex-1 scroll-smooth">
        <SidebarMenu className="mt-1">
          {mainRoutes.map((route, idx) => (
            <MenuItem {...route} key={idx} />
          ))}
        </SidebarMenu>

        <GroupMenuItem menuItems={textTools} groupTitle="Text Tools" />

        <GroupMenuItem menuItems={imageTools} groupTitle="Image Tools" />

        <GroupMenuItem menuItems={voiceTools} groupTitle="Voice Tools" />

        <GroupMenuItem menuItems={videoTools} groupTitle="Video Tools" />

        <GroupMenuItem menuItems={devTools} groupTitle="Dev Tools" />

        <GroupMenuItem menuItems={fileTools} groupTitle="File Tools" />

        <SidebarGroup>
          <SidebarGroupLabel className="text-white">Help</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <MenuItem label="Support" href="/support" icon={HandHelping} />

              <MenuItem label="Feedback" href="/feedback" icon={Send} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu className="flex flex-col items-center justify-center space-y-1">
          <SidebarMenuItem>
            <FreeCounter apiCount={userApiUses} isPro={isPro} />
          </SidebarMenuItem>

          <SidebarMenuItem className="mt-1 w-full flex items-center justify-center">
            <CreditsContainer userCreditsAmount={userCreditsAmount} isPro={isPro} />
          </SidebarMenuItem>

          <SidebarMenuItem className="w-full flex flex-row">
            {user ? (
              <div className="flex items-center justify-center gap-2">
                <img
                  src={user.imageUrl}
                  alt="avatar"
                  width={30}
                  height={30}
                  className="rounded-md avatar border-0.5 border-black"
                />

                <span className="text-muted-foreground text-xs">
                  {user?.emailAddresses[0].emailAddress}
                </span>

                <DropdownMenu>
                  <DropdownMenuTrigger
                    className="cursor-pointer justify-center items-center hover:bg-white/30 border-b border-white/20"
                    asChild
                  >
                    <SidebarMenuAction>
                      <MoreHorizontal className="text-white" />
                    </SidebarMenuAction>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side="right"
                    align="end"
                    className="ml-3 bg-white/10 border backdrop-blur-md border-white/20"
                  >
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <a href="#" className="hover:bg-white/30">
                        <Settings />
                        <span className="text-sm text-white">
                          Manage your account
                        </span>
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" asChild>
                      <a
                        onClick={() => signOut()}
                        className="hover:bg-white/20"
                      >
                        <LogOut />
                        <span className="text-sm text-white">Log Out</span>
                      </a>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center">
                <User />
              </div>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
