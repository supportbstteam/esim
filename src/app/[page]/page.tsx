import React from "react";

type PageProps = {
  params: { page: string };
};

export default function DynamicPage({ params }: PageProps) {
  const { page } = params;

  const words = page.split(/[-_]/).map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );

  // Join back into a readable title
  const title = words.join(" ");

  // useFfect

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <p>
        {page === "terms-and-conditions"
          ? "These are the terms and conditions of our website."
          : page === "privacy-policy"
          ? "This is the privacy policy page."
          : `Content for ${title} page.`}
      </p>
    </div>
  );
}
