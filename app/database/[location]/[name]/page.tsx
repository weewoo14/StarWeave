"use client";
import { useParams, useSearchParams } from "next/navigation";

import IndividualObject from "@/components/DatabasePage/IndividualObject";

export default function ObjectDataPage() {
  const params = useParams<{ location: string; name: string }>();
  const idQuery = useSearchParams().get("query") ?? "";
  const fromQuery = useSearchParams().get("from") ?? "";
  return <IndividualObject objectID={idQuery} name={params.name} location={params.location} fromQuery={fromQuery} />;
}
