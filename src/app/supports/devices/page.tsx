"use client";

import React, { useEffect, useState } from "react";
import MainBanner from "@/components/ui/MainBanner";
import Link from "next/link";

import {
  useAppDispatch,
  useAppSelector,
} from "@/redux/store";

import { fetchUserBrands } from "@/redux/thunk/BrandsThunks";
import { fetchUserDevices } from "@/redux/slice/DeviceSlice";
import { fetchUserDetails } from "@/redux/slice/UserSlice";

function Page() {

  const dispatch = useAppDispatch();

  /* ---------------- REDUX STATE ---------------- */

  const {
    list: devices = [],
    loading: deviceLoading,
  } = useAppSelector((state) => state.devices);

  const {
    list: brands = [],
    loading: brandLoading,
  } = useAppSelector((state) => state.brands);

  /* ---------------- LOCAL STATE ---------------- */

  const [expandedBrand, setExpandedBrand] =
    useState<string | null>(null);

  /* ---------------- FETCH DATA ---------------- */

  useEffect(() => {

    dispatch(fetchUserBrands({}));

    dispatch(
      fetchUserDevices({
        page: 1,
        limit: 500,
      })
    );

    dispatch(fetchUserDetails());

  }, [dispatch]);

  /* ---------------- HANDLERS ---------------- */

  const handleBrandClick = (brandName: string) => {

    const opening = expandedBrand !== brandName;

    setExpandedBrand(opening ? brandName : null);

    if (opening) {
      dispatch(
        fetchUserDevices({
          page: 1,
          limit: 500,
          brand: brandName,
        })
      );
    }
  };

  /* ---------------- UI ---------------- */

  return (

    <div>

      {/* Banner */}
      <MainBanner />

      <div className="p-4 container mx-auto text-center">

        {/* Heading */}
        <div className="max-w-full mx-auto">

          <h2 className="text-5xl font-semibold">
            Is Your Device Compatible?
          </h2>

          <p className="text-gray-500 mt-2">
            Most modern smartphones support eSIM.
            Find your device below or contact support to confirm.
          </p>

        </div>


        {/* Note Box */}
        <div className="border border-gray-100 shadow rounded-lg p-5 my-5 max-w-5xl mx-auto">

          <p className="text-gray-500">
            Note:- If your exact model isn't listed,
            contact support with your model number
            (Settings → About phone) and we'll confirm compatibility.
          </p>

        </div>


        {/* ---------------- DEVICE LIST ---------------- */}

        <div className="border border-gray-100 shadow rounded-lg p-5 my-5 max-w-5xl mx-auto text-left">

          <h3 className="font-semibold mb-4 text-center">
            Compatible Devices
          </h3>

          {brandLoading ? (

            <p className="text-center">
              Loading brands...
            </p>

          ) : brands.length === 0 ? (

            <p className="text-center">
              No brands found
            </p>

          ) : (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            brands.map((brand: any) => {

              const isOpen =
                expandedBrand === brand.name;

              const brandDevices =
                devices.filter(
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (device: any) =>
                    device?.brand?.name === brand.name
                );

              return (

                <div
                  key={brand.id}
                  className="border-b last:border-b-0 py-3"
                >

                  {/* Brand Header */}
                  <div
                    className="flex justify-between items-center cursor-pointer hover:bg-gray-50 p-2 rounded"
                    onClick={() =>
                      handleBrandClick(brand.name)
                    }
                  >

                    <span className="font-semibold">
                      {brand.name}
                    </span>

                    <span className="text-xl">
                      {isOpen ? "−" : "+"}
                    </span>

                  </div>


                  {/* Devices List */}
                  {isOpen && (

                    <div className="mt-2 pl-4 text-gray-600">

                      {deviceLoading ? (

                        <p>
                          Loading devices...
                        </p>

                      ) : brandDevices.length === 0 ? (

                        <p>
                          No compatible devices found
                        </p>

                      ) : (

                        brandDevices.map(
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          (device: any) => (

                            <p key={device.id}>
                              • {device.name}
                            </p>

                          )
                        )

                      )}

                    </div>

                  )}

                </div>

              );

            })

          )}

        </div>


        {/* ---------------- CONTACT SUPPORT ---------------- */}

        <div className="border border-gray-100 shadow rounded-lg p-5 my-5 max-w-5xl mx-auto">

          <p className="font-semibold">
            Not sure if your device works?
          </p>

          <p className="text-gray-500 mt-2">
            Contact support and send your model number —
            we'll confirm compatibility.
          </p>

          <Link
            href="/contact-us"
            className="inline-block bg-blue-800 px-6 py-3 rounded-md text-white my-5 hover:bg-blue-900 transition"
          >
            Contact Support
          </Link>

        </div>

      </div>

    </div>

  );
}

export default Page;