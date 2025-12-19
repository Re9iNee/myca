import Image from "next/image";
import ctaBanner from "@public/landing/install-application/cta-banner.png";
import { Button } from "../ui/button";
import { ArrowRight01Icon } from "hugeicons-react";

const InstallAppSection = () => {
  return (
    <section className="flex w-full items-center justify-center">
      <div className="h-full w-full max-w-360 items-center px-27 py-22">
        <div className="relative h-full w-full pt-28.5 pr-6 pb-18">
          <div className="flex flex-col gap-y-14">
            <div className="flex h-39.5 flex-col justify-center gap-y-7">
              <div className="flex flex-col gap-y-4">
                <p className="text-xl">بدون نیاز به حساب کاربری</p>
                <p className="text-3xl font-bold">
                  اپلیکیشن مایکا رو نصب کن و از ماشینت بهتر مراقبت کن!
                </p>
              </div>
              <p className="text-xl font-medium">
                فقط کافیه خودروتو ثبت کنی، ما سرویس‌هاشو بهت یادآوری می‌کنیم
              </p>
            </div>
            <Button
              size="xl"
              variant="primary"
              className="w-72 gap-x-3 text-lg font-semibold"
            >
              <ArrowRight01Icon className="size-6" />
              ورود به برنامه
            </Button>
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
