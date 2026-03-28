import { Metadata } from "next";
import CountryDetails from "./CountryDetail";

async function fetchCountrySEO(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/plans?name=${slug}`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) return null;

  const data = await res.json();

  return data?.data?.[0]?.country || null;
}

type Props = {
  params: Promise<{ slug: string }>;
};

// ✅ SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const seo = await fetchCountrySEO(slug);

  if (!seo) {
    return {
      title: "Country Plans",
    };
  }

  return {
    title: seo.metaTitle || seo.name,
    description: seo.metaDescription || "",
    keywords: Array.isArray(seo.metaKeywords)
      ? seo.metaKeywords
      : seo.metaKeywords?.split(",") || [],
  };
}

// ✅ Page
export default async function Page({ params }: Props) {
  const { slug } = await params;

  return <CountryDetails params={params} />;
}