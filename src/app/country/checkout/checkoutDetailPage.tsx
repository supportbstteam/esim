"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { addToCart, removeCartItem, fetchCart, updateCartItem } from "@/redux/slice/CartSlice";
import { fetchUserDetails } from "@/redux/slice/UserSlice";
import { api } from "@/lib/api";
import debounce from "lodash/debounce";
import toast from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa6";
import Flag from "@/components/ui/Flag";
import AuthModal from "@/components/modals/AuthModal";
import OrderModal from "@/components/modals/orderModal";
import PaymentMethods, { PaymentMethod } from "@/components/common/PaymentMethods";
import { RiDeleteBinLine } from "react-icons/ri";
// Stripe
import { Elements, useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeForm from "@/components/form/StripeForm";
import { useNavigate } from "@/components/hooks/navigation";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutDetailPage() {
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { cart }: any = useAppSelector((state) => state.cart);

  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [esimData, setEsimData] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [transactionData, setTransactionData] = useState<any>(null);
  const [errorState, setErrorState] = useState<string | null>(null);
  const [showlogin, setShowlogin] = useState(false);
  const [transactionId, setTransactionId] = useState<string>("")
  // const params = useSearchParams();

  console.log("---- cart----", cart);

  // ✅ Fetch cart & user details
  const fetchCartData = async () => {
    try {
      await dispatch(fetchCart());
      await dispatch(fetchUserDetails());
      // await dispatch(removeCartItem());
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, [dispatch]);

  // ✅ Debounced cart quantity update
  const debouncedUpdateCart = useCallback(
    debounce(async (cartItemId: string, newQty: number) => {
      try {
        await dispatch(updateCartItem({ cartItemId, quantity: newQty })).unwrap();
        await dispatch(fetchCart());
      } catch (err) {
        toast.error("Failed to update quantity");
      }
    }, 400),
    [dispatch]
  );
  // Handle deleting a cart item
  const handleDeleteItem = async (cartItemId: string) => {
    try {
      setLoading(true); // optional, show loading state
      await dispatch(removeCartItem(cartItemId))
      toast.success("Item removed from cart");
    } catch (err) {
      console.error("Failed to delete cart item:", err);
      toast.error("Failed to remove item");
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (itemId: string, newQty: number) => {
    if (newQty < 1) return;
    debouncedUpdateCart(itemId, newQty);
  };

  const handleBack = () => router.back();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const grandTotal = cart?.items?.reduce((sum: number, item: any) => {
    const price = parseFloat(item?.plan?.price || "0");
    return sum + price * (item?.quantity || 1);
  }, 0);

  const handlePaymentSelect = (method: PaymentMethod) => {
    setSelectedMethod(method);
  };

  // ✅ COD payment
  const handleCODPayment = async () => {
    setLoading(true);
    try {
      const res = await api({
        url: "/user/transactions/cod/initiate",
        method: "POST",
      });
      toast.success("COD transaction completed successfully!");
      console.log("COD:", res);
    } catch (error) {
      console.error("COD Payment failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Initiate Stripe PaymentIntent
  const initiateStripePayment = async () => {
    setLoading(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res = await api<{ clientSecret: string; transaction: any }>({
        url: "/user/transactions/stripe/initiate",
        method: "POST",
      });

      // console.log("---- resoponse in the res online stipe ----", res);

      if (!res.clientSecret) {
        toast.error("Failed to get client secret");
        return;
      }

      setClientSecret(res?.clientSecret);
      setTransactionId(res?.transaction?.id);
      toast.success("Proceed with Stripe payment below");
    } catch (error) {
      console.error("Stripe initiation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Proceed button handler
  const handleProceed = async () => {
    if (!selectedMethod) {
      toast.error("Please select a payment method");
      return;
    }

    if (selectedMethod.id === "cod") {
      await handleCODPayment();
    } else if (selectedMethod.id === "stripe") {
      await initiateStripePayment();
    }
  };

  const handleOnSuccess = async () => {
    // console.log("-- succes --");
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response: any = await api({
        method: "POST",
        url: "/user/order/",
        data: {
          transactionId
        }
      });

      console.log("---- response in the place order -----", response);

      if (response?.message === "Order completed successfully") {
        toast.success(response?.message);
        setEsimData(response?.order);
        setTransactionData(response?.order?.transaction);
        setModalOpen(true);
      }
      else {
        setErrorState(response?.message);
      }

    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (err: any) {
      console.error("Erorr in the place order after stripe success", err);
      setErrorState(err);
    }
  }

  console.log("----- esim data -----", esimData);

  return (
    <div className="container my-10">
      <div className="flex flex-col lg:flex-row w-full gap-6">
        {/* 🧺 ORDER SUMMARY */}
        <div className="flex-1/3 bg-[#F3F5F7] rounded-xl shadow py-4 px-5 md:px-8 md:py-6">
          <h2 className="h2 font-semibold !text-[20px] mb-4">Your Cart</h2>

          {cart?.items?.length > 0 ? (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            cart.items.map((item: any, index: number) => {

              // console.log("----- item ----", item);
              return (
                <div key={item.id || index} className="bg-white rounded-lg shadow-sm p-4 mb-4 border">
                  <div className="flex items-center mb-3 justify-between">
                    <div className="flex items-center ">
                      <Flag
                        countryName={item?.plan?.country?.name || "Country"}
                        size={36}
                        className="h-[36px] w-[36px] mr-2"
                      />
                      <span className="font-medium text-base">{item?.plan?.country?.name || "Unknown Country"}</span>
                    </div>
                    <RiDeleteBinLine className="text-red-500  cursor-pointer" onClick={() => handleDeleteItem(item.id)} />
                  </div>

                  <div className="space-y-2 text-[15px] text-gray-700">
                    <div className="flex justify-between">
                      <span>Plan Name</span>
                      <span className="font-medium">{item?.plan?.title || item?.plan?.name}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Data Allowance</span>
                      <span>{item?.plan?.data || "—"} GB</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Validity</span>
                      <span>{item?.plan?.validityDays || "—"} Days</span>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      <span>Quantity</span>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="px-3 py-1 border rounded-md hover:bg-gray-100 text-lg font-semibold"
                        >
                          −
                        </button>
                        <span className="w-6 text-center">{item?.quantity || 1}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="px-3 py-1 border rounded-md hover:bg-gray-100 text-lg font-semibold"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between font-semibold border-t pt-2 mt-2">
                      <span>Subtotal</span>
                      <span>${(parseFloat(item?.plan?.price || "0") * (item?.quantity || 1)).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <p className="text-gray-500">No items in cart</p>
          )}

          {cart?.items?.length > 0 && (
            <div className="mt-6 border-t pt-4 flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${grandTotal?.toFixed(2)}</span>
            </div>
          )}
        </div>

        {/* 💳 PAYMENT SECTION */}
        {
          cart && cart?.items?.length > 0 &&
          <div className="flex-2/3 bg-white rounded-xl shadow px-5 md:px-8 py-6">
            <button
              onClick={handleBack}
              className="mb-3 text-sm subtext hover:text-gray-700 flex items-center gap-2"
            >
              <FaArrowLeft />
              <span>Back</span>
            </button>

            <h3 className="font-semibold text-lg mb-6">Choose Payment Method</h3>
            <PaymentMethods onSelect={handlePaymentSelect} defaultMethodId="stripe" />

            <div className="my-6">
              <button
                onClick={handleProceed}
                disabled={loading}
                className="bg-black text-white px-6 py-3 rounded-md w-full hover:bg-gray-800 transition"
              >
                {loading ? "Processing..." : "Proceed to Pay"}
              </button>
            </div>

            {/* Stripe Form */}
            {selectedMethod?.id === "stripe" && clientSecret && transactionId && (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <StripeForm clientSecret={clientSecret} transactionId={transactionId} onSuccess={handleOnSuccess} />
              </Elements>
            )}
          </div>
        }
      </div>

      {/* Modals */}
      <OrderModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          navigation("/");
        }}
        esimData={esimData}
        // transactionData={transactionData}
        isLoading={loading}
        errorState={errorState}
      />

      {showlogin && (
        <AuthModal
          isOpen={showlogin}
          onClose={() => setShowlogin(false)}
          onAuthSuccess={() => setShowlogin(false)}
        />
      )}
    </div>
  );
}
