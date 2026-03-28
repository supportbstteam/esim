import { Metadata } from 'next';
import DyamicCmsPage from './DyamicCmsPage';

// Replace this with your actual API utility import
// Ensure this utility uses the standard 'fetch' for automatic memoization
async function fetchCmsData(page: string) {
  const type = "pages"; // Replace with your logic for 'type'
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/cms/${type}/${page}`, {
    next: { revalidate: 3600 } // Cache for 1 hour
  });
  
  if (!res.ok) return null;
  return res.json();
}

type Props = {
  params: Promise<{ page: string }>;
};

// 1. Generate Metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page } = await params;
  const data = await fetchCmsData(page);

  if (!data) return { title: "Page Not Found" };

  return {
    title: data.metaTitle || "Default Title",
    description: data.metaDescription || "Default Description",
    keywords: Array.isArray(data.metaKeywords) 
      ? data.metaKeywords 
      : data.metaKeywords?.split(',') || [], // Next.js accepts an array for keywords
  };
}

// 2. Main Page Component
async function ContentPage({ params }: Props) {
  const { page } = await params;
  
  // This call is memoized; it won't trigger a second network request if called above
  return <DyamicCmsPage page={page} />;
}

export default ContentPage;
