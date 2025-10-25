"use client";
import { SimCard } from '@/components/cards/simCard';
import SummarySimCard from '@/components/cards/SummarySimCard';
import { fetchSimsByUser } from '@/redux/slice/ESimSlice';
import { fetchUserDetails } from '@/redux/slice/UserSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import React, { useEffect } from 'react'

function ESim() {
    const dispatch = useAppDispatch();
    const { esims, loading, error } = useAppSelector(state => state.esims);
    useEffect(() => {
        dispatch(fetchSimsByUser());
        dispatch(fetchUserDetails());
    }, [dispatch]);


    return (
        <div className="min-w-full min-h-full px-10 py-4" >

            <label className="font-bold text-3xl" >My Plans</label>
            <p className="text-gray-500">Manage your subscription plans and data usage</p>
            <div className='mt-5' >
                <SummarySimCard />
            </div>
            <div className="mt-6" >
                <div className="font-semibold text-md text-2xl" >Your E-Sims</div>
                {
                    esims && esims.length > 0 ? (
                        <div className=" grid-cols-3 gap-4 grid mt-3"  >
                            {esims.map((esim) => (
                                <SimCard key={esim.id} order={esim} />
                            ))}
                        </div>
                    ) : (
                        <p>No orders found.</p>
                    )
                }
            </div>
        </div>
    );
}

export default ESim