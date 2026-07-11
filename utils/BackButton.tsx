import { MoveLeft } from "lucide-react";
import Link from "next/link";

type BackButtonProps = {
  destination: string
}

export default function BackButton({destination} : BackButtonProps) {
  return (
    <div className="absolute top-0 left-0">
      <Link href={destination} className="flex flex-row gap-2 items-center">
        <MoveLeft size={50} color="white"/>
        <p className="text-white text-[1.5vw]"> Back </p>
      </Link>
    </div>
  );
}
