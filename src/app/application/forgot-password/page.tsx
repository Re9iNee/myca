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
import {
  Check,
  ChevronLeft,
  ChevronRight,
  EyeIcon,
  EyeOff,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  password: string;
  email: string;
  otp: string;
  confirm_password: string;
};

type stepOptions = "email" | "otp" | "new-password" | "success";
export default function ForgotPasswordPage() {
  const router = useRouter();
  const [pending, setPending] = useState<boolean>(false);
  const { register, handleSubmit, formState, control, watch } =
    useForm<Inputs>();
  const [step, setStep] = useState<stepOptions>("email");
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
      if (step === "email") {
        setPending(true);

        const response = await fetch("/api/auth/forgot-password/start", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          setGeneralError(result.message || "ارسال کد با خطا مواجه شد.");
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
            code: data.otp,
            email: data.email,
            purpose: "forgot_password",
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          setOtpError(result.message || "کد وارد شده نامعتبر است.");
          return;
        }

        setStep("new-password");
        return;
      }

      if (step === "new-password") {
        if (data.password !== data.confirm_password) {
          setGeneralError("رمز عبور و تکرار آن یکسان نیستند.");
          return;
        }

        setPending(true);

        const response = await fetch("/api/auth/forgot-password/complete", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            code: data.otp,
            newPassword: data.password,
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          setGeneralError(result.message || "ذخیره رمز عبور با خطا مواجه شد.");
          return;
        }

        setStep("success");
        return;
      }

      if (step === "success") {
        router.push("/application/sign-in");
      }
    } finally {
      setPending(false);
    }
  };
  const titleGenerator = () => {
    if (step === "email") {
      return "آدرس ایمیل";
    } else if (step === "otp") {
      return "کد ارسال شده را وارد کنید";
    } else if (step === "new-password") {
      return "رمز جدید شما";
    } else {
      return "رمز جدید شما ذخیره شد";
    }
  };
  const descriptionGenerator = () => {
    if (step === "email") {
      return "برای بازیابی رمز عبور آدرس ایمیل خود را وارد کنید";
    } else if (step === "otp") {
      return "کد ارسال شده را وارد کنید";
    } else if (step === "new-password") {
      return "رمز جدید حساب کاربری خود را وارد کنید";
    } else {
      return "رمز حساب شما با موفقیت ذخیره شده";
    }
  };
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible((prevState) => !prevState);
  const [confirmIsVisible, setConfirmIsVisible] = useState<boolean>(false);
  const toggleConfirmVisibility = () =>
    setConfirmIsVisible((prevState) => !prevState);

  return (
    <div className="h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-full flex-col px-6 pt-9"
      >
        {step !== "success" ? (
          <>
            {" "}
            <div className="flex flex-col gap-y-2 text-center">
              <MediumSizeLogo />
              <h3 className="text-sm leading-5 font-medium text-slate-400">
                مدیریت سرویس دوره ای اتومبیل
              </h3>
            </div>
            <div className="flex w-full flex-col pt-12">
              <div className="flex flex-col gap-y-1.5">
                <h4 className="text-lg font-bold text-slate-700">
                  {titleGenerator()}
                </h4>
                <h6 className="text-sm text-slate-400">
                  {descriptionGenerator()}
                </h6>
              </div>

              <div className="flex flex-col gap-y-3 pt-4">
                {step === "email" ? (
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
                ) : step === "otp" ? (
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
                              purpose: "forgot_password",
                            }),
                          });

                          const result = await response.json();

                          if (!response.ok) {
                            setOtpError(
                              result.message ||
                                "ارسال مجدد کد با خطا مواجه شد.",
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
                ) : step === "new-password" ? (
                  <>
                    <div className="relative">
                      <Input
                        required
                        className="h-14 text-base font-semibold text-slate-800 placeholder:font-normal placeholder:text-slate-400"
                        placeholder="رمز عبور"
                        type={isVisible ? "text" : "password"}
                        {...register("password")}
                      />
                      {watch("password") ? (
                        <button
                          className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-4 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                          onClick={toggleVisibility}
                          type="button"
                          aria-label={
                            isVisible ? "Hide password" : "Show password"
                          }
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
                    <div className="relative">
                      <Input
                        required
                        className="h-14 text-base font-semibold text-slate-800 placeholder:font-normal placeholder:text-slate-400"
                        placeholder="تکرار مجدد رمز عبور"
                        type={confirmIsVisible ? "text" : "password"}
                        {...register("confirm_password")}
                      />
                      {watch("confirm_password") ? (
                        <button
                          className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-4 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                          onClick={toggleConfirmVisibility}
                          type="button"
                          aria-label={
                            confirmIsVisible ? "Hide password" : "Show password"
                          }
                          aria-pressed={confirmIsVisible}
                          aria-controls="password"
                        >
                          {confirmIsVisible ? (
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
                  <></>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex h-full items-center">
            <div className="flex h-full max-h-65 w-full flex-col items-center justify-end gap-y-1.5">
              <h4 className="text-lg font-bold text-slate-700">
                {titleGenerator()}
              </h4>
              <h6 className="text-sm text-slate-400">
                {descriptionGenerator()}
              </h6>
            </div>
          </div>
        )}

        <div className="mt-auto flex flex-col gap-y-2">
          {generalError ? (
            <p className="text-center text-xs text-red-500">{generalError}</p>
          ) : null}
          {step === "new-password" ? (
            <>
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
                    ذخیره
                    <Check className="size-5.5" />
                  </>
                )}
              </Button>
              <Button size="xl" variant="secondary2" className="w-full">
                انصراف
                <X className="size-5.5" />
              </Button>
            </>
          ) : step === "email" || step === "otp" ? (
            <>
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
              <Button size="xl" variant="secondary2" className="w-full">
                <ChevronRight className="size-5.5" />
                بازگشت
              </Button>
            </>
          ) : (
            <Button
              type="button"
              size="xl"
              variant="primary"
              className="mt-20 w-full"
              onClick={() => router.push("/application/sign-in")}
            >
              ورود به سیستم
              <ChevronLeft className="size-5.5" />
            </Button>
          )}
        </div>
        <footer className="mb-3 px-8 pt-12 text-center text-xs leading-4 text-neutral-400">
          Made with 🩶 by <span className="font-bold">Mora</span>
        </footer>
      </form>
    </div>
  );
}
