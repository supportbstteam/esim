import DynamicPageClient from "@/components/DynamicPageClient";

export default async function DynamicPage({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  return <DynamicPageClient page={page} />;
}
