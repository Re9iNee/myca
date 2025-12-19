import { Mail02Icon } from "hugeicons-react";
import { Button } from "../ui/button";
import Image from "next/image";
import footerCar from "@public/landing/footer/car.png";

const Footer = () => {
  return (
    <footer className="flex justify-center relative h-113.5 w-full bg-[#132350]">
      <div className="relative h-full w-full max-w-360 px-27 pt-14 pb-10">
        <div className="relative z-10 flex h-full w-full flex-col justify-between gap-y-10">
          <div className="flex flex-col items-center gap-y-10 h-61.5 justify-center">
            <div className="flex flex-col gap-y-7 text-center">
              <div className="flex flex-col gap-y-2.5">
                <p className="text-base text-white">دوباره یادت رفت؟</p>
                <p className="text-5xl font-bold text-white">مایکا حواسش هست</p>
              </div>
              <p className="text-2xl font-medium text-white">
                یادآوری زمان سرویس، فقط با یه کلیک بدون دردسر
              </p>
            </div>
            <Button
              size="xl"
              variant="primary"
              className="w-72 text-lg font-medium"
            >
              شروع رایگان
            </Button>
          </div>

          <div className="flex w-full items-center justify-between h-18">
            <div className="flex flex-col items-center gap-y-2">
              <p className="text-4xl font-bold text-white">مایکا</p>
              <p className="text-sm text-white">مدیریت سرویس دوره ای اتومبیل</p>
            </div>
            <div className="flex items-center gap-x-2">
              <p className="text-base leading-4 text-white">myca@gmail.com</p>
              <Mail02Icon className="size-6 text-white" />
            </div>
          </div>
        </div>

        <div className="absolute inset-0 z-0 h-full w-full">
          {/* <div className="absolute inset-0 bg-[#172554D6]/84" /> */}
          <Image
            src={footerCar}
            alt="footer car image"
            placeholder="blur"
            quality={100}
            className="h-full w-full object-contain"
            fill
            sizes="(max-width: 360px) 100vw, 360px"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
