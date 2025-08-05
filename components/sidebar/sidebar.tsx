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
import { Frame, HandHelping, Send } from "lucide-react";
import MenuItem from "./menu-item";
import GroupMenuItem from "./group-menu-item";
import { cn } from "../../lib/utils";
import FreeCounter from "./free-counter";
import { Badge } from "../ui/badge";
import CreditsContainer from "./credits-container";
import ProfileCard from "./profile-card";
import { ClerkUser } from "@/types";

interface AppSidebarProps {
  className?: string;
  user: ClerkUser;
}

const AppSidebar = ({ className, user }: AppSidebarProps) => {
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
                <Badge>{user.isPro ? "Pro" : "Free"}</Badge>
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
        <SidebarMenu>
          <SidebarMenuItem className="flex flex-col items-center justify-center space-y-1">
            <FreeCounter apiCount={user.apiCount} isPro={user.isPro} />

            <div className="mt-2 w-full flex items-center justify-center">
              <CreditsContainer
                userCreditsAmount={user.credits}
                isPro={user.isPro}
              />
            </div>

            <ProfileCard user={user} />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
