"use client";

import mortezaAjidanpour from "@public/landing/team-members-section/morteza-ajidanpour.png";
import mortezaHasanpour from "@public/landing/team-members-section/morteza-hasanpour.png";
import kowsarBarkhordar from "@public/landing/team-members-section/kowsar-barkhordar.png";
import rezaAttarzadeh from "@public/landing/team-members-section/reza-attarzadeh.png";
import Image from "next/image";
import superButtonBg from "@public/landing/super-button-pattern.png";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const TeamMembersSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const memberCards = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      gsap.to(memberCards.current, {
        y: 0,
        opacity: 1,
        duration: 1.25,
        ease: "power4.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none none",
          markers: true,
        },
      });
    },
    { scope: sectionRef },
  );

  const teamMembers = [
    {
      firstName: "Kosar",
      lastName: "Barkhordar",
      jobTitle: "UI/UX Designer",
      image: kowsarBarkhordar,
      profile_url: "",
    },
    {
      firstName: "Morteza",
      lastName: "Hasanpour",
      jobTitle: "Front-end Developer",
      image: mortezaHasanpour,
      profile_url: "https://www.linkedin.com/in/morteza-hasanpour-183847397/",
    },
    {
      firstName: "Reza",
      lastName: "Attarzadeh",
      jobTitle: "Co-Founder & Full-Stack Developer",
      image: rezaAttarzadeh,
      profile_url: "https://www.linkedin.com/in/rezaattarzadeh/",
    },
    {
      firstName: "Morteza",
      lastName: "Ajidanpour",
      jobTitle: "Co-Founder & Product Designer",
      image: mortezaAjidanpour,
      profile_url: "https://www.linkedin.com/in/morteza-ajidanpour-30a647103/",
    },
  ];
  return (
    <section
      className="flex w-full justify-center overflow-hidden bg-slate-50"
      ref={sectionRef}
    >
      <div className="relative flex w-full max-w-360 flex-col items-center justify-center gap-y-10 px-6 py-20 sm:px-10 sm:py-16 xl:px-23 xl:py-22">
        <div className="z-2 flex flex-col items-center gap-y-1.5 xl:gap-y-2.5">
          <p className="text-2xl leading-9 font-black text-slate-900 xl:text-3xl">
            تیم مایکا
          </p>
          <p className="text-lg leading-7 text-slate-500 xl:text-xl">
            با تیم سازنده مایکا آشنا بشید
          </p>
        </div>
        <div className="grid w-full max-w-64 grid-cols-1 gap-y-6 sm:max-w-none sm:grid-cols-4 sm:gap-x-3 xl:gap-x-6">
          {teamMembers.map((member, i) => {
            const orderClass = [
              "order-4 sm:order-1",
              "order-3 sm:order-2",
              "order-2 s,:order-3",
              "order-1 sm:order-4",
            ][i];
            return (
              <div
                key={i}
                ref={(el) => {
                  memberCards.current[i] = el;
                }}
                className={`relative aspect-2/3 translate-y-20 opacity-0 ${orderClass} z-2 flex h-94 w-full flex-col gap-y-2 overflow-hidden rounded-4xl bg-linear-to-b from-black to-[#666666] py-4 sm:h-86 xl:h-112`}
              >
                <div className="flex h-full flex-col items-center justify-between">
                  <div className="flex w-full flex-col items-center justify-between gap-y-1.5 xl:gap-y-2">
                    <p className="font-poppins text-center font-semibold whitespace-pre-line text-white sm:text-xl sm:leading-6 xl:text-3xl xl:leading-8">
                      {member.firstName}
                      <br />
                      {member.lastName}
                    </p>
                    <p className="font-gilda text-center leading-5 text-white/80 sm:text-sm xl:text-base xl:leading-8">
                      {member.jobTitle}
                    </p>
                  </div>
                  <a
                    href={member.profile_url}
                    target="_blank"
                    className="super-button relative z-2 inline-flex size-9 items-center justify-center overflow-hidden rounded-[100px] bg-linear-to-b! from-blue-700! to-sky-600! text-white xl:size-10.5"
                  >
                    <img
                      src="/hugeicons/linkedin-02.svg"
                      alt="linkedin vector"
                      className="size-4 xl:size-4.5"
                    />
                    <div>
                      <Image
                        src={superButtonBg}
                        alt="button background pattern"
                        placeholder="blur"
                        className="absolute top-0 right-0 opacity-40 mix-blend-plus-lighter"
                      />
                    </div>
                  </a>
                </div>

                <Image
                  src={member.image}
                  alt={member.jobTitle}
                  placeholder="blur"
                  quality={100}
                  className="absolute right-0 bottom-0 object-contain grayscale"
                />
              </div>
            );
          })}
        </div>

        <img
          src="/landing/team-members-section/pattern.svg"
          alt="background pattern"
          className="absolute top-0 right-0 z-1"
        />
      </div>
    </section>
  );
};

export default TeamMembersSection;
