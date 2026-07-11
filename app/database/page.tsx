"use client";
import DatabaseHomePage from "@/components/DatabasePage/Database";
import { useSearchParams } from "next/navigation";

export default function DatabasePage() {
  const searchQuery = useSearchParams().get('query') ?? "";

  return (
    <DatabaseHomePage searchQuery={searchQuery}/>
  );
}