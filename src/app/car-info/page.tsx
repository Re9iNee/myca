import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

export default function CarInfoPage() {
  return (
    <div className="h-ful">
      <div className="space-y-2 text-center">
        <h1 className="font-bold text-[56px] text-blue-500">مایکا</h1>
        <h3 className="text-sm text-slate-400">مدیریت سرویس دوره ای اتومبیل</h3>
      </div>
      <form action="" className="">
        <h4 className="font-semibold text-lg text-slate-700">
          مدل ماشین و کیلومتر رو وارد کنید
        </h4>
        <div className="pt-6 space-y-3">
          <Input type="text" placeholder="پژو پارس" />
          <Input step={1000} type="number" placeholder="کیلومتر کارکرد" />
        </div>

        <Button
          disabled
          className="disabled:bg-slate-100 disabled:text-slate-300 w-full font-semibold text-lg py-2.5 px-3.5 rounded-2xl mt-20"
        >
          ورود
        </Button>
      </form>
      <footer className="text-xs text-neutral-400 grayscale text-center pt-12 pb-3 px-8">
        Made with ♥️ by <span className="font-bold">Mora</span>
      </footer>
    </div>
  );
}
