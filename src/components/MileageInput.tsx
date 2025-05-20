"use client";

import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { useEffect, useRef } from "react";

function MileageInput({
  className,
  selectOnLoad,
  ...rest
}: React.ComponentPropsWithRef<"input"> & { selectOnLoad?: boolean }) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log(inputRef);
    if (inputRef.current && selectOnLoad) {
      inputRef.current.select();
    }
  }, [inputRef, inputRef.current]);

  return (
    <div className={cn("relative", className)}>
      <Input
        inputMode="numeric"
        className="block h-12 w-full rounded-lg bg-slate-50 p-4 px-3 py-3.5 text-sm font-semibold text-slate-700 placeholder:text-sm placeholder:text-slate-400 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500"
        required
        {...rest}
        ref={(e) => {
          if (typeof rest.ref === "function") {
            rest.ref(e);
          } else if (rest.ref) {
            rest.ref.current = e;
          }
          inputRef.current = e;
        }}
      />
      <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3 text-slate-400">
        کیلومتر
      </div>
    </div>
  );
}

export default MileageInput;
