import Image from "next/image";
import smartReminder from "@public/landing/features/myca-notification.png";
import customized from "@public/landing/features/customized-features.png";
import multipleCars from "@public/landing/features/select-car.png";

const FeaturesSection = () => {
  return (
    <section className="flex w-full justify-center bg-slate-50">
      <div className="flex w-full max-w-360 items-center justify-between md:gap-x-6 2xl:gap-x-10 md:px-9 2xl:px-27.5 md:py-20 2xl:py-22">
        <div className="flex w-full flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_12px_60px_0_rgba(0,0,0,0.06)]">
          <div className="md:h-61.5 2xl:h-90.5 w-full">
            <Image
              src={customized}
              alt="customized"
              placeholder="blur"
              quality={100}
              className="object-cover"
            />
          </div>
          <div className="flex flex-col items-center md:gap-y-3 2xl:gap-y-4 px-3 2xl:px-5 md:pt-4 2xl:pt-7 md:pb-6 2xl:pb-10">
            <p className="md:text-xl 2xl:text-2xl leading-6 font-bold">شخصی‌سازی‌شده</p>
            <p className="md:text-sm 2xl:text-base md:leading-5 2xl:leading-4 text-slate-500 text-center">
              بر اساس کیلومتر، تاریخ، یا دوره زمانی تنظیم کن
            </p>
          </div>
        </div>
        <div className="flex w-full flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_12px_60px_0_rgba(0,0,0,0.06)]">
          <div className="md:h-61.5 2xl:h-90.5 w-full">
            <Image
              src={multipleCars}
              alt="multiple cars"
              placeholder="blur"
              quality={100}
              className="object-cover"
            />
          </div>
          <div className="flex flex-col items-center md:gap-y-3 2xl:gap-y-4 px-3 2xl:px-5 md:pt-4 2xl:pt-7 md:pb-6 2xl:pb-10">
            <p className="md:text-xl 2xl:text-2xl leading-6 font-bold">چند ماشین همزمان</p>
            <p className="md:text-sm 2xl:text-base md:leading-5 2xl:leading-4 text-slate-500 text-center">
              برای هر ماشینت سرویس جدا تعریف کن
            </p>
          </div>
        </div>
        <div className="flex w-full flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_12px_60px_0_rgba(0,0,0,0.06)]">
          <div className="md:h-61.5 2xl:h-90.5 w-full">
            <Image
              src={smartReminder}
              alt="smart reminder"
              placeholder="blur"
              quality={100}
              className="object-cover"
            />
          </div>
          <div className="flex flex-col items-center md:gap-y-3 2xl:gap-y-4 px-3 2xl:px-5 md:pt-4 2xl:pt-7 md:pb-6 2xl:pb-10">
            <p className="md:text-xl 2xl:text-2xl leading-6 font-bold">یادآوری هوشمند</p>
            <p className="md:text-sm 2xl:text-base md:leading-5 2xl:leading-4 text-slate-500 text-center">
              زمان سرویس، بیمه یا معاینه فنی فراموشت نمی‌شه
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
