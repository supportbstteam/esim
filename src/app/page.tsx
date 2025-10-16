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
import { fetchFaqs } from "@/redux/slice/FaqSlice";
import Countryplan from "@/components/home/Countryplan"
import { fetchCart } from "@/redux/slice/CartSlice";
export default function Home() {

  const dispatch = useAppDispatch();
  
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCountries());
      await dispatch(fetchUserDetails());
      await dispatch(fetchFaqs());
      await dispatch(featurePlans());
      await dispatch(fetchPlans({ countryId: "all" }));
   await dispatch(fetchCart());
      // const token = Cookies.get("token");
    }
    fetchData();
  }, [dispatch]);

  
  
  const { list } = useAppSelector((state) => state?.faq);
  // const {user} = useAppSelector(state => state?.user);
  
  // console.log("---- user -----", user);
  // console.log("----- list in the app/page.tsx ----", list);
  return (
    <>
      <div className="min-h-screen bg-white">
        <HeroSection />

        <div className="bg-[#133365] p-3 md:p-5 text-[#FFFFFF]">
          <Marquee
            items={[
              "Global Coverage",
              "Seamless Switching",
              "Instant Connectivity",
              "Cost-Effective Plans",
              "Secure & Reliable",
              "24/7 Support",
            ]}
            speed={1}
          />
        </div>

        {/* <Plan /> */}
        <Journey />
        {/* <TravelPlans /> */}
        <EasyStep />
        <Countryplan />
        <TrustedTravel />
        <FAQ faqs={list} />

      </div>
    </>
  );
}
