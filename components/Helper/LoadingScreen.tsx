import { LoaderCircle } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-nebulaBG">
      <h1 className="font-syne text-white text-[10vw] md:text-[5vw] z-10">
        Loading data...
      </h1>
      <LoaderCircle color='#ffffff' className='size-[4vw] animate-spin'/>
    </div>
  );
}