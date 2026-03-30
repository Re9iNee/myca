"use client";

import MediumSizeLogo from "@/components/medium-size-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Spinner } from "@/components/ui/spinner";
import { ChevronLeft, ChevronRight, EyeIcon, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
  otp: string;
};

type Step = "credentials" | "otp";

export default function SignUpPage() {
  const router = useRouter();
  const [pending, setPending] = useState<boolean>(false);
  const { register, handleSubmit, formState, watch, control } =
    useForm<Inputs>();
  const [step, setStep] = useState<Step>("credentials");
  const [resendCooldown, setResendCooldown] = useState<number>(0);
  const [resendAttempts, setResendAttempts] = useState<number>(0);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);

  useEffect(() => {
    if (resendCooldown <= 0) return;

    const timer = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [resendCooldown]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setGeneralError(null);
    setOtpError(null);

    try {
      if (step === "credentials") {
        setPending(true);

        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          setGeneralError(result.message || "ثبت‌نام با خطا مواجه شد.");
          return;
        }

        setStep("otp");
        setResendCooldown(60);
        setResendAttempts(1);
        return;
      }

      if (step === "otp") {
        setPending(true);

        const response = await fetch("/api/auth/otp/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            purpose: "signup",
            code: data.otp,
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          setOtpError(result.message || "کد وارد شده نامعتبر است.");
          return;
        }

        router.push("/application/");
      }
    } finally {
      setPending(false);
    }
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
            <h4 className="text-lg font-bold text-slate-700">
              {step === "credentials" ? "ثبت نام" : "کد ارسال شده را وارد کنید"}
            </h4>
            <h6 className="text-sm text-slate-400">
              {step === "credentials"
                ? "اطلاعات حساب خود را وارد کنید"
                : "کد ارسال شده به ایمیل خود را وارد کنید"}
            </h6>
          </div>

          <div className="flex flex-col gap-y-3 pt-4">
            {step === "credentials" ? (
              <>
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
              </>
            ) : (
              <div className="flex flex-col gap-y-3">
                <div dir="ltr" className="flex justify-end">
                  <Controller
                    name="otp"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <InputOTP maxLength={5} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot index={1} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot index={4} />
                        </InputOTPGroup>
                      </InputOTP>
                    )}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>
                    {resendCooldown > 0
                      ? `امکان ارسال مجدد کد تا ${resendCooldown} ثانیه دیگر`
                      : "در صورت عدم دریافت، می‌توانید کد را مجدداً ارسال کنید."}
                  </span>
                  <button
                    type="button"
                    className="text-blue-600 disabled:text-slate-300"
                    disabled={pending || resendCooldown > 0}
                    onClick={async () => {
                      setOtpError(null);
                      setGeneralError(null);

                      const email = watch("email");
                      if (!email) return;

                      const response = await fetch("/api/auth/otp/send", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          email,
                          purpose: "signup",
                        }),
                      });

                      const result = await response.json();

                      if (!response.ok) {
                        setOtpError(
                          result.message || "ارسال مجدد کد با خطا مواجه شد.",
                        );
                        return;
                      }

                      setResendAttempts((prev) => prev + 1);
                      setResendCooldown(60);
                    }}
                  >
                    ارسال مجدد کد
                  </button>
                </div>
                {otpError ? (
                  <p className="text-xs text-red-500">{otpError}</p>
                ) : null}
              </div>
            )}
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-y-2">
          {generalError ? (
            <p className="text-center text-xs text-red-500">{generalError}</p>
          ) : null}
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
                {step === "credentials" ? "ادامه" : "تایید"}
                <ChevronLeft className="size-5.5" />
              </>
            )}
          </Button>
          <Button size="xl" variant="secondary2" className="w-full">
            <ChevronRight className="size-5.5" />
            بازگشت
          </Button>
        </div>
        <footer className="mb-3 px-8 pt-12 text-center text-xs leading-4 text-neutral-400">
          Made with 🩶 by <span className="font-bold">Mora</span>
        </footer>
      </form>
    </div>
  );
}
