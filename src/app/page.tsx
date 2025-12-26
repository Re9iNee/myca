import FaqSection from "@/components/landing/faq-section";
import FeaturesSection from "@/components/landing/features-section";
import Footer from "@/components/landing/footer";
import Header from "@/components/landing/header";
import HeroSection from "@/components/landing/hero-section";
import InstallAppSection from "@/components/landing/install-myca-section";
import StepsToUseSection from "@/components/landing/steps-to-use-section";
import TeamMembersSection from "@/components/landing/team-members-section";
import AnimationProvider from "./providers/animation-provider";
import LenisProvider from "./providers/lenis-provider";

export default function HomePage() {
  return (
    <LenisProvider>
      <AnimationProvider>
        <main className="flex w-full flex-col items-center overflow-y-hidden">
          <Header />
          <HeroSection />
          <FeaturesSection />
          <StepsToUseSection />
          <InstallAppSection />
          <FaqSection />
          <TeamMembersSection />
          <Footer />
        </main>
      </AnimationProvider>
    </LenisProvider>
  );
}
