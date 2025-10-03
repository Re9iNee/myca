import { Button } from "@/components/ui/button";
import Image from "next/image";

function WelcomePage() {
  return (
    <div className="flex h-[75%] flex-col justify-end overflow-hidden bg-slate-900 bg-gradient-to-t text-center">
      <div className="mx-4 mt-20 grow space-y-5">
        <h1 className="text-6xl font-bold text-white">مایکا</h1>
        <h3 className="text-xl font-medium text-white">
          اپلیکیشن مدیریت سرویس های خودرو
        </h3>
      </div>

      <div className="z-10 mx-4 grow space-y-3 px-8">
        <h5 className="text-sm font-light text-white opacity-50">
          نصب نسخه بتا
        </h5>
        <Button className="drop-shadow-[0px 0px 48px] w-full gap-2 rounded-2xl border border-blue-800 bg-black/20 py-6 text-white">
          <InstallIcon />
          <span className="font-semibold">نصب نرم افزار</span>
        </Button>
      </div>

      <div className="absolute bottom-0 aspect-square h-[800px] w-full">
        <Image fill alt="car image" src={"/hero-image.png"} />
      </div>
    </div>
  );
}

export default WelcomePage;

function InstallIcon() {
  return (
    <svg
      width="20"
      height="22"
      viewBox="0 0 20 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.0688 4C5.2048 3.131 5.4618 2.509 5.9478 2.025C6.9788 1 8.6378 1 11.9578 1C15.2778 1 16.9368 1 17.9678 2.025C18.9988 3.05 18.9988 4.7 18.9988 8V14C18.9988 17.3 18.9988 18.95 17.9678 19.975C16.9368 21 15.2778 21 11.9578 21C8.6378 21 6.9788 21 5.9478 19.975C5.2928 19.323 5.0538 18.419 4.9668 17M11.9998 18H12.0088"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.44302 6.952H7.92302C8.35902 6.967 9.01802 7.498 9.01802 7.909V11.514M0.999023 14.952L8.26702 7.749"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
