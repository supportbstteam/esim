"use client";
import { SimCard } from '@/components/cards/simCard';
import SummarySimCard from '@/components/cards/SummarySimCard';
import { Images } from '@/components/Images';
import LottieAnimation from '@/components/LottieAnimation';
import SimCardSkeleton from '@/components/skeleton/SimCardSkeleton';
import { fetchSimsByUser } from '@/redux/slice/ESimSlice';
import { getAllLinks } from '@/redux/slice/SocialLinkSlice';
import { fetchUserDetails } from '@/redux/slice/UserSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { fetchPlans } from '@/redux/thunk/planThunk';
import { fetchCountries } from '@/redux/thunk/thunk';
import React, { useEffect } from 'react';

function ESim() {
    const dispatch = useAppDispatch();
    const { esims, loading } = useAppSelector(state => state.esims);

    // console.log("---- esims array ----", esims

    const fetchingSimsDatas = async () => {
        await dispatch(fetchCountries());
        await dispatch(getAllLinks());
        await dispatch(fetchSimsByUser());
        await dispatch(fetchUserDetails());
    }

    useEffect(() => {
        fetchingSimsDatas();
    }, [dispatch]);

    return (
        <div className="min-w-full min-h-full px-10 py-4">
            <label className="font-bold text-3xl">My Plans</label>
            <p className="text-gray-500">Manage your subscription plans and data usage</p>

            {/* Summary Cards */}
            <div className="mt-5">
                <SummarySimCard />
            </div>

            {/* eSIM List */}
            <div className="mt-6">
                {
                    esims && esims.length > 0 && <div className="font-semibold text-md text-2xl">Your E-SIMs</div>
                }


                <div className="grid grid-cols-3 gap-4 mt-3">
                    {loading ? (
                        Array(3)
                            .fill(null)
                            .map((_, i) => <SimCardSkeleton key={i} />)
                    ) : esims && esims.length > 0 ? (
                        esims.map((esim) => (
                            <SimCard key={esim.id} order={esim} />
                        ))
                    ) : (
                        <>
                            <div />
                            <div className="flex flex-col justify-center items-center">
                                <LottieAnimation
                                    animationData={Images.NoDataAnimation}
                                    style={{ width: 250, height: 250 }}
                                />
                                <p className='font-bold text-xl text-gray-400' >No E-sim found</p>
                            </div>
                            <div />
                        </>
                    )}
                </div>

            </div>
        </div>
    );
}

export default ESim;
