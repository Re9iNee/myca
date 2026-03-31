import {
  FaqSection,
  FeaturesSection,
  Footer,
  Header,
  HeroSection,
  InstallAppSection,
  StepsToUseSection,
  TeamMembersSection,
} from "@/components/landing";
import { AnimationProvider, LenisProvider } from "@/providers";

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
