import { resolveImageUrl } from "@/lib/resolveImage";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function UserTemplate3({ data }: any) {

  if (!data) return null;

  const paragraphs = data.description?.paragraphs || [];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Responsive Grid */}
        <div className="
          grid 
          grid-cols-1 
          md:grid-cols-2 
          gap-10 
          sm:gap-12 
          md:gap-16 
          items-center
        ">

          {/* ================= CONTENT ================= */}
          <div className="order-2 md:order-1">

            {/* STEP NUMBER */}
            {data.stepNumber?.trim() && (
              <div className="
                h-10 w-10 
                sm:h-12 sm:w-12 
                md:h-14 md:w-14 
                flex items-center justify-center 
                rounded-full 
                bg-gray-200 
                font-bold 
                mb-4 sm:mb-5 md:mb-6
                text-sm sm:text-base md:text-xl
              ">
                {data.stepNumber.trim()}
              </div>
            )}

            {/* HEADING */}
            {data.heading && (
              <div
                className="
                  text-xl 
                  sm:text-2xl 
                  md:text-3xl 
                  lg:text-4xl 
                  font-bold 
                  text-gray-900 
                  mb-4 sm:mb-5 md:mb-6 
                  leading-tight
                "
                dangerouslySetInnerHTML={{
                  __html: data.heading,
                }}
              />
            )}

            {/* PARAGRAPHS */}
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                paragraphs.map((paragraph: any, index: number) => (
                  <div
                    key={index}
                    className="
                    text-gray-600 
                    text-sm 
                    sm:text-base 
                    md:text-lg 
                    leading-relaxed
                  "
                    dangerouslySetInnerHTML={{
                      __html: paragraph.content,
                    }}
                  />
                ))}
            </div>

          </div>


          {/* ================= IMAGE ================= */}
          <div className="
            bg-gray-100 
            rounded-xl 
            sm:rounded-2xl 
            flex 
            justify-center 
            items-center 
            p-4 sm:p-6
            order-1 md:order-2
          ">
            {data.image && (
              <img
                src={resolveImageUrl(data.image)}
                alt="Step Image"
                className="
                  object-contain 
                  rounded-md 
                  w-full
                  max-h-[220px]
                  sm:max-h-[300px]
                  md:max-h-[360px]
                  lg:max-h-[420px]
                "
              />
            )}
          </div>

        </div>

      </div>

    </section>
  );

}