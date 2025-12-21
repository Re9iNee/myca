import heroSection from "@public/landing/hero/hero-section.png";
import Image from "next/image";
import SuperButton from "./super-button";

const HeroSection = () => {
  return (
    <section className="relative flex max-h-svh min-h-svh w-full max-w-360 items-center justify-between px-6 md:px-10 2xl:px-27">
      <div className="flex flex-col gap-y-12 py-6">
        <div className="flex flex-col gap-y-5">
          <div className="flex flex-col gap-y-3">
            <p className="md:text-lg 2xl:text-xl leading-7 font-light text-slate-600">
              دیگه نگران سرویس‌های دوره‌ای ماشین نباش
            </p>
            <p className="md:text-4xl 2xl:text-5xl font-black text-blue-600">
              نگهداری هوشمند خودرو
            </p>
          </div>
          <p className="md:text-2xl 2xl:text-3xl leading-9 font-bold text-stone-900">
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
          className="h-14! 2xl:h-15"
        />
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
  );
};

export default HeroSection;
