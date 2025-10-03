"use client";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchPlans } from "@/redux/thunk/planThunk";
import React, { useEffect, useState } from "react";
import { FaFire } from "react-icons/fa";

type CountryDetailsProps = {
    params: {
        id: string;
    };
};

export default function CountryDetails({ params }: CountryDetailsProps) {
    const { id } = params;
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state?.user);
    const { plans } = useAppSelector((state) => state?.plan);

    // keep track of selected plan
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

    useEffect(() => {
        const fetchPlanDetails = async () => {
            await dispatch(fetchPlans({ countryId: id }));
        };
        fetchPlanDetails();
    }, [user?.id]);

    console.log("---- selected plan ----", selectedPlan);

    return (
        <div className="flex w-full p-6 gap-6">
            {/* Left side (maybe country details later) */}
            <div className="flex-[2] border-r border-gray-300 pr-4">
                <h2 className="text-xl font-semibold">Country Info</h2>
            </div>

            {/* Plans Section */}
            <div className="flex-[3]">
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
                <button className="w-full bg-green-400 p-4 rounded-2xl mt-5 " >
                    <h3 className="text-xl" >Add to cart</h3>
                </button>
            </div>
        </div>
    );
}
