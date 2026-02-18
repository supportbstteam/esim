"use client";

/* ================= TYPES ================= */

interface Card {
  id: number;
  content: string;
  bgColor: string;
}

interface Template7Data {
  heading: string;
  columns: number;
  cards: Card[];
}

interface Props {
  data: Template7Data;
}

/* ================= MAIN ================= */

export default function UserTemplate7({ data }: Props) {

  if (!data) return null;

  const columns = data.columns || 3;
  const cards = data.cards || [];

  return (

    <section className="py-5 bg-white border-1 border-gray-200 shadow-sm rounded-md">

      <div className="max-w-7xl mx-auto px-6 space-y-12">

        {/* ================= HEADING ================= */}

        {data.heading && (
          <div
            className="prose max-w-none text-gray-900"
            dangerouslySetInnerHTML={{
              __html: data.heading,
            }}
          />
        )}

        {/* ================= CARDS GRID ================= */}

        {cards.length > 0 && (

          <div
            className="grid gap-6"
            style={{
              gridTemplateColumns:
                `repeat(${columns}, minmax(0, 1fr))`,
            }}
          >

            {cards.map((card) => (

              <div
                key={card.id}
                className="
                  rounded-xl
                  border border-gray-200
                  shadow-sm
                  p-6
                  transition-all
                  hover:shadow-md
                "
                style={{
                  backgroundColor:
                    card.bgColor || "#ffffff",
                }}
              >

                <div
                  className="
                    prose
                    max-w-none
                    text-gray-800
                  "
                  dangerouslySetInnerHTML={{
                    __html: card.content,
                  }}
                />

              </div>

            ))}

          </div>

        )}

      </div>

    </section>

  );

}
