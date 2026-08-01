"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

import { searchDataContextType, stellarObjectResultType } from "@/types/SearchDataAPI";

const AppStateContext = createContext<searchDataContextType>({
  searchData: [],
  dataLoaded: false,
});

export function StarWeaveProvider({ children }: { children: React.ReactNode }) {
  const [searchData, setSearchData] = useState<stellarObjectResultType[]>([]);
  const dataLoaded = false;

  useEffect(() => {
    
    // Getting the Search Data
    async function getSearchData() {
      const getSearchDataResponse = await fetch("/api/mongodb/GET");
      if (!getSearchDataResponse.ok) {
        throw new Error("Issue with GEET Search Data API");
      }

      const getSearchDataArray = await getSearchDataResponse.json();
      setSearchData(getSearchDataArray);
    }
    getSearchData();

    // Updating the Search Data
    async function updateSearchData() {
      const updateSearchDataResponse = await fetch("/api/searchdata");
      if (!updateSearchDataResponse.ok) {
        throw new Error("Issue with Update Search Data API");
      }
      const updateSearchDataArray = await updateSearchDataResponse.json();

      await fetch("/api/mongodb/POST", {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify(updateSearchDataArray),
      });

    }
    const updateSearchDataID = setInterval(updateSearchData, 86400000);

    return () => {
      clearInterval(updateSearchDataID);
    }
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
