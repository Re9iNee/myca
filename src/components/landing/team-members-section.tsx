import mortezaAjidanpour from "@public/landing/team-members-section/morteza-ajidanpour.png";
import mortezaHasanpour from "@public/landing/team-members-section/morteza-hasanpour.png";
import kowsarBarkhordar from "@public/landing/team-members-section/kowsar-barkhordar.png";
import rezaAttarzadeh from "@public/landing/team-members-section/reza-attarzadeh.png";
import Image from "next/image";
import superButtonBg from "@public/landing/super-button-pattern.png";

const TeamMembersSection = () => {
  const teamMembers = [
    {
      firstName: "Kowsar",
      lastName: "Barkhordar",
      jobTitle: "UI/UX Designer",
      image: kowsarBarkhordar,
    },
    {
      firstName: "Morteza",
      lastName: "Hasanpour",
      jobTitle: "Front-end Developer",
      image: mortezaHasanpour,
    },
    {
      firstName: "Reza",
      lastName: "Attarzadeh",
      jobTitle: "Co-Founder & Full-Stack Developer",
      image: rezaAttarzadeh,
    },
    {
      firstName: "Morteza",
      lastName: "Ajidanpour",
      jobTitle: "Co-Founder & Product Designer",
      image: mortezaAjidanpour,
    },
  ];
  return (
    <section className="flex w-full justify-center overflow-hidden bg-slate-50">
      <div className="relative flex w-full max-w-360 flex-col items-center justify-center gap-y-10 px-23 py-22">
        <div className="z-2 flex flex-col items-center gap-y-2.5">
          <p className="text-3xl leading-9 font-black text-slate-900">
            تیم مایکا
          </p>
          <p className="text-xl leading-7 text-slate-500">
            با تیم سازنده مایکا آشنا بشید
          </p>
        </div>
        <div className="flex w-full gap-x-6">
          {teamMembers.map((member, i) => {
            return (
              <div
                key={i}
                className="relative z-2 flex h-112 w-full flex-col gap-y-2 overflow-hidden rounded-4xl bg-linear-to-b from-black to-[#666666] py-4"
              >
                <div className="flex h-full flex-col items-center justify-between">
                  <div className="flex w-full flex-col items-center justify-between gap-y-2">
                    <p className="font-poppins text-center text-3xl leading-8 font-semibold whitespace-pre-line text-white">
                      {member.firstName}
                      <br />
                      {member.lastName}
                    </p>
                    <p className="font-gilda text-base leading-8 text-white/80">
                      {member.jobTitle}
                    </p>
                  </div>
                  <button className="super-button relative z-2 inline-flex size-10.5 items-center justify-center overflow-hidden rounded-[100px] bg-linear-to-b! from-blue-700! to-sky-600! text-white">
                    <img
                      src="/hugeicons/linkedin-02.svg"
                      alt="linkedin vector"
                      className="size-4.5"
                    />
                    <div>
                      <Image
                        src={superButtonBg}
                        alt="button background pattern"
                        placeholder="blur"
                        className="absolute top-0 right-0 opacity-40 mix-blend-plus-lighter"
                      />
                    </div>
                  </button>
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
