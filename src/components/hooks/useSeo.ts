"use client";

import { useEffect } from "react";

interface SEOProps {
  metaTitle?: string | null;
  metaDescription?: string | null;
  metaKeywords?: string[] | null;
  name?: string;
}

export const useSEO = (seo?: SEOProps | null) => {
  useEffect(() => {
    if (!seo) return;

    const title = seo.metaTitle || seo.name || "";

    // set title
    document.title = title;

    const setMeta = (name: string, content?: string) => {
      if (!content) return;

      // remove old
      const existing = document.querySelectorAll(`meta[name="${name}"]`);

      existing.forEach((el) => el.remove());

      // add new
      const meta = document.createElement("meta");
      meta.setAttribute("name", name);
      meta.setAttribute("content", content);

      document.head.appendChild(meta);
    };

    setMeta("description", seo.metaDescription || "");

    setMeta(
      "keywords",
      Array.isArray(seo.metaKeywords)
        ? seo.metaKeywords.join(", ")
        : seo.metaKeywords || "",
    );

    // optional OG tags
    setMeta("og:title", title);
    setMeta("og:description", seo.metaDescription || "");
  }, [seo]);
};
