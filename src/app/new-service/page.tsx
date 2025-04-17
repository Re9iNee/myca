"use client";

import MileageInput from "@/components/MileageInput";
import ServiceTypePicker from "@/components/ServiceTypePicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export type serviceType = "normal" | "interval";

function NewServicePage() {
  const [serviceType, setServiceType] = useState<serviceType>("normal");

  return (
    <div className="flex h-full flex-col p-4">
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
            {serviceType === "interval"
              ? `سرویس هایی که به طور مکرر انجام میشود مثل تعویض روغن`
              : `سرویس ها و تعمیراتی که تنها یک بار دریافت میشوند`}
          </p>

          <div className="space-y-2">
            <Label htmlFor="title">عنوان سرویس</Label>
            <Input
              id="title"
              placeholder="مثال تنظیم گاز کولر"
              className="h-12 rounded-lg bg-slate-50 px-3 py-3.5 text-sm font-medium text-slate-800 placeholder:text-sm placeholder:text-slate-400"
            />
          </div>

          {serviceType === "interval" && (
            <div className="space-y-2">
              <Label htmlFor="mileage-interval">کیلومتر تکرار</Label>
              <MileageInput id="mileage-interval" />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="detail">جزئیات سرویس</Label>
            <Textarea
              placeholder="مثال: گاز کولر ماشین بررسی و تعویض شد"
              id="detail"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mileage">
              {serviceType === "interval"
                ? "کیلومتر اولین سرویس"
                : "کیلومتر سرویس"}
            </Label>
            <MileageInput id="mileage" />
          </div>
        </div>
      </div>

      <Button className="h-[52px] rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 px-2.5 py-4 text-sm font-bold">
        ثبت سرویس
      </Button>
    </div>
  );
}

export default NewServicePage;
