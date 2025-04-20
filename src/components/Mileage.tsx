import Link from "next/link";
import { CiCirclePlus } from "react-icons/ci";
import { HiOutlineWrench } from "react-icons/hi2";
import { Button } from "./ui/button";

export default function Mileage() {
  return (
    <section className="grid min-h-[541px] grow place-items-center content-center gap-6">
      {/* Mileage section */}
      <div className="space-y-2.5 text-center">
        <h2 className="text-lg font-medium text-slate-500">کیلومتر کارکرد</h2>
        <h3 className="py-3 text-5xl font-bold text-blue-600">۱۵۴,۴۵۶</h3>
      </div>
      {/* Actions */}
      <div className="flex gap-2.5">
        <Button
          variant={"secondary"}
          className="flex gap-2 rounded-full border-[1.5px] border-slate-200 bg-white p-4 text-sm font-semibold text-slate-600"
        >
          <CiCirclePlus className="mt-0.5" /> آپدیت کیلومتر
        </Button>
        <Button
          className="flex gap-2 rounded-full border-[1.5px] border-blue-100 bg-gradient-to-l from-blue-500 to-blue-600 p-4 text-sm font-semibold text-white"
          asChild
        >
          <Link href={"/new-service"}>
            <HiOutlineWrench className="mt-0.5" />
            سرویس جدید
          </Link>
        </Button>
      </div>
    </section>
  );
}
