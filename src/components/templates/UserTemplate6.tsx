import { resolveImageUrl } from "@/lib/resolveImage";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function UserTemplate6({ data }: any) {

  if (!data?.image) return null;

  const imageSrc = resolveImageUrl(data.image);

  return (

    <section className="
      w-full 
      my-6 sm:my-8 md:my-10 lg:my-12
    ">

      <div className="
        max-w-7xl 
        mx-auto 
        px-4 sm:px-6 lg:px-8
      ">

        <div className="
          w-full 
          overflow-hidden 
          rounded-lg sm:rounded-xl md:rounded-2xl
        ">

          <img
            src={imageSrc}
            alt="Banner"
            className="
              w-full 
              h-auto 
              object-cover
              
              /* Responsive height control */
              max-h-[200px]
              sm:max-h-[300px]
              md:max-h-[400px]
              lg:max-h-[500px]
              
              /* Prevent distortion */
              aspect-auto
            "
          />

        </div>

      </div>

    </section>

  );

}