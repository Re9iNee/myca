"use client";

import { useCarStore } from "@/hooks/useCarStore";
import useStore from "@/hooks/useStore";

export default function TestPage() {
  const car = useStore(useCarStore, (state) => state.selectedCar);

  return (
    <div className="h-full w-full bg-blue-950 text-white">
      {JSON.stringify(car)}
    </div>
  );
}
