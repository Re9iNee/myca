import CarPicker from "@/components/car-picker";
import UpdateMilageDrawer from "@/components/update-mileage-drawer";
import ServiceHistoryBtn from "@/components/service-history-btn";

export default function ApplicationHomePage() {
  return (
    <div className="flex h-full w-full flex-col p-6">
      <CarPicker />
      <UpdateMilageDrawer />
      <ServiceHistoryBtn />
    </div>
  );
}
