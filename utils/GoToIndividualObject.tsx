"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function useGoToIndividualObject() {
  const router = useRouter();
  return useCallback(
    (objectID: string, name: string, location: string, from: string) => {
      const queryParams = new URLSearchParams({
        query: objectID,
        from: from,
      })
      router.push(`/database/${location}/${name}?${queryParams.toString()}`);
    },
    [router]
  );
}
