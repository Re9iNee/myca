import CarPicker from "@/components/car-picker";
import MileageSection from "@/components/mileage-section";
import ServiceHistoryBtn from "@/components/service-history-btn";

export default function Home() {
  return (
    <div className="flex h-full w-full flex-col p-6">
      <CarPicker />
      <MileageSection />
      <ServiceHistoryBtn />
    </div>
  );
}
