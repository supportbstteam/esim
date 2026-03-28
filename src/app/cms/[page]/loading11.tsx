// app/cms/[page]/loading.tsx

import CmsSkeleton from "@/components/skeleton/CmsSkeleton";
import MainBanner from "@/components/ui/MainBanner";

export default function Loading() {
  return (
    <div>
      <MainBanner />
      <CmsSkeleton />
    </div>
  );
}