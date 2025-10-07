import DynamicPageClient from "@/components/DynamicPageClient";

// Server component
export default async function QuickieLinks({ params }: { params: { slug: string } }) {

  // For now, direct access is fine; Next.js warns for migration
  const pageSlug = params.slug;

  // console.log("---- page slug ----", pageSlug);

  return <DynamicPageClient page={pageSlug} />;
}
