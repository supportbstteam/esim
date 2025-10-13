// DynamicPageClient.tsx
"use client";

import { api } from "@/lib/api";
import React, { useEffect, useState } from "react";

interface Props {
    page: string;
}

export default function DynamicPageClient({ page }: Props) {

    // console.log("---- page dynamic client ----", page);
    const [content, setContent] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const title = page
        .split(/[-_]/)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");

        // console.log("url",`/user/cms/content/${page.split(/[-_]/)[0].toLowerCase()}`)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await api<{ html: string }>({
                    url: `/user/cms/content/${page.split(/[-_]/)[0].toLowerCase()}`,
                    // url: `/user/cms/content/${page.split(/[-_]/)[0].toLowerCase()}`,
                    method: "GET",
                });

                setContent(response.html || "");
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err: any) {
                console.error(err);
                setError("Comming Soon");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [page]);

    return (
        <div className="p-4 container ">
            <h1 className="text-2xl font-bold mb-4">{title}</h1>
            {loading && <p>Loading...</p>}
            {error && <p className="subtext">{error}</p>}
            {!loading && !error && (
                <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            )}
        </div>
    );
}
