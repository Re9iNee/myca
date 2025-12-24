import Image from "next/image";
import ctaBanner from "@public/landing/install-application/cta-banner.png";
import SuperButton from "./super-button";

const InstallAppSection = () => {
  return (
    <section className="flex w-full items-center justify-center">
      <div className="h-full w-full max-w-360 items-center md:px-10 md:py-20 xl:px-27 xl:py-22">
        <div className="relative flex aspect-[2.7] h-full w-full items-center">
          <div className="absolute top-0 right-0 -z-10 h-full w-full">
            <Image
              src={ctaBanner}
              alt="cta banner"
              placeholder="blur"
              quality={100}
              className="h-full w-full overflow-visible object-cover"
            />
          </div>
          <div className="flex items-center absolute right-0 bottom-0 h-[91%] w-full pr-6 xl:pr-9">
            <div className="flex flex-col md:w-105 md:gap-y-5 xl:w-170 xl:gap-y-9">
              <div className="flex flex-col justify-center gap-y-2.5 xl:gap-y-4">
                <div className="flex flex-col gap-y-2.5 xl:gap-y-4">
                  <p className="leading-7 font-light text-slate-500 md:text-base xl:text-xl">
                    بدون نیاز به حساب کاربری
                  </p>
                  <p className="font-black text-balance md:text-lg md:leading-7 xl:text-4xl xl:leading-14">
                    اپلیکیشن <span className="text-blue-600">مایکا</span> رو نصب
                    کن و از ماشینت بهتر مراقبت کن!
                  </p>
                </div>
                <p className="leading-7 text-slate-500 md:text-base xl:text-xl">
                  فقط کافیه خودروتو ثبت کنی، ما سرویس‌هاشو بهت یادآوری می‌کنیم
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
                text="ورود به مایکا"
                className="z-2 h-13! w-52! xl:h-14! xl:w-56!"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstallAppSection;
