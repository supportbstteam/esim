"use client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function UserTemplate1({ data }: any) {
  if (!data) return null;

  const paragraphs = data.description?.paragraphs || [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const leftParagraphs = paragraphs.filter((p: any) => p.position === "left");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rightParagraphs = paragraphs.filter((p: any) => p.position === "right");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const downParagraphs = paragraphs.filter((p: any) => p.position === "down");

  const hasLeft = leftParagraphs.length > 0;

  return (
    <section className="py-20 bg-white">
      <style jsx global>{`
        .prose-content table {
          width: 100% !important;
          table-layout: auto;
          border-collapse: collapse;
          margin: 1.5em 0;
        }
        .prose-content th, .prose-content td {
          border: 1px solid #e5e7eb;
          padding: 12px;
          text-align: left;
        }
        .prose-content > *:first-child { margin-top: 0 !important; }
        .prose-content > *:last-child { margin-bottom: 0 !important; }
        .prose-content img { max-width: 100%; height: auto; border-radius: 8px; }
      `}</style>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADING (Label) - Now spans full width or sits at the top to keep columns balanced */}
        <div className="mb-4">
          <p className="text-xl font-semibold tracking-wide text-gray-500 uppercase">
            {(data.heading || "").replace(/<[^>]+>/g, "")}
          </p>
        </div>

        {/* ================= TOP GRID ================= */}
        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* ================= LEFT COLUMN ================= */}
          <div>
            {hasLeft ? (
              <div className="space-y-6">
                {
                 // eslint-disable-next-line @typescript-eslint/no-explicit-any
                leftParagraphs.map((paragraph: any, index: number) => (
                  <div
                    key={index}
                    className="prose prose-lg prose-slate prose-content text-gray-700 max-w-none"
                    dangerouslySetInnerHTML={{ __html: paragraph.content }}
                  />
                ))}
              </div>
            ) : (
              /* If no left paragraphs, Subheading goes here */
              <div
                className="prose prose-2xl prose-slate prose-content font-bold text-gray-900 leading-tight max-w-none"
                dangerouslySetInnerHTML={{ __html: data.subHeading }}
              />
            )}
          </div>

          {/* ================= RIGHT COLUMN ================= */}
          <div>
            {hasLeft ? (
              /* If left paragraphs exist, Subheading is on the right */
              <div
                className="prose prose-2xl prose-slate prose-content font-bold text-gray-900 leading-tight max-w-none"
                dangerouslySetInnerHTML={{ __html: data.subHeading }}
              />
            ) : (
              /* Otherwise, right paragraphs go here */
              <div className="space-y-6">
                {
                 // eslint-disable-next-line @typescript-eslint/no-explicit-any
                rightParagraphs.map((paragraph: any, index: number) => (
                  <div
                    key={index}
                    className="prose prose-lg prose-slate prose-content text-gray-700 max-w-none"
                    dangerouslySetInnerHTML={{ __html: paragraph.content }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ================= DOWN SECTION ================= */}
        {downParagraphs.length > 0 && (
          <div className="space-y-8 border-t border-gray-100 pt-12 mt-12">
            {
             // eslint-disable-next-line @typescript-eslint/no-explicit-any
            downParagraphs.map((paragraph: any, index: number) => (
              <div
                key={index}
                className="prose prose-lg prose-slate prose-content text-gray-700 max-w-none"
                dangerouslySetInnerHTML={{ __html: paragraph.content }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}