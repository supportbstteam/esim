"use client";
import React, { useEffect } from 'react'
import PageTitle from '../ui/PageTitle'
import { fetchUserDetails } from '@/redux/slice/UserSlice';
import { useAppDispatch } from '@/redux/store';
export const EasyStep = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, []);
  return (
    <section className="pt-25 bg-white container mb-25 ">
      {/* Heading */}
      <div className="text-center mb-20 leading-10">
        <PageTitle title="Set Up Your eSIM in 3 Easy Steps" subtitle="From choosing your plan to staying connected worldwide—getting started takes just minutes." />
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 min-[800px]:grid-cols-3 gap-[19px]">

        {/* Step 1 */}
        <div className="bg-[#F3F5F7] p-8  rounded-2xl ">
          <h2 className="text-lg font-bold mb-4 bg-white rounded-4xl px-4 py-3 w-fit">01</h2>
          <h3 className="h4 mb-3">Pick Your Plan</h3>
          <p className="subtext mb-10">
            Choose your travel destination and select a eSIM plan that matches your trip
          </p>

          <div className="space-y-3 max-h-[304px] overflow-y-hidden scrollbar-hide">
            <div className="rounded-[12px] py-5 px-7 flex justify-between items-center bg-white cursor-pointer hover:border-green-500 mb-5">
              <div className="flex"><input type="radio" name="plan" className="mr-3 h-5 w-5 accent-[#64748B] checked:accent-[#1A0F33]" />
                <span className="font-medium bg-[#F7F7F8] w-[98px] h-[26px] rounded-2xl"></span></div>
              <span className="text-gray-500 text-sm bg-[#F7F7F8] w-[59px] h-[26px]  rounded-2xl"></span>
            </div>
            <div className="rounded-[12px] py-5 px-7 flex justify-between items-center bg-white cursor-pointer hover:border-green-500 mb-5">
              <div className="flex"><input type="radio" name="plan" className="mr-3 h-5 w-5 accent-[#64748B] checked:accent-[#1A0F33]" defaultChecked />
                <span className="font-medium">3 GB</span></div>
              <span className="text-gray-500 text-sm">7 Days</span>
            </div>
            <div className="rounded-[12px] py-5 px-7 flex justify-between items-center bg-white cursor-pointer hover:border-green-500 mb-5">
              <div className="flex"><input type="radio" name="plan" className="mr-3 h-5 w-5 accent-[#64748B] checked:accent-[#1A0F33]" />
                <span className="font-medium bg-[#F7F7F8] w-[98px] h-[26px]  rounded-2xl"></span></div>
              <span className="text-gray-500 text-sm bg-[#F7F7F8] w-[59px] h-[26px]  rounded-2xl"></span>
            </div>
            <div className="rounded-[12px] py-5 px-7 flex justify-between items-center bg-white cursor-pointer hover:border-green-500 mb-0">
              <div className="flex"><input type="radio" name="plan" className="mr-3 h-5 w-5 accent-[#64748B] checked:accent-[#1A0F33]" />
                <span className="font-medium bg-[#F7F7F8] w-[98px] h-[26px]  rounded-2xl"></span></div>
              <span className="text-gray-500 text-sm bg-[#F7F7F8] w-[59px] h-[26px]  rounded-2xl"></span>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-[#F3F5F7] p-8 rounded-2xl ">
          <h2 className="text-lg font-bold mb-4 bg-white rounded-4xl px-4 py-3 w-fit">02</h2>
          <h3 className="h4 mb-3">Install Your eSIM</h3>
          <p className="subtext mb-10">
            Get your QR code instantly by email. Scan it on your phone and your eSIM is ready to go.
          </p>

          <div className="flex bg-white rounded-xl flex-col items-center p-7 max-h-[304px] overflow-y-hidden scrollbar-hide">

            <div className="flex flex-col gap-2  text-sm text-[#64748B] subtext w-full">
              <label className="flex items-center gap-2 cursor-pointer mb-5">
                <input type="radio" name="install" className='accent-[#64748B] h-5 w-5' defaultChecked /> QR Code
              </label>

              <img
                src="/Frame_qr.png"
                alt="QR Code"
                className="max-h-[169px] w-auto mx-auto"
              />

              <label className="flex items-center gap-2 cursor-pointer mt-5">
                <input type="radio" className='accent-[#64748B] h-5 w-5' name="install" /> Activate By Link
              </label>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-[#F3F5F7] p-8 rounded-2xl ">
          <h2 className="text-lg font-bold mb-4 bg-white rounded-4xl px-4 py-3 w-fit">03</h2>
          <h3 className="h4 mb-3">Stay Connected Globally</h3>
          <p className="subtext mb-10">
            Your plan starts, Track your usage in real-time and never worry about roaming fees
          </p>
          <div className="max-h-[304px] overflow-y-hidden scrollbar-hide">
            <div className="border-[#3BC852] border rounded-xl py-4 px-7 bg-[#F5FCF6] flex flex-col gap-2">
              <div className="flex items-center justify-between">

                <img src="/us_flag.png" className='rounded-4xl' alt="" />

                <span className="text-[#309E3A] bg-[#309E3A3D] rounded-3xl px-2 py-1 text-xs font-semibold">ACTIVE</span>

              </div>
              <div className="flex items-center justify-between">
                <span className="!font-medium !text-[#1A0F33] subtext">United States</span>
                <p className="text-sm text-gray-500">7 Days</p>
              </div>
              <p className="!text-[16px] subtext flex items-center justify-between">
                Remaining Data <span className="font-semibold text-[#1A0F33] text-[16px]">20/30 GB</span>
              </p>
              <p className="!text-[16px] subtext flex items-center justify-between">
                Expires in <span className="font-semibold text-[#1A0F33] text-[16px]">29 D, 7 H</span>
              </p>
            </div>
            <div className=" rounded-xl py-4 px-7 bg-[#fff] flex flex-col gap-2 mt-5">
              <div className="flex items-center justify-between">

                <img src="/swed_flag.png" className='rounded-4xl' alt="" />
                <span className=" bg-[#F7F7F8] w-[58px] h-[20px]  rounded-2xl"></span>

              </div>
              <div className="flex items-center justify-between">
                <span className="bg-[#F7F7F8] w-[98px] h-[26px]  rounded-2xl"></span>
                <p className="bg-[#F7F7F8] w-[58px] h-[26px]  rounded-2xl"></p>
              </div>
              <p className="!text-[16px] subtext flex items-center justify-between">
                <span className='bg-[#F7F7F8] w-[98px] h-[26px]  rounded-2xl'></span> <span className="bg-[#F7F7F8] w-[58px] h-[26px]  rounded-2xl"></span>
              </p>
              <p className="!text-[16px] subtext flex items-center justify-between">
                <span className='bg-[#F7F7F8] w-[98px] h-[26px]  rounded-2xl'></span> <span className="bg-[#F7F7F8] w-[58px] h-[26px]  rounded-2xl"></span>
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
