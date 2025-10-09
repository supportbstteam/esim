import DynamicPageClient from "@/components/DynamicPageClient";

// Server component
export default async function SupportPage({ params }: { params: { slug: string } }) {
  // For now, direct access is fine; Next.js warns for migration
  const pageSlug = params?.slug || "";

  return <DynamicPageClient page={pageSlug} />;
}
