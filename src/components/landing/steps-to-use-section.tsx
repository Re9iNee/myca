import Image from "next/image";
import mobileView from "@public/landing/steps/mobile-view.png";
import superButtonBg from "@public/landing/super-button-pattern.png";

const StepsToUseSection = () => {
  return (
    <section className="flex w-full max-w-360 flex-col-reverse items-center justify-center gap-y-10 px-6 py-31 sm:flex-row sm:gap-x-9 sm:gap-y-0 sm:px-10 sm:py-25 xl:gap-x-30 xl:px-32 xl:py-22">
      <div className="w-full shrink-0 sm:h-87.5 sm:w-82.5 xl:h-134 xl:w-126">
        <Image
          src={mobileView}
          alt="mobile view"
          placeholder="blur"
          quality={100}
          className="h-full w-full object-contain sm:object-cover"
        />
      </div>
      <div className="flex flex-col gap-y-10">
        <p className="text-2xl leading-9 font-black text-slate-900 sm:text-xl xl:text-3xl">
          3 <span className="hidden sm:inline-flex">مرحله سریع</span>
          <span className="inline-flex sm:hidden">قدم</span> برای استفاده از
          خدمات ما
        </p>
        <div className="flex flex-col gap-y-4">
          <div className="flex gap-x-4">
            <div className="flex flex-col items-center gap-y-4">
              <button className="super-button inline-shrink-0 pointer-events-none relative z-2 flex size-13 items-center justify-center overflow-hidden rounded-[100px] bg-linear-to-b! from-blue-700! to-sky-600! text-white">
                <img src="/hugeicons/car-signal.svg" alt="car signal vector" />
                <div>
                  <Image
                    src={superButtonBg}
                    alt="button background pattern"
                    placeholder="blur"
                    className="absolute top-0 right-0 opacity-40 mix-blend-plus-lighter"
                  />
                </div>
              </button>
              <img
                src="/landing/steps/line.svg"
                alt="line vector"
                className="h-16"
              />
            </div>
            <div className="flex flex-col gap-y-2.5">
              <p className="text-xl leading-7 font-black text-blue-600 sm:text-lg xl:text-xl">
                ثبت خودرو
              </p>
              <p className="text-base leading-6 text-slate-600">
                مدل و کیلومتر فعلی خودروت رو وارد کن تا سرویس‌ها دقیق
                برنامه‌ریزی بشن.
              </p>
            </div>
          </div>
          <div className="flex gap-x-4">
            <div className="flex flex-col items-center gap-y-4">
              <div className="relative flex size-13 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-slate-800">
                <img src="/hugeicons/wrench-01.svg" alt="wrench vector" />
              </div>
              <img
                src="/landing/steps/line.svg"
                alt="line vector"
                className="h-16"
              />
            </div>
            <div className="flex flex-col gap-y-3">
              <p className="text-xl leading-7 font-black text-slate-800 sm:text-lg xl:text-xl">
                تنظیم سرویس‌ها
              </p>
              <p className="text-base leading-6 text-slate-600">
                سرویس‌های دوره‌ای موردنظرت رو تعریف کن و برای هر کدوم یادآور
                بساز.
              </p>
            </div>
          </div>
          <div className="flex gap-x-4">
            <div className="relative flex size-13 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-slate-800">
              <img
                src="/hugeicons/notification-01.svg"
                alt="notification vector"
              />
            </div>
            <div className="flex flex-col gap-y-3">
              <p className="text-xl leading-7 font-black text-slate-800 sm:text-lg xl:text-xl">
                دریافت یادآوری به‌موقع
              </p>
              <p className="text-base leading-6 text-slate-600">
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
