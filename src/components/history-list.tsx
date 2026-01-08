"use client";

import { dateToShamsi, mileageToFarsi } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Service } from "../../generated/prisma";
import EmptyServicesState from "./empty-services-state";
import SearchInput from "./search-input";

function HistoryList({ services }: { services: Service[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredServices = useMemo(() => {
    return services.filter((service) =>
      service.title
        .toLocaleLowerCase()
        .includes(searchTerm.toLocaleLowerCase()),
    );
  }, [services, searchTerm]);

  return (
    <>
      {filteredServices.length > 0 ? (
        <div className="pt-3.5">
          <SearchInput
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="جستجو"
          />
        </div>
      ) : (
        <></>
      )}

      {filteredServices.length > 0 ? (
        <>
          <div className="scrollbar-hide py-3.5 grow overflow-y-auto">
            {filteredServices.map((service) => (
              <Row key={service.id} {...service} />
            ))}
          </div>
        </>
      ) : (
        <EmptyServicesState />
      )}
    </>
  );
}

export default HistoryList;

function Row({ id, title, mileage, date, carId }: Partial<Service>) {
  return (
    <Link
      href={{
        pathname: `/application/history/${id}`,
        query: {
          carId: carId,
        },
      }}
      className="flex h-18.5 items-center justify-between border-b-slate-200 px-0.5 py-4 not-last:border-b"
    >
      <div className="flex flex-col gap-y-1.5">
        <span className="text-sm font-semibold text-slate-600">{title}</span>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-400">
            {dateToShamsi(date!)}
          </span>
          <div className="h-4 w-px rounded-sm bg-slate-300" />
          <span className="flex gap-x-1.5 text-xs font-medium text-slate-400">
            کیلومتر:
            <span className="font-semibold text-blue-500">
              {mileageToFarsi(mileage ?? 0)}
            </span>
          </span>
        </div>
      </div>
      <ChevronLeft size={16} className="h-full text-slate-600" />
    </Link>
  );
}
