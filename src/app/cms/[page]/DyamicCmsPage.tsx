"use client";
import { TEMPLATE_MAP } from '@/components/templates/templateMap';
import { resetCMSState } from '@/redux/slice/CmsPagesSlice';
import { fetchUserDetails } from '@/redux/slice/UserSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { fetchPageBySlug } from '@/redux/thunk/cmsPageThunk';
import { fetchCountries } from '@/redux/thunk/thunk';
import React, { useEffect } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
function DyamicCmsPage({ page }: any) {
  const dispatch = useAppDispatch();
  const { sections } = useAppSelector(state => state?.cmsPage);

  const fetchContentCMS = async () => {
    await dispatch(fetchCountries());
    await dispatch(fetchUserDetails());
    await dispatch(resetCMSState());
    await dispatch(fetchPageBySlug({ page, type: "pages" }));
  };

  useEffect(() => {
    fetchContentCMS();
  }, [dispatch]);

  return (
    <div>
      {sections?.map((section, index) => {
        const Component = TEMPLATE_MAP[section.template];
        if (!Component) return null;

        // 🔥 odd-even background logic
        const bgClass =
          index % 2 === 0 ? "bg-white" : "bg-gray-50";

        return (
          <section
            key={section.id ?? index}
            className={`${bgClass}`}
          >
            <Component data={section.data} />
          </section>
        );
      })}
    </div>
  );
}

export default DyamicCmsPage;
