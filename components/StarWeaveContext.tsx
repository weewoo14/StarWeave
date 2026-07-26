"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

import { searchDataContextType, stellarObjectResultType } from "@/types/SearchDataAPI";

const AppStateContext = createContext<searchDataContextType>({
  searchData: [],
  dataLoaded: false,
});

export function StarWeaveProvider({ children }: { children: React.ReactNode }) {
  const [searchData, setSearchData] = useState<stellarObjectResultType[]>([]);
  const dataLoaded = searchData.length > 0 ? true : false;

  useEffect(() => {
    async function getSearchData() {
      const searchDataResponse = await fetch("/api/mongodb/GET");
      if (!searchDataResponse.ok) {
        throw new Error("Issue with search data API");
      }

      const searchDataArray = await searchDataResponse.json();
      setSearchData(searchDataArray);
    }

    getSearchData();
  }, []);

  return (
    <AppStateContext.Provider value={{ dataLoaded, searchData }}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useStarWeaveState() {
  return useContext(AppStateContext);
}
