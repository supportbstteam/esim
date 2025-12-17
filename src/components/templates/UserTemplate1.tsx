
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function UserTemplate1({ data }: any) {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">

                <div>
                    <p className="text-sm font-semibold text-gray-600 mb-4">
                        {data.heading}
                    </p>
                    <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                        {data.subHeading}
                    </h2>
                </div>

                <div className="space-y-6 text-gray-600 text-lg">
                    {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        data.description?.paragraphs?.map((p: any, i: number) => (
                            <p key={i} className="text-gray-600">
                                {p.content}
                            </p>
                        ))}
                </div>

            </div>
        </section>
    );
}
