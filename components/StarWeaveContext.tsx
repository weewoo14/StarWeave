"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

import { searchDataContextType, stellarObjectResultType } from "@/types/SearchDataAPI";
import { retryCall } from "@/utils/retryExponentialBackoff";
import ErrorScreen from "./Helper/ErrorScreen";

const AppStateContext = createContext<searchDataContextType>({
  searchData: [],
  dataLoaded: false,
});

export function StarWeaveProvider({ children }: { children: React.ReactNode }) {
  const [searchData, setSearchData] = useState<stellarObjectResultType[]>([]);
  const [showErrorScreen, setShowErrorScreen] = useState<number>(-1);
  const dataLoaded = searchData.length > 0 ? true : false;

  useEffect(() => {
    
    // Getting the Search Data
    async function getSearchData() {
      const getSearchDataResponse = await retryCall("/api/mongodb/GET");
      if (!getSearchDataResponse.ok) {
        setShowErrorScreen(getSearchDataResponse.status);
        return;
      }

      const getSearchDataArray = await getSearchDataResponse.json();
      setSearchData(getSearchDataArray);
    }
    getSearchData();

    // Updating the Search Data
    async function updateSearchData() {
      const updateSearchDataResponse = await retryCall("/api/searchdata");
      if (!updateSearchDataResponse.ok) {
        console.log(updateSearchDataResponse.status);
        return;
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

  if (showErrorScreen !== -1) {
    return (
      <ErrorScreen errorStatus={showErrorScreen}/>
    )
  }

  return (
    <AppStateContext.Provider value={{ dataLoaded, searchData }}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useStarWeaveState() {
  return useContext(AppStateContext);
}
