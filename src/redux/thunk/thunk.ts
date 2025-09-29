// src/redux/thunks/countryThunks.ts
import { api } from "@/lib/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
export const fetchCountries = createAsyncThunk(
    "countries/fetchCountries",
    async (_, { rejectWithValue }) => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const response: any = await api({
                url: "/user/country",
                method: "GET",
            });

            if (response?.success) {
                return response?.data;
            }
            return null;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to fetch countries"
            );
        }
    }
);
