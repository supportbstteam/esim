"use client";
import React, { useEffect } from "react";
import FAQ from "@/components/home/Faq";
import { fetchFaqs } from "@/redux/slice/FaqSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchUserDetails } from "@/redux/slice/UserSlice";
import { fetchCountries } from "@/redux/thunk/thunk";
import { featurePlans } from "@/redux/thunk/planThunk";

function Faqs() {
    const dispatch = useAppDispatch();
    const { list, loading } = useAppSelector((state) => state.faq);

    useEffect(() => {
        dispatch(fetchCountries());
        dispatch(featurePlans());
        dispatch(fetchFaqs());
        dispatch(fetchUserDetails());
    }, [dispatch]);

    if (loading) {
        return <p className="text-center py-8 text-gray-500">Loading FAQs...</p>;
    }

    if (!list || list.length === 0) {
        return <p className="text-center py-8 text-gray-500">No FAQs available.</p>;
    }

    return (
        <div className="w-full  ">
            {/* <h1 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h1> */}
            <FAQ faqs={list} />
        </div>
    );
}

export default Faqs;
