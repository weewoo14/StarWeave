"use client";
import { filterSearchResult } from "@/utils/SearchResultFilter";
import StarWeaveTitle from "./title";
import {stellarObjectResultType} from "@/types/SearchDataAPI"
import { useState, useEffect } from "react";
import { useStarWeaveState } from "./StarWeaveContext";

export default function HomePage() {
  const [searchStellarDataResult, setSearchStellarDataResult] = useState<stellarObjectResultType[]>([]);
  const { searchData, dataLoaded } = useStarWeaveState();

  const stellarObjectCategory: Record<string, string> = {
    'horizons': 'Horizon Major Body',
    'exoplanet': 'Exoplanet'
  }

  if (!dataLoaded) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full h-screen bg-nebulaBG">
        <StarWeaveTitle size={7}/>

        <input 
          className="w-[50vw] h-[5vh] border-2 border-nebulaAccent rounded-[4px] text-white p-2"
          type="text"
          placeholder="Search a celestial object..."
          onChange={(text) => {
            const searchInput = text.target.value;
            setSearchStellarDataResult( filterSearchResult(searchData, searchInput) );
          }}
        />
        <div className={`w-[50vw] ${searchStellarDataResult.length > 0 ? '' : 'collapse'}`}>
          {searchStellarDataResult.map((stellarObject, idx) => {
            console.log(stellarObjectCategory[stellarObject.location]);
            return(
              <div
                key={idx} 
                className="flex flex-row justify-between bg-nebulaAccent hover:bg-nebulaBG w-full font-syne p-2 border-1 border-white cursor-pointer"
              >
                <p className="text-white">{stellarObject.name}</p>
                <p className="text-nebulaHighlight">{stellarObjectCategory[stellarObject.location]}</p>
              </div>
            );
          })}
        </div>

      </div>
    </>
  );
}