// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function UserTemplate3({ data }: any) {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

                {/* LEFT – CONTENT */}
                <div>
                    <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gray-200 font-semibold mb-6">
                        {data.stepNumber}
                    </div>

                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                        {data.heading}
                    </h3>

                    {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        data.description.paragraphs.map((p: any, i: number) => (
                            <p key={i} className="text-gray-600 mb-6">
                                {
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    data.description?.paragraphs?.map((p: any, i: number) => (
                                        <p key={i} className="text-gray-600 mb-6">
                                            {p.content}
                                        </p>
                                    ))}
                            </p>
                        ))}

                    <button className="rounded-full border px-6 py-2 font-medium">
                        Setup Guide
                    </button>
                </div>

                {/* RIGHT – IMAGE */}
                <div className="bg-gray-100 rounded-2xl p-8 flex justify-center">
                    <img
                        src={data.image}
                        alt="QR Code"
                        className="w-64 h-64 object-contain"
                    />
                </div>

            </div>
        </section>
    );
}
