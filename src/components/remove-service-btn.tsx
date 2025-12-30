"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronRight, Trash } from "lucide-react";
import { redirect } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";

function RemoveServiceBtn({ serviceId }: { serviceId: string }) {
  const [isPending, setPending] = useState(false);

  const removeService = useCallback(async () => {
    setPending(true);
    const response = await fetch("/api/services", {
      method: "DELETE",
      body: JSON.stringify({ id: serviceId }),
    }).finally(() => setPending(false));

    if (response.status === 200) {
      toast.success(`سرویس با موفقیت حذف شد`);
      redirect(`../`);
    }
  }, [serviceId]);

  return (
    <Dialog>
      <DialogTrigger className="mt-2 flex h-13 w-full justify-center gap-2 rounded-lg border-[1px] border-slate-300 p-4 py-4 text-center text-sm font-medium text-slate-500">
        <Trash size={20} />
        حذف سرویس
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-0.5 px-4 py-2 text-right!">
          <DialogTitle className="text-base font-bold text-slate-800">
            آیا این سرویس حذف شود؟
          </DialogTitle>
          <DialogDescription className="text-sm font-normal text-slate-500">
            در صورت حذف، این سرویس از لیست تاریخچه سرویس ها حذف خواهد شد. آیا از
            حذف این سرویس اطمینان دارید؟
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col! gap-y-2.5 px-4 py-3">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="h-13 rounded-2xl border border-slate-300 bg-transparent py-4 text-sm font-medium text-slate-500"
            >
              <ChevronRight />
              بازگشت
            </Button>
          </DialogClose>
          <Button
            disabled={isPending}
            type="submit"
            variant={"destructive"}
            onClick={() => removeService()}
            className="h-13 rounded-2xl bg-linear-to-r from-red-700 to-red-600 py-4 text-sm font-medium text-white disabled:grayscale-100"
          >
            <Trash />
            حذف سرویس
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default RemoveServiceBtn;
