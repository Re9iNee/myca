import { useEffect, useRef } from "react";

export default function useLocalStorage(name: string, initialValue: any) {
  const value = useRef(null);

  function load() {
    const data = window.localStorage.getItem(name);
    if (typeof data !== null) {
      return save(data);
    } else {
      return save(initialValue);
    }
  }

  function save(v: any) {
    value.current = v;
    window.localStorage.setItem(name, v);
  }

  useEffect(() => {
    load();
  }, []);

  return { save, value: value.current };
}
