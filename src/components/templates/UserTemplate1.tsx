"use client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function UserTemplate1({ data }: any) {
  if (!data) return null;

  /**
   * CLEANER: Strips problematic fixed font-sizes and lab colors from backend HTML.
   * This prevents "40px" from breaking mobile screens and lets Tailwind scale text.
   */
  const cleanHtml = (html?: string) => {
    if (!html) return "";
    return html
      .replace(/style="[^"]*font-size:[^"]*"/gi, "") // Specifically targets fixed font-sizes
      .replace(/style="[^"]*lab\([^"]*"/gi, "")      // Targets the breaking lab() colors
      .replace(/style="[^"]*width:[^"]*"/gi, "");    // Removes fixed widths (like 1270px)
  };

  const paragraphs = data.description?.paragraphs || [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const leftParagraphs = paragraphs.filter((p: any) => p.position === "left");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rightParagraphs = paragraphs.filter((p: any) => p.position === "right");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const downParagraphs = paragraphs.filter((p: any) => p.position === "down");

  const hasLeft = leftParagraphs.length > 0;

  /**
   * prose-2xl on mobile can be too large. 
   * We use "prose-xl sm:prose-2xl" for a fluid response.
   */
  const proseStyles = `
    prose-content
    max-w-none
    prose-slate
    [&_table]:w-full [&_table]:table-auto [&_table]:border-collapse [&_table]:my-[1.5em] [&_table]:block [&_table]:overflow-x-auto
    [&_th]:border [&_th]:border-gray-200 [&_th]:p-3 [&_th]:text-left
    [&_td]:border [&_td]:border-gray-200 [&_td]:p-3 [&_td]:text-left
    [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-lg
    [&_font]:text-3xl sm:[&_font]:text-4xl [&_font]:leading-tight
    [&_>*:first-child]:mt-0
    [&_>*:last-child]:mb-0
  `;

  return (
    <section className="py-12 sm:py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* HEADING (Label) */}
        <div className="mb-4">
          <p className="text-lg sm:text-xl font-semibold tracking-wide text-gray-500 uppercase">
            {(data.heading || "").replace(/<[^>]+>/g, "")}
          </p>
        </div>

        {/* ================= TOP GRID ================= */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">

          {/* ================= LEFT COLUMN ================= */}
          <div className="min-w-0">
            {hasLeft ? (
              <div className="space-y-6">
                {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                leftParagraphs.map((paragraph: any, index: number) => (
                  <div
                    key={index}
                    className={`prose prose-base sm:prose-lg ${proseStyles} text-gray-700`}
                    dangerouslySetInnerHTML={{ __html: cleanHtml(paragraph.content) }}
                  />
                ))}
              </div>
            ) : (
              <div
                className={`prose prose-xl sm:prose-2xl font-bold text-gray-900 leading-tight ${proseStyles}`}
                dangerouslySetInnerHTML={{ __html: cleanHtml(data.subHeading) }}
              />
            )}
          </div>

          {/* ================= RIGHT COLUMN ================= */}
          <div className="min-w-0">
            {hasLeft ? (
              <div
                className={`prose prose-xl sm:prose-2xl font-bold text-gray-900 leading-tight ${proseStyles}`}
                dangerouslySetInnerHTML={{ __html: cleanHtml(data.subHeading) }}
              />
            ) : (
              <div className="space-y-6">
                {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                rightParagraphs.map((paragraph: any, index: number) => (
                  <div
                    key={index}
                    className={`prose prose-base sm:prose-lg ${proseStyles} text-gray-700`}
                    dangerouslySetInnerHTML={{ __html: cleanHtml(paragraph.content) }}
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
                className={`prose prose-base sm:prose-lg ${proseStyles} text-gray-700`}
                dangerouslySetInnerHTML={{ __html: cleanHtml(paragraph.content) }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
