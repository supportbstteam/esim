import { createSlice } from "@reduxjs/toolkit";
import { Brand } from "../thunk/DeviceTypes";
import { fetchUserBrands } from "../thunk/BrandsThunks";

interface State {
    list: Brand[];
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
    limit: 50,
    loading: false,
};

const slice = createSlice({
    name: "userBrands",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchUserBrands.pending, (s) => {
                s.loading = true;
            })

            .addCase(fetchUserBrands.fulfilled, (s, a) => {
                s.loading = false;
                s.list = a.payload.data;
                s.page = a.payload.page;
                s.pages = a.payload.pages;
                s.total = a.payload.total;
                s.limit = a.payload.limit;
            })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .addCase(fetchUserBrands.rejected, (s, a: any) => {
                s.loading = false;
                s.error = a.payload?.message;
            });
    },
});

export default slice.reducer;
