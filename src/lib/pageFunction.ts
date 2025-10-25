import { api } from "@/lib/api";
import toast from "react-hot-toast";

interface UserOrderData {
    planId: string;
    //   paymentMethod?: string;
    //   countryId?: string;
}

export const userOrder = async (
    value: UserOrderData,
    setIsLoading: (loading: boolean) => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
    try {
        setIsLoading(true);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response: any = await api({
            url: "/user/order",
            data: value,
            method: "POST",
        });

        console.log("---- response in the place order SIM -----", response);

        if (response?.status === "success") {
            toast.success("Order placed successfully!");
            return response;
        } else {
            toast.error(response?.message || "Failed to place the order");
            return null;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        console.error("---error---", err);
        toast.error(err?.response?.statusText || "An error occurred while placing the order");
        return null;
    } finally {
        setIsLoading(false);
    }
};


// Define the type for transaction data (adjust as needed)
interface TransactionData {
    id?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

interface InitiateStripePaymentProps {
    setLoading: (loading: boolean) => void;
    setClientSecret: (clientSecret: string) => void;
    setTransactionId: (transactionId: string) => void;
}

export const initiateStripePayment = async ({
    setLoading,
    setClientSecret,
    setTransactionId,
}: InitiateStripePaymentProps) => {
    setLoading(true);

    try {
        const res = await api<{ clientSecret: string; transaction: TransactionData }>({
            url: "/user/transactions/stripe/initiate",
            method: "POST",
        });

        if (!res.clientSecret) {
            toast.error("Failed to get client secret");
            return;
        }

        setClientSecret(res.clientSecret);
        setTransactionId(res.transaction?.id || "");
        toast.success("Proceed with Stripe payment below");
    } catch (error) {
        console.error("Stripe initiation failed:", error);
        toast.error("Stripe initiation failed");
    } finally {
        setLoading(false);
    }
};