"use client";
import { cn } from "@/lib/utils";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { usePathname } from "next/navigation";
import { type MenuItem } from "@/types";
import { useMemo } from "react";

const MenuItem = ({ label, icon: Icon, href, color }: MenuItem) => {
  const pathname = usePathname();

  const isActive = useMemo(() => pathname === href, [pathname, href])

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        className={cn(
          isActive && "bg-zinc-400/30 font-semibold",
          "hover:bg-zinc-400/30"
        )}
        asChild
      >
        <a href={href}>
          <Icon className={cn(color ? `${color}` : 'text-white')} />
          <span className="text-[13px] text-white">{label}</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default MenuItem;
