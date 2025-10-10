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
