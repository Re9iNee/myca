import heroSection from "@public/landing/hero/hero-section.png";
import Image from "next/image";
import SuperButton from "./super-button";

const HeroSection = () => {
  return (
    <section className="relative flex max-h-svh min-h-svh w-full max-w-360 items-center justify-between px-6 py-20 sm:px-10 sm:py-0 xl:px-27">
      <div className="mx-auto flex flex-col items-center gap-y-12 py-6 text-center sm:mx-0 sm:items-start sm:text-right">
        <div className="flex flex-col gap-y-5">
          <div className="flex flex-col gap-y-3">
            <p className="text-lg leading-7 font-light text-slate-600 xl:text-xl">
              دیگه نگران سرویس‌های دوره‌ای ماشین نباش
            </p>
            <p className="text-3xl font-black text-blue-600 xl:text-5xl">
              نگهداری هوشمند خودرو
            </p>
          </div>
          <p className="text-2xl leading-9 font-bold text-stone-900 xl:text-3xl">
            دقیق <span className="font-light text-blue-500">،</span> آسان{" "}
            <span className="font-light text-blue-500">،</span> به‌موقع
          </p>
        </div>
        <SuperButton
          icon={
            <img
              src="/hugeicons/arrow.svg"
              alt="arrow vector"
              className="size-6"
            />
          }
          text="ورود به مایکا"
          className="h-14! xl:h-15"
        />
      </div>
      <div className="absolute right-0 bottom-1/8 -z-10 w-full sm:top-0">
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
  );
};

export default HeroSection;
