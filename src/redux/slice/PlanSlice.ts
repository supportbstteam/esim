// src/redux/slices/planSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPlans } from "../thunk/planThunk";

export interface Plan {
  id: string;
  title: string;
  name: string;
  data: number;
  call: number;
  sms: number;
  isUnlimited: boolean;
  validityDays: number;
  price: string;
  currency: string;
  planId: number;
  country: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface PlanState {
  plans: Plan[];
  loading: boolean;
  error: string | null;
}

const initialState: PlanState = {
  plans: [],
  loading: false,
  error: null,
};

const planSlice = createSlice({
  name: "plans",
  initialState,
  reducers: {
    clearPlans(state) {
      state.plans = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlans.fulfilled, (state, action: PayloadAction<Plan[]>) => {
        state.loading = false;
        state.plans = action.payload;
      })
      .addCase(fetchPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Something went wrong";
      });
  },
});

export const { clearPlans } = planSlice.actions;
export default planSlice.reducer;
