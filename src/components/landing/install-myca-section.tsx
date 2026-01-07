"use client";

import Image from "next/image";
import ctaBanner from "@public/landing/install-application/cta-banner.png";
import ctaBannerMobile from "@public/landing/install-application/cta-banner-mobile.png";
import { SuperButtonLink } from "./super-button";
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
          className="relative flex aspect-95/180 h-full w-full translate-y-30 flex-col items-center gap-y-12 rounded-4xl p-8 opacity-0 sm:aspect-[2.7] sm:flex-row sm:rounded-none sm:p-0"
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
          <div className="absolute top-0 right-0 -z-10 flex h-full w-full sm:hidden">
            <Image
              src={ctaBannerMobile}
              alt="cta banner mobile"
              placeholder="blur"
              quality={100}
              className="h-full w-full overflow-visible object-cover"
            />
          </div>
          <div className="right-0 bottom-0 flex h-full w-full flex-col items-center gap-y-10 sm:absolute sm:h-[91%] sm:flex-row sm:pr-6 xl:pr-9">
            <div className="flex w-full flex-col items-center gap-y-5 text-center sm:w-105 sm:items-start sm:text-right xl:w-170 xl:gap-y-9">
              <div className="flex flex-col justify-center gap-y-2.5 xl:gap-y-4">
                <div className="flex flex-col gap-y-2.5 xl:gap-y-4">
                  <p className="text-lg leading-7 font-light text-slate-500 sm:text-base xl:text-xl">
                    بدون نیاز به حساب کاربری
                  </p>
                  <p className="text-2xl leading-10 font-black text-balance sm:text-lg sm:leading-7 xl:text-4xl xl:leading-14">
                    اپلیکیشن <span className="text-blue-600">مایکا</span> رو نصب
                    کن و از ماشینت بهتر مراقبت کن!
                  </p>
                </div>
                <p className="text-lg leading-7 text-slate-500 sm:text-base xl:text-xl">
                  فقط کافیه خودروتو ثبت کنی، ما سرویس‌هاشو بهت یادآوری می‌کنیم
                </p>
              </div>
              <SuperButtonLink
                href="/application/sign-in"
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
