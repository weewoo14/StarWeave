"use client";
import { useParams } from "next/navigation";
export default function ObjectDataPage() {
    const params = useParams<{location: string, name: string}>()
    return (
        <div>
            {params.location}
            {params.name}
        </div>
    );
}