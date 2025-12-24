import Image from "next/image";
import smartReminder from "@public/landing/features/myca-notification.png";
import customized from "@public/landing/features/customized-features.png";
import multipleCars from "@public/landing/features/select-car.png";

const features = [
  {
    title: "شخصی‌سازی‌شده",
    description: "بر اساس کیلومتر، تاریخ، یا دوره زمانی تنظیم کن",
    image: customized,
  },
  {
    title: "چند ماشین همزمان",
    description: "برای هر ماشینت سرویس جدا تعریف کن",
    image: multipleCars,
  },
  {
    title: "یادآوری هوشمند",
    description: "زمان سرویس، بیمه یا معاینه فنی فراموشت نمی‌شه",
    image: smartReminder,
  },
];

const FeaturesSection = () => {
  return (
    <section className="flex w-full justify-center bg-slate-50">
      <div className="grid w-full max-w-360 grid-cols-1 items-center justify-between gap-y-10 px-6 py-16 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-0 sm:px-9 sm:py-20 xl:gap-x-10 xl:px-27.5 xl:py-22">
        {features.map((feature, i) => {
          return (
            <div
              key={i}
              className="flex h-full w-full flex-col overflow-hidden rounded-3xl bg-white shadow-[0_12px_60px_0_rgba(0,0,0,0.06)]"
            >
              <div className="w-full sm:h-61.5 xl:h-90.5">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  placeholder="blur"
                  quality={100}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex flex-col items-center gap-y-2 px-3 pt-4 pb-6 sm:gap-y-3 xl:gap-y-4 xl:px-5 xl:pt-7 xl:pb-10">
                <p className="leading-6 font-bold sm:text-lg xl:text-2xl">
                  {feature.title}
                </p>
                <p className="text-center text-slate-500 sm:text-sm sm:leading-5 xl:text-base xl:leading-4">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturesSection;
