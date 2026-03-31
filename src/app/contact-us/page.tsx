import { Metadata } from "next";
import Contact from "./ContactUs";

export const dynamic = "force-dynamic";

async function fetchSeo() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/cms/pages/contact`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchSeo();

  console.log("SEO CONTACT DATA >>>", JSON.stringify(data, null, 2));

  return {
    title: data?.metaTitle || "Contact Us",
    description: data?.metaDescription || "Contact Us",
    keywords: Array.isArray(data?.metaKeywords)
      ? data.metaKeywords
      : data?.metaKeywords?.split(",") || [],
  };
}

export default function Page() {
  return <Contact />;
}