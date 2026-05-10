import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const statusMapping = {
  processing: "text-black bg-accent",
  completed: "text-primary bg-primary/30",
};
