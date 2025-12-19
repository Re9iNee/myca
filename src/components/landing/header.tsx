import { Button } from "../ui/button";

const Header = () => {
  return (
    <header className="absolute top-0 flex h-26 w-full items-center justify-between px-27 py-6 max-w-360">
      <img
        src={"/logo/myca-medium-size-logo.svg"}
        alt="medium size logo"
        className="h-13 z-2"
      />
      <Button size="xl" variant="primary" className="z-2 w-61 text-lg font-medium">
        همین حالا شروع کن
      </Button>
    </header>
  );
};

export default Header;
