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

interface AppSidebarProps {
  className?: string;
  userApiUses: number;
  userCreditsAmount: number;
}

const AppSidebar = ({ className, userApiUses, userCreditsAmount }: AppSidebarProps) => {
  const { user } = useUser();
  const { signOut } = useAuth();

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
            <SidebarMenuButton className="gap-4">
              <Frame />
              <span className="text-xl font-bold">aiPower</span>
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
