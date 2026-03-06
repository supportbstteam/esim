export default function CmsSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 animate-pulse">

      {/* Hero */}
      <div className="mb-12 space-y-4">
        <div className="h-10 bg-gray-200 rounded w-1/3"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>

      {/* Section 1 */}
      <div className="flex flex-col md:flex-row gap-10 items-center mb-16">

        <div className="w-full md:w-1/2 h-[300px] bg-gray-200 rounded-xl"></div>

        <div className="w-full md:w-1/2 space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>

          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>

      </div>

      {/* Section 2 */}
      <div className="flex flex-col md:flex-row gap-10 items-center mb-16">

        <div className="w-full md:w-1/2 space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>

          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>

        <div className="w-full md:w-1/2 h-[300px] bg-gray-200 rounded-xl"></div>

      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-16">

        {[1,2,3,4].map((item) => (
          <div
            key={item}
            className="border rounded-xl p-6 space-y-4"
          >
            <div className="h-10 w-10 bg-gray-200 rounded"></div>
            <div className="h-5 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        ))}

      </div>

      {/* CTA */}
      <div className="bg-gray-100 rounded-xl p-8 flex flex-col md:flex-row gap-10 items-center">

        <div className="flex-1 space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>

          <div className="h-10 bg-gray-200 rounded w-40"></div>
        </div>

        <div className="flex-1 h-[250px] bg-gray-200 rounded-xl"></div>

      </div>

    </div>
  );
}