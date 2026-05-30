"use client";
import { searchDataContextType, stellarObjectResultType } from "@/types/SearchDataAPI";
import React, { createContext, useContext, useState, useEffect } from "react";

const AppStateContext = createContext<searchDataContextType>({
  searchData: [],
  dataLoaded: false,
})

export function StarWeaveProvider({children}: {children: React.ReactNode}) {
  const [searchData, setSearchData] = useState<stellarObjectResultType[]>([]);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);

  useEffect(() => {
    async function getSearchData() {
      const searchDataResponse = await fetch("/api/searchdata");
      const searchDataConvert = await searchDataResponse.json();
      setSearchData(searchDataConvert);
    }

    getSearchData();
  }, [])

  useEffect(() => {
    if (searchData.length > 0) {
      setDataLoaded(true);
    }
  }, [searchData])

  return (
    <AppStateContext.Provider value = {{dataLoaded, searchData}}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useStarWeaveState() {
  return useContext(AppStateContext);
}