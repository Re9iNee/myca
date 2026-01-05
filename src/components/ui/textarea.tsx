import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content h-[120px] min-h-16 w-full rounded-lg border-0 bg-slate-50 px-3 py-3.5 text-sm font-medium text-slate-800 shadow-xs transition-[color,box-shadow] outline-none placeholder:text-sm placeholder:font-normal placeholder:text-slate-400 focus-visible:border focus-visible:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
