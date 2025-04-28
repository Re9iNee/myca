import { isJSON } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function useLocalStorage(name: string, initialValue?: any) {
  const [value, setValue] = useState<any>(initialValue);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = window.localStorage.getItem(name);
      if (data !== null) {
        if (isJSON(data)) {
          setValue(JSON.parse(data));
        } else {
          setValue(data);
        }
      }
    }
  }, [name]);

  function save(v: any) {
    if (typeof v === "object") {
      v = JSON.stringify(v);
    }

    setValue(v);
    window.localStorage.setItem(name, v);
  }

  return { save, value };
}
