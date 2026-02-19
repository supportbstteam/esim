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
    <section className="py-6 border border-gray-200 mb-6 rounded-lg shadow-sm bg-white">
      <style jsx global>{`
        .prose-custom {
          max-width: 100% !important;
        }
        /* Fix for tables taking full width */
        .prose-custom table {
          width: 100% !important;
          table-layout: auto;
          border-collapse: collapse;
          margin: 1rem 0 !important;
        }
        .prose-custom th, .prose-custom td {
          border: 1px solid #e5e7eb;
          padding: 8px;
        }
        /* REMOVE EXTRA GAPS created by prose margins */
        .prose-custom > *:first-child {
          margin-top: 0 !important;
        }
        .prose-custom > *:last-child {
          margin-bottom: 0 !important;
        }
      `}</style>

      {/* Changed space-y-12 to space-y-4 to reduce gap between blocks */}
      <div className="max-w-7xl mx-auto px-6 space-y-4">
        {displayBlocks.map((block) => (
          <div key={block.id} className="w-full">
            
            {/* ================= CASE: PARAGRAPH ================= */}
            {block.type === "paragraph" && block.content && (
              <div
                className="prose prose-slate prose-custom text-gray-900"
                dangerouslySetInnerHTML={{ __html: block.content }}
              />
            )}

            {/* ================= CASE: CARDS GRID ================= */}
            {block.type === "cards" && block.cards && (
              <div
                className="grid gap-4" /* Reduced gap from 5 to 4 */
                style={{
                  gridTemplateColumns: `repeat(${block.columns || 1}, minmax(0, 1fr))`,
                }}
              >
                {block.cards.map((card) => (
                  <div
                    key={card.id}
                    className="rounded-xl border border-gray-100 p-5 shadow-sm transition-all hover:shadow-md"
                    style={{ backgroundColor: card.bgColor || "#ffffff" }}
                  >
                    <div
                      className="prose prose-slate prose-custom text-gray-800"
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