import { cn, mileageToFarsi } from "@/lib/utils";
import { ClassValue } from "clsx";
import { Input } from "./ui/input";

const CURRENT_MILEAGE = 154456;

export default function MileageInput({
  id,
  className,
}: {
  id: string;
  className?: ClassValue;
}) {
  return (
    <div className={cn("relative", className)}>
      <Input
        id={id}
        placeholder={mileageToFarsi(CURRENT_MILEAGE)}
        defaultValue={mileageToFarsi(CURRENT_MILEAGE)}
        className="block h-12 w-full rounded-lg bg-slate-50 p-4 px-3 py-3.5 text-sm font-semibold text-slate-700 placeholder:text-sm placeholder:text-slate-400 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500"
        required
      />
      <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3 text-slate-400">
        کیلومتر
      </div>
    </div>
  );
}
