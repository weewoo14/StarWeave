"use client";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  // IDEA, USE FROM PARAMETER IN SEARCH BAR
  return (
    <div className="flex flex-row absolute top-0 left-0 items-center gap-2 cursor-pointer" onClick={() => {router.back()}}>
      <MoveLeft size={50} color="white"/>
      <p className="text-white text-[1.5vw]"> Back </p>
    </div>
  );
}
