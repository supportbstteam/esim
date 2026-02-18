// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function UserTemplate1({ data }: any) {

  if (!data) return null;

  const paragraphs =
    data.description?.paragraphs || [];



  /* ================= FILTER ================= */

  const leftParagraphs =
    paragraphs.filter(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (p: any) =>
        p.position === "left"
    );

  const rightParagraphs =
    paragraphs.filter(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (p: any) =>
        p.position === "right"
    );

  const downParagraphs =
    paragraphs.filter(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (p: any) =>
        p.position === "down"
    );



  const hasLeft =
    leftParagraphs.length > 0;



  return (

    <section className="py-20">

      <div className="max-w-7xl mx-auto px-6 space-y-12">



        {/* ================= TOP GRID ================= */}

        <div className="grid md:grid-cols-2 gap-12 items-start">



          {/* ================= LEFT COLUMN ================= */}

          <div className="space-y-6">

            {hasLeft ? (

              leftParagraphs.map(
                (
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  paragraph: any,
                  index: number
                ) => (

                  <div
                    key={index}
                    className="text-gray-600 text-lg"
                    dangerouslySetInnerHTML={{
                      __html:
                        paragraph.content,
                    }}
                  />

                )
              )

            ) : (

              <>
                {/* HEADING */}

                <p className="text-xl font-semibold text-gray-600">

                  {(data.heading || "")
                    .replace(
                      /<[^>]+>/g,
                      ""
                    )
                    .toUpperCase()}

                </p>



                {/* SUBHEADING */}

                <div
                  className="text-4xl font-bold text-gray-900 leading-tight"
                  dangerouslySetInnerHTML={{
                    __html:
                      data.subHeading,
                  }}
                />

              </>

            )}

          </div>



          {/* ================= RIGHT COLUMN ================= */}

          <div className="space-y-6">

            {hasLeft ? (

              <>
                {/* HEADING */}

                <p className="text-xl font-semibold text-gray-600">

                  {(data.heading || "")
                    .replace(
                      /<[^>]+>/g,
                      ""
                    )
                    .toUpperCase()}

                </p>



                {/* SUBHEADING */}

                <div
                  className="text-4xl font-bold text-gray-900 leading-tight"
                  dangerouslySetInnerHTML={{
                    __html:
                      data.subHeading,
                  }}
                />

              </>

            ) : (

              rightParagraphs.map(
                (
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  paragraph: any,
                  index: number
                ) => (

                  <div
                    key={index}
                    className="text-gray-600 text-lg"
                    dangerouslySetInnerHTML={{
                      __html:
                        paragraph.content,
                    }}
                  />

                )
              )

            )}

          </div>

        </div>



        {/* ================= DOWN SECTION ================= */}

        {downParagraphs.length >
          0 && (

          <div className="space-y-6 border-t pt-8">

            {downParagraphs.map(
              (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                paragraph: any,
                index: number
              ) => (

                <div
                  key={index}
                  className="text-gray-600 text-lg"
                  dangerouslySetInnerHTML={{
                    __html:
                      paragraph.content,
                  }}
                />

              )
            )}

          </div>

        )}

      </div>

    </section>

  );

}
