import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function SearchInput({ className }: { className?: ClassValue }) {
  return (
    <div className={cn("relative", className)}>
      <input
        type="search"
        id="default-search"
        className="block w-full rounded-lg border border-gray-300 bg-slate-50 p-4 text-sm text-gray-900 placeholder:text-sm placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        placeholder="جست و جو در سرویس های کیا ریو"
        required
      />
      <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3 text-slate-400">
        <FaMagnifyingGlass />
      </div>
    </div>
  );
}
