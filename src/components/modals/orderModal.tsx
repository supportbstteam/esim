"use client";
import { useEffect, useState, useRef } from "react";
import QRCode from "react-qr-code";
import {
  FaCheckCircle,
  FaGlobe,
  FaSimCard,
  FaWifi,
  FaCalendarAlt,
  FaDownload,
  FaExclamationTriangle,
} from "react-icons/fa";

interface EsimInfo {
  iccid: string;
  qrCodeUrl: string;
  country: { name: string };
  plans: { data: number; validityDays: number; name: string }[];
  startDate: string | Date;
  endDate: string | Date;
}

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  esimData?: EsimInfo[]; // now an array
  isLoading: boolean;
  errorState?: string | null;
}

export default function OrderModal({
  isOpen,
  onClose,
  esimData,
  isLoading,
  errorState,
}: OrderModalProps) {
  const [message, setMessage] = useState("Processing your eSIM...");
  const qrRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Animate steps
  useEffect(() => {
    if (!isOpen || errorState) return;
    const steps = [
      "Connecting to eSIM provider...",
      "Verifying your plan details...",
      "Creating your eSIM profiles...",
      "Almost done — finalizing setup...",
      "Activating your eSIMs...",
    ];
    let i = 0;
    const interval = setInterval(() => {
      setMessage(steps[i]);
      i = (i + 1) % steps.length;
    }, 2000);
    return () => clearInterval(interval);
  }, [isOpen, errorState]);

  // Download QR for specific index
  const handleDownloadQR = (index: number) => {
    const svg = qrRefs.current[index]?.querySelector("svg");
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `${esimData?.[index]?.iccid || "esim"}.png`;
      link.href = pngFile;
      link.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 overflow-y-auto">
      <div className="bg-white text-gray-800 rounded-2xl w-full max-w-5xl mx-4 shadow-lg relative h-auto max-h-[90vh] overflow-y-auto transition-all">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
        >
          ✕
        </button>
        <div className="p-8">
          {isLoading ? (
            <div className="flex flex-col items-center gap-4 py-10">
              <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
              <p className="font-medium">{message}</p>
              <p className="text-sm text-gray-500">Setting up your eSIMs securely...</p>
            </div>
          ) : errorState ? (
            <div className="py-6 text-center">
              <FaExclamationTriangle className="text-5xl text-red-500 mx-auto mb-3" />
              <h2 className="text-2xl font-bold text-red-600">eSIM Creation Failed</h2>
              <p className="text-gray-600 mt-2">{errorState}</p>
              <button
                onClick={onClose}
                className="mt-6 px-5 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
              >
                Close
              </button>
            </div>
          ) : esimData && esimData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch min-h-[380px]">
              {/* Left column: eSIM info list */}
              <div className="flex flex-col justify-start space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <FaCheckCircle className="text-green-600 text-2xl" />
                  <h2 className="text-2xl font-bold text-green-700">Thanks for Purchasing</h2>
                </div>
                <p className="text-gray-600">You can now activate your eSIMs</p>

                <div className="space-y-5 bg-gray-50 rounded-xl p-6 max-h-[500px] overflow-y-auto">
                  {esimData.map((esim, idx) => (
                    <div key={idx} className="p-4 border rounded-lg bg-white">
                      <h3 className="font-semibold mb-2">
                        eSIM {idx + 1} - {esim.plans[0]?.name}
                      </h3>
                      <div className="flex flex-col gap-2">
                        <p>
                          <FaSimCard className="inline mr-2 text-blue-600" />
                          <strong>SIM Number:</strong> {esim.iccid}
                        </p>
                        <p>
                          <FaGlobe className="inline mr-2 text-purple-600" />
                          <strong>Country:</strong> {esim.country.name}
                        </p>
                        <p>
                          <FaWifi className="inline mr-2 text-teal-600" />
                          <strong>Data:</strong> {esim.plans[0]?.data} GB
                        </p>
                        <p>
                          <FaCalendarAlt className="inline mr-2 text-amber-600" />
                          <strong>Validity:</strong> {esim.plans[0]?.validityDays} Days
                        </p>
                        <p>
                          <FaCalendarAlt className="inline mr-2 text-green-600" />
                          <strong>Start:</strong> {new Date(esim.startDate).toLocaleString()}
                        </p>
                        <p>
                          <FaCalendarAlt className="inline mr-2 text-red-600" />
                          <strong>End:</strong> {new Date(esim.endDate).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={onClose}
                  className="mt-8 px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition"
                >
                  Close
                </button>
              </div>

              {/* Right column: QR codes */}
              <div className="flex flex-col justify-start items-center h-full space-y-6">
                <h3 className="text-gray-700 mb-3 font-medium">Scan QR to Configure</h3>
                {esimData.map((esim, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-3">
                    <div ref={el => {
                      qrRefs.current[idx] = el ?? null; // assign null if el is null
                    }} className="bg-gray-100 p-4 rounded-lg">
                      <QRCode
                        value={esim.qrCodeUrl || "No-SIM"}
                        size={180}
                        bgColor="#ffffff"
                        fgColor="#000000"
                      />
                    </div>
                    <button
                      onClick={() => handleDownloadQR(idx)}
                      className="mt-2 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                      <FaDownload /> Download QR
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-center">No eSIM data available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
