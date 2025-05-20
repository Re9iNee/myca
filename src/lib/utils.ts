import { clsx, type ClassValue } from "clsx";
import { UseFormSetValue } from "react-hook-form";
import { toast } from "sonner";
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

export function farsiToMileage(mileage: string): number {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  const englishMileage = mileage
    .split("")
    .map((char) => {
      const index = persianDigits.indexOf(char);
      return index >= 0 ? index.toString() : char;
    })
    .join("")
    .replace(/٬/g, ""); // remove commas

  return parseInt(englishMileage, 10);
}

export function isJSON(str: string) {
  try {
    JSON.stringify(JSON.parse(str));
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export function mileageInputChange(
  e: React.ChangeEvent<HTMLInputElement>,
  /* eslint-disable */
  setValue: UseFormSetValue<any>,
  inputName: "mileage" | "mileageInterval",
) {
  const rawValue: string = e.target.value;
  if (rawValue === "") {
    setValue(inputName, "");
    return;
  }
  if (rawValue.match(/([۰۱۲۳۴۵۶۷۸۹]|[\d])+/g)) {
    const mileage = farsiToMileage(e.target.value);
    const parsedValue = mileageToFarsi(mileage);

    setValue(inputName, parsedValue);
  } else {
    const match = rawValue.match(/([۰۱۲۳۴۵۶۷۸۹]|[\d])+/g);

    setValue(inputName, match?.[0] ?? "");
    toast.error("فقط عدد مجاز است");
    return;
  }
}
