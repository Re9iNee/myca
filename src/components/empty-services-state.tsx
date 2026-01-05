import Image from "next/image";

export default function EmptyServicesState() {
  return (
    <div className="flex my-auto flex-col items-center justify-center">
      <Image
        src={"/woman-driving-car.svg"}
        alt="Empty Service List placeholder image"
        width={219}
        height={134}
      />
      <h2 className="mt-6 mb-2 text-base font-semibold text-slate-800">
        هیچ سرویسی برای این خودرو ثبت نشده
      </h2>
      <h5 className="w-[260px] text-sm text-slate-400 text-center">
        لیست تاریخچه سرویس ها پس از ثبت از این بخش نمایش داده خواهد شد
      </h5>
    </div>
  );
}
