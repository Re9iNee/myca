import { Button } from "@/components/ui/button";
import { CheckCircle2, PlusSquareIcon, ShareIcon } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

const steps: StepProps[] = [
  {
    title: "انتخاب Share",
    description: "گزینه share رو از نوار پایین انتخاب کنید",
    icon: <ShareIcon size={24} />,
  },
  {
    title: "گزینه Add to homescreen",
    description: "گزینه Add to homescreen رو انتخاب کنید",
    icon: <PlusSquareIcon size={24} />,
  },
  {
    title: "انتخاب Add",
    description: "انتخاب گزینه ی add در صفحه جدید",
    icon: <CheckCircle2 size={24} />,
  },
];

function AddToHomeScreenPage() {
  return (
    <div className="flex h-full flex-col p-6 text-center">
      <div className="mt-8">
        <div className="mb-10">
          <h1 className="inline-block bg-gradient-to-l from-[#1B80E5] to-[#392DDE] bg-clip-text text-[56px] font-bold text-transparent">
            مایکا
          </h1>
          <p className="text-sm font-normal text-slate-400">
            مدیریت سرویس دوره ای اتومبیل
          </p>
        </div>
        <p className="text-lg font-bold text-slate-700">
          برای استفاده از مایکا٬ وب اپلیکیشن رو به صفحه اصلی تلفن خود اضافه کنید
        </p>
      </div>

      <ol className="flex-grow pt-12 text-right">
        {steps.map((step, index) => (
          <li key={index}>
            <Step
              title={step.title}
              icon={step.icon}
              description={step.description}
            />
          </li>
        ))}
      </ol>

      <div className="mt-6 mb-8">
        <Button
          asChild
          variant={"outline"}
          className="mb-4 w-full rounded-2xl border-[#33415533] px-2.5 py-3.5 font-semibold text-slate-700"
        >
          <Link href="../">بازگشت</Link>
        </Button>
        <p className="text-xs font-normal text-neutral-400 grayscale-100">
          Made with ♥️ by <span className="">Mora</span>
        </p>
      </div>
    </div>
  );
}

export default AddToHomeScreenPage;

type StepProps = {
  title: string;
  icon: ReactNode;
  description: string;
};
function Step({ title, icon, description }: StepProps) {
  return (
    <div className="flex items-center gap-2.5 py-3.5">
      <div className="grid h-[60px] w-[60px] place-items-center rounded-full border border-black/5 bg-[#F4F7FA80] stroke-2 text-[#1962F4]">
        {icon}
      </div>
      <div className="flex flex-col gap-1.5">
        <h3 className="text-sm font-semibold text-slate-700">{title}</h3>
        <p className="text-sm font-normal text-slate-700">{description}</p>
      </div>
    </div>
  );
}
