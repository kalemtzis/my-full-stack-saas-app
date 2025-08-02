"use client";
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu } from "../ui/sidebar";
import { Collapsible } from "@radix-ui/react-collapsible";
import { CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { ChevronDown } from "lucide-react";
import MenuItem from "./menu-item";

interface GroupMenuItemProps {
  groupTitle: string;
  menuItems: MenuItem[];
}

const GroupMenuItem = ({ menuItems, groupTitle }: GroupMenuItemProps) => {
  return (
    <Collapsible defaultOpen className="group/collapsible">
      <SidebarGroup>
        <SidebarGroupLabel className="cursor-pointer" asChild>
          <CollapsibleTrigger className="text-white">
            {groupTitle}
            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item, idx) => (
                <MenuItem {...item} key={idx} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
};

export default GroupMenuItem;
