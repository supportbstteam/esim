"use client";
import { useNavigate } from "@/components/hooks/navigation";
import AuthModal from "@/components/modals/AuthModal";
import { fetchUserDetails } from "@/redux/slice/UserSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchPlans } from "@/redux/thunk/planThunk";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaFire } from "react-icons/fa";
import Flag from "@/components/ui/Flag";
type CountryDetailsProps = {
    params: Promise<{ id: string }>; // 👈 params is now a Promise
};

export default function CountryDetails({ params }: CountryDetailsProps) {
    const navigation = useNavigate();
    const { id } = React.use(params);
    const dispatch = useAppDispatch();
    const { user, isAuth } = useAppSelector((state) => state?.user);
    const { plans } = useAppSelector((state) => state?.plan);

    // keep track of selected plan
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
    const [isAuthModal, setIsAuthModal] = useState(false);

    useEffect(() => {
        const fetchPlanDetails = async () => {
            await dispatch(fetchPlans({ countryId: id }));
            await dispatch(fetchUserDetails());
        };
        fetchPlanDetails();
    }, [user?.id]);

    // console.log("---- is auth ----", isAuth);
    const handleAddToCart = async () => {
        if (!isAuth) {
            setIsAuthModal(true);
        } else {

            // console.log("---- selected plan ---", selectedPlan)
            if (!selectedPlan) toast.error("Please select a plan first.");

            // navigate to checkout page with query params
            navigation(`/country/checkout?plan=${selectedPlan}&country=${id}`);
        }
    };


    const handleAuthSuccess = async () => {
        toast.success("Login Successful");
        await dispatch(fetchUserDetails());
    };

    // console.log("---- plans in the e sim ----", plans);

    return (
        <div className="flex w-full container mt-12 pb-6 gap-6">
            {/* Left side (maybe country details later) */}
            <div className="flex flex-col md:w-[40%]  border-gray-300 pr-4">
                <div className="flex gap-2">
                    <Flag
                        countryName={plans[0]?.country?.name}
                        size={36}
                        className="h-[36px] w-[36px]"
                    />
                    <h3 className="text-3xl font-bold " >{plans && plans.length > 0 && plans[0]?.country?.name}</h3>
                </div>
                <div className="subtext !text-[16px] mt-8">
                    Get a single global eSIM and enjoy seamless, reliable coverage with flexible data plans to stay connected anytime, anywhere.
                </div>
            </div>

            {/* Plans Section */}
            <div className="flex flex-col border-2 px-8 py-6 rounded-xl md:w-[60%]">
                {plans && plans.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {plans.map((item) => {
                            // console.log("--- item in the country id plan ---", item);
                            const isSelected = selectedPlan === item.id;
                            return (
                                <label
                                    key={item.id}
                                    htmlFor={item.id}
                                    className={`relative cursor-pointer border rounded-xl p-4 transition-all duration-300 
                    ${isSelected
                                            ? "border-green-500 bg-green-50 shadow-md"
                                            : "border-gray-300 hover:border-green-500"
                                        }`}
                                >
                                    {/* radio input */}
                                    <input
                                        type="radio"
                                        name="plan"
                                        id={item.id}
                                        value={item.id}
                                        checked={isSelected}
                                        onChange={() => setSelectedPlan(item.id)}
                                        className="absolute top-3 left-3 w-4 h-4 accent-green-600"
                                    />

                                    {/* featured label */}
                                    {item.isFeatured && (
                                        <span className="absolute top-3 right-3 text-l flex items-center bg-black text-white px-2 py-0.5 rounded-full">
                                            <FaFire className=" text-[#eebe3c] mr-1" />
                                            Popular
                                        </span>
                                    )}

                                    {/* Plan Info */}
                                    <div className="mt-6 flex justify-content-between items-end">
                                        <div className="font-semibold flex-3 text-gray-900">
                                            {item.title}
                                        </div>
                                        <div className="mt-2 flex-1 font-bold text-gray-800">
                                            {item.price} {item.currency === "USD" ? "$" : item?.currency}
                                        </div>
                                    </div>
                                </label>
                            );
                        })}
                    </div>
                ) : (
                    <p className="text-gray-500">No plans available for this country.</p>
                )}
                <button onClick={handleAddToCart} className="w-full bg-green-400 p-4 rounded-2xl mt-5 " >
                    <h3 className="text-xl" >Buy Now</h3>
                </button>
            </div>
            <AuthModal isOpen={isAuthModal} onClose={() => setIsAuthModal(false)} onAuthSuccess={handleAuthSuccess} />
        </div>
    );
}
