"use client";
import HeroSection from "../components/HeroSection";
import Marquee from "@/components/home/Marquee";
import { Plan } from "@/components/home/Plan";
import TravelPlans from "@/components/home/TravelPlans";
import { Journey } from "@/components/home/Journey";
import { EasyStep } from "@/components/home/EasyStep";
import TrustedTravel from '@/components/home/TrustedTravel';
import FAQ from "@/components/home/Faq";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import { fetchCountries } from "@/redux/thunk/thunk";
import { fetchPlans, featurePlans } from "@/redux/thunk/planThunk";
import { fetchUserDetails } from "@/redux/slice/UserSlice";
export default function Home() {

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCountries());
      await dispatch(fetchUserDetails());
      await dispatch(featurePlans());
      await dispatch(fetchPlans({ countryId: "all" }));
    }
    fetchData();
  }, [dispatch]);
  return (
    <>
      <div className="min-h-screen bg-white">
        <HeroSection />

        <div className="bg-[#133365] p-5 text-[#FFFFFF]">
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
        <TrustedTravel />
        <FAQ />

      </div>
    </>
  );
}
