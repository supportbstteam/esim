
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { Device, UserDeviceQuery, UserDeviceResponse } from "../../types/DevicesTypes";
import { api } from "@/lib/api";
import { Device, UserDeviceQuery, UserDeviceResponse } from "../thunk/DeviceTypes";



export const fetchUserDevices = createAsyncThunk(
    "userDevices/fetch",
    async (query: UserDeviceQuery, { rejectWithValue }) => {
        try {

            // console.log("-=-=- hit -=-=");
            return await api<UserDeviceResponse>({
                url: "/user/devices",     // <-- your public route
                method: "GET",
                params: query,
                isAuth: false,
            });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            return rejectWithValue(err.response?.data);
        }
    }
);

interface State {
    list: Device[];
    page: number;
    pages: number;
    total: number;
    limit: number;
    loading: boolean;
    error?: string;
}

const initialState: State = {
    list: [],
    page: 1,
    pages: 1,
    total: 0,
    limit: 12,

    loading: false,
};

const slice = createSlice({
    name: "userDevices",
    initialState,
    reducers: {},

    extraReducers: (builder) => {

        builder

            .addCase(fetchUserDevices.pending, (s) => {
                s.loading = true;
            })

            .addCase(fetchUserDevices.fulfilled, (s, a) => {
                s.loading = false;   // ⭐ MISSING

                const incoming = a.payload.data;

                if (a.payload.page === 1)
                    s.list = incoming;
                else
                    s.list = [...s.list, ...incoming];

                s.page = a.payload.page;
                s.pages = a.payload.pages;
                s.total = a.payload.total;
                s.limit = a.payload.limit;
            })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .addCase(fetchUserDevices.rejected, (s, a: any) => {
                s.loading = false;
                s.error = a.payload?.message || "Fetch failed";
            });

    }
});

export default slice.reducer;