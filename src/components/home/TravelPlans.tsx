// components/TravelPlans.jsx
import Link from 'next/link';
import { IoIosArrowForward } from "react-icons/io";
import PageTitle from '../ui/PageTitle';
import { useAppSelector } from '@/redux/store';
import Flag from '@/components/ui/Flag';
import { useRouter } from "next/navigation";
const TravelPlans = () => {
  const router = useRouter();
  const { countries } = useAppSelector((state) => state?.country);
  const handleNavigate = (id: string) => {
    router.push(`/country/${id}`);
  };
  return (
    <section className="bg-white px-0  mt-25 container">
      {/* Section Heading */}
      <PageTitle title="Country-Specific Travel Plan" subtitle="Choose a plan that works in each country you travel to" />


      {/* Cards */}
      <div className="mt-12 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          countries.map((item: any, i: number) => {
            // console.log("---- item ----", item);
            return (
              <div
                key={i}
                onClick={() => handleNavigate(item.id)}
                className="border border-gray-200 rounded-[8px] hover:bg-green-50 hover:border-green-500 transition duration-300 cursor-pointer"
              >
                <div className="p-6 flex items-center justify-between gap-4"
                >
                  {/* Flag + Name */}
                  <div className="flex items-center gap-4">
                    <Flag
                      countryName={item.name}
                      size={36}
                      className="h-[36px] w-[36px]"
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
            )
          })}
      </div>

      {/* Explore Button */}
      <div className="flex justify-center mt-12 text-gray-600 hover:text-green-600 transition">
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
