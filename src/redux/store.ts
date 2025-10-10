// store.ts
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import countrySlice from "./slice/CountrySlice"
import planSlice from "./slice/PlanSlice"
import userSlice from "./slice/UserSlice"
import faqSlice from "./slice/FaqSlice"
import orderSlice from "./slice/OrderSlice"
export const store = configureStore({
    reducer: {
        country: countrySlice,
        plan: planSlice,
        user: userSlice,
        faq: faqSlice,
        order: orderSlice
    },
});

// 🔹 Infer the root state and dispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 🔹 Typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
