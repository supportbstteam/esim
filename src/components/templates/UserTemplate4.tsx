import { IconRenderer } from "../common/IconComponent";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function UserTemplate4({ data }: any) {

  if (!data?.items?.length) return null;

  return (

    <section className="py-20">

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {data.items.map((item: any, i: number) => (

          <div
            key={item.id || i}
            className="rounded-xl bg-white border border-gray-200 p-6 space-y-2 shadow-sm hover:shadow-md transition-shadow"
          >

            {/* ================= ICON ================= */}

            {item.icon && (

              <div className="rounded-lg">

                <IconRenderer
                  name={item.icon}
                  size={25}
                  className="text-gray-900"
                />

              </div>

            )}



            {/* ================= TITLE (HTML) ================= */}

            {item.title && (

              <div
                className="text-xl font-semibold text-gray-900 leading-snug"
                dangerouslySetInnerHTML={{
                  __html: item.title,
                }}
              />

            )}



            {/* ================= DESCRIPTION (HTML) ================= */}

            {item.description && (

              <div
                className="text-gray-600 text-md leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: item.description,
                }}
              />

            )}

          </div>

        ))}

      </div>

    </section>

  );

}
