"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function useGoToIndividualObject() {
  const router = useRouter();
  return useCallback((name: string, location: string) => {
    const objectName = encodeURIComponent(name.replaceAll(' ', '-'));
    router.push(`/database/${location}/${objectName}`)
  }, [router])
}