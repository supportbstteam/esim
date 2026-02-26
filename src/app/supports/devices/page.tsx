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
import { fetchCountries } from "@/redux/thunk/thunk";
import { featurePlans } from "@/redux/thunk/planThunk";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";

function Page() {

  const dispatch = useAppDispatch();

  /* ---------------- FILTER STATE (ADDED) ---------------- */

  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>("");

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
    dispatch(fetchCountries());
    dispatch(featurePlans());

    dispatch(
      fetchUserDevices({
        page: 1,
        limit: 500,
      })
    );

    dispatch(fetchUserDetails());

  }, [dispatch]);

  /* ---------------- FILTER LOGIC (ADDED) ---------------- */

  const selectedDevice =
    devices.find(
      (d: any) =>
        String(d.id) === selectedDeviceId
    );

  const brandFilteredDevices =
    selectedBrand
      ? devices.filter(
        (d: any) =>
          d?.brand?.name === selectedBrand
      )
      : devices;

  /* ---------------- HANDLERS ---------------- */

  const handleBrandClick = (brandName: string) => {

    const opening =
      expandedBrand !== brandName;

    setExpandedBrand(
      opening ? brandName : null
    );

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

  /* ---------------- FILTER HANDLERS (ADDED) ---------------- */

  const handleBrandChange = (brandName: string) => {

    setSelectedBrand(brandName);

    // clear device when brand changes
    setSelectedDeviceId("");

    dispatch(
      fetchUserDevices({
        page: 1,
        limit: 500,
        brand: brandName || undefined,
      })
    );

  };

  const handleDeviceChange = (deviceId: string) => {

    setSelectedDeviceId(deviceId);

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

        {/* ---------------- FILTER UI (ADDED) ---------------- */}

        <div className="flex flex-col md:flex-row gap-4 justify-center my-5">

          {/* Brand Dropdown */}
          <select
            value={selectedBrand}
            onChange={(e) =>
              handleBrandChange(e.target.value)
            }
            className="border px-4 py-2 rounded-md w-full md:w-64"
          >
            <option value="">
              All Brands
            </option>

            {brands.map((brand: any) => (
              <option
                key={brand.id}
                value={brand.name}
              >
                {brand.name}
              </option>
            ))}

          </select>

          {/* Device Dropdown */}
          <select
            value={selectedDeviceId}
            onChange={(e) =>
              handleDeviceChange(
                e.target.value
              )
            }
            className="border px-4 py-2 rounded-md w-full md:w-64"
          >
            <option value="">
              All Devices
            </option>

            {brandFilteredDevices.map(
              (device: any) => (
                <option
                  key={device.id}
                  value={device.id}
                >
                  {device.name}
                </option>
              )
            )}

          </select>

        </div>

        {/* ---------------- SUPPORT ESIM UI (ADDED) ---------------- */}

        {selectedDevice && (

          <div className="max-w-5xl mx-auto my-4">

            {selectedDevice.supportsEsim ? (

              <div className="flex justify-center items-center gap-3 bg-green-50 border border-green-300 text-green-700 px-4 py-3 rounded-md shadow-sm">

                <IoMdCheckmarkCircleOutline
                  size={26}
                  className="text-green-600 flex-shrink-0"
                />

                <span className="font-medium">
                  {selectedDevice.name} supports eSIM
                </span>

              </div>

            ) : (

              <div className="flex justify-center items-center gap-3 bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-md shadow-sm">

                <RxCrossCircled size={26}
                  className="text-green-600 flex-shrink-0" />
                <span className="font-medium">
                  {selectedDevice.name} does NOT support eSIM
                </span>

              </div>

            )}

          </div>

        )}

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

            brands.map((brand: any) => {

              const isOpen =
                expandedBrand === brand.name;

              const brandDevices =
                devices.filter(
                  (device: any) => {

                    if (
                      selectedBrand &&
                      device?.brand?.name !== selectedBrand
                    )
                      return false;

                    if (
                      selectedDeviceId &&
                      String(device.id) !== selectedDeviceId
                    )
                      return false;

                    return (
                      device?.brand?.name === brand.name
                    );

                  }
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
                      handleBrandClick(
                        brand.name
                      )
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
            className="inline-block bg-[#133365] px-6 py-3 rounded-md text-white my-5 hover:bg-blue-900 transition"
          >
            Contact Support
          </Link>

        </div>

      </div>

    </div>

  );
}

export default Page;