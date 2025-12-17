"use client";
import { TEMPLATE_MAP } from '@/components/templates/templateMap';
import { resetCMSState } from '@/redux/slice/CmsPagesSlice';
import { fetchUserDetails } from '@/redux/slice/UserSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { fetchPageBySlug } from '@/redux/thunk/cmsPageThunk';
import React, { useEffect } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DyamicCmsPage({ page }: any) {
    const dispatch = useAppDispatch();
    const { page: cmsPage, sections } = useAppSelector(state => state?.cmsPage)
    const fetchContentCMS = async () => {
        await dispatch(fetchUserDetails());
        await dispatch(resetCMSState());
        await dispatch(fetchPageBySlug(page));
    }

    // console.log("-=-=-=-=-=- page in the dynamic cms-=-=--=-=-", cmsPage);
    // console.log("-=-=-=-=-=- sections in the dynamic cms-=-=--=-=-", sections);
    useEffect(() => {
        fetchContentCMS();
    }, [dispatch]);
    return (
        <div>
            {/* <h2>{cmsPage?.split("-").join(" ").toUpperCase()}</h2> */}
            {sections && sections.map((section, index) => {
                const Component = TEMPLATE_MAP[section.template];
                if (!Component) return null;

                return (
                    <Component
                        key={index}
                        data={section.data}
                    />
                );
            })}
        </div>
    )
}

export default DyamicCmsPage