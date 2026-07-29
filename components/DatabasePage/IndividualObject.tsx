import { useState, useEffect } from "react";

import BackButton from "@/components/Helper/BackButton";
import StarWeaveTitle from "@/components/Helper/Title";
import { ExoplanetDataType, HorizonsDataType } from "@/types/StellarDataAPI";
import { getHorizonsData } from "@/utils/StellarDataAPI";

import ExoplanetObjectPage from "./ExoplanetObject";
import HorizonMiscellaneousObjectPage from "./HorizonObject/HorizonMiscellaneousObject";
import HorizonPlanetObjectPage from "./HorizonObject/HorizonPlanetObject";
import HorizonSatellitetObjectPage from "./HorizonObject/HorizonSatelliteObject";
import HorizonStarObjectPage from "./HorizonObject/HorizonStarObject";

type IndividualObjectProps = {
  objectID: string;
  objectName: string;
  location: string;
  fromQuery: string;
};

export default function IndividualObject({ objectID, objectName, location, fromQuery }: IndividualObjectProps) {
  const [objectDataLoaded, setObjectDataLoaded] = useState<boolean>(false);
  const [horizonsData, setHorizonsData] = useState<HorizonsDataType | null>(null)
  const [exoplanetData, setExoplanetData] = useState<ExoplanetDataType | null>(null);

  useEffect(() => {
    async function getLink() {
      const link = `https://wikipedia.org/wiki/${objectName}`;
      
    }
    async function getStellarData() {
      const searchParams = new URLSearchParams({
        objectID: objectID,
        location: location,
      })

      let response;
      switch (location) {
        case "horizons":
          response = await fetch(`/api/stellardata/horizonsdata?${searchParams.toString()}`);
          if (response && response.ok) {
            const horizonsResponseData = await response.json();
            console.log(horizonsResponseData.result);
            setHorizonsData( getHorizonsData(objectID, horizonsResponseData.result) );
            setObjectDataLoaded(true);
          }
          break;
        case "exoplanet":
          response = await fetch(`/api/stellardata/exoplanetdata?${searchParams.toString()}`);
          if (response && response.ok) {
            const exoplanetResponseData = await response.json();
            setExoplanetData(exoplanetResponseData);
            console.log(exoplanetResponseData);
            setObjectDataLoaded(true);
          }
          break;
        default:
          break;
      }
    }

    getStellarData();

    return () => {
      setObjectDataLoaded(false);
    }
  }, [location, objectID])

  if (!objectDataLoaded) {
    return null;
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
