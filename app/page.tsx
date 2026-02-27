import Footer from "@/app/_components/ui/footer";
import HeroSection from "@/app/_features/home/heroSection";
import HowItWorksSection from "@/app/_features/home/howItWorksSection";
import WhyChatMe from "@/app/_features/home/whyChatMe";

export default function Home() {
  return (
    <div className="mt-5">
      <HeroSection />
      <WhyChatMe />
      <HowItWorksSection />
      <Footer />
    </div>
  );
}
