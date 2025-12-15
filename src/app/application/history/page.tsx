import ServiceListWrapper from "@/components/service-list-wrapper";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { ChevronRight, Wrench } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LuScrollText } from "react-icons/lu";

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
        <Link href={"/application/"} className="flex items-center gap-2">
          <ChevronRight className="mt-0.5 h-5 w-5 stroke-2" />
          بازگشت
        </Link>
      </header>

      <h1 className="flex gap-3 py-2.5 text-lg font-bold text-slate-700">
        <LuScrollText className="mt-0.5 h-7 w-7 stroke-2 text-slate-700" />
        تاریخچه سرویس ها
      </h1>
      <ServiceListWrapper services={services} />
      <div className="pt-3 pb-3">
        <Button
          className="h-[56px] w-full rounded-2xl bg-linear-to-r from-blue-600 to-blue-500 px-8 text-base font-semibold [&_svg:not([class*='size-'])]:size-6"
          asChild
        >
          <Link href={"/application/new-service"}>
            <Wrench className="mt-1" />
            سرویس جدید
          </Link>
        </Button>
      </div>
    </main>
  );
}
