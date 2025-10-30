import Image from "next/image";
import React from "react";
import { FiCheck } from "react-icons/fi";
import Thankyou from "@/assets/thankyou.svg"
interface PurchaseSuccessProps {
  emoji?: string;
  title?: string;
  description?: string;
  isButton?: boolean;
  onViewQrCode?: () => void;
}

const PurchaseSuccess: React.FC<PurchaseSuccessProps> = ({
  emoji = "🎉",
  isButton = false,
  title = "Purchase Successful",
  description = "Your eSIM has been purchased successfully and is ready for activation. Scan the QR code below or follow the setup guide to get started instantly.",
  onViewQrCode,
}) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
    <Image
      src={Thankyou}
      alt="No Recharges"
      width={120}
      height={120}
      className="my-6 select-none pointer-events-none opacity-85"
    />
    <h2 className="text-xl font-semibold text-neutral-900  mb-2">
      {title} <span className="align-middle">{emoji}</span>
    </h2>
    <p className="text-neutral-500  max-w-md mx-auto mb-8">
      {description}
    </p>
    {
      isButton && <button
        className="px-6 py-2 rounded border border-neutral-200  bg-white  hover:bg-neutral-50  text-neutral-900 transition text-base font-medium"
        onClick={onViewQrCode}
      >
        View QR Code
      </button>
    }

  </div>
);

export default PurchaseSuccess;
