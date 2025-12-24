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
      <div className="flex w-full max-w-360 flex-col items-center gap-y-10 px-6 py-20 sm:px-10 sm:py-16 xl:px-27.5 xl:py-22">
        <div className="flex h-full flex-col items-center gap-y-1.5 xl:gap-y-2.5">
          <p className="text-2xl leading-9 font-black xl:text-3xl">
            سوالات پرتکرار درباره مایکا
          </p>
          <p className="text-lg leading-7 text-slate-500 xl:text-xl">
            هر چی باید بدونی، همین‌جاست
          </p>
        </div>
        <div className="sm:items-start flex h-full w-full flex-col-reverse gap-y-10 sm:flex-row sm:justify-between sm:gap-x-4 sm:gap-y-0 xl:gap-x-6">
          <div className="relative h-full w-full px-5 py-6 sm:aspect-49/58 sm:w-fit sm:shrink-0 xl:px-6 xl:py-10">
            <img
              src={"/landing/faq-section/asking-questions-vector.svg"}
              alt="asking questions vector"
              className="absolute top-0 right-0 h-full w-full rounded-xl border border-blue-100 object-cover sm:rounded-none sm:border-none sm:object-contain"
            />
            <div className="flex h-full flex-col justify-end gap-y-7 sm:gap-y-5.5 xl:gap-y-8">
              <div className="z-2 flex flex-col gap-y-2 sm:gap-y-1 xl:gap-y-3.5">
                <div className="flex items-center gap-x-2">
                  <div className="size-8 sm:size-6 xl:size-9">
                    <Image
                      src={QuestionSquare}
                      alt="question square"
                      placeholder="blur"
                      quality={100}
                      className="h-full w-full"
                    />
                  </div>

                  <p className="text-xl font-bold text-slate-900 sm:text-lg xl:text-2xl">
                    جواب سوالت تو لیست نبود؟
                  </p>
                </div>
                <p className="text-lg leading-7 text-slate-500 sm:text-base xl:text-xl">
                  سریــع بپرس، ما در کنارتیم.
                </p>
              </div>
              <div className="z-2 flex flex-col gap-y-3 xl:gap-y-4">
                <Input
                  required
                  type="text"
                  placeholder="ایمیل"
                  className="h-1۳ border-slate-200 bg-white p-3.5 text-xs text-slate-800 placeholder:text-base placeholder:text-slate-400 sm:h-10 xl:h-13 xl:text-base"
                />
                <Textarea
                  className="h-31 resize-none border border-slate-200 bg-white p-3.5 text-xs text-slate-800 placeholder:text-base placeholder:text-slate-400 sm:h-19 xl:h-31 xl:text-base"
                  placeholder="سوالت رو اینجا بنویس..."
                />
              </div>
              <Button
                size="xl"
                variant="primary"
                className="z-2 h-14 w-full gap-x-3 text-lg font-semibold sm:h-12 sm:gap-x-2 sm:text-base xl:h-14 xl:gap-x-3 xl:text-lg"
              >
                <img
                  src="/hugeicons/check-square.svg"
                  alt="check square vector"
                  className="size-6 sm:size-5 xl:size-6"
                />
                ارسال سوال
              </Button>
            </div>
          </div>
          <LandingAccordion
            type="single"
            collapsible
            className="flex sm:h-89 lg:h-116 h-full w-full flex-col gap-y-3 xl:gap-y-6"
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
                چند خودرو میتوانم در برنامه اضافه کنم؟
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
