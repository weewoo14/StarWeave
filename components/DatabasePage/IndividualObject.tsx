import { useState, useEffect } from "react";

import BackButton from "@/components/Helper/BackButton";
import StarWeaveTitle from "@/components/Helper/Title";

import { ExoplanetDataType, HorizonsDataType } from "@/types/StellarDataAPI";
import { getHorizonsData } from "@/utils/StellarDataAPI";
import { retryCall }  from "@/utils/retryExponentialBackoff";

import ExoplanetObjectPage from "./ExoplanetObject";
import HorizonMiscellaneousObjectPage from "./HorizonObject/HorizonMiscellaneousObject";
import HorizonPlanetObjectPage from "./HorizonObject/HorizonPlanetObject";
import HorizonSatellitetObjectPage from "./HorizonObject/HorizonSatelliteObject";
import HorizonStarObjectPage from "./HorizonObject/HorizonStarObject";
import { useStarWeaveState } from "../StarWeaveContext";
import LoadingScreen from "../Helper/LoadingScreen";
import ErrorScreen from "../Helper/ErrorScreen";

type IndividualObjectProps = {
  objectID: string;
  objectName: string;
  location: string;
  fromQuery: string;
};

export default function IndividualObject({ objectID, objectName, location, fromQuery }: IndividualObjectProps) {
  const [objectDataLoaded, setObjectDataLoaded] = useState<boolean>(false);
  const [showErrorScreen, setShowErrorScreen] = useState<number>(-1);
  const [horizonsData, setHorizonsData] = useState<HorizonsDataType | null>(null)
  const [exoplanetData, setExoplanetData] = useState<ExoplanetDataType | null>(null);
  const {dataLoaded} = useStarWeaveState();

  useEffect(() => {
    async function getStellarData() {

      // Redis Check
      /*
      ToDO: Maybe find some way to skip/continue if the response is ok and then check if 
      */

      const getRedisResponse = await retryCall(`/api/redis/GET?objectID=${objectID}`);

      if (getRedisResponse.ok) {
        const getRedisData = await getRedisResponse.json();
        switch (location) {
          case "horizons":
            setHorizonsData(getRedisData);
            setObjectDataLoaded(true);
            return;
          
          case "exoplanet":
            setExoplanetData(getRedisData);
            setObjectDataLoaded(true);
            return;

          default:
            setShowErrorScreen(500);
            return;
        }
      }

      let getMongoDBResponse;
      if (getRedisResponse.status === 404) {
        const mongoDBSearchParams = new URLSearchParams({
          objectName: decodeURIComponent(objectName),
          objectLocation: location,
        })
        getMongoDBResponse = await fetch(`/api/mongodb/SpecificObject/GET?${mongoDBSearchParams.toString()}`);
        if (getMongoDBResponse.ok) {
          const getMongoDBData = await getMongoDBResponse.json();

          switch (location) {
          case "horizons":
            setHorizonsData(getMongoDBData);
            setObjectDataLoaded(true);
            return;
          
          case "exoplanet":
            setExoplanetData(getMongoDBData);
            setObjectDataLoaded(true);
            return;

          default:
            setShowErrorScreen(500);
            return;
          }
        }
      } else {
        setShowErrorScreen(getRedisResponse.status);
      }

      if (getMongoDBResponse && getMongoDBResponse.status === 404) {
        // If Redis and MongoDB does not have the data for quick querying
        const searchParams = new URLSearchParams({
          objectID: objectID,
          location: location,
        })

        let response;
        let stellarObject;
        switch (location) {
          case "horizons":
            response = await retryCall(`/api/stellardata/horizonsdata?${searchParams.toString()}`);
            if (response.ok) {
              const horizonsResponseData = await response.json();
              stellarObject = getHorizonsData(objectID, horizonsResponseData.result);
              console.log(horizonsResponseData.result);
              setHorizonsData( stellarObject );
              setObjectDataLoaded(true);
            } else {
              setShowErrorScreen(response.status);
            }
            break;
          case "exoplanet":
            response = await retryCall(`/api/stellardata/exoplanetdata?${searchParams.toString()}`);
            if (response.ok) {
              const exoplanetResponseData = await response.json();
              stellarObject = exoplanetResponseData;
              setExoplanetData(exoplanetResponseData);
              setObjectDataLoaded(true);
            } else {
              setShowErrorScreen(response.status);
            }
            break;
          default:
            setShowErrorScreen(500);
            return;
        }

        if (!stellarObject) {
          setShowErrorScreen(404);
          return;
        }

       const mdbresponse = await fetch("/api/mongodb/SpecificObject/POST", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            location: location,
            stellarData: stellarObject,
          })
        })
        const mdbresponsedata = await mdbresponse.json();
        console.log(mdbresponsedata);

        await fetch("/api/redis/POST", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            objectID: objectID,
            stellarObject: stellarObject,
          }),
        });
      } else {
        setShowErrorScreen(500);
      }

    }

    getStellarData();

    return () => {
      setShowErrorScreen(-1);
      setObjectDataLoaded(false);
    }
  }, [location, objectID])

  if (!dataLoaded || !objectDataLoaded) {
    return (
      <LoadingScreen/>
    );
  }

  if (showErrorScreen !== -1) {
    return (
      <ErrorScreen errorStatus={showErrorScreen}/>
    )
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-nebulaBG">
      <BackButton destination={`/database?query=${fromQuery}`} />
      <StarWeaveTitle size={5} />

      <HorizonPlanetObjectPage location={location} horizonsData={horizonsData}/>
      <HorizonStarObjectPage location={location} horizonsData={horizonsData}/>
      <HorizonSatellitetObjectPage location={location} horizonsData={horizonsData}/>
      <HorizonMiscellaneousObjectPage location={location} horizonsData={horizonsData}/>
      <ExoplanetObjectPage location={location} exoplanetData={exoplanetData}/>
    </div>
  );
}
