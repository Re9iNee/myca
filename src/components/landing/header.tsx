import { Button } from "../ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 flex h-26 w-full items-center justify-between px-27 py-6">
      <img
        src={"/logo/myca-medium-size-logo.svg"}
        alt="medium size logo"
        className="h-13"
      />
      <Button
        size="xl"
        variant="primary"
        className="w-61 font-medium text-lg"
      >
        همین حالا شروع کن
      </Button>
    </header>
  );
};

export default Header;
