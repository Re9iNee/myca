import RemoveServiceBtn from "@/components/RemoveServiceBtn";
import { Button } from "@/components/ui/button";
import { dateToShamsi, mileageToFarsi } from "@/lib/utils";
import { ChevronRight, PencilLine } from "lucide-react";
import Link from "next/link";
import { serviceDetail } from "../mock";

type Props = {
  params: { id: string };
};

async function ServiceDetailsPage({ params }: Props) {
  const id = (await params).id;
  console.log(id);

  return (
    <main className="flex h-full w-full flex-col justify-between px-6">
      {/* navigation header */}
      <div>
        <header className="flex items-center justify-between py-2.5 text-sm font-medium text-slate-500">
          <Link href={"/history"} className="inline-flex items-center gap-2">
            <ChevronRight className="mt-0.5 h-5 w-5 stroke-2" />
            بازگشت
          </Link>
          <Link
            href={`edit/${serviceDetail.id}`}
            className="inline-flex items-center gap-2"
          >
            ویرایش
            <PencilLine size={20} />
          </Link>
        </header>
        <h1 className="py-2.5 text-lg font-bold text-slate-700">
          {serviceDetail.title}
        </h1>
        <div className="flex gap-2 text-base font-medium text-slate-400">
          <h3>{dateToShamsi(serviceDetail.date)}</h3>
          <hr className="h-6 w-[1px] rounded-sm bg-slate-300" />
          <h3>
            کیلومتر:{" "}
            <span className="font-semibold text-blue-500">
              {mileageToFarsi(serviceDetail.mileage)}
            </span>
          </h3>
        </div>

        <div
          aria-label="service details description"
          className="space-y-2.5 py-4"
        >
          <h3 className="text-xs font-medium text-slate-500">جزئیات سرویس</h3>
          <p className="h-[200px] rounded-lg bg-slate-50 p-2.5 text-sm font-normal text-slate-600">
            {serviceDetail.description}
          </p>
        </div>

        <RemoveServiceBtn />
      </div>

      <div className="py-3">
        <Button
          className="text-slate-50[&_svg:not([class*='size-'])]:size-6 flex h-[56px] w-full cursor-pointer gap-2 rounded-2xl bg-slate-700 p-4 text-base font-medium"
          asChild
        >
          <Link href={"/history"}>
            <ChevronRight className="mt-1" />
            بازگشت
          </Link>
        </Button>
      </div>
    </main>
  );
}

export default ServiceDetailsPage;
