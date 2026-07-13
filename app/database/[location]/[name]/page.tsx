"use client";
import { useParams, useSearchParams } from "next/navigation";

import IndividualObject from "@/components/DatabasePage/IndividualObject";

export default function ObjectDataPage() {
  const params = useParams<{ location: string; name: string }>();
  const fromQuery = useSearchParams().get("from") ?? "";
  return <IndividualObject name={params.name} location={params.location} fromQuery={fromQuery} />;
}
