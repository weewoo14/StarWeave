"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef, KeyboardEvent, ChangeEvent } from "react";

import { stellarObjectResultType } from "@/types/SearchDataAPI";
import { filterSearchResult } from "@/utils/SearchResultFilter";

import { useStarWeaveState } from "../components/StarWeaveContext";

import useGoToIndivdualObject from "./GoToIndividualObject";

const stellarObjectCategory: Record<string, string> = {
  horizons: "Horizon Major Body",
  exoplanet: "Exoplanet",
};

type SearchBarProps = {
  searchDefaultValue: string;
  searchAmount: number;
};

export default function SearchBar({ searchDefaultValue = "", searchAmount }: SearchBarProps) {
  const { searchData } = useStarWeaveState();
  const [searchStellarDataResult, setSearchStellarDataResult] = useState<stellarObjectResultType[]>(
    []
  );
  const [objectSearchResult, setObjectSearchResult] = useState<string>("");
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const goToObject = useGoToIndivdualObject();
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    setObjectSearchResult(searchDefaultValue);
    setSearchStellarDataResult(filterSearchResult(searchData, searchDefaultValue, searchAmount));
  }, [searchDefaultValue, searchData, searchAmount]);

  useEffect(() => {
    const deleteSearchData = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", deleteSearchData);

    return () => {
      document.removeEventListener("mousedown", deleteSearchData);
    };
  }, []);

  const searchInputClicked = (event: React.MouseEvent<HTMLInputElement>) => {
    if (event.currentTarget.value !== "") {
      setIsSearchOpen(true);
    }
  };

  const searchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchInputText = event.target.value;
    setIsSearchOpen(true);
    setObjectSearchResult(searchInputText);
    setSearchStellarDataResult(filterSearchResult(searchData, searchInputText, searchAmount));
  };

  const searchInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      router.push(`/database?query=${objectSearchResult}`);
    }
  };

  return (
    <div ref={searchRef} className="flex flex-col relative w-full items-center mt-2 mb-2">
      <input
        className="w-[50%] h-[5vh] border-2 border-nebulaAccent rounded-[4px] text-white p-2"
        type="text"
        placeholder="Search a celestial object..."
        onChange={searchInputChange}
        onKeyDown={searchInputKeyDown}
        onClick={searchInputClicked}
        defaultValue={searchDefaultValue}
      />
      <div
        className={`absolute top-full left-[25%] w-[50%] max-h-[35vh] overflow-y-auto ${isSearchOpen ? "" : "hidden"} ${searchStellarDataResult.length > 0 ? "" : "hidden"}`}
      >
        {searchStellarDataResult.map((stellarObject, idx) => {
          return (
            <button
              key={idx}
              className="flex flex-row justify-between bg-nebulaAccent hover:bg-nebulaBG w-full font-syne p-2 border-1 border-white cursor-pointer"
              onClick={() => {
                goToObject(stellarObject.name, stellarObject.location, objectSearchResult);
              }}
            >
              <p className="text-white">{stellarObject.name}</p>
              <p className="text-nebulaHighlight">
                {stellarObjectCategory[stellarObject.location]}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
