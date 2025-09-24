// components/HeroSection.jsx
export default function HeroSection() {
    return (
        <section className="relative bg-white flex flex-col-reverse md:flex-row items-center px-4 sm:px-6 md:px-[10%] py-8 md:py-12">
            {/* Left Content */}
            <div className="md:w-1/2 space-y-6 flex flex-col justify-center text-center md:text-left">
                {/* Badge */}
                <span className="inline-block w-full sm:w-[70%] md:w-[60%] mx-auto md:mx-0 bg-gray-100 px-4 py-2 rounded-full text-xs sm:text-sm md:text-base">
                    <span className="font-semibold text-[#1A0F33]">E-Sim Aero:</span> World’s No. 1 E-Sim Provider
                </span>

                {/* Headline */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold text-gray-900 leading-snug md:leading-tight">
                    Affordable <span className="text-green-500">eSIM</span> Data for International Travel
                </h1>

                {/* Subtext */}
                <p className="text-gray-500 text-sm sm:text-base md:text-lg lg:text-xl">
                    Stay connected in 200+ countries with easy, roaming-free data.
                </p>

                {/* Destination Selector */}
                <div className="flex mt-4 sm:mt-6 w-full sm:w-[90%] md:w-[75%] mx-auto md:mx-0 px-3 sm:px-4 py-2 sm:py-3 rounded-full border border-green-500 hover:bg-green-50 transition">
                    {/* Input */}
                    <input
                        type="text"
                        placeholder="Choose Your Destination"
                        className="flex-1 bg-transparent text-green-700 placeholder-green-500 text-xs sm:text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-green-400"
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
                        src="/mobile2.png"
                        alt="Phone with eSIM"
                        className="w-full h-auto object-contain"
                    />
                </div>
            </div>
        </section>

    );
}
