"use client";
export const dynamic = "force-dynamic";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import DatabaseHomePage from "@/components/DatabasePage/Database";
import LoadingScreen from "@/components/Helper/LoadingScreen";

function DatabasePageClient() {
  const searchQuery = useSearchParams().get("query") ?? "";

  return <DatabaseHomePage searchQuery={searchQuery} />;
}

export default function DatabasePage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <DatabasePageClient />
    </Suspense>
  );
}