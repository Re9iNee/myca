import CarPicker from "@/components/CarPicker";
import Mileage from "@/components/Mileage";
import ServiceHistoryBtn from "@/components/ServiceHistoryBtn";

export default function Home() {
  return (
    <div className="flex h-full w-full flex-col p-6">
      <CarPicker />
      <Mileage />
      <ServiceHistoryBtn />
    </div>
  );
}
