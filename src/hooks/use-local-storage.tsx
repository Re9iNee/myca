import { isJSON } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function useLocalStorage(name: string, initialValue?: unknown) {
  const [value, setValue] = useState<unknown>(initialValue);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = window.localStorage.getItem(name);
      if (data !== null && isJSON(data)) {
        setValue(JSON.parse(data));
      } else {
        setValue(data);
      }
    }
  }, [name]);

  function save(v: unknown) {
    if (typeof v === "object") {
      v = JSON.stringify(v);
    }

    setValue(v);
    window.localStorage.setItem(name, JSON.stringify(v));
  }

  return { save, value };
}
