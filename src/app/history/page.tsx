import SearchInput from "@/components/SearchInput";
import { Button } from "@/components/ui/button";
import { dateToShamsi, mileageToFarsi } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Wrench } from "lucide-react";
import Link from "next/link";
import { LuScrollText } from "react-icons/lu";

const services: ServiceDetail[] = [
  {
    id: "1",
    date: new Date(),
    kilometer: 15120,
    type: "تعویض سنسور استارت موتور",
  },
  { id: "2", date: new Date(), kilometer: 16000, type: "تعمیر اساسی گیربکس" },
  { id: "3", date: new Date(), kilometer: 17000, type: "تعویض روغن موتور" },
  { id: "4", date: new Date(), kilometer: 18000, type: "تعمیر سیستم ترمز" },
  { id: "5", date: new Date(), kilometer: 18000, type: "تعمیر سیستم ترمز" },
  { id: "6", date: new Date(), kilometer: 18000, type: "تعمیر سیستم ترمز" },
  { id: "7", date: new Date(), kilometer: 18000, type: "تعمیر سیستم ترمز" },
  { id: "8", date: new Date(), kilometer: 18000, type: "تعمیر سیستم ترمز" },
  { id: "9", date: new Date(), kilometer: 18000, type: "تعمیر سیستم ترمز" },
  { id: "10", date: new Date(), kilometer: 18000, type: "تعمیر سیستم ترمز" },
  { id: "11", date: new Date(), kilometer: 18000, type: "تعمیر سیستم ترمز" },
  { id: "12", date: new Date(), kilometer: 18000, type: "تعمیر سیستم ترمز" },
];

export default function CarHistoryPage() {
  return (
    <main className="flex h-full w-full flex-col px-6">
      {/* navigation header */}
      <header className="flex items-center gap-2 py-2.5 text-sm font-medium text-slate-500">
        <ChevronRight className="mt-0.5 h-5 w-5 stroke-2" />
        بازگشت
      </header>

      <h1 className="flex gap-3 py-2.5 text-lg font-bold text-slate-700">
        <LuScrollText className="mt-0.5 h-7 w-7 stroke-2 text-slate-700" />
        تاریخچه سرویس ها
      </h1>
      <SearchInput className="mt-3.5" />
      <div className="scrollbar-hide mt-3.5 grow overflow-y-auto">
        {services.map((service) => (
          <Row key={service.id} {...service} />
        ))}
      </div>
      <div className="pt-3 pb-3">
        <Button className="flex w-full gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 p-8 text-base font-semibold [&_svg:not([class*='size-'])]:size-6">
          <Wrench className="mt-1" />
          سرویس جدید
        </Button>
      </div>
    </main>
  );
}

type ServiceDetail = {
  id: string;
  type: string;
  kilometer: number;
  date: Date;
};
function Row({ id, type, kilometer, date }: ServiceDetail) {
  return (
    <Link
      href={`/history/${id}`}
      className="flex items-center justify-between border-b-slate-200 px-0.5 py-4 not-last:border-b-2"
    >
      <div>
        <span className="text-sm font-semibold text-slate-600">{type}</span>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-400">
            {dateToShamsi(new Date())}
          </span>
          <div className="h-4 w-[1px] rounded-sm bg-slate-300" />
          <span className="text-xs font-medium text-slate-400">
            کیلومتر:{" "}
            <span className="font-semibold text-blue-500">
              {mileageToFarsi(kilometer)}
            </span>
          </span>
        </div>
      </div>
      <div className="ml-0.5 h-full text-slate-600">
        <ChevronLeft className="stroke-[1.5px]" />
      </div>
    </Link>
  );
}
