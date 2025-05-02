import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dispatch, SetStateAction } from "react";
import { ServiceType } from "../../generated/prisma";

export default function ServiceTypePicker({
  serviceType,
  setServiceType,
}: {
  serviceType: ServiceType;
  setServiceType: Dispatch<SetStateAction<ServiceType>>;
}) {
  return (
    <Tabs
      defaultValue={serviceType}
      onValueChange={(v) => setServiceType(v as ServiceType)}
      className="text-right"
    >
      <TabsList className="min-w-full">
        <TabsTrigger value="Recurrent">سرویس دوره ای</TabsTrigger>
        <TabsTrigger value="NonRecurrent">سرویس عادی</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
