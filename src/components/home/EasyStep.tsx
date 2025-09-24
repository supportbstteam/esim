import React from 'react'

export const EasyStep = () => {
  return (
    <section className="px-6 md:px-[10%] py-12 bg-white text-[#1A0F33]">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold">Set Up Your eSIM in 3 Easy Steps</h1>
        <p className="text-gray-500 mt-2">
          From choosing your plan to staying connected worldwide—getting started takes just minutes.
        </p>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Step 1 */}
        <div className="bg-gray-50 p-6 rounded-2xl shadow-sm">
          <h2 className="text-lg font-bold mb-4">01</h2>
          <h3 className="font-semibold text-xl mb-2">Pick Your Plan</h3>
          <p className="text-gray-500 text-sm mb-6">
            Choose your travel destination and select a eSIM plan that matches your trip
          </p>

          <div className="space-y-3">
            <div className="border rounded-xl p-3 flex justify-between items-center cursor-pointer hover:border-green-500">
              <span className="font-medium">3 GB</span>
              <span className="text-gray-500 text-sm">7 Days</span>
            </div>
            <div className="border rounded-xl p-3 flex justify-between items-center cursor-pointer">
              <span className="font-medium">5 GB</span>
              <span className="text-gray-500 text-sm">15 Days</span>
            </div>
            <div className="border rounded-xl p-3 flex justify-between items-center cursor-pointer">
              <span className="font-medium">10 GB</span>
              <span className="text-gray-500 text-sm">30 Days</span>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-gray-50 p-6 rounded-2xl shadow-sm">
          <h2 className="text-lg font-bold mb-4">02</h2>
          <h3 className="font-semibold text-xl mb-2">Install Your eSIM</h3>
          <p className="text-gray-500 text-sm mb-6">
            Get your QR code instantly by email. Scan it on your phone and your eSIM is ready to go.
          </p>

          <div className="flex flex-col items-center">
            <div className="w-40 h-40 bg-white border rounded-xl flex items-center justify-center">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=eSIM"
                alt="QR Code"
                className="w-32 h-32"
              />
            </div>
            <div className="flex gap-4 mt-4 text-sm text-gray-600">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="install" defaultChecked /> QR Code
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="install" /> Activate By Link
              </label>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-gray-50 p-6 rounded-2xl shadow-sm">
          <h2 className="text-lg font-bold mb-4">03</h2>
          <h3 className="font-semibold text-xl mb-2">Stay Connected Globally</h3>
          <p className="text-gray-500 text-sm mb-6">
            Your plan starts, Track your usage in real-time and never worry about roaming fees
          </p>

          <div className="border rounded-xl p-4 bg-white flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🇺🇸</span>
                <span className="font-medium">United States</span>
              </div>
              <span className="text-green-600 text-xs font-semibold">ACTIVE</span>
            </div>
            <p className="text-sm text-gray-500">7 Days</p>
            <p className="text-sm text-gray-600">
              Remaining Data: <span className="font-semibold">20/30 GB</span>
            </p>
            <p className="text-sm text-gray-600">
              Expires in <span className="font-semibold">29 D, 7 H</span>
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
