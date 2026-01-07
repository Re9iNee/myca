import heroSection from "@public/landing/hero/hero-section.png";
import heroSectionMobile from "@public/landing/hero/hero-section-mobile.png";
import Image from "next/image";
import { SuperButtonLink } from "./super-button";

const HeroSection = () => {
  return (
    <section className="relative flex max-h-svh min-h-svh w-full max-w-360 justify-between px-6 py-20 pt-44 sm:items-center sm:px-10 sm:py-0 xl:px-27">
      <div className="mx-auto flex flex-col items-center gap-y-8 py-6 text-center sm:mx-0 sm:items-start sm:gap-y-12 sm:text-right">
        <div className="flex flex-col gap-y-5">
          <div className="flex flex-col gap-y-2 sm:gap-y-3">
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
        <SuperButtonLink
          href="/application/sign-in"
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
      <div className="absolute top-0 right-0 -z-10 hidden w-full sm:flex">
        <Image
          src={heroSection}
          alt="hero section"
          placeholder="blur"
          quality={100}
          className="h-full w-full object-contain"
        />
      </div>
      <div className="absolute right-0 bottom-0 -z-10 flex w-full sm:hidden">
        <Image
          src={heroSectionMobile}
          alt="hero section mobile"
          placeholder="blur"
          quality={100}
          className="h-full w-full object-contain"
        />
      </div>
    </section>
  );
};

export default HeroSection;
