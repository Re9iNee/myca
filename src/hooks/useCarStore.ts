import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Car } from "../../generated/prisma";

interface State {
  cars: Car[];
  selectedCar: Car | null;
}

type Action = {
  addCar: (car: Car) => void;
  setCars: (cars: Car[]) => void;
  addAndSelectCar: (car: Car) => void;
  setSelectedCar: (carId: string) => void;
  // removeCar: (carId: string) => void;
  // updateCar: (carId: string, updatedCar: Cars) => void;
  // clearCars: () => void;
};

export const useCarStore = create<State & Action>()(
  persist(
    (set, get) => ({
      cars: [],
      selectedCar: null,
      setCars: (cars: Car[]) => set({ cars }),
      setSelectedCar: (carId: string) => {
        const car = get().cars.find((car) => car.id === carId);
        if (car) {
          set({ selectedCar: car });
        }
      },
      addCar: (car) =>
        set((state) => ({
          cars: [...state.cars, car],
        })),
      addAndSelectCar: (car: Car) => {
        set((state) => ({
          cars: [...state.cars, car],
          selectedCar: car,
        }));
      },
      // clearCars: () => set({ cars: [] }),
      // removeCar: (carId) =>
      //   set((state) => ({
      //     cars: state.cars.filter((car) => car.id !== carId),
      //   })),

      // updateCar: (carId, updatedCar) =>
      //   set((state) => ({
      //     cars: state.cars.map((car) => (car.id === carId ? updatedCar : car)),
      //   })),
      // getAllCars: () => get().cars,
      // getSelectedCar: () => get().selectedCar,
      // getCarById: (carId: string) =>
      //   get().cars.find((car) => car.id === carId) || null,
    }),
    {
      name: "car-store", // name of item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default the 'localStorage' is used
      partialize: (state) => ({
        cars: state.cars,
        selectedCar: state.selectedCar,
      }),
    },
  ),
);
