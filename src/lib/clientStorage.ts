// lib/clientStorage.ts
import lib from "localstoragedb";

function createOrGetStorage() {
  if (typeof window === "undefined") {
    return null;
  }
  return localStorage;
}

export const clientStorage = {
  get(key: string): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(key);
  },

  set(key: string, value: string): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, value);
  },

  remove(key: string): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(key);
  },
};
