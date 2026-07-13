import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"