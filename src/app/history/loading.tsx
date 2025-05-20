import SearchInput from "@/components/SearchInput";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight, Wrench } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { LuScrollText } from "react-icons/lu";

function Loading() {
  const filteredServices = useMemo(() => {
    return new Array(5).fill(0);
  }, []);

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
      <SearchInput className="mt-3.5" />
      <div className="scrollbar-hide mt-3.5 grow overflow-y-auto">
        {filteredServices.map((service, id) => (
          <Row key={id} />
        ))}
      </div>
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

export default Loading;

function Row() {
  return (
    <div className="flex items-center justify-between border-b-slate-200/50 px-0.5 py-4 not-last:border-b-2">
      <div className="grow space-y-2">
        <Skeleton className="h-8 w-32 rounded-xl" />
        <Skeleton className="h-4 w-64 rounded-2xl"></Skeleton>
      </div>

      <Skeleton className="h-10 w-10 rounded-full" />
    </div>
  );
}
