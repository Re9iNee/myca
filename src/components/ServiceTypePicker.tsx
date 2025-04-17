import { serviceType } from "@/app/new-service/page";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dispatch, SetStateAction } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function ServiceTypePicker({
  serviceType,
  setServiceType,
}: {
  serviceType: serviceType;
  setServiceType: Dispatch<SetStateAction<serviceType>>;
}) {
  return (
    <Tabs
      defaultValue={serviceType}
      onValueChange={(v) => setServiceType(v as serviceType)}
      className="text-right"
    >
      <TabsList className="min-w-full">
        <TabsTrigger value="interval">سرویس دوره ای</TabsTrigger>
        <TabsTrigger value="normal">سرویس عادی</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
