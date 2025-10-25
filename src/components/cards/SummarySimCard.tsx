"use client";
import { api } from '@/lib/api';
import React, { useEffect, useState } from 'react';

interface SummaryCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    bgColor?: string;
}

const SummaryCard = ({ title, value, icon, bgColor = 'bg-green-50' }: SummaryCardProps) => {
    const [data, setData] = useState(null);
    useEffect(() => {
        const fetchSummary = async () => {
            try {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const response: any = await api({
                    url: '/user/e-sim/summary',
                    method: 'GET',
                });
                setData(response.data);
                console.log("---- summary data ----", response.data);
            }
            catch (err) {
                console.error("Error fetching summary data:", err);
            }
        }
    }, []);
    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 flex-1 min-w-[200px]">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm text-gray-600 mb-2">{title}</p>
                    <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
                </div>
                <div className={`${bgColor} p-3 rounded-lg`}>
                    {icon}
                </div>
            </div>
        </div>
    );
};

interface SummarySimCardProps {
    activeEsim?: number;
    totalData?: number;
    totalPlan?: number;
}

function SummarySimCard({ activeEsim = 5, totalData = 32, totalPlan = 16 }: SummarySimCardProps) {
    return (
        <div className="flex gap-4 flex-wrap">
            {/* Active eSim Card */}
            <SummaryCard
                title="Active eSim"
                value={activeEsim}
                bgColor="bg-green-50"
                icon={
                    <svg
                        className="w-6 h-6 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                    </svg>
                }
            />

            {/* Total Data Card */}
            <SummaryCard
                title="Total Data"
                value={`${totalData} GB`}
                bgColor="bg-green-50"
                icon={
                    <svg
                        className="w-6 h-6 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                        />
                    </svg>
                }
            />

            {/* Total Plan Card */}
            <SummaryCard
                title="Total Plan"
                value={totalPlan}
                bgColor="bg-green-50"
                icon={
                    <svg
                        className="w-6 h-6 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                    </svg>
                }
            />
        </div>
    );
}

export default SummarySimCard;
