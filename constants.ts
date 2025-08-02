import {
  Settings,
  File,
  LayoutDashboard,
  MessageSquare,
  ImageIcon,
  VideoIcon,
  Music,
  Code,
  HeadphonesIcon,
} from "lucide-react";
import { MenuItem } from "./types";

export const imageTools: MenuItem[] = [
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image-generation",
    color: "text-pink-700",
  },
  {
    label: "Image Restore",
    icon: ImageIcon,
    href: "/image-restore",
    color: "text-pink-700",
  },
  {
    label: "Generative Fill",
    icon: ImageIcon,
    href: "/generative-fill",
    color: "text-pink-700",
  },
  {
    label: "Object Remove",
    icon: ImageIcon,
    href: "/object-remove",
    color: "text-pink-700",
  },
  {
    label: "Object Recolor",
    icon: ImageIcon,
    href: "/object-recolor",
    color: "text-pink-700",
  },
  {
    label: "Background Remove",
    icon: ImageIcon,
    href: "/background-remove",
    color: "text-pink-700",
  },
];

export const textTools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-500",
  },
  {
    label: "Paraphrase",
    icon: MessageSquare,
    href: "/paraphrase",
    color: "text-violet-500",
  },
];

export const voiceTools = [
  {
    label: "Voice Conversation",
    icon: HeadphonesIcon,
    href: "/voice",
    color: "text-pink-900",
  },
  {
    label: "Music Generation",
    icon: Music,
    href: "/music",
    color: "text-emerald-500",
  },
];

export const videoTools = [
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color: "text-orange-700",
  },
  {
    label: "Image to Video",
    icon: VideoIcon,
    href: "/image-to-video",
    color: "text-orange-700",
  },
];

export const fileTools = [
  {
    label: "Resume Analyzer",
    icon: File,
    href: "/resume",
    color: "text-pink-900",
  },
  {
    label: "PDF Analyzer",
    icon: File,
    href: "/pdf",
    color: "text-pink-900",
  },
];

export const devTools = [
  {
    label: "Code Generation",
    icon: Code,
    href: "/code",
    color: "text-green-700",
  },
];

export const mainRoutes: MenuItem[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];
