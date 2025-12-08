"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, EyeIcon, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Car } from "../../../generated/prisma";

type Inputs = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const router = useRouter();
  const [pending, setPending] = useState<boolean>(false);
  const { register, handleSubmit, formState } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setPending(true);

    const result = await fetch("/api/login/", {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });
    const car: Car = await result.json();
    router.push("/");
    setPending(false);
  };
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible((prevState) => !prevState);
  return (
    <div className="h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-full flex-col px-6 pt-9"
      >
        <div className="flex flex-col gap-y-2 text-center">
          <h1 className="text-[56px] font-bold text-blue-700">مایکا</h1>
          <h3 className="text-sm text-slate-400">
            مدیریت سرویس دوره ای اتومبیل
          </h3>
        </div>
        <div className="flex w-full flex-col pt-12">
          <div className="flex flex-col gap-y-1">
            <h4 className="text-lg font-bold text-slate-800">ورود به حساب</h4>
            <h6 className="text-sm text-slate-500">
              برای ورود ایمیل و رمز عبور خود را وارد کنید
            </h6>
          </div>

          <div className="flex flex-col gap-y-3 pt-4">
            <div className="relative">
              <Input
                required
                type="text"
                placeholder="ایمیل"
                className="h-14 ps-12.5 text-base font-semibold text-slate-800 placeholder:font-normal placeholder:text-slate-400"
                {...register("email")}
              />
              <div className="absolute inset-y-0 start-4 flex size-6 h-full items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50">
                <Mail size={24} className="text-slate-500" />
              </div>
            </div>
            <div className="relative">
              <Input
                required
                className="h-14 ps-12.5 text-base font-semibold text-slate-800 placeholder:font-normal placeholder:text-slate-400"
                placeholder="رمز عبور"
                type={isVisible ? "text" : "password"}
                {...register("password")}
              />
              <div className="absolute inset-y-0 start-4 flex size-6 h-full items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50">
                <Lock size={24} className="text-slate-500" />
              </div>
              <button
                className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-4 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                onClick={toggleVisibility}
                type="button"
                aria-label={isVisible ? "Hide password" : "Show password"}
                aria-pressed={isVisible}
                aria-controls="password"
              >
                {isVisible ? (
                  <EyeOff
                    size={22}
                    aria-hidden="true"
                    className="text-slate-500"
                  />
                ) : (
                  <EyeIcon
                    size={22}
                    aria-hidden="true"
                    className="text-slate-500"
                  />
                )}
              </button>
            </div>
            <div className="flex w-full items-center justify-end text-xs leading-5 font-medium text-blue-600">
              <Link href={"/forgot-password"}>فراموشی رمز عبور</Link>
            </div>
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-y-2">
          <Button
            type="submit"
            disabled={pending || !formState.isDirty}
            className="mt-20 h-[56px] w-full rounded-full bg-linear-to-r from-blue-500 to-blue-600 px-3.5 py-2.5 text-lg font-semibold disabled:bg-slate-100 disabled:bg-none disabled:text-slate-300 disabled:opacity-100"
          >
            ورود
            <ChevronLeft className="size-5.5" />
          </Button>
          <div className="flex justify-center gap-x-2 p-2">
            <p className="text-sm leading-5 text-slate-500">
              حساب کاربری ندارید؟
            </p>
            <Link
              href={"/sign-up"}
              className="text-sm leading-5 font-semibold text-blue-600"
            >
              ثبت نام
            </Link>
          </div>
        </div>
        <footer className="mb-3 px-8 pt-12 text-center text-xs leading-4 text-neutral-400">
          Made with 🩶 by <span className="font-bold">Mora</span>
        </footer>
      </form>
    </div>
  );
}
