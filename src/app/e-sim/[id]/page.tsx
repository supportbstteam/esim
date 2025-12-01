"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import EsimInfo from "@/components/cards/esimOrder/EsimInfo";
import moment from "moment";
import { ActivateCard } from "@/components/cards/esimOrder/EsimScannerCard";
import OrderSummary from "@/components/cards/esimOrder/OrderSummaryCard";
import RechargeHistory from "@/components/table/TopUpTable";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { clearESimDetails, fetchSimDetailsByUser } from "@/redux/slice/ESimSlice";
import { postUserClaimRefund } from "@/lib/pageFunction";
import { fetchUserDetails } from "@/redux/slice/UserSlice";
function ESimDetails() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { eSimDetails, loading } = useAppSelector((state) => state.esims);
  const [activeSimIndex, setActiveSimIndex] = useState(0);

  useEffect(() => {
    dispatch(clearESimDetails());
    dispatch(fetchUserDetails());
    if (id) dispatch(fetchSimDetailsByUser(id as string));
  }, [id, dispatch]);

  if (loading) return <p className="text-center py-10">Loading...</p>;

  const activeSim = eSimDetails?.esims?.[activeSimIndex];

  console.log("---- esim details ----", eSimDetails);

  return (
    <div className="max-w-full mx-auto px-4 md:px-10 py-6">
      {/* ✅ eSIM Carousel Section */}
      {eSimDetails?.esims && eSimDetails.esims.length > 0 && (
        <div className="mb-10">
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={30}
            slidesPerView={1}
            onSlideChange={(swiper) => setActiveSimIndex(swiper.activeIndex)}
            className="w-full text-green-700  "
          >
            {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              eSimDetails.esims.map((esim: any, index: number) => {

                console.log("----- esim -----", esim);

                return (
                  <SwiperSlide key={index}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-5 mt-8 items-start">
                      <div className="md:col-span-2 mx-10">
                        <EsimInfo
                          countryName={esim?.country?.name}
                          countryFlagUrl={`https://cdn.jsdelivr.net/gh/hjnilsson/country-flags/svg/${(esim?.country?.isoCode || "us").toLowerCase()}.svg`}
                          planType={esim?.productName?.replace(/-$/, "")}
                          expired={false}
                          simNo={esim?.iccid || "No iccid no."}
                          purchasedOn={moment(esim?.createdAt).format("MMM Do YY")}
                          activationDate=""
                          validityDays={esim?.validityDays || "0"}
                          dataUsed={0}
                          dataTotal={esim?.dataAmount || 0}
                          price={((esim?.country?.currency === "USD" ? "$" : esim?.country?.currency) || "N/A") + " " + (esim?.price || "N/A")}
                          // price={
                          //   (esim?.currency === "USD" ? "$" : esim?.currency) +
                          //   " " +
                          //   esim?.price
                          // }
                          planStart="Dec 1, 2024"
                          planEnd="Dec 5, 2024"
                          onRecharge={() => alert("Recharge clicked!")}
                        />
                      </div>
                      <div className="md:col-span-1 flex justify-center">
                        <ActivateCard
                          qrValue={esim?.qrCodeUrl}
                          code={esim?.qrCodeUrl}
                          handleRefund={() => {
                            postUserClaimRefund({
                              id: eSimDetails?.id,
                              message: `Customer ${eSimDetails?.name} asking for refund for the ORDER ID ${eSimDetails?.orderCode}`
                            })
                          }}
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                )
              })}
          </Swiper>

        </div>
      )}

      {/* ✅ Recharge History (Static) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-5 mt-8 items-start">
        <div className="md:col-span-2 mx-10">
          {activeSim &&
            activeSim.topUps?.length > 0 &&
            (() => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const rechargeRecords = activeSim.topUps.map((topupItem: any) => {
                console.log("----- activeSim.topupItem -----", topupItem);
                return ({
                  purchasedOn: new Date(topupItem.purchasedOn).toLocaleDateString("en-GB"),
                  plan: (topupItem?.title || topupItem?.name || "Unknown Plan").replace(/-/g, " "),
                  planStart: activeSim.startDate
                    ? new Date(activeSim.startDate).toLocaleDateString("en-GB")
                    : "-",
                  planEnd: activeSim.endDate
                    ? new Date(activeSim.endDate).toLocaleDateString("en-GB")
                    : "-",
                  paymentMode: "Online",
                })
              });

              return <RechargeHistory records={rechargeRecords} rowsPerPage={5} />;
            })()}
        </div>

        {/* ✅ Order Summary (Static) */}
        {/* <div className="md:col-span-1 flex justify-center">
          {eSimDetails && (
            <OrderSummary
              orderId={eSimDetails?.orderCode}
              transactionId={eSimDetails?.transaction?.transactionId}
              orderDate={moment(eSimDetails?.esims[0]?.createdAt).format("MMM Do YY")}
              totalAmount={
                (activeSim?.country?.currency === "USD"
                  ? "$"
                  : activeSim?.country?.currency) +
                " " +
                activeSim?.price
              }
              paymentMethod={eSimDetails?.transaction?.paymentGateway?.toUpperCase()}
            />
          )}
        </div> */}
      </div>
    </div>
  );
}

export default ESimDetails