// components/HeroSection.jsx
export default function HeroSection() {
    return (
        <section className=" relative bg-white  px-4 sm:px-6 md:px-[10%] py-8 md:py-12 bg_wrap">
            {/* Left Content */}
           <div className="container flex flex-col-reverse md:flex-row items-center">

            <div className="md:w-1/2 space-y-6 flex flex-col justify-center text-center md:text-left ">
                {/* Badge */}
                <span className="flex items-center  w-fit mx-auto md:mx-0 bg-[#DBE6F966] px-4 py-3 rounded-full text-[#1A0F33] text-xs sm:text-sm md:text-base">
                 <img src="/Vector_best.png" className="h-[19px] mr-2"  />   <span className="font-semibold text-[#1A0F33]">E-Sim Aero:</span> World’s No. 1 E-Sim Provider
                </span>

                {/* Headline */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-extrabold text-[#1A0F33] leading-snug md:leading-tight">
                    Affordable <span className="text-green-500">eSIM</span> Data for International Travel
                </h1>

                {/* Subtext */}
                <p className="text-gray-500 text-sm sm:text-base md:text-lg lg:text-xl">
                    Stay connected in 200+ countries with easy, roaming-free data.
                </p>

                {/* Destination Selector */}
                <div className="flex mt-4 sm:mt-6 w-full sm:w-[90%] md:w-[75%] mx-auto md:mx-0 px-3  sm:px-4 py-1  rounded-full border border-[#3BC852] hover:bg-green-50 transition !pr-1">
                    {/* Input */}
                    <input
                        type="text"
                        placeholder="Choose Your Destination"
                        className="flex-1 bg-transparent text-[#006110] placeholder-[#006110] text-xs sm:text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-green-400"
                    />

                    {/* Button */}
                    <button className="bg-green-500 text-white px-3 py-2 sm:py-3 rounded-full flex items-center justify-center ml-2 sm:ml-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </div>

                {/* Popular Countries */}
                <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-4">
                    {["France", "Spain", "United States", "Italy", "Japan"].map((country) => (
                        <span
                            key={country}
                            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs sm:text-sm hover:bg-green-100 hover:text-green-700 transition cursor-pointer"
                        >
                            {country}
                        </span>
                    ))}
                </div>
            </div>

            {/* Right Content - Image */}
            <div className="w-full md:w-1/2 flex justify-center md:justify-end mb-6 md:mb-0">
                <div className="relative w-[70%] sm:w-[60%] md:w-[90%] lg:w-[85%]">
                    <img
                        src="/glob_new.png"
                        alt="Phone with eSIM"
                        className="w-full h-auto object-contain"
                    />
                </div>
            </div>
            </div>
        </section>

    );
}
