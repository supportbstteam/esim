import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/lib/api";

interface FetchPlansArgs {
    countryId?: string;
}

export const fetchPlans = createAsyncThunk(
    "plans/fetchPlans",
    async ({ countryId }: FetchPlansArgs = {}, { rejectWithValue }) => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const res = await api<{ success: boolean; data: any[] }, { countryId?: string }>({
                url: "/user/plans",
                method: "GET",
                params: { countryId: countryId || "all" }, // ✅ pass as object
            });

            return res.data;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Failed to fetch plans");
        }
    }
);
