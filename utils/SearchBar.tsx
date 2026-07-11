"use client";
import { filterSearchResult } from "@/utils/SearchResultFilter";
import StarWeaveTitle from "./Title";
import {stellarObjectResultType} from "@/types/SearchDataAPI"
import { useStarWeaveState } from "../components/StarWeaveContext";

import { useState, useCallback, KeyboardEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

const stellarObjectCategory: Record<string, string> = {
  'horizons': 'Horizon Major Body',
  'exoplanet': 'Exoplanet'
}

type SearchBarProps = {
  searchDefaultValue: string
}

export default function SearchBar({searchDefaultValue} : SearchBarProps) {
    const [searchStellarDataResult, setSearchStellarDataResult] = useState<stellarObjectResultType[]>([]);
    const [objectSearchResult, setObjectSearchResult] = useState('');
    const {searchData} = useStarWeaveState();
    const router = useRouter();

    const searchResultClick = useCallback((name: string, location: string) => {
      const objectName = encodeURIComponent(name.replaceAll(' ', '-'));
      router.push(`/database/${location}/${objectName}`);
    }, [router]);

    const searchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      const searchInputText = event.target.value;
      setObjectSearchResult(searchInputText);
      setSearchStellarDataResult( filterSearchResult(searchData, searchInputText) );
    }

    const searchInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        router.push(`/database?query=${objectSearchResult}`);
      } 
    }

    return (
        <div className="flex flex-col relative w-full items-center mt-2 mb-2">
          <input 
            className="w-[50%] h-[5vh] border-2 border-nebulaAccent rounded-[4px] text-white p-2"
            type="text"
            placeholder="Search a celestial object..."
            onChange={searchInputChange}
            onKeyDown={searchInputKeyDown}
            defaultValue={searchDefaultValue}
          />
          <div className={`absolute top-full left-[25%] w-[50%] max-h-[35vh] overflow-y-auto ${searchStellarDataResult.length > 0 ? '' : 'collapse'}`}>
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
    );

}