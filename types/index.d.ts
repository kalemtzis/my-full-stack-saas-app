import { LucideIcon } from "lucide-react";

export interface MenuItem {
  label: string;
  icon: LucideIcon;
  href: string;
  color?: string;
  bgColor?: string;
}

export interface IImage {
  id: number;
  title: string;
  transformationType: string;
  publicId: string;
  secureUrl: string;
  width?: number;
  height?: number;
  config?: object;
  transformationUrl?: string;
  aspectRatio?: string;
  color?: string;
  prompt?: string;
  author: {
    _id: string
    firstName: string;
    lastName: string;
  }
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ClerkUser {
  email?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  photoUrl?: string;
  apiCount?: number;
  credits?: number;
  isPro?: boolean;
}

export interface CreateUserParams {
  clerkId: string;
  email?: string;
  username?: string;
  firstName?: stirng;
  lastName?: string;
  photo?: string;
}

export interface UpdateUserParams {
  firstName?: string;
  lastName?: string;
  username?: string;
  photo?: string;
}