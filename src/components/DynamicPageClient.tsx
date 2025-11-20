"use client";

import { api } from "@/lib/api";
import { fetchUserDetails } from "@/redux/slice/UserSlice";
import { useAppDispatch } from "@/redux/store";
import React, { useEffect, useState } from "react";
import TrustedTravel from '@/components/home/TrustedTravel';
import FAQ from "@/components/home/Faq";
import { fetchFaqs } from "@/redux/slice/FaqSlice";
import { useAppSelector } from "@/redux/store";
import { EasyStep } from "./home/EasyStep";
interface Props {
    page: string;
}

export default function DynamicPageClient({ page }: Props) {
    const [content, setContent] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useAppDispatch();
    const title = page
        .split(/[-_]/)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");

    useEffect(() => {
        dispatch(fetchUserDetails());
        const fetchData = async () => {
            // await dispatch(fetchUserDetails());
            setLoading(true);
            setError(null);
            try {
                const response = await api<{ html: string }>({
                    url: `/user/cms/content/${page.split(/[-_]/)[0].toLowerCase()}`,
                    method: "GET",
                });

                setContent(response.html || "");
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err: any) {
                console.error(err);
                setError("Coming Soon");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [page]);
    useEffect(() => {
        dispatch(fetchFaqs());
    }, [dispatch]);
    const { list } = useAppSelector((state) => state?.faq);
    return (
        <div>
            <div className="p-4 container">
                <h1 className={`${title === 'How It Works' || title === 'Help Center' ? 'text-center' : 'text-start'} h1 font-bold mb-4 mt-5 md:mt-12`}>
                    {title === 'Help Center' || title === 'Device Compatibility' || title === 'Troubleshooting' || title === 'Setup Guide' || title === 'Feature' ? '' : title}
                </h1>

                {loading && (
                    <div className="space-y-3 animate-pulse">
                        <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
                        <div className="h-4 w-full bg-gray-300 rounded"></div>
                        <div className="h-4 w-full bg-gray-300 rounded"></div>
                        <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
                        <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
                    </div>
                )}

                {error && <p className="subtext">{error}</p>}

                {!loading && !error && (
                    <div
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                )}
            </div>
            {title === 'How It Works' ? <EasyStep /> : ''}
            {title === 'Terms And Conditions' || 'Privacy Policy'
                ?
                (<div className="mt-8 md:mt-15">
                    <TrustedTravel />
                    <FAQ faqs={list} />
                </div>) : (<div></div>)
            }

        </div>
    );
}
