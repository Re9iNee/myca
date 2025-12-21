import Image from "next/image";
import ctaBanner from "@public/landing/install-application/cta-banner.png";
import SuperButton from "./super-button";

const InstallAppSection = () => {
  return (
    <section className="flex w-full items-center justify-center">
      <div className="h-full w-full max-w-360 items-center px-27 py-22">
        <div className="relative h-full w-full pt-28.5 pr-9 pb-18">
          <div className="flex w-170 flex-col gap-y-9">
            <div className="flex flex-col justify-center gap-y-4">
              <div className="flex flex-col gap-y-4">
                <p className="text-xl leading-7 font-light text-slate-500">
                  بدون نیاز به حساب کاربری
                </p>
                <p className="text-4xl leading-14 font-black text-balance">
                  اپلیکیشن <span className="text-blue-600">مایکا</span> رو نصب
                  کن و از ماشینت بهتر مراقبت کن!
                </p>
              </div>
              <p className="text-xl leading-7 text-slate-500">
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
              className="z-2 h-14! w-56!"
            />
          </div>
          <div className="absolute top-0 right-0 -z-10 h-full w-full">
            <Image
              src={ctaBanner}
              alt="cta banner"
              placeholder="blur"
              quality={100}
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstallAppSection;
