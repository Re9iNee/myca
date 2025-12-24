import SuperButton from "./super-button";

const Header = () => {
  return (
    <header className="absolute top-0 flex h-24 w-full max-w-360 items-center justify-between p-6 py-6 md:px-10 xl:h-26 xl:px-27">
      <img
        src={"/logo/myca-medium-size-logo.svg"}
        alt="medium size logo"
        className="z-2 h-10 xl:h-13"
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
        className="z-2 h-13! w-59! xl:h-14!"
      />
    </header>
  );
};

export default Header;
