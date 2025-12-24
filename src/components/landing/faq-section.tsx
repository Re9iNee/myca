import QuestionSquare from "@public/landing/faq-section/question-square.png";
import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  LandingAccordion,
  LandingAccordionContent,
  LandingAccordionItem,
  LandingAccordionTrigger,
} from "./landing-accordion";

const FaqSection = () => {
  return (
    <section className="flex w-full justify-center">
      <div className="flex w-full max-w-360 flex-col items-center gap-y-10 md:px-10 md:py-16 xl:px-27.5 xl:py-22">
        <div className="flex flex-col items-center md:gap-y-1.5 xl:gap-y-2.5">
          <p className="text-2xl leading-9 font-black xl:text-3xl">
            سوالات پرتکرار درباره مایکا
          </p>
          <p className="leading-7 text-slate-500 md:text-lg xl:text-xl">
            هر چی باید بدونی، همین‌جاست
          </p>
        </div>
        <div className="flex w-full justify-between md:gap-x-4 xl:gap-x-6">
          <div className="aspect-49/58 relative w-fit shrink-0 md:px-5 xl:px-6 md:py-6 xl:py-10 h-full">
            <img
              src={"/landing/faq-section/asking-questions-vector.svg"}
              alt="hero section"
              className="absolute top-0 right-0 h-full w-full object-contain"
            />
            <div className="flex flex-col md:gap-y-5.5 xl:gap-y-8">
              <div className="z-2 flex flex-col md:gap-y-1 xl:gap-y-3.5">
                <div className="flex items-center gap-x-2">
                  <Image
                    src={QuestionSquare}
                    alt="question square"
                    placeholder="blur"
                    quality={100}
                    className="h-full w-full md:size-6 xl:size-9"
                  />
                  <p className="md:text-lg font-bold text-slate-900 xl:text-2xl">
                    جواب سوالت تو لیست نبود؟
                  </p>
                </div>
                <p className="leading-7 text-slate-500 md:text-base xl:text-xl">
                  سریــع بپرس، ما در کنارتیم.
                </p>
              </div>
              <div className="z-2 flex flex-col md:gap-y-3 xl:gap-y-4">
                <Input
                  required
                  type="text"
                  placeholder="ایمیل"
                  className="md:h-10 xl:h-13 border-slate-200 bg-white p-3.5 text-xs xl:text-base text-slate-800 placeholder:text-base placeholder:text-slate-400"
                />
                <Textarea
                  className="md:h-19 xl:h-31 resize-none border border-slate-200 bg-white p-3.5 text-xs xl:text-base text-slate-800 placeholder:text-base placeholder:text-slate-400"
                  placeholder="سوالت رو اینجا بنویس..."
                />
              </div>
              <Button
                size="xl"
                variant="primary"
                className="z-2 w-full gap-x-2 xl:gap-x-3 text-base xl:text-lg font-semibold md:h-12 xl:h-14"
              >
                <img
                  src="/hugeicons/check-square.svg"
                  alt="check square vector"
                  className="size-5 xl:size-6"
                />
                ارسال سوال
              </Button>
            </div>
          </div>
          <LandingAccordion
            type="single"
            collapsible
            className="flex w-full flex-col gap-y-3 xl:gap-y-6"
            defaultValue="item-1"
          >
            <LandingAccordionItem value="item-1">
              <LandingAccordionTrigger>
                این اپلیکیشن چه کاری انجام می‌دهد؟
              </LandingAccordionTrigger>
              <LandingAccordionContent>
                این اپلیکیشن به شما کمک می‌کند سرویس‌های دوره‌ای خودروی خود را
                به‌موقع انجام دهید. سرویس‌هایی مثل تعویض روغن، لاستیک، تمدید
                بیمه و موارد مشابه را خودتان در اپلیکیشن تعریف می‌کنید و در زمان
                مناسب اپلیکیشن با یک اعلان (نوتیفیکیشن) به شما یادآوری می‌کند.
              </LandingAccordionContent>
            </LandingAccordionItem>
            <LandingAccordionItem value="item-2">
              <LandingAccordionTrigger>
                آیا می‌توانم چند خودروی مختلف را در برنامه اضافه کنم؟
              </LandingAccordionTrigger>
              <LandingAccordionContent>
                بله. شما می‌توانید بیش از یک خودرو را در برنامه اضافه و مدیریت
                کنید. برای هر خودرو سرویس‌ها، یادآوری‌ها و اطلاعات جداگانه ثبت
                می‌شود تا بدون سردرگمی بتوانید وضعیت هر خودرو را به‌صورت مستقل
                دنبال کنید.
              </LandingAccordionContent>
            </LandingAccordionItem>
            <LandingAccordionItem value="item-3">
              <LandingAccordionTrigger>
                یادآوری سرویس‌ها چگونه تنظیم می‌شود؟
              </LandingAccordionTrigger>
              <LandingAccordionContent>
                پس از ثبت هر سرویس، کیلومتر تکرار آن را مشخص می‌کنید. هر بار که
                کیلومتر خودرو را در برنامه به‌روزرسانی می‌کنید، اپلیکیشن بررسی
                می‌کند کدام سرویس‌ها زمان انجامشان رسیده است و در صورت نیاز با
                اعلان به شما یادآوری می‌کند.
              </LandingAccordionContent>
            </LandingAccordionItem>
            <LandingAccordionItem value="item-4">
              <LandingAccordionTrigger>
                آیا برای استفاده از برنامه نیاز به اینترنت دارم؟
              </LandingAccordionTrigger>
              <LandingAccordionContent>
                برای عملکرد بهتر و جلوگیری از بروز هرگونه مشکل، پیشنهاد می‌شود
                هنگام استفاده از برنامه به اینترنت متصل باشید. اتصال به اینترنت
                باعث می‌شود اطلاعات به‌درستی به‌روزرسانی شوند و یادآوری‌ها بدون
                اختلال انجام شوند.
              </LandingAccordionContent>
            </LandingAccordionItem>
          </LandingAccordion>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
