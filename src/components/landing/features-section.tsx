import Image from "next/image";
import smartReminder from "@public/landing/features/myca-notification.png";
import customized from "@public/landing/features/customized-features.png";
import multipleCars from "@public/landing/features/select-car.png";

const FeaturesSection = () => {
  return (
    <section className="flex w-full justify-center bg-slate-50">
      <div className="flex w-full max-w-360 items-center justify-between gap-x-10 px-27.5 py-22">
        <div className="flex w-full flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_12px_60px_0_rgba(0,0,0,0.06)]">
          <div className="h-90.5 w-full">
            <Image
              src={customized}
              alt="customized"
              placeholder="blur"
              quality={100}
              className="object-cover"
            />
          </div>
          <div className="flex flex-col items-center gap-y-4 px-5 pt-7 pb-10">
            <p className="text-2xl leading-6 font-bold">شخصی‌سازی‌شده</p>
            <p className="text-base leading-4 text-slate-500">
              بر اساس کیلومتر، تاریخ، یا دوره زمانی تنظیم کن
            </p>
          </div>
        </div>
        <div className="flex w-full flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_12px_60px_0_rgba(0,0,0,0.06)]">
          <div className="h-90.5 w-full">
            <Image
              src={multipleCars}
              alt="multiple cars"
              placeholder="blur"
              quality={100}
              className="object-cover"
            />
          </div>
          <div className="flex flex-col items-center gap-y-4 px-5 pt-7 pb-10">
            <p className="text-2xl leading-6 font-bold">چند ماشین همزمان</p>
            <p className="text-base leading-4 text-slate-500">
              برای هر ماشینت سرویس جدا تعریف کن
            </p>
          </div>
        </div>
        <div className="flex w-full flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_12px_60px_0_rgba(0,0,0,0.06)]">
          <div className="h-90.5 w-full">
            <Image
              src={smartReminder}
              alt="smart reminder"
              placeholder="blur"
              quality={100}
              className="object-cover"
            />
          </div>
          <div className="flex flex-col items-center gap-y-4 px-5 pt-7 pb-10">
            <p className="text-2xl leading-6 font-bold">یادآوری هوشمند</p>
            <p className="text-base leading-4 text-slate-500">
              زمان سرویس، بیمه یا معاینه فنی فراموشت نمی‌شه
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
