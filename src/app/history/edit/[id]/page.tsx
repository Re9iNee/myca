import MileageInput from "@/components/MileageInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRight, CircleCheck } from "lucide-react";
import Link from "next/link";

type Props = {
  params: Promise<{ id: string }>;
};

async function ServiceHistoryEditPage({ params }: Props) {
  const { id } = await params;
  console.log(id);

  return (
    <form className="flex h-full w-full flex-col justify-between px-6">
      {/* navigation header */}
      <div>
        <header className="flex items-center justify-between py-2.5 text-sm font-medium text-slate-500">
          <Link
            href={`/history/${id}`}
            className="inline-flex items-center gap-2"
          >
            <ChevronRight className="mt-0.5 h-5 w-5 stroke-2" />
            بازگشت
          </Link>
        </header>

        <div className="space-y-2 py-4">
          <Label htmlFor="title">عنوان سرویس </Label>
          <Input
            type="text"
            placeholder="مثال: تعویض سنسور استارت موتور"
            className="h-12 rounded-lg px-3 py-3.5 text-sm font-semibold text-slate-700"
          />
        </div>

        <div className="space-y-2 py-4">
          <Label htmlFor="mileage">کیلومتر سرویس</Label>
          <MileageInput id="mileage" />
        </div>

        <div className="space-y-2.5 py-4">
          <Label htmlFor="details">جزئیات سرویس</Label>
          <Textarea
            className="h-[200px] p-2.5 text-sm font-medium text-slate-800"
            placeholder="مثال: سنسور استارت ماشین به دلیل فرسودگی در گاراژ مسلمی تعویض شد"
          />
        </div>
      </div>

      <div className="flex flex-col space-y-2 py-3">
        <Button
          variant={"outline"}
          className="h-14 rounded-2xl border border-slate-300 bg-white px-2.5 py-4 text-base font-medium text-slate-400"
          asChild
        >
          <Link href={`/history/${id}`}>
            <ChevronRight /> بازگشت
          </Link>
        </Button>
        <Button className="h-14 rounded-2xl bg-blue-600 px-2.5 py-4 text-base font-medium text-slate-50">
          <CircleCheck />
          ذخیره تغییرات
        </Button>
      </div>
    </form>
  );
}

export default ServiceHistoryEditPage;
