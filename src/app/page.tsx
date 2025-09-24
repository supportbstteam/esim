import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Marquee from "@/components/home/Marquee";
import { Plan } from "@/components/home/Plan";
import TravelPlans from "@/components/home/TravelPlans";
import { Journey } from "@/components/home/Journey";
import { EasyStep } from "@/components/home/EasyStep";

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-white">
        <HeroSection />
         
        <div className="bg-[#133365] p-8 text-[#FFFFFF]">
        <Marquee
          items={[
            "Global Coverage",
            "Seamless Switching",
            "Instant Connectivity",
            "Cost-Effective Plans",
            "Secure & Reliable",
            "24/7 Support",
          ]}
          speed={2}
        />
      </div>

       <Plan />
       <Journey />
       <TravelPlans />
       <EasyStep />

      </div>
    </>
  );
}
