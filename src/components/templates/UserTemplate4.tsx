import { IconRenderer } from "../common/IconComponent";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function UserTemplate4({ data }: any) {
  if (!data?.items?.length) return null;

  return (
    <section className="py-20 ">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {data.items.map((item: any, i: number) => (
          <div
            key={item.id || i}
            className="rounded-xl bg-white border p-6 space-y-4"
          >
            {/* ICON */}
            <div className="w-10 h-10 flex items-center justify-center rounded bg-gray-100">
              <IconRenderer
                name={item.icon}
                size={22}
                className="text-gray-900"
              />
            </div>

            {/* TITLE */}
            <h4 className="font-semibold text-xl text-gray-900">
              {item.title}
            </h4>

            {/* DESCRIPTION */}
            <p className="text-gray-600 text-md">
              {item.description}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
}
