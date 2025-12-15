import Header from "@/components/landing/header";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function HomePage() {
  return (
    <main className="flex h-full w-full flex-col items-center">
      <Header />
      {/* hero section */}
      <div className="flex max-h-svh min-h-svh w-full max-w-360 items-center justify-between px-27">
        <div className="flex flex-col gap-y-12">
          <div className="flex flex-col gap-y-8">
            <div className="flex flex-col gap-y-4">
              <p className="text-xl">دیگه نگران سرویس‌های دوره‌ای ماشین نباش</p>
              <p className="text-5xl font-bold">نگهداری هوشمند خودرو</p>
            </div>
            <p className="text-3xl font-medium">دقیق، آسان ، به‌موقع</p>
          </div>

          <Button
            size="xl"
            variant="primary"
            className="w-71 gap-x-3 text-lg font-semibold"
          >
            ثبت خودرو
            <ChevronLeft className="size-6" />
          </Button>
        </div>
        {/* car pic */}
        <div className="h-103 w-130 rounded-lg border bg-blue-50"></div>
      </div>
      <div className="flex w-full justify-center bg-slate-50">
        <div className="flex w-full max-w-360 items-center justify-between gap-x-10 px-27.5 py-22">
          <div className="flex w-full flex-col rounded-[28px] bg-white">
            <div className="h-90.5 w-full bg-blue-50"></div>
            <div className="flex flex-col gap-y-3 px-5 pt-7 pb-10">
              <p className="text-2xl leading-6 font-bold">شخصی‌سازی‌شده</p>
              <p className="text-base leading-4">
                بر اساس کیلومتر، تاریخ، یا دوره زمانی تنظیم کن
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col rounded-[28px] bg-white">
            <div className="h-90.5 w-full bg-blue-50"></div>
            <div className="flex flex-col gap-y-3 px-5 pt-7 pb-10">
              <p className="text-2xl leading-6 font-bold">چند ماشین همزمان</p>
              <p className="text-base leading-4">
                برای هر ماشینت سرویس جدا تعریف کن
              </p>
            </div>
          </div>
          <div className="flex w-full flex-col rounded-[28px] bg-white">
            <div className="h-90.5 w-full bg-blue-50"></div>
            <div className="flex flex-col gap-y-3 px-5 pt-7 pb-10">
              <p className="text-2xl leading-6 font-bold">یادآوری هوشمند</p>
              <p className="text-base leading-4">
                زمان سرویس، بیمه یا معاینه فنی فراموشت نمی‌شه
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
