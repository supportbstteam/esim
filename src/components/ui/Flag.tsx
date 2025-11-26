// components/Flag.tsx
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

type FlagProps = {
  countryName?: string;
  iso2?: string;
  className?: string;
  size?: number;
};

type CacheEntry = { code: string | null; ts: number };
const isoCache = new Map<string, CacheEntry>();
const CACHE_TTL = 1000 * 60 * 60 * 24; // 24 hours

// Fix common names
const MANUAL_MAP: Record<string, string> = {
  usa: "us",
  "u.s.a.": "us",
  us: "us",
  "united states": "us",
  "united states of america": "us",
  "u.s.": "us",
  uk: "gb",
  "south korea": "kr",
  korea: "kr",
  "north korea": "kp",
  russia: "ru",
  "ivory coast": "ci",
  "côte d'ivoire": "ci",
  vietnam: "vn",
};

export default function Flag({
  countryName,
  iso2,
  className = "",
  size = 18,
}: FlagProps) {
  const [code, setCode] = useState<string | null>(
    iso2 ? iso2.toLowerCase() : null
  );
  const [loading, setLoading] = useState<boolean>(!iso2 && !!countryName);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
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

    // manual mapping
    if (MANUAL_MAP[key]) {
      setCode(MANUAL_MAP[key]);
      setLoading(false);
      return;
    }

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
        let res = await fetch(
          `https://restcountries.com/v3.1/name/${encodeURIComponent(
            countryName
          )}?fullText=true`
        );

        if (!res.ok) {
          res = await fetch(
            `https://restcountries.com/v3.1/name/${encodeURIComponent(
              countryName
            )}`
          );
        }

        if (!res.ok) {
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

        for (const entry of data || []) {
          if (entry?.cca2) {
            const lower = entry.cca2.toLowerCase();
            isoCache.set(key, { code: lower, ts: Date.now() });
            if (!cancelled) setCode(lower);
            return;
          }
        }

        isoCache.set(key, { code: null, ts: Date.now() });
        if (!cancelled) setCode(null);
      } catch {
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

  const svgUrl = code ? `https://flagcdn.com/${code}.svg` : null;

  // ⭐ Special Case → EUROPE Image
  if (countryName?.toLowerCase() === "europe") {
    return (
      <div
        className={`overflow-hidden rounded-sm ${className}`}
        style={{ width: size, height: size }}
      >
        <Image
          src="/europ_flag.webp"
          alt="Europe"
          width={size}
          height={size}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  if (imgError || !code) {
    const initials =
      countryName
        ?.split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("")
        .toUpperCase() || "🏳️";

    return (
      <div
        className={`inline-flex items-center justify-center bg-gray-200 text-gray-700 rounded-sm ${className}`}
        style={{ width: size, height: size, fontSize: size * 0.6 }}
      >
        {initials}
      </div>
    );
  }

  // ⏳ Loading placeholder
  if (loading) {
    return (
      <div
        className={`bg-gray-200 animate-pulse rounded-sm ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }


  return (
    <div
      className={`overflow-hidden rounded-sm ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={svgUrl!}
        alt={`${countryName || "country"} flag`}
        width={size}
        height={size}
        unoptimized
        className="h-full w-full object-cover"
        onError={() => setImgError(true)}
      />
    </div>
  );
}
