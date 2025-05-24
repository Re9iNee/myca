"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCarStore } from "@/hooks/useCarStore";
import useLocalStorage from "@/hooks/useLocalStorage";
import { farsiToMileage, mileageToFarsi } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Car } from "../../../generated/prisma";

type Inputs = {
  model: string;
  mileage: string;
};

export default function AddNewCarForm() {
  const { save: saveOwnerId, value: ownerId } = useLocalStorage(
    "ownerId",
    null,
  );
  const router = useRouter();

  const addAndSelectCar = useCarStore((state) => state.addAndSelectCar);

  const [pending, setPending] = useState<boolean>(false);

  const { register, handleSubmit, setValue } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
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

    router.push("/");
    toast.success("ماشین با موفقیت اضافه شد");

    setPending(false);
  };

  return (
    <div className="h-full px-6 pt-9">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-full flex-col justify-between"
      >
        <div>
          <div className="space-y-2 text-center">
            <h1 className="text-[56px] font-bold text-blue-500">مایکا</h1>
            <h3 className="text-sm text-slate-400">
              مدیریت سرویس دوره ای اتومبیل
            </h3>
          </div>
          <div className="pt-12">
            <h4 className="text-lg font-semibold text-slate-700">
              مدل ماشین و کیلومتر رو وارد کنید
            </h4>
            <div className="space-y-3 pt-6">
              <Input
                required
                type="text"
                placeholder="پژو پارس"
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
            </div>
          </div>
        </div>

        <div>
          <Button
            type="submit"
            disabled={pending}
            className="mt-20 h-[56px] w-full rounded-2xl px-3.5 py-2.5 text-lg font-semibold disabled:bg-slate-100 disabled:text-slate-300"
          >
            ورود
          </Button>
          <footer className="mb-6 px-8 pt-12 text-center text-xs text-neutral-400 grayscale">
            Made with ♥️ by <span className="font-bold">Mora</span>
          </footer>
        </div>
      </form>
    </div>
  );
}
