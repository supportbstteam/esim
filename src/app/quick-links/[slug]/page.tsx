import DynamicPageClient from "@/components/DynamicPageClient";

// Server component
export default function QuickieLinks({ params }: { params: { slug: string } }) {
  const pageSlug = params.slug; // NO await needed

  // console.log("---- page slug ----", pageSlug);

  return <DynamicPageClient page={pageSlug} />;
}
