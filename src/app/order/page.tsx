"use client";
import { fetchOrdersByUser } from '@/redux/slice/OrderSlice';
import { fetchUserDetails } from '@/redux/slice/UserSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store'
import React, { useEffect } from 'react'

function Order() {
    const dispatch = useAppDispatch();
    const orders = useAppSelector((state) => state?.order);
    const fetchUserOrderLists = async () => {
        await dispatch(fetchOrdersByUser());
        // await dispatch(fetchUserDetails());
    }
    useEffect(() => {
        fetchUserOrderLists();

    }, [dispatch]);


    console.log("---- order ---", orders);


    return (
        <div>Order</div>
    )
}

export default Order