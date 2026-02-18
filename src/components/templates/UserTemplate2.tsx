import { resolveImageUrl } from "@/lib/resolveImage";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function UserTemplate2({ data }: any) {

  if (!data) return null;

  const paragraphs =
    data.description?.paragraphs || [];

  return (

    <section className="py-24">

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* ================= LEFT IMAGE ================= */}

        <div className="bg-gray-100 rounded-2xl flex justify-center items-center p-6">

          {(data.image) && (

            <img
              src={resolveImageUrl(data.image)}
              alt="Step Image"
              className="object-contain rounded-md max-h-[420px]"
            />

          )}

        </div>



        {/* ================= RIGHT CONTENT ================= */}

        <div>

          {/* STEP NUMBER */}

          {data.stepNumber && (

            <div className="h-15 w-15 text-xl flex items-center justify-center rounded-full bg-gray-200 font-bold mb-6">

              {data.stepNumber}

            </div>

          )}



          {/* HEADING (HTML from HeadingInput) */}

          {data.heading && (

            <div
              className="text-4xl font-bold text-gray-900 mb-6 leading-tight"
              dangerouslySetInnerHTML={{
                __html: data.heading,
              }}
            />

          )}



          {/* PARAGRAPHS (HTML from ParagraphEditor) */}

          <div className="space-y-6">

            {paragraphs.map(
              (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                paragraph: any,
                index: number
              ) => (

                <div
                  key={index}
                  className="text-gray-600 text-lg leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: paragraph.content,
                  }}
                />

              )
            )}

          </div>

        </div>

      </div>

    </section>

  );

}
