import Header from "@/components/landing/header";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import smartReminder from "@public/features/myca-notification.png";
import customized from "@public/features/customized-features.png";
import multipleCars from "@public/features/select-car.png";
import mobileView from "@public/steps/mobile-view.png";
import timelineFirst from "@public/steps/timeline-first.png";
import timelineSecond from "@public/steps/timeline-second.png";
import timelineThird from "@public/steps/timeline-third.png";
import heroSection from "@public/hero/hero-section.png";
import ctaBanner from "@public/install-application/cta-banner.png";
import {
  ArrowRight01Icon,
} from "hugeicons-react";
import Footer from "@/components/landing/footer";

export default function HomePage() {
  return (
    <main className="flex h-full w-full flex-col items-center">
      <Header />
      <section className="relative flex max-h-svh min-h-svh w-full max-w-360 items-center justify-between px-27">
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
        <div className="absolute top-0 right-0 -z-10 h-full w-full">
          <Image
            src={heroSection}
            alt="hero section"
            placeholder="blur"
            quality={100}
            priority={true}
            className="h-full w-full object-contain"
          />
        </div>
      </section>
      <section className="flex w-full justify-center bg-slate-50">
        <div className="flex w-full max-w-360 items-center justify-between gap-x-10 px-27.5 py-22">
          <div className="flex w-full flex-col rounded-[28px] bg-white">
            <div className="h-90.5 w-full">
              <Image
                src={customized}
                alt="customized"
                placeholder="blur"
                quality={100}
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-y-3 px-5 pt-7 pb-10">
              <p className="text-2xl leading-6 font-bold">شخصی‌سازی‌شده</p>
              <p className="text-base leading-4">
                بر اساس کیلومتر، تاریخ، یا دوره زمانی تنظیم کن
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col rounded-[28px] bg-white">
            <div className="h-90.5 w-full">
              <Image
                src={multipleCars}
                alt="multiple cars"
                placeholder="blur"
                quality={100}
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-y-3 px-5 pt-7 pb-10">
              <p className="text-2xl leading-6 font-bold">چند ماشین همزمان</p>
              <p className="text-base leading-4">
                برای هر ماشینت سرویس جدا تعریف کن
              </p>
            </div>
          </div>
          <div className="flex w-full flex-col rounded-[28px] bg-white">
            <div className="h-90.5 w-full">
              <Image
                src={smartReminder}
                alt="smart reminder"
                placeholder="blur"
                quality={100}
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-y-3 px-5 pt-7 pb-10">
              <p className="text-2xl leading-6 font-bold">یادآوری هوشمند</p>
              <p className="text-base leading-4">
                زمان سرویس، بیمه یا معاینه فنی فراموشت نمی‌شه
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="flex w-full max-w-360 items-center gap-x-30 px-32 py-22">
        <div className="h-134 w-126 shrink-0">
          <Image
            src={mobileView}
            alt="mobile view"
            placeholder="blur"
            quality={100}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-y-10">
          <p className="text-3xl font-bold">
            3 مرحله سریع برای استفاده از خدمات ما
          </p>
          <div className="flex flex-col gap-y-4">
            <div className="flex gap-x-4">
              <div className="h-30 w-10">
                <Image
                  src={timelineFirst}
                  alt="timeline first"
                  placeholder="blur"
                  quality={100}
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-y-3">
                <p className="text-xl font-semibold">ثبت خودرو</p>
                <p className="text-base">
                  برند، مدل و کیلومتر فعلی خودروت رو وارد کن تا سرویس‌ها دقیق
                  برنامه‌ریزی بشن.
                </p>
              </div>
            </div>
            <div className="flex gap-x-4">
              <div className="h-30 w-10">
                <Image
                  src={timelineSecond}
                  alt="timeline second"
                  placeholder="blur"
                  quality={100}
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-y-3">
                <p className="text-xl font-semibold">تنظیم سرویس‌ها</p>
                <p className="text-base">
                  سرویس‌های دوره‌ای موردنظرت رو تعریف کن و برای هر کدوم یادآور
                  بساز.
                </p>
              </div>
            </div>
            <div className="flex gap-x-4">
              <div className="size-10">
                <Image
                  src={timelineThird}
                  alt="timeline third"
                  placeholder="blur"
                  quality={100}
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-y-3">
                <p className="text-xl font-semibold">دریافت یادآوری به‌موقع</p>
                <p className="text-base">
                  زمان سرویس‌ها رو بهت یادآوری می‌کنیم تا هیچ چیز رو فراموش
                  نکنی.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flex w-full items-center justify-center">
        <div className="h-full w-full max-w-360 items-center px-27 py-22">
          <div className="relative h-full w-full pt-28.5 pr-6 pb-18">
            <div className="flex flex-col gap-y-14">
              <div className="flex h-39.5 flex-col justify-center gap-y-7">
                <div className="flex flex-col gap-y-4">
                  <p className="text-xl">بدون نیاز به حساب کاربری</p>
                  <p className="text-3xl font-bold">
                    اپلیکیشن مایکا رو نصب کن و از ماشینت بهتر مراقبت کن!
                  </p>
                </div>
                <p className="text-xl font-medium">
                  فقط کافیه خودروتو ثبت کنی، ما سرویس‌هاشو بهت یادآوری می‌کنیم
                </p>
              </div>
              <Button
                size="xl"
                variant="primary"
                className="w-72 gap-x-3 text-lg font-semibold"
              >
                <ArrowRight01Icon className="size-6" />
                ورود به برنامه
              </Button>
            </div>
            <div className="absolute top-0 right-0 -z-10 h-full w-full">
              <Image
                src={ctaBanner}
                alt="cta banner"
                placeholder="blur"
                quality={100}
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
