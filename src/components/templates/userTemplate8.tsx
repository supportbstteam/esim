"use client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function UserTemplate8({ data }: any) {
  if (!data || !data.content) return null;

  /**
   * Cleans problematic inline styles from the editor
   */
  const cleanHtml = (html?: string) => {
    if (!html) return "";
    return html
      .replace(/style="[^"]*font-size:[^"]*"/gi, "") 
      .replace(/style="[^"]*lab\([^"]*"/gi, "")      
      .replace(/style="[^"]*width:[^"]*"/gi, "");    
  };

  /**
   * Tailored prose styles for the full-width Rich Text Editor.
   * This ensures images, tables, and typography look good across devices.
   */
  const proseStyles = `
    prose-content
    max-w-none
    prose-slate
    prose-base sm:prose-lg md:prose-xl
    text-gray-800
    
    /* Image Handling */
    [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-xl [&_img]:my-8 [&_img]:mx-auto
    
    /* Table Handling */
    [&_table]:w-full [&_table]:table-auto [&_table]:border-collapse [&_table]:my-6 [&_table]:block [&_table]:overflow-x-auto
    [&_th]:border [&_th]:border-gray-200 [&_th]:p-3 [&_th]:bg-gray-50 [&_th]:text-left
    [&_td]:border [&_td]:border-gray-200 [&_td]:p-3 [&_td]:text-left

    /* Heading Spacing */
    [&_h1]:text-3xl sm:[&_h1]:text-5xl [&_h1]:font-extrabold [&_h1]:mb-6
    [&_h2]:text-2xl sm:[&_h2]:text-3xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4
    [&_h3]:text-xl sm:[&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:mt-8
    
    /* List styling */
    [&_ul]:list-disc [&_ol]:list-decimal [&_li]:my-2
  `;

  return (
    <section className="py-12 sm:py-24 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Render the unified content from Template8 */}
        <div
          className={`${proseStyles}`}
          dangerouslySetInnerHTML={{ __html: cleanHtml(data.content) }}
        />

      </div>
    </section>
  );
}
