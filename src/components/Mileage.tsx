import Link from "next/link";
import { CiCirclePlus } from "react-icons/ci";
import { Button } from "./ui/button";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Wrench } from "lucide-react";
import MileageInput from "./MileageInput";

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
        <Drawer>
          <DrawerTrigger className="flex h-[54px] items-center gap-2 rounded-full border-[1.5px] border-slate-200 bg-white p-4 text-sm font-semibold text-slate-600">
            <CiCirclePlus size={22} className="mt-0.5" /> آپدیت کیلومتر
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="space-x-1.5 px-8 pt-2 pb-3">
              <DrawerTitle className="text-base font-bold text-slate-800">
                آپدیت کیلومتر
              </DrawerTitle>
              <DrawerDescription className="text-sm font-normal text-slate-500">
                عدد جدید کیلومتر را وارد کنید
              </DrawerDescription>
            </DrawerHeader>
            <form className="px-4 py-2">
              <MileageInput id="mileage" />
            </form>
            <DrawerFooter className="px-4 py-3">
              <Button
                disabled
                className="h-[52px] rounded-2xl border border-slate-300 bg-gradient-to-r from-blue-500 to-blue-600 px-2.5 py-4 text-sm font-semibold text-white disabled:bg-none disabled:text-slate-300 disabled:opacity-100"
              >
                ذخیره کیلومتر
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        <Button
          asChild
          className="flex h-[54px] gap-2 rounded-full border-[1.5px] border-blue-100 bg-gradient-to-l from-blue-500 to-blue-600 p-4 text-sm font-semibold text-white [&_svg:not([class*='size-'])]:size-[22px]"
        >
          <Link href={"/new-service"}>
            <Wrench className="mt-0.5" />
            سرویس جدید
          </Link>
        </Button>
      </div>
    </section>
  );
}
