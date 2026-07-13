"use client";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type BackButtonProps = {
  destination: string
}

export default function BackButton({destination} : BackButtonProps) {
  const router = useRouter();
  return (
    <div className="flex flex-row absolute top-0 left-0 items-center gap-2 cursor-pointer" onClick={() => {router.push(destination)}}>
      <MoveLeft size={50} color="white"/>
      <p className="text-white text-[1.5vw]"> Back </p>
    </div>
  );
}
