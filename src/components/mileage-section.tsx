"use client";

import Link from "next/link";
import { CiCirclePlus } from "react-icons/ci";
import { Button } from "./ui/button";
import CalenderSettingIcon from "@public/calendar-setting.svg";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useCarStore } from "@/hooks/use-car-store";
import useStore from "@/hooks/use-store";
import {
  farsiToMileage,
  mileageInputChange,
  mileageToFarsi,
} from "@/lib/utils";
import { Wrench } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import Mileage from "./mileage";
import MileageInput from "./mileage-input";
import Image from "next/image";

type Inputs = {
  mileage: string;
};

export default function MileageSection() {
  const [isPending, setPending] = useState(false);
  const selectedCar = useStore(useCarStore, (state) => state.selectedCar);
  const setSelectedCarMileage = useCarStore(
    (state) => state.setSelectedCarMileage,
  );
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const { register, handleSubmit, setValue } = useForm<Inputs>();

  const updateMileage: SubmitHandler<Inputs> = async (data) => {
    setPending(true);
    const updatedMileage = farsiToMileage(data.mileage);
    const response = await fetch("/api/cars", {
      method: "PATCH",
      body: JSON.stringify({ mileage: updatedMileage, id: selectedCar?.id }),
    }).finally(() => setPending(false));

    if (response.status === 200) {
      toast.success("کیلومتر با موفقیت آپدیت شد");
      setSelectedCarMileage(updatedMileage);
    } else {
      toast.error("خطا در آپدیت کیلومتر");
    }

    setDrawerOpen(false);
  };

  return (
    <section className="grid min-h-[541px] grow place-items-center content-center gap-6">
      {/* Mileage section */}
      <div className="space-y-2.5 text-center">
        <h2 className="text-lg font-medium text-slate-500">کیلومتر کارکرد</h2>
        <Mileage />
      </div>
      {/* Actions */}
      <div className="space-y-2.5">
        <div className="flex gap-2.5">
          <Drawer open={isDrawerOpen} onOpenChange={setDrawerOpen}>
            <DrawerTrigger
              className="flex h-[54px] w-[167.5px] items-center justify-center gap-2 rounded-full border-[1.5px] border-slate-200 bg-white py-4 text-sm font-semibold text-slate-600"
              onClick={() => setDrawerOpen(true)}
            >
              <CiCirclePlus size={22} className="mt-0.5" /> آپدیت کیلومتر
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader className="space-x-1.5 px-8 pt-2 pb-3">
                <DrawerTitle className="text-base font-bold text-slate-800">
                  آپدیت کیلومتر
                </DrawerTitle>
                <DrawerDescription className="text-sm font-normal text-slate-500">
                  عدد جدید کیلومتر را وارد کنید
                </DrawerDescription>
              </DrawerHeader>
              <form
                className="px-4 py-2"
                onSubmit={handleSubmit(updateMileage)}
              >
                <MileageInput
                  selectOnLoad
                  id="mileage"
                  defaultValue={mileageToFarsi(selectedCar?.mileage ?? 0)}
                  {...register("mileage", {
                    onChange: (e) => mileageInputChange(e, setValue, "mileage"),
                  })}
                />
                <DrawerFooter className="px-0 py-3">
                  <Button
                    disabled={isPending}
                    className="h-13 rounded-2xl border border-slate-300 bg-linear-to-r from-blue-500 to-blue-600 px-2.5 py-4 text-sm font-semibold text-white disabled:bg-none disabled:text-slate-300 disabled:opacity-100"
                  >
                    ذخیره کیلومتر
                  </Button>
                </DrawerFooter>
              </form>
            </DrawerContent>
          </Drawer>
          <Button
            asChild
            className="flex h-13.5 w-[167.5px] justify-center gap-2 rounded-full border-[1.5px] border-blue-100 bg-linear-to-l from-blue-500 to-blue-600 py-4 text-sm font-semibold text-white [&_svg:not([class*='size-'])]:size-[22px]"
          >
            <Link href={"/application/new-service"}>
              <Wrench className="mt-0.5" />
              سرویس جدید
            </Link>
          </Button>
        </div>
        <Button
          asChild
          variant={"outline"}
          aria-label="upcoming services"
          className="flex h-[54px] w-full items-center justify-center gap-2 rounded-full border-slate-200 p-4 text-sm font-semibold text-slate-600"
        >
          <Link href={`/application/upcoming-services?carId=${selectedCar?.id}`}>
            <Image src={CalenderSettingIcon} alt="calendar setting icon" />
            <span>سرویس های آینده</span>
          </Link>
        </Button>
      </div>
    </section>
  );
}
