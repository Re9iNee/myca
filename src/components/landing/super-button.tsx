import superButtonBg from "@public/landing/super-button-pattern.png";
import Image from "next/image";
import Link from "next/link";
import { JSX } from "react";

const SuperButton = ({
  text,
  icon,
  className,
}: {
  text: string | JSX.Element;
  icon: JSX.Element;
  className?: string;
}) => {
  return (
    <button
      className={`super-button relative inline-flex h-15 w-72 items-center justify-center gap-x-3 overflow-hidden rounded-[100px] px-4 py-2.5 text-lg font-semibold text-white transition duration-300 hover:scale-105 ${className || ""}`}
    >
      {icon}
      {text}
      <div>
        <Image
          src={superButtonBg}
          alt="button background pattern"
          placeholder="blur"
          className="absolute top-0 right-0 opacity-40 mix-blend-plus-lighter"
        />
      </div>
    </button>
  );
};

export default SuperButton;

export const SuperButtonLink = ({
  text,
  icon,
  href,
  className,
}: {
  text: string | JSX.Element;
  icon: JSX.Element;
  className?: string;
  href: string;
}) => {
  return (
    <Link
      href={href}
      className={`super-button relative inline-flex h-15 w-72 items-center justify-center gap-x-3 overflow-hidden rounded-[100px] px-4 py-2.5 text-lg font-semibold text-white transition duration-300 hover:scale-105 ${className || ""}`}
    >
      {icon}
      {text}
      <div>
        <Image
          src={superButtonBg}
          alt="button background pattern"
          placeholder="blur"
          className="absolute top-0 right-0 opacity-40 mix-blend-plus-lighter"
        />
      </div>
    </Link>
  );
};
