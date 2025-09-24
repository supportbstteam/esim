// components/TravelPlans.jsx
import Link from 'next/link';
import { IoIosArrowForward } from "react-icons/io";

const TravelPlans = () => {
  const countries = [
    { name: "Eritrea", flag: "1.webp" },
    { name: "Japan", flag: "2.webp" },
    { name: "Belarus", flag: "3.webp" },
    { name: "Italy", flag: "4.webp" },
    { name: "El Salvador", flag: "5.webp" },
    { name: "Bolivia", flag: "6.webp" },
    { name: "Djibouti", flag: "7.webp" },
    { name: "Ecaudor", flag: "8.webp" },
    { name: "Gabon", flag: "9.webp" },
    { name: "Brazil", flag: "10.webp" },
    { name: "United States Of America", flag: "11.webp" },
    { name: "Iraq", flag: "12.webp" },
  ];

  return (
    <section className="bg-white px-4 sm:px-6 md:px-[10%] py-8 md:py-12 mt-10">
      {/* Section Heading */}
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          Country-Specific Travel Plan
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-500 mt-3 sm:mt-5">
          Choose a plan that works in each country you travel to
        </p>
      </div>

      {/* Cards */}
      <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {countries.map((item, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-2xl hover:bg-green-50 hover:border-green-500 transition duration-300"
          >
            <div className="p-4 flex items-center justify-between gap-4">
              {/* Flag + Name */}
              <div className="flex items-center gap-4">
                <img
                  src={`/flag/country/${item.flag}`}
                  alt={item.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                />
                <p className="text-sm sm:text-base md:text-lg font-medium">
                  {item.name}
                </p>
              </div>

              {/* Arrow */}
              <div className="text-xl sm:text-2xl text-gray-500">
                <IoIosArrowForward />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Explore Button */}
      <div className="flex justify-center mt-6 sm:mt-8 text-gray-600 hover:text-green-600 transition">
        <Link
          href="#"
          className="flex items-center gap-2 text-base sm:text-lg md:text-xl font-medium"
        >
          Explore All Countries <IoIosArrowForward />
        </Link>
      </div>
    </section>
  );
};

export default TravelPlans;
