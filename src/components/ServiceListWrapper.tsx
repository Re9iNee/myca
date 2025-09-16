"use client";

import { dateToShamsi, mileageToFarsi } from "@/lib/utils";
import Link from "next/link";
import { Service } from "../../generated/prisma";
import SearchInput from "./SearchInput";
import { ChevronLeft } from "lucide-react";
import EmptyServicesState from "./EmptyServicesState";
import { useMemo, useState } from "react";

function ServiceListWrapper({ services }: { services: Service[] }) {
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
      <SearchInput
        className="mt-3.5"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredServices.length > 0 ? (
        <>
          <div className="scrollbar-hide mt-3.5 grow overflow-y-auto">
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

export default ServiceListWrapper;

function Row({ id, title, mileage, date }: Partial<Service>) {
  return (
    <Link
      href={`/history/${id}`}
      className="flex items-center justify-between border-b-slate-200 px-0.5 py-4 not-last:border-b-2"
    >
      <div>
        <span className="text-sm font-semibold text-slate-600">{title}</span>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-400">
            {/* {dateToShamsi(date ?? new Date())} */}
            کیلومتر سرویس بعدی:
          </span>
          <div className="h-4 w-[1px] rounded-sm bg-slate-300" />
          <span className="text-xs font-medium text-slate-400">
            <span className="font-semibold text-blue-500">
              {mileageToFarsi(mileage ?? 0)}
            </span>
          </span>
        </div>
      </div>
      <div className="ml-0.5 h-full text-slate-600">
        <ChevronLeft className="stroke-[1.5px]" />
      </div>
    </Link>
  );
}
