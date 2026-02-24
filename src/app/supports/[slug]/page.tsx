import DynamicPageClient from "@/components/DynamicPageClient";

// Server component
export default async function SupportPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  // ✅ unwrap params Promise
  const resolvedParams = await params;
  // console.log("-=-=-resolvedParams -=-=--",resolvedParams?.slug);

  const pageSlug = resolvedParams?.slug || "";

  console.log("Slug:", pageSlug);

  return <DynamicPageClient page={pageSlug} />;
}
