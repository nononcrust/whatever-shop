import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
