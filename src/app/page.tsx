import CarPicker from "@/components/CarPicker";
import MileageSection from "@/components/MileageSection";
import ServiceHistoryBtn from "@/components/ServiceHistoryBtn";

export default function Home() {
  return (
    <div className="flex h-full w-full flex-col p-6">
      <CarPicker />
      <MileageSection />
      <ServiceHistoryBtn />
    </div>
  );
}
