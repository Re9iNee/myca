"use client";

import useLocalStorage from "@/hooks/useLocalStorage";
import { mileageToFarsi } from "@/lib/utils";
import { useEffect, useState } from "react";

function Mileage() {
  const [mileage, setMileage] = useState<number>(0);
  const { value: ownerId } = useLocalStorage("ownerId");
  const { value: selectedCarName } = useLocalStorage("defaultCar");

  useEffect(() => {
    if (!ownerId || !selectedCarName) {
      return;
    }

    fetch(`/api/cars/mileage?ownerId=${ownerId}&carName=${selectedCarName}`)
      .then(async (res) => {
        setMileage(await res.json());
      })
      .catch((err) => console.error(err));
  }, [ownerId, selectedCarName]);

  return (
    <h3 className="py-3 text-5xl font-bold text-blue-600">
      {mileageToFarsi(mileage)}
    </h3>
  );
}

export default Mileage;
