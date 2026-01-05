import Image from "next/image";
import footerCar from "@public/landing/footer/car.png";
import SuperButton from "./super-button";

const Footer = () => {
  return (
    <footer className="relative flex h-100 w-full justify-center bg-[#132350] xl:h-113.5">
      <div className="relative h-full w-full max-w-360 px-6 pt-14 pb-10 sm:px-10 xl:px-27">
        <div className="relative z-10 flex h-full w-full flex-col justify-between gap-y-10">
          <div className="flex h-48 flex-col items-center justify-center gap-y-8 xl:h-61.5 xl:gap-y-10">
            <div className="flex flex-col gap-y-4 text-center xl:gap-y-7">
              <div className="flex flex-col gap-y-2 xl:gap-y-2.5">
                <p className="text-base text-white">دوباره یادت رفت؟</p>
                <p className="text-3xl font-bold text-white xl:text-5xl">
                  مایکا حواسش هست
                </p>
              </div>
              <p className="text-base font-medium text-white sm:text-xl xl:text-2xl">
                یادآوری زمان سرویس، فقط با یه کلیک بدون دردسر
              </p>
            </div>
            <SuperButton
              icon={
                <img
                  src="/hugeicons/login-square-02.svg"
                  alt="login square vector"
                  className="size-6"
                />
              }
              text="شروع رایگان"
              className="z-2 h-13! w-52! xl:h-14! xl:w-55!"
            />
          </div>

          <div className="flex h-18 w-full items-center justify-between">
            <div className="flex flex-col items-center gap-y-2">
              <p className="text-2xl font-bold text-white sm:text-4xl">مایکا</p>
              <p className="text-xs text-white sm:text-sm">
                مدیریت سرویس دوره ای اتومبیل
              </p>
            </div>
            <div className="flex items-center gap-x-1.5 sm:gap-x-2">
              <p className="font-gilda text-sm leading-4 text-white sm:text-base">
                myca@gmail.com
              </p>
              <div className="size-5 sm:size-6">
                <img src="/hugeicons/mail-02-white.svg" alt="mail vector" />
              </div>
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
            className="h-full w-full object-cover"
            fill
            sizes="(max-width: 360px) 100vw, 360px"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
