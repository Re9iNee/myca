"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";

import { LuScrollText } from "react-icons/lu";
import { Button } from "./ui/button";
import useStore from "@/hooks/useStore";
import { useCarStore } from "@/hooks/useCarStore";

export default function ServiceHistoryBtn() {
  const selectedCar = useStore(useCarStore, (state) => state.selectedCar);

  return (
    <Link
      href={`/history?carId=${selectedCar?.id}`}
      className="mb-5 flex cursor-pointer items-center justify-between gap-4 rounded-2xl border-2 border-slate-100 bg-white p-4 drop-shadow-xs"
    >
      <div className="flex gap-2">
        <LuScrollText className="mt-0.5 h-5 w-5 stroke-2 text-slate-700" />
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-bold text-slate-700">
            تاریخچه سرویس ها
          </span>
          <span className="text-xs text-slate-400">
            لیست تاریخچه همه سرویس های انجام شده
          </span>
        </div>
      </div>
      <Button
        variant={"outline"}
        size={"icon"}
        className="ml-4 rounded-lg border border-slate-200 stroke-2 p-2 text-slate-600"
      >
        <ChevronLeft />
      </Button>
    </Link>
  );
}
