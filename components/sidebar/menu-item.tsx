"use client";
import { cn } from "@/lib/utils";
import { SidebarMenuButton, SidebarMenuItem, useSidebar } from "../ui/sidebar";
import { usePathname } from "next/navigation";
import { type MenuItem } from "@/types";

const MenuItem = ({ label, icon: Icon, href, color }: MenuItem) => {
  const pathname = usePathname();

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        className={cn(
          pathname === href && "bg-zinc-300 font-semibold",
          "hover:bg-zinc-300"
        )}
        asChild
      >
        <a href={href}>
          <Icon className={cn(color && `${color}`)} />
          <span className="text-sm">{label}</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default MenuItem;
