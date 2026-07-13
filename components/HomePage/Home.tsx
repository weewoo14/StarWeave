"use client";
import SearchBar from "../../utils/SearchBar";
import StarWeaveTitle from "../../utils/Title";
import { useStarWeaveState } from "../StarWeaveContext";

export default function HomePage() {
  const { dataLoaded } = useStarWeaveState();

  if (!dataLoaded) {
    return null;
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
