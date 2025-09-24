import React from 'react';

export const Plan = () => {
  // Example plans - can be dynamic later
  const plans = [
    { id: 1, country: "Japan", data: "75GB / 7 days", price: "$2.02", flag: "1.webp" },
    { id: 2, country: "USA", data: "50GB / 10 days", price: "$3.50", flag: "2.webp" },
    { id: 3, country: "Italy", data: "100GB / 15 days", price: "$5.99", flag: "3.webp" },
    { id: 4, country: "Brazil", data: "25GB / 5 days", price: "$1.50", flag: "4.webp" },
    { id: 5, country: "India", data: "150GB / 30 days", price: "$9.99", flag: "5.webp" },
  ];

  return (
    <section className="bg-white px-4 sm:px-6 md:px-[10%] py-8 md:py-12 mt-10">
      {/* Section Heading */}
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl text-[#000000] md:text-4xl font-bold">
          Plans That Travel With You
        </h1>
        <p className="text-base sm:text-lg text-[#64748B] mt-3 sm:mt-5">
          Choose a plan that keeps you connected anywhere, anytime.
        </p>
        <h2 className="text-xl sm:text-2xl text-[#1A0F33] md:text-3xl mt-8 font-semibold">
          Our Popular Plans
        </h2>
      </div>

      {/* Plans List */}
      <div className="mt-8 space-y-5">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="w-full border border-gray-200 rounded-2xl hover:bg-green-50 hover:border-[#3BC852] transition duration-300"
          >
            <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              
              {/* Flag + Country */}
              <div className="flex items-center gap-3">
                <img
                  src={`/flag/${plan.flag}`}
                  alt={plan.country}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                />
                <p className="text-base sm:text-lg text-[#1A0F33] font-medium">{plan.country}</p>
              </div>

              {/* Plan Info */}
              <div className="text-sm sm:text-base text-center sm:text-left text-gray-700">
                <span className="text-[#64748B94]">Started:</span> {plan.data}
              </div>

              {/* Price */}
              <div className="text-sm sm:text-base md:text-lg bg-[#F3F5F7] rounded-2xl px-4 sm:px-6 py-2 font-bold">
                {plan.price}
              </div>

              {/* Button */}
              <div>
                <button className="cursor-pointer w-full sm:w-auto px-6 sm:px-8 py-2 text-sm sm:text-base bg-[#3BC852] text-white rounded-2xl hover:bg-green-600 transition">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
