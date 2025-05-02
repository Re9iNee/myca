import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dispatch, SetStateAction } from "react";
import { ServicesType } from "../../generated/prisma";

export default function ServiceTypePicker({
  serviceType,
  setServiceType,
}: {
  serviceType: ServicesType;
  setServiceType: Dispatch<SetStateAction<ServicesType>>;
}) {
  return (
    <Tabs
      defaultValue={serviceType}
      onValueChange={(v) => setServiceType(v as ServicesType)}
      className="text-right"
    >
      <TabsList className="min-w-full">
        <TabsTrigger value="Recurrent">سرویس دوره ای</TabsTrigger>
        <TabsTrigger value="NonRecurrent">سرویس عادی</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
