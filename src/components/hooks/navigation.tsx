"use client";

import { useRouter } from "next/navigation";

/**
 * Custom hook to handle navigation in Next.js App Router
 * Usage: const navigate = useNavigate(); navigate("/about");
 */
export const useNavigate = () => {
  const router = useRouter();

  const navigate = (path: string) => {
    if (!path.startsWith("/")) path = `/${path}`;
    router.push(path);
  };

  return navigate;
};
