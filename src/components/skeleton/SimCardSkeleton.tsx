const SimCardSkeleton = () => (
  <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 w-full animate-pulse">
    {/* Header with flag and status */}
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gray-200" />
        <div>
          <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
          <div className="h-3 w-16 bg-gray-200 rounded" />
        </div>
      </div>
      <div className="h-5 w-16 bg-gray-200 rounded-full" />
    </div>

    {/* ICCID */}
    <div className="mb-4">
      <div className="h-3 w-16 bg-gray-200 rounded mb-2" />
      <div className="h-4 w-32 bg-gray-200 rounded" />
    </div>

    {/* Progress Bar */}
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <div className="h-3 w-20 bg-gray-200 rounded" />
        <div className="h-3 w-16 bg-gray-200 rounded" />
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
        <div className="bg-gray-300 h-2 w-1/2 rounded-full" />
      </div>
    </div>

    {/* Dates */}
    <div className="flex justify-between items-center mb-4 gap-4">
      <div className="flex-1 h-4 bg-gray-200 rounded" />
      <div className="flex-1 h-4 bg-gray-200 rounded" />
    </div>

    {/* Buttons */}
    <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100">
      <div className="flex-1 h-10 bg-gray-200 rounded-lg" />
      <div className="flex-1 h-10 bg-gray-200 rounded-lg" />
    </div>
  </div>
);

export default SimCardSkeleton;