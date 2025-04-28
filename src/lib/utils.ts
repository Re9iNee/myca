import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dateToShamsi(date: Date) {
  return date.toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export function mileageToFarsi(mileage: number) {
  return mileage.toLocaleString("fa-IR");
}

export function isJSON(str: string) {
  try {
    JSON.stringify(JSON.parse(str));
    return true;
  } catch (e) {
    return false;
  }
}
