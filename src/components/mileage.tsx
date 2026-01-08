"use client";

import { useCarStore } from "@/hooks/use-car-store";
import useStore from "@/hooks/use-store";
import { mileageToFarsi } from "@/lib/utils";

function Mileage() {
  const selectedCar = useStore(useCarStore, (state) => state.selectedCar);
  return (
    <h3 className="py-3 text-5xl font-extrabold text-blue-600">
      {mileageToFarsi(selectedCar?.mileage ?? 0)}
    </h3>
  );
}

export default Mileage;
