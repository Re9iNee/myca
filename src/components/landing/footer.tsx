import Image from "next/image";
import footerCar from "@public/landing/footer/car.png";
import SuperButton from "./super-button";

const Footer = () => {
  return (
    <footer className="relative flex md:h-100 xl:h-113.5 w-full justify-center bg-[#132350]">
      <div className="relative h-full w-full max-w-360 md:px-10 xl:px-27 pt-14 pb-10">
        <div className="relative z-10 flex h-full w-full flex-col justify-between gap-y-10">
          <div className="flex md:h-48 xl:h-61.5 flex-col items-center justify-center md:gap-y-8 xl:gap-y-10">
            <div className="flex flex-col md:gap-y-4 xl:gap-y-7 text-center">
              <div className="flex flex-col md:gap-y-2 xl:gap-y-2.5">
                <p className="text-base text-white">دوباره یادت رفت؟</p>
                <p className="md:text-3xl xl:text-5xl font-bold text-white">مایکا حواسش هست</p>
              </div>
              <p className="md:text-xl xl:text-2xl font-medium text-white">
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
              className="z-2 md:h-13! xl:h-14! md:w-52! xl:w-55!"
            />
          </div>

          <div className="flex h-18 w-full items-center justify-between">
            <div className="flex flex-col items-center gap-y-2">
              <p className="text-4xl font-bold text-white">مایکا</p>
              <p className="text-sm text-white">مدیریت سرویس دوره ای اتومبیل</p>
            </div>
            <div className="flex items-center gap-x-2">
              <p className="text-base leading-4 text-white font-gilda">myca@gmail.com</p>
              <img
                src="/hugeicons/mail-02-white.svg"
                alt="mail vector"
              />
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
