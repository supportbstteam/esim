import DynamicPageClient from "@/components/DynamicPageClient";

// Server component
export default async function SupportPage({ params }: { params: { page: string } }) {
  // For now, direct access is fine; Next.js warns for migration
  const pageSlug = params.page;

  return <DynamicPageClient page={pageSlug} />;
}
