import { useCarStore } from "@/hooks/useCarStore";
import useLocalStorage from "@/hooks/useLocalStorage";
import { farsiToMileage, mileageToFarsi } from "@/lib/utils";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CiSquarePlus } from "react-icons/ci";
import { toast } from "sonner";
import { Car } from "../../generated/prisma";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Input } from "./ui/input";

type Inputs = {
  model: string;
  mileage: string;
};

function AddCarDrawer() {
  const addAndSelectCar = useCarStore((state) => state.addAndSelectCar);
  const { save: saveOwnerId, value: ownerId } = useLocalStorage(
    "ownerId",
    null,
  );

  const addCar: SubmitHandler<Inputs> = async (data) => {
    setPending(true);

    const result = await fetch("/api/cars/", {
      method: "POST",
      body: JSON.stringify({
        model: data.model,
        mileage: farsiToMileage(data.mileage),
        ownerId,
      }),
    });
    const car: Car = await result.json();
    saveOwnerId(car.ownerId);
    addAndSelectCar(car);

    toast.success("ماشین با موفقیت اضافه شد");
    setDrawerOpen(false);
    reset();

    setPending(false);
  };
  const { handleSubmit, register, setValue, reset, formState } =
    useForm<Inputs>();
  const [isPending, setPending] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setDrawerOpen}>
      <DrawerTrigger
        className="flex h-[54px] items-center gap-2 rounded-full border-[1.5px] border-slate-200 bg-white p-4 text-sm font-semibold text-slate-600"
        onClick={() => setDrawerOpen(true)}
        asChild
      >
        <Button
          size={"icon"}
          variant={"outline"}
          className="size-[52px] rounded-lg border border-[#E2E8F080]/50 bg-slate-50 p-3"
        >
          <CiSquarePlus className="size-[26px] text-slate-500" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="space-x-1.5 px-8 pt-2 pb-3">
          <DrawerTitle className="text-base font-bold text-slate-800">
            ماشین جدید
          </DrawerTitle>
          <DrawerDescription className="text-sm font-normal text-slate-500">
            نام و کیلومتر ماشین جدید را وارد کنید
          </DrawerDescription>
        </DrawerHeader>
        <form className="space-y-2 px-4 py-2" onSubmit={handleSubmit(addCar)}>
          <Input
            required
            type="text"
            placeholder="نام ماشین"
            className="h-[52px] text-base font-semibold text-slate-800 placeholder:font-normal placeholder:text-slate-400"
            {...register("model")}
          />
          <Input
            min={0}
            required
            inputMode="numeric"
            className="h-[52px] text-base font-semibold text-slate-800 placeholder:font-normal placeholder:text-slate-400"
            placeholder="کیلومتر کارکرد"
            {...register("mileage", {
              onChange: (e) => {
                const rawValue: string = e.target.value;
                if (rawValue === "") {
                  setValue("mileage", "");
                  return;
                }
                if (rawValue.match(/([۰۱۲۳۴۵۶۷۸۹]|[\d])+/g)) {
                  const mileage = farsiToMileage(e.target.value);
                  const parsedValue = mileageToFarsi(mileage);

                  setValue("mileage", parsedValue);
                } else {
                  const match = rawValue.match(/([۰۱۲۳۴۵۶۷۸۹]|[\d])+/g);

                  setValue("mileage", match?.[0] ?? "");
                  toast.error("فقط عدد مجاز است");
                  return;
                }
              },
            })}
          />
          <DrawerFooter className="px-0 py-3">
            <Button
              disabled={isPending || !formState.isDirty}
              className="h-[52px] rounded-2xl border border-slate-300 bg-gradient-to-r from-blue-500 to-blue-600 px-2.5 py-4 text-sm font-semibold text-white disabled:bg-none disabled:text-slate-300 disabled:opacity-100"
            >
              ثبت ماشین جدید
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}

export default AddCarDrawer;
