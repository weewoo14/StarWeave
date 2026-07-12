"use client";

import { stellarObjectResultType } from "@/types/SearchDataAPI";
import useGoToIndividualObject from "@/utils/GoToIndividualObject";

const stellarObjectCategory: Record<string, string> = {
  'horizons': 'Horizon Major Body',
  'exoplanet': 'Exoplanet'
}

export default function DatabaseObjectCard({name, location} : stellarObjectResultType) {
  const goToObject = useGoToIndividualObject();

  return (
    <button className="flex flex-col w-[20vw] h-[20vw] aspect-square m-4 border-2 border-nebulaAccent
                    rounded-md cursor-pointer hover:scale-105 hover:bg-nebulaAccent"
            onClick={() => {goToObject(name, location)}}
    >
      <p className="general-text"> {name} </p>
      <p className="general-text"> {stellarObjectCategory[location]} </p>
    </button>
  );
}