import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

export default function CarInfoPage() {
  return (
    <div className="h-full px-6 pt-9">
      <form action="" className="flex h-full flex-col justify-between">
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
              <Input type="text" placeholder="پژو پارس" className="h-[52px]" />
              <Input
                step={1000}
                type="number"
                className="h-[52px]"
                placeholder="کیلومتر کارکرد"
              />
            </div>
          </div>
        </div>

        <div>
          <Button
            disabled
            className="mt-20 h-[56px] w-full rounded-2xl px-3.5 py-2.5 text-lg font-semibold disabled:bg-slate-100 disabled:text-slate-300"
          >
            ورود
          </Button>
          <footer className="px-8 pt-12 pb-3 text-center text-xs text-neutral-400 grayscale">
            Made with ♥️ by <span className="font-bold">Mora</span>
          </footer>
        </div>
      </form>
    </div>
  );
}
