import { ChevronRight, Trash } from "lucide-react";
import { Button } from "./ui/button";
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

function RemoveServiceBtn() {
  return (
    <Dialog>
      <DialogTrigger className="mt-2 flex h-[52px] w-full cursor-pointer justify-center gap-2 rounded-lg border-[1px] border-slate-300 p-4 py-4 text-center text-sm font-medium text-slate-500">
        <Trash size={20} />
        حذف سرویس
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-1.5 px-4 py-2 text-right">
          <DialogTitle className="text-slate800 text-base font-bold">
            آیا این سرویس حذف شود؟
          </DialogTitle>
          <DialogDescription className="text-sm font-normal text-slate-500">
            در صورت حذف، این سرویس از لیست تاریخچه سرویس ها حذف خواهد شد. آیا از
            حذف این سرویس اطمینان دارید؟
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="px-4 py-3">
          <Button
            type="submit"
            variant={"destructive"}
            className="h-[52px] rounded-2xl bg-gradient-to-r from-red-700 to-red-600 py-4 text-sm font-medium text-white"
          >
            <Trash />
            حذف سرویس
          </Button>

          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="h-[52px] rounded-2xl border border-slate-300 bg-transparent py-4 text-sm font-medium text-slate-500"
            >
              <ChevronRight />
              بازگشت
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default RemoveServiceBtn;
