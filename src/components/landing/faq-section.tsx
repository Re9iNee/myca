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
        <div className="flex h-full w-full flex-col-reverse gap-y-10 sm:flex-row sm:items-start sm:justify-between sm:gap-x-4 sm:gap-y-0 xl:gap-x-6">
          <LandingAccordion
            type="single"
            collapsible
            className="flex h-full w-full flex-col gap-y-3 sm:h-89 lg:h-116 xl:gap-y-6"
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
