"use client";
import SearchBar from "@/components/Helper/SearchBar";
import StarWeaveTitle from "@/components/Helper/Title";

import { useStarWeaveState } from "../StarWeaveContext";
import LoadingScreen from "../Helper/LoadingScreen";

export default function HomePage() {
  const { dataLoaded } = useStarWeaveState();

  if (!dataLoaded) {
    return (
      <LoadingScreen/>
    );
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full h-screen bg-nebulaBG">
        <StarWeaveTitle size={7} />
        <SearchBar searchDefaultValue="" searchAmount={10} />
      </div>
    </>
  );
}
