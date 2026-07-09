"use client";
import { filterSearchResult } from "@/utils/SearchResultFilter";
import StarWeaveTitle from "./title";
import {stellarObjectResultType} from "@/types/SearchDataAPI"
import { useStarWeaveState } from "./StarWeaveContext";

import { useState, useCallback, KeyboardEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

const stellarObjectCategory: Record<string, string> = {
    'horizons': 'Horizon Major Body',
    'exoplanet': 'Exoplanet'
  }

export default function HomePage() {
  const [searchStellarDataResult, setSearchStellarDataResult] = useState<stellarObjectResultType[]>([]);
  const { searchData, dataLoaded } = useStarWeaveState();
  const router = useRouter();

  const searchResultClick = useCallback((name: string, location: string) => {
    const objectName = encodeURIComponent(name.replaceAll(' ', '-'));
    router.push(`/database/${location}/${objectName}`);
  }, [router])

  const searchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchInputText = event.target.value;
    setSearchStellarDataResult( filterSearchResult(searchData, searchInputText) );
  }

  const searchInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      router.push('/database');
    }
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
          onChange={searchInputChange}
          onKeyDown={searchInputKeyDown}
        />
        <div className={`w-[50vw] ${searchStellarDataResult.length > 0 ? '' : 'collapse'}`}>
          {searchStellarDataResult.map((stellarObject, idx) => {
            console.log(stellarObjectCategory[stellarObject.location]);
            return(
              <button
                key={idx} 
                className="flex flex-row justify-between bg-nebulaAccent hover:bg-nebulaBG w-full font-syne p-2 border-1 border-white cursor-pointer"
                onClick={() => {
                  searchResultClick(stellarObject.name, stellarObject.location);
                }}
              >
                <p className="text-white">{stellarObject.name}</p>
                <p className="text-nebulaHighlight">{stellarObjectCategory[stellarObject.location]}</p>
              </button>
            );
          })}
        </div>

      </div>
    </>
  );
}