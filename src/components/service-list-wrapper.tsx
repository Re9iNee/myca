"use client";

import { mileageToFarsi } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Service } from "../../.remove.generated/prisma";
import EmptyServicesState from "./empty-services-state";
import SearchInput from "./search-input";

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
      {filteredServices.length > 0 ? (
        <div className="pt-3.5">
          <SearchInput onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      ) : (
        <></>
      )}

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

function Row({ id, title, mileage, carId }: Partial<Service>) {
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
            کیلومتر سرویس بعدی:
          </span>
          <span className="text-xs font-semibold text-blue-500">
            {mileageToFarsi(mileage ?? 0)}
          </span>
        </div>
      </div>
      <ChevronLeft size={16} className="h-full text-slate-600" />
    </Link>
  );
}
