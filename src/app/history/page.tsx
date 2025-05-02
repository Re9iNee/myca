import EmptyServicesState from "@/components/EmptyServicesState";
import SearchInput from "@/components/SearchInput";
import { Button } from "@/components/ui/button";
import { dateToShamsi, mileageToFarsi } from "@/lib/utils";
import prisma from "@prisma";
import { ChevronLeft, ChevronRight, Wrench } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LuScrollText } from "react-icons/lu";
import { Service } from "../../../generated/prisma";

type Props = {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};
export default async function CarHistoryPage({ searchParams }: Props) {
  const params = await searchParams;

  const carId = params?.carId;

  if (!carId || Array.isArray(carId)) notFound();

  const services = await prisma.service.findMany({
    where: { carId },
  });

  return (
    <main className="flex h-full w-full flex-col px-6">
      {/* navigation header */}
      <header className="flex items-center gap-2 py-2.5 text-sm font-medium text-slate-500">
        <Link href={"/"} className="flex items-center gap-2">
          <ChevronRight className="mt-0.5 h-5 w-5 stroke-2" />
          بازگشت
        </Link>
      </header>

      <h1 className="flex gap-3 py-2.5 text-lg font-bold text-slate-700">
        <LuScrollText className="mt-0.5 h-7 w-7 stroke-2 text-slate-700" />
        تاریخچه سرویس ها
      </h1>
      {services.length > 0 ? (
        <>
          <SearchInput className="mt-3.5" />
          <div className="scrollbar-hide mt-3.5 grow overflow-y-auto">
            {services.map((service) => (
              <Row key={service.id} {...service} />
            ))}
          </div>
        </>
      ) : (
        <EmptyServicesState />
      )}
      <div className="pt-3 pb-3">
        <Button
          className="flex w-full cursor-pointer gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 p-8 text-base font-semibold [&_svg:not([class*='size-'])]:size-6"
          asChild
        >
          <Link href={"/new-service"}>
            <Wrench className="mt-1" />
            سرویس جدید
          </Link>
        </Button>
      </div>
    </main>
  );
}

function Row({ id, title, mileage, date }: Partial<Service>) {
  return (
    <Link
      href={`/history/${id}`}
      className="flex items-center justify-between border-b-slate-200 px-0.5 py-4 not-last:border-b-2"
    >
      <div>
        <span className="text-sm font-semibold text-slate-600">{title}</span>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-400">
            {dateToShamsi(date ?? new Date())}
          </span>
          <div className="h-4 w-[1px] rounded-sm bg-slate-300" />
          <span className="text-xs font-medium text-slate-400">
            کیلومتر:{" "}
            <span className="font-semibold text-blue-500">
              {mileageToFarsi(mileage ?? 0)}
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
