"use client";
import IndividualObject from "@/components/DatabasePage/IndividualObject";
import { useParams } from "next/navigation";

export default function ObjectDataPage() {
  const params = useParams<{location: string, name: string}>()
  return (
    <IndividualObject name={params.name} location={params.location}/>
  );
}