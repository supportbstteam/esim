 // eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function UserTemplate4({ data }:any) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data.items.map((item:any, i:number) => (
          <div
            key={i}
            className="rounded-xl bg-white border p-6 space-y-4"
          >
            <div className="text-2xl">{item.icon}</div>
            <h4 className="font-semibold text-gray-900">
              {item.title}
            </h4>
            <p className="text-gray-600 text-sm">
              {item.description}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
}
