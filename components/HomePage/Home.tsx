"use client";
import StarWeaveTitle from "../../utils/Title";
import { useStarWeaveState } from "../StarWeaveContext";
import SearchBar from "../../utils/SearchBar";

export default function HomePage() {
  const { dataLoaded } = useStarWeaveState();

  if (!dataLoaded) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full h-screen bg-nebulaBG">
        <StarWeaveTitle size={7}/>
        <SearchBar searchDefaultValue=""/>

      </div>
    </>
  );
}