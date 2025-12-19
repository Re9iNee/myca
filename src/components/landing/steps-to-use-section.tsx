import Image from "next/image";
import mobileView from "@public/landing/steps/mobile-view.png";
import timelineFirst from "@public/landing/steps/timeline-first.png";
import timelineSecond from "@public/landing/steps/timeline-second.png";
import timelineThird from "@public/landing/steps/timeline-third.png";

const StepsToUseSection = () => {
  return (
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
                زمان سرویس‌ها رو بهت یادآوری می‌کنیم تا هیچ چیز رو فراموش نکنی.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepsToUseSection;
