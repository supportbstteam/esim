"use client";
import { api } from '@/lib/api';
import React, { useEffect, useState } from 'react';

interface SummaryCardProps {
  title: string;
  value: string | number | React.ReactNode;
  icon: React.ReactNode;
  bgColor?: string;
  isLoading?: boolean;
}

const SummaryCard = ({ title, value, icon, bgColor = 'bg-green-50', isLoading = false }: SummaryCardProps) => (
  <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 flex-1 min-w-[200px]">
    <div className="flex justify-between items-start">
      <div>
        {isLoading ? (
          <>
            <div className="h-4 w-24 bg-gray-200 rounded mb-2 animate-pulse" />
            <div className="h-8 w-16 bg-gray-200 rounded animate-pulse" />
          </>
        ) : (
          <>
            <p className="text-sm text-gray-600 mb-2">{title}</p>
            <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
          </>
        )}
      </div>

      <div className={`${bgColor} p-3 rounded-lg`}>
        {isLoading ? (
          <div className="h-6 w-6 bg-gray-200 rounded animate-pulse" />
        ) : (
          icon
        )}
      </div>
    </div>
  </div>
);

interface ESimSummary {
  activeSims: number;
  inactiveSims: number;
  totalSims: number;
  totalData: number;
  planSummary: {
    planId: string;
    name: string;
    simsBought: number;
    totalData: number;
    isUnlimited: boolean;
  }[];
}

const SummarySimCard = () => {
  const [summary, setSummary] = useState<ESimSummary | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchESimSummary = async () => {
    try {
      const response: {
        status: string;
        data: ESimSummary;
      } = await api({
        url: "user/sim/summary",
        method: "GET",
      });

      // console.log("---- eSIM summary response ----", response);

      if (response?.status === "success") {
        setSummary(response?.data);
      }
    } catch (err) {
      console.error("Error fetching eSIM summary:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchESimSummary();
  }, []);

  const cards = [
    {
      title: "Total eSIMs",
      value: summary?.totalSims ?? 0,
      icon: (
        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      title: "Total Data",
      value: `${summary?.totalData ?? 0} GB`,
      icon: (
        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
          />
        </svg>
      ),
    },
    {
      title: "Total Plans",
      value: summary?.planSummary?.length ?? 0,
      icon: (
        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex gap-4 flex-wrap">
      {(loading ? Array(3).fill(null) : cards).map((card, index) => (
        <SummaryCard
          key={index}
          title={card?.title ?? ""}
          value={card?.value ?? ""}
          icon={card?.icon ?? <div />}
          isLoading={loading}
        />
      ))}
    </div>
  );
};

export default SummarySimCard;
