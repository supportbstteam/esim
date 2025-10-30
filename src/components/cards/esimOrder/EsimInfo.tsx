import React from "react";
import { FiDatabase } from "react-icons/fi";

interface EsimInfoProps {
    countryName: string;
    countryFlagUrl: string;
    planType: string;
    expired: boolean;
    simNo: string;
    purchasedOn: string;
    activationDate: string;
    validityDays: string;
    dataUsed: number;
    dataTotal: number;
    planStart: string;
    planEnd: string;
    price: string;
    onRecharge: () => void;
}

const EsimInfo: React.FC<EsimInfoProps> = ({
    countryName,
    countryFlagUrl,
    planType,
    expired,
    simNo,
    purchasedOn,
    activationDate,
    validityDays,
    dataUsed,
    dataTotal,
    planStart,
    planEnd,
    price,
    onRecharge,
}) => {
    const progressPercent = Math.min(100, (dataUsed / dataTotal) * 100);

    return (
        <div className="max-full bg-white rounded-xl p-6 shadow border border-neutral-100 relative">
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">
                Sim Information
            </h2>
            <div className="flex flex-wrap gap-y-4 pb-2 justify-between">
                {/* Country/Plan left */}
                <div className="flex items-center">
                    <img
                        src={countryFlagUrl}
                        alt={countryName}
                        className="w-10 h-10 object-cover rounded-full border border-neutral-300 mr-4"
                    />
                    <div>
                        <div className="font-semibold text-neutral-900">
                            {countryName}
                        </div>
                        <div className="text-neutral-400">{planType}</div>
                    </div>
                </div>
                {/* Expired badge right, now positioned safely within card */}
                {expired && (
                    <span className="bg-rose-100 text-rose-600 rounded-full text-xs px-4 py-1 font-semibold absolute right-6 top-6 z-10">
                        Expired
                    </span>
                )}
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-3 text-sm">
                <div className="text-neutral-400">ICCID No</div>
                <div className="text-neutral-700">{simNo}</div>
                <div className="text-neutral-400">Purchased on</div>
                <div className="text-neutral-700">{purchasedOn}</div>
                <div className="text-neutral-400">Validity Days</div>
                <div className="text-neutral-700">{validityDays} Days</div>
                <div className="text-neutral-400">Price</div>
                <div className="text-neutral-700">{price}</div>
            </div>

            {/* Data Usage Section */}
            <div className="flex items-center mt-4 mb-1 text-sm">
                <FiDatabase className="mr-2 text-neutral-400" />
                <span className="text-neutral-600 mr-2">Data Usage</span>
                <span className="text-neutral-500 ml-auto">
                    {dataUsed} GB / {dataTotal} GB
                </span>
            </div>
            <div className="h-2 w-full bg-neutral-100 rounded mb-2 overflow-hidden">
                <div
                    className="h-full bg-green-500 transition-all duration-200"
                    style={{ width: `${progressPercent}%` }}
                />
            </div>

            {/* Recharge Button */}
            {/* <div className="flex justify-end mt-3">
                <button
                    onClick={onRecharge}
                    className="bg-green-500 hover:bg-green-600 text-white rounded-full px-6 py-2 font-semibold shadow"
                >
                    Recharge
                </button>
            </div> */}
        </div>
    );
};

export default EsimInfo;
