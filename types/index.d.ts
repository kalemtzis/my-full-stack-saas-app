import { LucideIcon } from "lucide-react";

export interface MenuItem {
  label: string;
  icon: LucideIcon;
  href: string;
  color?: string;
  bgColor?: string;
}