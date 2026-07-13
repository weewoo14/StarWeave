"use client";
import { useSearchParams } from "next/navigation";

import DatabaseHomePage from "@/components/DatabasePage/Database";

export default function DatabasePage() {
  const searchQuery = useSearchParams().get("query") ?? "";

  return <DatabaseHomePage searchQuery={searchQuery} />;
}
