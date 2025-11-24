"use client";
import { api } from "@/lib/api";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PaymentSection from "@/components/form/PaymentSection";
import { useAppDispatch } from "@/redux/store";
import { fetchUserDetails } from "@/redux/slice/UserSlice";
import toast from "react-hot-toast";
import ThankyouModal from "@/components/modals/ThankyouModal";
import LoadingModal from "@/components/cards/LoadingCard";
import { fetchCart } from "@/redux/slice/CartSlice";

export default function TopUpCheckOut() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useAppDispatch();
    const simId = searchParams.get("simId");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [esimData, setEsimData] = useState<any>(null);
    const [selectedValidity, setSelectedValidity] = useState<number>(esimData?.data[0]?.validityDays && esimData?.data[0]?.validityDays);
    const [showModal, setShowModal] = useState(false);
    // console.log("----- esimData.data[0]?.validityDays[0] - ------", esimData.data[0]?.validityDays);


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [selectedPlan, setSelectedPlan] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [payLoading, setPayLoading] = useState(false);
    const [showPaymentModule, setShowPaymentModule] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<any>(null);

    // client secret key and transaction id
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [transactionId, setTransactionId] = useState<any>(null);

    useEffect(() => {
        if (simId) {
            console.log("Sim ID passed from previous page:", simId);
            fetchEsimData(simId);
            dispatch(fetchUserDetails());
        }
    }, [simId, dispatch]);

    const fetchEsimData = async (id: string) => {
        try {
            setLoading(true);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const res: any = await api({ url: `/user/top-up?simId=${id}`, method: "GET" });
            console.log("----- response in the top up -----", res);
            setSelectedValidity(res?.data[0]?.validityDays);
            setEsimData(res);
            // Auto-select first plan if available
            if (res?.data && res.data.length > 0) {
                setSelectedPlan(res.data[0].id);
            }
        } catch (err) {
            console.error("Failed to fetch eSIM data", err);
        } finally {
            setLoading(false);
        }
    };

    const handleRecharge = () => {
        if (!selectedPlan) {
            alert("Please select a plan");
            return;
        }
        setShowPaymentModule(true);
        // Handle recharge logic here
        console.log("Recharging with plan:", selectedPlan);
    };

    // Get unique validity days for tabs
    const validityOptions = esimData?.data
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ? Array.from(new Set(esimData.data.map((item: any) => item.validityDays)))
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .sort((a: any, b: any) => a - b)
        : [];

    // Filter plans by selected validity
    const filteredPlans = esimData?.data?.filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item: any) => item.validityDays === selectedValidity
    ) || [];

    // Get selected plan details
    const selectedPlanData = esimData?.data?.find(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item: any) => item.id === selectedPlan
    );

    // console.log("---- top up ----", esimData);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading eSIM data...</p>
                </div>
            </div>
        );
    }

    if (!esimData) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-gray-600">No eSIM data found</p>
            </div>
        );
    }



    const handleProceed = async () => {
        if (!selectedPaymentMethod) {
            toast.error("Please select a payment method");
            return;
        }
        setPayLoading(true);
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const response: any = await api({
                method: "POST",
                url: "user/transactions/topup/initiate",
                data: {
                    topupId: selectedPlan,
                    esimId: simId,
                    paymentGateway: (selectedPaymentMethod?.id).toLowerCase().toString()
                }
            })

            if (response?.message === "Stripe top-up initiated") {
                setClientSecret(response?.clientSecret);
                setTransactionId({
                    id: response?.transaction?.id ?? "",
                    transactionId: response?.transaction?.transactionId ?? ""
                });
                // toast.success("Proceed with Stripe payment below");
            }
            // console.log("Top-up initiation response:", response);
        }
        catch (err) {
            console.error("Error initiating top-up:", err);
            toast.error("Failed to initiate top-up");
        }
        finally {
            setPayLoading(false);
        }
        return;
    }

    const handleSuccess = async () => {
        setShowModal(true);
        try {
            const response = await api({
                method: "POST",
                data: {
                    topupId: selectedPlan,
                    transactionId: transactionId?.id || "",
                    esimId: simId
                },
                url: "/user/top-up/purchase"
            });

            console.log("Top-up purchase response:", response);
            // setShowModal(true);
            toast.success("E-SIM Top-Up Successful!");
            setShowModal(false);
            await dispatch(fetchCart());
            console.log("dispatch t1");
            router.push(`/thank-you?mode=topup`);
        }
        catch (err) {
            console.error("Error completing top-up purchase:", err);
            toast.error("Failed to complete top-up purchase");
            router.push("/");
        }
        finally {
            setShowModal(false);
        }
    }

    // console.log("----- validation -----", validityOptions);


    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Sidebar - Last Recharge Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-100 rounded-2xl p-6 sticky top-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">
                                Your Last Recharge Plan
                            </h2>

                            {/* Country Info */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200 flex items-center justify-center bg-white">
                                    {/* Replace with actual flag */}
                                    <span className="text-2xl">🇹🇷</span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {esimData?.esim?.country?.name || "United States America"}
                                </h3>
                            </div>

                            {/* Details */}
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Data Allowance</span>
                                    <span className="text-sm font-medium text-gray-900">
                                        {esimData?.esim?.dataAmount} GB
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Validity</span>
                                    <span className="text-sm font-medium text-gray-900">
                                        {esimData?.esim?.validityDays} Days
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Starting Date</span>
                                    <span className="text-sm font-medium text-gray-900">
                                        {new Date(esimData?.esim?.startDate).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "2-digit",
                                        })}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Expire Date</span>
                                    <span className="text-sm font-medium text-gray-900">
                                        {new Date(esimData?.esim?.endDate).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "2-digit",
                                        })}
                                    </span>
                                </div>
                            </div>

                            {/* Total */}
                            <div className="pt-6 border-t border-gray-300">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-semibold text-gray-900">Total</span>
                                    <span className="text-lg font-bold text-gray-900">
                                        ${selectedPlanData?.price || esimData?.esim?.price}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Recharge Plans */}
                    {
                        showPaymentModule ? (
                            <div className="lg:col-span-2"> {/* Use same column span as plans */}
                                <PaymentSection
                                    loading={payLoading}
                                    clientSecret={clientSecret}
                                    transaction={transactionId?.id}
                                    transactionId={transactionId?.transactionId || null}
                                    onSuccess={handleSuccess}
                                    selectedMethod={selectedPaymentMethod}
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    onSelect={(value: any) => {
                                        // console.log("Selected payment method:", value);
                                        setSelectedPaymentMethod(value);
                                    }}
                                    onProceed={handleProceed}
                                    onBack={() => setShowPaymentModule(false)}
                                />
                            </div>
                        ) : (
                            <div className="lg:col-span-2">
                                <div className="bg-white rounded-2xl shadow-sm p-6">
                                    {/* Header */}
                                    <div className="mb-6">
                                        <button
                                            onClick={() => router.back()}
                                            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
                                        >
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                                />
                                            </svg>
                                            Back
                                        </button>
                                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                            Your Recharge Plan
                                        </h1>
                                        <p className="text-gray-600">
                                            Recharge your eSIM in seconds and keep exploring without interruption.
                                        </p>
                                    </div>

                                    {/* Validity Tabs */}
                                    <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                                        {
                                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                            validityOptions.map((days: any) => (
                                                <button
                                                    key={days}
                                                    onClick={() => {
                                                        setSelectedValidity(days);
                                                        // Auto-select first plan of this validity
                                                        const firstPlan = esimData?.data?.find(
                                                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                                            (item: any) => item.validityDays === days
                                                        );
                                                        if (firstPlan) setSelectedPlan(firstPlan.id);
                                                    }}
                                                    className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${selectedValidity === days
                                                        ? "bg-green-50 text-green-600 border-2 border-green-500"
                                                        : "bg-gray-50 text-gray-700 border-2 border-transparent hover:bg-gray-100"
                                                        }`}
                                                >
                                                    {days < 100 ? `${days} Days` : "Unlimited Data"}
                                                </button>
                                            ))}
                                    </div>

                                    {/* Plan Cards */}
                                    <div className="space-y-3 mb-6">
                                        {
                                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                            filteredPlans.map((plan: any) => (
                                                <button
                                                    key={plan.id}
                                                    onClick={() => setSelectedPlan(plan.id)}
                                                    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${selectedPlan === plan.id
                                                        ? "border-green-500 bg-green-50"
                                                        : "border-gray-200 bg-white hover:border-gray-300"
                                                        }`}
                                                >
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-lg font-semibold text-gray-900">
                                                            {plan.title || `${plan.dataLimit} GB`}
                                                        </span>
                                                        <span className="text-lg font-bold text-gray-900">
                                                            ${plan.price}
                                                        </span>
                                                    </div>
                                                </button>
                                            ))}
                                    </div>

                                    {/* Recharge Button */}
                                    <button
                                        onClick={handleRecharge}
                                        disabled={!selectedPlan}
                                        className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl transition-colors text-lg"
                                    >
                                        Recharge Now
                                    </button>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>

            <LoadingModal
                open={showModal}
            />
        </div>
    );
}
