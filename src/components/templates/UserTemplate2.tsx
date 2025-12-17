// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function UserTemplate2({ data }: any) {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT – MOCK PLAN UI */}
        <div className="bg-gray-100 rounded-2xl p-6 space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-14 bg-white rounded-lg"></div>
          ))}
        </div>

        {/* RIGHT – CONTENT */}
        <div>
          <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gray-200 font-semibold mb-6">
            {data.stepNumber}
          </div>

          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            {data.heading}
          </h3>

          <p className="text-gray-600 mb-8">
            {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              data.description?.paragraphs?.map((p: any, i: number) => (
                <p key={i} className="text-gray-600 mb-6">
                  {p.content}
                </p>
              ))}
          </p>

          <button className="rounded-full border border-gray-900 px-6 py-2 font-medium">
            View All Plan
          </button>
        </div>

      </div>
    </section>
  );
}
