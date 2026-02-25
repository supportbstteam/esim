import { IconRenderer } from "../common/IconComponent";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function UserTemplate4({ data }: any) {

  if (!data?.items?.length) return null;

  return (

    <section className="py-12 sm:py-16 md:py-20">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          xl:grid-cols-4 
          gap-4 
          sm:gap-5 
          md:gap-6
        ">

          {data.items.map((item: any, i: number) => (

            <div
              key={item.id || i}
              className="
                rounded-lg sm:rounded-xl 
                bg-white 
                border border-gray-200 
                p-4 sm:p-5 md:p-6 
                space-y-2 sm:space-y-3 
                shadow-sm 
                hover:shadow-md 
                transition-all 
                duration-200
              "
            >

              {/* ================= ICON ================= */}
              {item.icon && (
                <div className="mb-1 sm:mb-2">
                  <IconRenderer
                    name={item.icon}
                    size={20}
                    className="text-gray-900 sm:w-6 sm:h-6 md:w-7 md:h-7"
                  />
                </div>
              )}

              {/* ================= TITLE ================= */}
              {item.title && (
                <div
                  className="
                    text-base 
                    sm:text-lg 
                    md:text-xl 
                    font-semibold 
                    text-gray-900 
                    leading-snug
                  "
                  dangerouslySetInnerHTML={{
                    __html: item.title,
                  }}
                />
              )}

              {/* ================= DESCRIPTION ================= */}
              {item.description && (
                <div
                  className="
                    text-gray-600 
                    text-sm 
                    sm:text-sm 
                    md:text-base 
                    leading-relaxed
                  "
                  dangerouslySetInnerHTML={{
                    __html: item.description,
                  }}
                />
              )}

            </div>

          ))}

        </div>

      </div>

    </section>

  );

}