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

  /**
   * Tailwind replacements for the global prose-content styles.
   * This handles tables, images, and margin resets for injected HTML.
   */
  const proseStyles = `
    prose-content
    max-w-none
    [&_table]:w-full [&_table]:table-auto [&_table]:border-collapse [&_table]:my-[1.5em]
    [&_th]:border [&_th]:border-gray-200 [&_th]:p-3 [&_th]:text-left
    [&_td]:border [&_td]:border-gray-200 [&_td]:p-3 [&_td]:text-left
    [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-lg
    [&_>*:first-child]:mt-0
    [&_>*:last-child]:mb-0
  `;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADING (Label) */}
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
                    className={`prose prose-lg prose-slate text-gray-700 ${proseStyles}`}
                    dangerouslySetInnerHTML={{ __html: paragraph.content }}
                  />
                ))}
              </div>
            ) : (
              /* If no left paragraphs, Subheading goes here */
              <div
                className={`prose prose-2xl prose-slate font-bold text-gray-900 leading-tight ${proseStyles}`}
                dangerouslySetInnerHTML={{ __html: data.subHeading }}
              />
            )}
          </div>

          {/* ================= RIGHT COLUMN ================= */}
          <div>
            {hasLeft ? (
              /* If left paragraphs exist, Subheading is on the right */
              <div
                className={`prose prose-2xl prose-slate font-bold text-gray-900 leading-tight ${proseStyles}`}
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
                    className={`prose prose-lg prose-slate text-gray-700 ${proseStyles}`}
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
                className={`prose prose-lg prose-slate text-gray-700 ${proseStyles}`}
                dangerouslySetInnerHTML={{ __html: paragraph.content }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
