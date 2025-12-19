import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import heroSection from "@public/landing/hero/hero-section.png";
import { ArrowRight01Icon } from "hugeicons-react";

const HeroSection = () => {
  return (
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
          <ArrowRight01Icon className="size-6" />
          ورود به مایکا
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
  );
};

export default HeroSection;
