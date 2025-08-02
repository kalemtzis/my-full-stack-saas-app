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
  SidebarSeparator,
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

const AppSidebar = () => {
  const { user } = useUser();
  const { signOut } = useAuth();

  return (
    <Sidebar
      collapsible="none"
      variant="floating"
      className="h-screen flex flex-col"
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

      <SidebarSeparator />

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

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Help</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <MenuItem label="Support" href="/support" icon={HandHelping} />

              <MenuItem label="Feedback" href="/feedback" icon={Send} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              {user ? (
                <div className="flex items-center justify-center">
                  
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
                      className="cursor-pointer justify-center items-center"
                      asChild
                    >
                      <SidebarMenuAction>
                        <MoreHorizontal />
                      </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      side="right"
                      align="end"
                      className="ml-1"
                    >
                      <DropdownMenuItem asChild className="cursor-pointer">
                        <a href="#">
                          <Settings />
                          <span className="text-sm">Manage your account</span>
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer" asChild>
                        <a onClick={() => signOut()}>
                          <LogOut />
                          <span className="text-sm">Log Out</span>
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
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
