import { resolveImageUrl } from "@/lib/resolveImage";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function UserTemplate6({ data }: any) {
  if (!data?.image) return null;

  console.log("-=--=-=-= data.image -=-=-=-=-=",data.image);
  const imageSrc = resolveImageUrl(data.image);
  console.log("-=--=-=-= imageSrc -=-=-=-=-=",imageSrc);
  // const imageSrc = data?.image.split("/");

  return (
    <section className="w-full my-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="w-full overflow-hidden rounded-2xl">
          <img
            src={imageSrc}
            alt="Banner"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
}
