"use client";

/* ================= TYPES ================= */

type BlockType = "paragraph" | "cards";

interface Card {
  id: number;
  content: string;
  bgColor: string;
}

interface Block {
  id: string;
  type: BlockType;
  content?: string;
  cards?: Card[];
  columns?: number;
}

interface Template7Data {
  blocks: Block[];
  heading?: string;
  cards?: Card[];
  columns?: number;
}

interface Props {
  data: Template7Data;
}

/* ================= MAIN ================= */

export default function UserTemplate7({ data }: Props) {
  if (!data) return null;

  /**
   * CLEANER: Removes problematic inline styles (like lab, oklab, fixed widths) 
   * sent by the backend so they don't break the Next.js build or layout.
   */
  const cleanHtml = (html?: string) => {
    if (!html) return "";
    // Removes all style="..." attributes from the HTML string
    return html.replace(/style="[^"]*"/g, "");
  };

  const getBlocksToRender = (): Block[] => {
    if (data.blocks && Array.isArray(data.blocks)) {
      return data.blocks;
    }

    const legacyBlocks: Block[] = [];

    if (data.heading) {
      legacyBlocks.push({
        id: "legacy-heading",
        type: "paragraph",
        content: data.heading,
      });
    }

    if (data.cards && data.cards.length > 0) {
      legacyBlocks.push({
        id: "legacy-cards",
        type: "cards",
        cards: data.cards,
        columns: data.columns || 3,
      });
    }

    return legacyBlocks;
  };

  const displayBlocks = getBlocksToRender();

  const getResponsiveGridClasses = (columns?: number) => {
    switch (columns) {
      case 4: return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
      case 3: return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
      case 2: return "grid-cols-1 sm:grid-cols-2";
      default: return "grid-cols-1";
    }
  };

  const proseStyles = `
    max-w-none 
    [&_table]:w-full [&_table]:table-auto [&_table]:border-collapse [&_table]:my-4 [&_table]:block [&_table]:overflow-x-auto [&_table]:white-space-nowrap [&_table]:border [&_table]:border-gray-200
    [&_th]:border [&_th]:border-gray-200 [&_th]:p-3 [&_th]:bg-gray-50 [&_th]:font-semibold
    [&_td]:border [&_td]:border-gray-200 [&_td]:p-3
    [&_img]:max-w-full [&_img]:h-auto
    [&_>*:first-child]:mt-0
    [&_>*:last-child]:mb-0
  `;

  return (
    <section className="py-4 sm:py-6 md:py-8 border border-gray-200 mb-4 sm:mb-6 rounded-lg sm:rounded-xl shadow-sm bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3 sm:space-y-4 md:space-y-6">
        
        {displayBlocks.map((block) => (
          <div key={block.id} className="w-full">

            {/* ================= PARAGRAPH ================= */}
            {block.type === "paragraph" && block.content && (
              <div
                className={`prose prose-sm sm:prose-base md:prose-lg prose-slate text-gray-900 ${proseStyles}`}
                dangerouslySetInnerHTML={{ __html: cleanHtml(block.content) }}
              />
            )}

            {/* ================= CARDS ================= */}
            {block.type === "cards" && block.cards && (
              <div className={`grid gap-3 sm:gap-4 md:gap-5 ${getResponsiveGridClasses(block.columns)}`}>
                {block.cards.map((card) => (
                  <div
                    key={card.id}
                    className="rounded-lg sm:rounded-xl border border-gray-100 p-4 sm:p-5 md:p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
                    style={{ backgroundColor: card.bgColor || "#ffffff" }}
                  >
                    <div
                      className={`prose prose-sm sm:prose-base prose-slate text-gray-800 ${proseStyles}`}
                      dangerouslySetInnerHTML={{ __html: cleanHtml(card.content) }}
                    />
                  </div>
                ))}
              </div>
            )}

          </div>
        ))}
      </div>
    </section>
  );
}
