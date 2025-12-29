"use client";

import Image from "next/image";
import ctaBanner from "@public/landing/install-application/cta-banner.png";
import ctaBannerMobile from "@public/landing/install-application/cta-banner-mobile.png";
import SuperButton from "./super-button";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const InstallAppSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const installMycaCard = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to(installMycaCard.current, {
        y: 0,
        opacity: 1,
        duration: 1.25,
        ease: "power4.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none none",
          // markers: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      className="flex w-full items-center justify-center"
      ref={sectionRef}
    >
      <div className="h-full w-full max-w-360 items-center p-6 sm:px-10 sm:py-20 xl:px-27 xl:py-22">
        <div
          className="p-8 sm:p-0 rounded-4xl sm:rounded-none flex-col sm:flex-row gap-y-12 relative flex aspect-95/180 sm:aspect-[2.7] h-full w-full translate-y-30 items-center opacity-0 bg-slate-50"
          ref={installMycaCard}
        >
          <div className="absolute top-0 right-0 -z-10 hidden h-full w-full sm:flex">
            <Image
              src={ctaBanner}
              alt="cta banner"
              placeholder="blur"
              quality={100}
              className="h-full w-full overflow-visible object-cover"
            />
          </div>
          <div className="flex absolute top-0 right-0 -z-10 h-full w-full sm:hidden">
            <Image
              src={ctaBannerMobile}
              alt="cta banner mobile"
              placeholder="blur"
              quality={100}
              className="h-full w-full overflow-visible object-cover"
            />
          </div>
          <div className="sm:absolute right-0 bottom-0 flex h-full flex-col gap-y-10 sm:flex-row sm:h-[91%] w-full items-center sm:pr-6 xl:pr-9">
            <div className="flex flex-col w-full items-center sm:items-start text-center sm:text-right sm:w-105 gap-y-5 xl:w-170 xl:gap-y-9">
              <div className="flex flex-col justify-center gap-y-2.5 xl:gap-y-4">
                <div className="flex flex-col gap-y-2.5 xl:gap-y-4">
                  <p className="leading-7 font-light text-slate-500 text-lg sm:text-base xl:text-xl">
                    بدون نیاز به حساب کاربری
                  </p>
                  <p className="font-black text-balance leading-10 text-2xl sm:text-lg sm:leading-7 xl:text-4xl xl:leading-14">
                    اپلیکیشن <span className="text-blue-600">مایکا</span> رو نصب
                    کن و از ماشینت بهتر مراقبت کن!
                  </p>
                </div>
                <p className="leading-7 text-slate-500 text-lg sm:text-base xl:text-xl">
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
