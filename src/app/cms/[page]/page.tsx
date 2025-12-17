import DyamicCmsPage from './DyamicCmsPage';

async function ContentPage({ params }: { params: Promise<{ page: string }> }) {
    const { page } = await params;
    return <DyamicCmsPage page={page} />
}

export default ContentPage