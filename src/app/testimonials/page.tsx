"use client";

import MainBanner from "@/components/ui/MainBanner";
import QuoteCard from "@/components/ui/QuoteCard";
import { getAllTestimonials } from "@/redux/slice/TestimonialSlice";
import { fetchUserDetails } from "@/redux/slice/UserSlice";
import { fetchCountries } from "@/redux/thunk/thunk";
import { useAppDispatch, useAppSelector } from "@/redux/store";

import React, { useEffect, useMemo, useRef, useCallback } from "react";
import Faqs from "../faq/page";
import { fetchFaqs } from "@/redux/slice/FaqSlice";
import FAQ from "@/components/home/Faq";

const Testimonials = () => {
    const dispatch = useAppDispatch();

    const { loading, testimonials, pagination } = useAppSelector(
        (state) => state.testimonials
    );
    const { list } = useAppSelector(state => state.faq);

    const observerRef = useRef<HTMLDivElement | null>(null);

    // ✅ Initial load
    useEffect(() => {
        dispatch(fetchCountries());
        dispatch(fetchUserDetails());
        dispatch(fetchFaqs());
        dispatch(getAllTestimonials({ page: 1, limit: 10 }));
    }, [dispatch]);

    // ✅ Load more function
    const loadMore = useCallback(() => {
        if (loading) return;
        if (!pagination?.hasNextPage) return;

        dispatch(
            getAllTestimonials({
                page: pagination.page + 1,
                limit: pagination.limit,
            })
        );
    }, [dispatch, pagination, loading]);

    // ✅ Intersection observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadMore();
                }
            },
            {
                threshold: 1,
            }
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => observer.disconnect();
    }, [loadMore]);

    // ✅ Memoize testimonials
    const memoTestimonials = useMemo(() => {
        return testimonials || [];
    }, [testimonials]);

    return (
        <div>
            <MainBanner />

            <div className="text-center mt-10 mb-5" >
                <div className="font-bold text-4xl " >
                    What our Customers Say
                </div>

                <div className="text-gray-500" >
                    Real stories from travelers staying connected accross 200+ countries.
                </div>
            </div>

            {/* ✅ Grid layout: 2 per row */}
            <div className="max-w-7xl  mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                {memoTestimonials.map((item) => (
                    <QuoteCard key={item.id} {...item} className="w-full" />
                ))}
            </div>

            {/* ✅ Loading indicator */}
            {loading && (
                <div className="text-center py-6 text-gray-500">
                    Loading more testimonials...
                </div>
            )}


            <FAQ faqs={list.slice(0, 3)} />

            {/* ✅ Observer trigger */}
            <div ref={observerRef} className="h-10" />
        </div>
    );
};

export default Testimonials;