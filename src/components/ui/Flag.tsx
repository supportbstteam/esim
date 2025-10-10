// components/Flag.tsx
"use client";
import React, { useEffect, useState } from "react";
import  Image  from "next/image";
type FlagProps = {
  countryName?: string;
  iso2?: string; // optional if you already have 2-letter code like "IN", "US"
  className?: string;
  size?: number; // px (used for style only when showing placeholder/emoji)
};

type CacheEntry = { code: string | null; ts: number };
const isoCache = new Map<string, CacheEntry>(); // countryName -> {code, ts}
const CACHE_TTL = 1000 * 60 * 60 * 24; // 24 hours

// small manual map for common messy names
const MANUAL_MAP: Record<string, string> = {
  "usa": "us",
  "u.s.a.": "us",
  "us": "us",
  "united states": "us",
  "uk": "gb", // restcountries uses "United Kingdom" -> GB
  "south korea": "kr",
  "korea": "kr",
  "north korea": "kp",
  "russia": "ru",
  "ivory coast": "ci",
  "côte d'ivoire": "ci",
  "vietnam": "vn",
  "united states of america": "us",
  "u.s.": "us",
};

export default function Flag({ countryName, iso2, className = "", size = 18 }: FlagProps) {
  const [code, setCode] = useState<string | null>(iso2 ? iso2.toLowerCase() : null);
  const [loading, setLoading] = useState<boolean>(!iso2 && !!countryName);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    // If iso2 prop is present use it immediately
    if (iso2) {
      setCode(iso2.toLowerCase());
      setLoading(false);
      return;
    }
    if (!countryName) {
      setCode(null);
      setLoading(false);
      return;
    }

    const key = countryName.trim().toLowerCase();

    // manual map hit?
    if (MANUAL_MAP[key]) {
      setCode(MANUAL_MAP[key]);
      setLoading(false);
      return;
    }

    // cached?
    const cached = isoCache.get(key);
    if (cached && Date.now() - cached.ts < CACHE_TTL) {
      setCode(cached.code);
      setLoading(false);
      return;
    }

    let cancelled = false;
    const fetchIso = async () => {
      setLoading(true);
      try {
        // try exact name first (fullText)
        let res = await fetch(
          `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}?fullText=true`
        );
        if (!res.ok) {
          // fallback search
          res = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}`);
        }
        if (!res.ok) {
          // no result
          console.warn(`Flag: restcountries lookup failed for "${countryName}" with status ${res.status}`);
          isoCache.set(key, { code: null, ts: Date.now() });
          if (!cancelled) setCode(null);
          return;
        }
        const data = await res.json();
        const cca2 = data?.[0]?.cca2;
        if (cca2) {
          const lower = cca2.toLowerCase();
          isoCache.set(key, { code: lower, ts: Date.now() });
          if (!cancelled) setCode(lower);
          return;
        }
        // fallback: try looking for cca2 in other entries
        for (const entry of data || []) {
          if (entry?.cca2) {
            isoCache.set(key, { code: entry.cca2.toLowerCase(), ts: Date.now() });
            if (!cancelled) setCode(entry.cca2.toLowerCase());
            return;
          }
        }
        console.warn(`Flag: no cca2 found in restcountries response for "${countryName}"`);
        isoCache.set(key, { code: null, ts: Date.now() });
        if (!cancelled) setCode(null);
      } catch (err) {
        console.warn("Flag: error fetching ISO2 for", countryName, err);
        isoCache.set(key, { code: null, ts: Date.now() });
        if (!cancelled) setCode(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchIso();

    return () => {
      cancelled = true;
    };
  }, [countryName, iso2]);

  // Use flagcdn SVG which doesn't require size-in-path and rarely 404s:
  const svgUrl = code ? `https://flagcdn.com/${code}.svg` : null;

  // If image failed or no URL resolved -> fallback
  if (imgError) {
    const initials =
      countryName
        ? countryName
            .split(" ")
            .map((w) => (w[0] || ""))
            .filter(Boolean)
            .slice(0, 2)
            .join("")
            .toUpperCase()
        : "🏳️";
    return (
      <div
        className={`inline-flex items-center justify-center bg-gray-100 text-gray-700 ${className}`}
        style={{
          width: size,
          height: size,
          fontSize: Math.max(10, Math.floor(size * 0.6)),
          borderRadius: 4,
        }}
        title={countryName}
      >
        {initials}
      </div>
    );
  }

  if (loading || !svgUrl) {
    // placeholder while resolving
    return (
      <div
        className={`bg-gray-100 rounded-sm ${className}`}
        style={{ width: size, height: size }}
        aria-hidden
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <div className={` rounded-full overflow-hidden ${className}`}>
    <Image
      src={svgUrl}
      alt={`${countryName || "country"} flag`}
      width={size}
      height={size}
      className="h-full object-cover object-[-2px]"
      onError={() => {
        console.warn(`Flag: failed to load flag svg: ${svgUrl}`);
        setImgError(true);
      }}
    />
    </div>
  );
}
