import { Metadata, ResolvingMetadata } from "next";
import DyamicCmsPage from "./DyamicCmsPage";

async function fetchCmsData(page: string) {
  const type = "pages";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/cms/${type}/${page}`,
    { next: { revalidate: 60 } },
  );

  if (!res.ok) return null;

  return res.json();
}

type Props = {
  params: Promise<{ page: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// ✅ Generate Metadata (Next 15 style)
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { page } = await params;

  const data = await fetchCmsData(page);

  if (!data) {
    return {
      title: "Page Not Found",
      description: "Content not available",
    };
  }

  return {
    title: data.metaTitle || "Default Title",
    description: data.metaDescription || "Default Description",
    keywords: Array.isArray(data.metaKeywords)
      ? data.metaKeywords
      : data.metaKeywords?.split(",") || [],
  };
}

// ✅ Page Component
export default async function ContentPage({ params }: Props) {
  const { page } = await params;

  return <DyamicCmsPage page={page} />;
}
