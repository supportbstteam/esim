import { api } from "@/lib/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPageBySlug = createAsyncThunk(
    "cms/fetchPage",
    async ({page, type="pages"}:{page:string, type:string}, { rejectWithValue }) => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const res: any = await api({
                url: `/user/cms/${type}/${page}`,
                method: "GET",
            });
            
            return res;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            return rejectWithValue(
                err?.response?.data?.message || err.message
            );
        }
    }
);

export const fetchAllPages = createAsyncThunk(
    "cms/fetchAllPages",
    async (_, { rejectWithValue }) => {
        try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const res: any = await api({
            url: `/user/cms/pages`,
            method: "GET",
        });

        // console.log("-=-=-=--= response in the fetall pages -=-=--=-=-=", res);
        return res;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || err.message
      );
    }
  }
);