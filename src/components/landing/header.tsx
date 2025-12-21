import SuperButton from "./super-button";

const Header = () => {
  return (
    <header className="absolute top-0 flex h-26 w-full max-w-360 items-center justify-between px-27 py-6">
      <img
        src={"/logo/myca-medium-size-logo.svg"}
        alt="medium size logo"
        className="z-2 h-13"
      />
      <SuperButton
        icon={
          <img
            src="/hugeicons/login-square-02.svg"
            alt="login square vector"
            className="size-6"
          />
        }
        text={
          <>
            ورود <span className="font-normal!">/</span> ثبت نام
          </>
        }
        className="z-2 h-14! w-59!"
      />
    </header>
  );
};

export default Header;
