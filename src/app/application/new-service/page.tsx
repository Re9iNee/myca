"use client";

import MileageInput from "@/components/mileage-input";
import ServiceTypePicker from "@/components/service-type-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCarStore } from "@/hooks/use-car-store";
import useStore from "@/hooks/use-store";
import {
  farsiToMileage,
  mileageInputChange,
  mileageToFarsi,
} from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { ServiceType } from "../../../../generated/prisma";

type Inputs = {
  title: string;
  details: string;
  mileage: string;
  mileageInterval?: string;
};

function NewServicePage() {
  const [serviceType, setServiceType] = useState<ServiceType>("NonRecurrent");
  const selectedCar = useStore(useCarStore, (state) => state.selectedCar);
  const [pending, setPending] = useState<boolean>(false);
  const { register, handleSubmit, reset, setValue } = useForm<Inputs>();
  const router = useRouter();

  useLayoutEffect(() => {
    if (selectedCar) {
      reset({ mileage: mileageToFarsi(selectedCar.mileage) });
    }
  }, [selectedCar, reset]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log("handler running");

    try {
      setPending(true);
      const res = await fetch("/api/services", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          serviceType,
          ownerId: selectedCar?.ownerId,
          carId: selectedCar?.id,
          mileage: farsiToMileage(data.mileage),
          mileageInterval: farsiToMileage(data?.mileageInterval ?? "0"),
        }),
      });

      if (res.status === 200) {
        toast.success("سرویس با موفقیت ثبت شد");
        router.push(`/application/history?carId=${selectedCar?.id}`);
      }
    } catch (error) {
      console.error("Error while creating new service", error);
      toast.error("خطا در ثبت سرویس");
      return;
    } finally {
      setPending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-full flex-col p-4"
    >
      <Link href={"../"} className="flex items-center gap-2">
        <ChevronRight className="mt-0.5 h-5 w-5 stroke-2" />
        بازگشت
      </Link>
      <div className="grow">
        <div className="space-y-1.5 pt-2 pb-3">
          <h3 className="text-base font-bold text-slate-800">سرویس جدید</h3>
          <h4 className="text-sm text-slate-500">
            جزئیات سرویس انجام شده رو ثبت کنید
          </h4>
        </div>

        <ServiceTypePicker
          serviceType={serviceType}
          setServiceType={setServiceType}
        />

        <div className="mt-5 space-y-5">
          <p className="text-sm text-slate-600">
            {serviceType === "Recurrent"
              ? `سرویس هایی که به طور مکرر انجام میشود مثل تعویض روغن`
              : `سرویس ها و تعمیراتی که تنها یک بار دریافت میشوند`}
          </p>

          <div className="space-y-2">
            <Label htmlFor="title">عنوان سرویس</Label>
            <Input
              id="title"
              placeholder="مثال: تعویض روغن موتور"
              className="h-12 rounded-lg bg-slate-50 px-3 py-3.5 font-medium text-slate-800 placeholder:text-sm placeholder:text-slate-400"
              {...register("title")}
            />
          </div>

          {serviceType === "Recurrent" && (
            <div className="space-y-2">
              <Label htmlFor="mileage-interval">کیلومتر تکرار</Label>
              <MileageInput
                id="mileage-interval"
                {...register("mileageInterval", {
                  onChange: (e) =>
                    mileageInputChange(e, setValue, "mileageInterval"),
                })}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="detail">جزئیات سرویس</Label>
            <Textarea
              id="detail"
              placeholder="روغن موتور بررسی و تعویض شد"
              {...register("details")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mileage">
              {serviceType === "Recurrent"
                ? "کیلومتر اولین سرویس"
                : "کیلومتر سرویس"}
            </Label>
            <MileageInput
              id="mileage"
              {...register("mileage", {
                onChange: (e) => mileageInputChange(e, setValue, "mileage"),
              })}
            />
          </div>
        </div>
      </div>

      <Button
        disabled={pending}
        className="h-13 rounded-2xl bg-linear-to-r from-blue-500 to-blue-600 px-2.5 py-4 text-sm font-bold disabled:grayscale-100"
      >
        ثبت سرویس
      </Button>
    </form>
  );
}

export default NewServicePage;
