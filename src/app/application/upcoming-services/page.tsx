import ServiceListWrapper from "@/components/service-list-wrapper";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { ChevronRight, ScrollText, Wrench } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};
export default async function CarHistoryPage({ searchParams }: Props) {
  const params = await searchParams;

  const carId = params?.carId;

  if (!carId || Array.isArray(carId)) notFound();

  const services = await prisma.service.findMany({
    where: { carId, type: "Recurrent" },
    orderBy: { mileageInterval: "desc" },
  });

  return (
    <main className="flex h-full w-full flex-col px-6">
      {/* navigation header */}
      <div className="flex flex-col pt-4">
        <div className="py-2.5 pl-4">
          <Link
            href={"/application"}
            className="items- center flex gap-2 text-sm font-medium text-slate-500"
          >
            <ChevronRight className="size-5 stroke-2" />
            بازگشت
          </Link>
        </div>
        <h1 className="flex gap-x-3 py-2.5 text-lg font-bold text-slate-700">
          <ScrollText className="size-7 stroke-2" />
          سرویس های آینده
        </h1>
      </div>
      <ServiceListWrapper services={services} />
      <div className="pt-3 pb-3">
        <Button
          className="h-14 w-full rounded-2xl bg-linear-to-r from-blue-600 to-blue-500 px-8 text-base font-semibold [&_svg:not([class*='size-'])]:size-6"
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
