"use client";

import MediumSizeLogo from "@/components/medium-size-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Car } from "../../../../.remove.generated/prisma/index";
import { ChevronLeft, EyeIcon, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

export default function SignInPage() {
  const router = useRouter();
  const [pending, setPending] = useState<boolean>(false);
  const { register, handleSubmit, formState, watch } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setPending(true);

    const result = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });
    // TODO: implement login feature
    // const car: Car = await result.json();

    // router.push("/application/");

    // setPending(false);
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
          <MediumSizeLogo />
          <h3 className="text-sm leading-5 font-medium text-slate-400">
            مدیریت سرویس دوره ای اتومبیل
          </h3>
        </div>
        <div className="flex w-full flex-col pt-12">
          <div className="flex flex-col gap-y-1.5">
            <h4 className="text-lg font-bold text-slate-700">ورود به حساب</h4>
            <h6 className="text-sm text-slate-400">
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
                <img
                  src="/hugeicons/mail-02.svg"
                  alt="mail vector"
                  className="size-6 text-slate-500"
                />
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
                <img
                  src="/hugeicons/lock-password.svg"
                  alt="lock password vector"
                  className="size-6 text-slate-500"
                />
              </div>
              {watch("password") ? (
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
              ) : (
                <></>
              )}
            </div>
            <div className="flex w-full items-center justify-end text-sm leading-5 font-medium text-blue-600">
              <Link href={"/application/forgot-password"}>
                فراموشی رمز عبور
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-y-2">
          <Button
            type="submit"
            size="xl"
            variant="primary"
            disabled={pending || !formState.isDirty}
            className="mt-20 w-full"
          >
            {pending ? (
              <Spinner className="size-6" />
            ) : (
              <>
                ادامه
                <ChevronLeft className="size-5.5" />
              </>
            )}
          </Button>
          <div className="flex justify-center gap-x-2 p-2">
            <p className="text-sm leading-5 text-slate-500">
              حساب کاربری ندارید؟
            </p>
            <Link
              href={"/application/sign-up"}
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
