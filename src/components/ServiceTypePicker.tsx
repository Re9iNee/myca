import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dispatch, SetStateAction } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
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
