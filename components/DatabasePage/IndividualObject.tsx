import { useState, useEffect } from "react";

import BackButton from "@/components/Helper/BackButton";
import StarWeaveTitle from "@/components/Helper/Title";
import { ExoplanetDataType } from "@/types/StellarDataAPI";

type IndividualObjectProps = {
  objectID: string;
  exoplanetName: string;
  location: string;
  fromQuery: string;
};

const stellarObjectCategory: Record<string, string> = {
  horizons: "Horizon Major Body",
  exoplanet: "Exoplanet",
};

export default function IndividualObject({ objectID, exoplanetName, location, fromQuery }: IndividualObjectProps) {
  const [objectDataLoaded, setObjectDataLoaded] = useState<boolean>(false);
  const [exoplanetData, setExoplanetData] = useState<ExoplanetDataType | null>(null);
  useEffect(() => {
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
            const horizonsData = await response.json();
            console.log(horizonsData.result);
          }
          break;
        case "exoplanet":
          response = await fetch(`/api/stellardata/exoplanetdata?${searchParams.toString()}`);
          if (response && response.ok) {
            const exoplanetResponseData = await response.json();
            setExoplanetData(exoplanetResponseData)
            setObjectDataLoaded(true);
          }
          break;
        default:
          break;
      }
    }

    getStellarData();
  }, [location, objectID])

  if (!objectDataLoaded) {
    return null;
  }

  const objectName = exoplanetName.replaceAll('%20', ' ');
  return (
    <div className="flex flex-col items-center min-h-screen bg-nebulaBG">
      <BackButton destination={`/database?query=${fromQuery}`} />
      <StarWeaveTitle size={5} />
      <p className="general-text text-[1.5vw]">{objectName}</p>
      <p className="general-text text-[1vw]">{stellarObjectCategory[location]}</p>
      <p className="general-text text-[1vw]"> {objectID} </p>
    </div>
  );
}
