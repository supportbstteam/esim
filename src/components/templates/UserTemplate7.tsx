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
  // Legacy support for old data format
  heading?: string;
  cards?: Card[];
  columns?: number;
}

interface Props {
  data: Template7Data;
}

/* ================= MAIN ================= */

export default function UserTemplate7({ data }: Props) {
  // Guard clause if no data is provided
  if (!data) return null;

  /**
   * MIGRATION LOGIC
   * If the data is in the new 'blocks' format, we use it.
   * If it's the old format (heading/cards at top level), we convert it 
   * into a block structure so it renders correctly.
   */
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

  return (
    <section className="py-12 border-1 mb-6 rounded-lg shadow-sm bg-white">
      {/* CSS FIX:
          1. prose table: Ensures tables inside the editor take 100% width.
          2. prose img: Ensures images don't overflow.
      */}
      <style jsx global>{`
        .prose-full-width {
          max-width: 100% !important;
        }
        .prose-full-width table {
          width: 100% !important;
          table-layout: fixed;
          border-collapse: collapse;
          margin-bottom: 1rem;
        }
        .prose-full-width th, .prose-full-width td {
          border: 1px solid #e5e7eb;
          padding: 8px;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {displayBlocks.map((block) => (
          <div key={block.id} className="w-full">
            
            {/* ================= CASE: PARAGRAPH ================= */}
            {block.type === "paragraph" && block.content && (
              <div
                className="prose prose-lg prose-full-width text-gray-900"
                dangerouslySetInnerHTML={{ __html: block.content }}
              />
            )}

            {/* ================= CASE: CARDS GRID ================= */}
            {block.type === "cards" && block.cards && (
              <div
                className="grid gap-8"
                style={{
                  // Dynamically setting columns based on user selection
                  gridTemplateColumns: `repeat(${block.columns || 1}, minmax(0, 1fr))`,
                }}
              >
                {block.cards.map((card) => (
                  <div
                    key={card.id}
                    className="rounded-2xl border border-gray-100 p-8 shadow-sm transition-all hover:shadow-md"
                    style={{ backgroundColor: card.bgColor || "#ffffff" }}
                  >
                    <div
                      className="prose prose-full-width text-gray-800"
                      dangerouslySetInnerHTML={{ __html: card.content }}
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