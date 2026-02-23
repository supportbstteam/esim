import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/lib/api";
import { Brand } from "./DeviceTypes";

export const fetchUserBrands = createAsyncThunk(
    "userBrands/fetch",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (params: any, { rejectWithValue }) => {
        try {
            const res = await api<{
                data: Brand[];
                page: number;
                pages: number;
                total: number;
                limit: number;
            }>({
                url: "/user/brands",
                method: "GET",
                params,
                isAuth: false,
            });

            console.log("-=-=-= brands -=-=--=-",res);

            // console.log("-=-=-= brnads in the mobile -=-=-=", res);
            return res;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {

            console.log("-=-=- Error in the fetch user brands -=-=-=-",err);
            return rejectWithValue(err.response?.data);
        }
    }
);
