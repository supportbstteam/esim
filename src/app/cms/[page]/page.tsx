import MainBanner from '@/components/ui/MainBanner';
import DyamicCmsPage from './DyamicCmsPage';

async function ContentPage({ params }: { params: Promise<{ page: string }> }) {
    const { page } = await params;
    return (
        <DyamicCmsPage page={page} />
        // <div>
        // </div>
        // <div>
        //     <MainBanner title="Get Connected in Just a Few Steps" subtitle="From purchase to activation, our eSIM process is quick, simple, and designed for hassle-free travel." backgroundImage="/work_how.webp" />
        // </div>
    )
}

export default ContentPage