"use client";

import useGoToIndividualObject from "@/components/Helper/GoToIndividualObject";
import isIntegerString from "@/utils/checkIntegerString";

const stellarObjectCategory: Record<string, string> = {
  horizons: "Horizon Major Body",
  exoplanet: "Exoplanet",
};

type DatabaseObjectCardProps = {
  objectID: string;
  name: string;
  location: string;
  searchQuery: string;
};

export default function DatabaseObjectCard({
  objectID,
  name,
  location,
  searchQuery,
}: DatabaseObjectCardProps) {
  const goToObject = useGoToIndividualObject();
  const displayID = isIntegerString(objectID);

  return (
    <button
      className="flex flex-col w-[20vw] h-[20vw] aspect-square m-4 border-2 border-nebulaAccent
                    rounded-md cursor-pointer hover:scale-105 hover:bg-nebulaAccent"
      onClick={() => {
        goToObject(objectID, name, location, searchQuery);
      }}
    >
      <p className="general-text"> {name} </p>
      <p className={`general-text ${displayID ? '' : 'hidden'}`}> {objectID} </p>
      <p className="general-text"> {stellarObjectCategory[location]} </p>
    </button>
  );
}
