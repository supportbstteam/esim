"use client";

import NotFound from "@/app/not-found";
import { useSEO } from "@/components/hooks/useSeo";
import CmsSkeleton from "@/components/skeleton/CmsSkeleton";
import { TEMPLATE_MAP } from "@/components/templates/templateMap";
import MainBanner from "@/components/ui/MainBanner";
import { fetchUserDetails } from "@/redux/slice/UserSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchPageBySlug } from "@/redux/thunk/cmsPageThunk";
import { fetchCountries } from "@/redux/thunk/thunk";
import React, { useEffect, useState } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
function DyamicCmsPage({ page }: any) {
  const dispatch = useAppDispatch();

  const { sections, loading, metaDescription, metaKeywords, metaTitle } =
    useAppSelector((state) => state?.cmsPage);

  const [cmsLoading, setCmsLoading] = useState(false);

  // const seo = {
  //   metaDescription,
  //   metaTitle,
  //   metaKeywords,
  // };

  // useSEO(seo);

  const fetchContentCMS = async () => {
    setCmsLoading(true);

    await Promise.all([
      // dispatch(fetchCountries()),
      dispatch(fetchUserDetails()),
      dispatch(fetchPageBySlug({ page, type: "pages" })),
    ]);

    setCmsLoading(false);
  };

  useEffect(() => {
    fetchContentCMS();
  }, [page, dispatch]);

  const isLoading = loading || cmsLoading;
  const hasSections = sections && sections.length > 0;


  console.log((!isLoading || !cmsLoading) && !hasSections);

  return (
    <div>
      {/* Loading */}
      {(isLoading|| cmsLoading ) && <CmsSkeleton />}

      {/* Content */}
      {(!isLoading || !cmsLoading) && hasSections && (
        <>
          <MainBanner
            title={sections[0]?.data?.heading}
            backgroundImage={sections[0]?.data?.image?.url}
            subtitle={sections[0]?.data?.subHeading}
          />

          <div>
            {sections?.map((section: any, index: number) => {
              const Component = TEMPLATE_MAP[section.template];

              if (!Component) return null;

              return (
                <section key={section?.id || index}>
                  <Component data={section?.data} />
                </section>
              );
            })}
          </div>
        </>
      )}

      {/* Not Found */}
      {/* {(!isLoading || !cmsLoading) && !hasSections &&  <NotFound />} */}
    </div>
  );
}

export default DyamicCmsPage;