"use client";

import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import useLocalStorage from "@/hooks/useLocalStorage";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import { Cars } from "../../generated/prisma";

export default function CarPicker() {
  const [cars, setCars] = useState<Cars[]>();
  const { value: ownerId } = useLocalStorage("ownerId");
  const { value: selectedCar, save: setDefaultCar } =
    useLocalStorage("defaultCar");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!ownerId) {
      return;
    }

    fetch(`/api/cars?ownerId=${ownerId}`)
      .then(async (res) => {
        setCars(await res.json());
      })
      .catch((err) => {
        console.error(err);
      });
  }, [ownerId]);

  return (
    <section className="space-y-2.5 pt-3">
      <h2 className="font-semibold text-slate-500">انتخاب ماشین</h2>
      <div className="flex items-center justify-between gap-3">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="h-[52px] grow justify-between rounded-lg border border-[#E2E8F080]/50 bg-slate-50 p-3 text-right text-lg font-semibold text-slate-600"
            >
              {selectedCar}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="max-w-screen p-0">
            <Command>
              <CommandInput placeholder="جستجو ماشین ..." />
              <CommandList>
                <CommandEmpty>ماشینی پیدا نشد</CommandEmpty>
                <CommandGroup>
                  {cars?.map((car) => (
                    <CommandItem
                      key={car.id}
                      value={car.name}
                      onSelect={(currentValue) => {
                        setDefaultCar(currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedCar === car.name
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      {car.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <Button
          size={"icon"}
          variant={"outline"}
          className="h-[50px] w-[50px] rounded-lg border border-[#E2E8F080]/50 bg-slate-50 p-3"
          asChild
        >
          <Link href={"/car-info"}>
            <CiSquarePlus className="text-slate-500" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
