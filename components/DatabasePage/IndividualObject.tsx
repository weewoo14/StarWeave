import { useState, useEffect } from "react";

import { ExoplanetDataType } from "@/types/StellarDataAPI";
import BackButton from "@/utils/BackButton";
import StarWeaveTitle from "@/utils/Title";

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
  const [exoplanetData, setExoplanetData] = useState<ExoplanetDataType>({
    discoveryMethod: null,
    discoveryYear: null,
    planetName: null,
    planetRadius: null,
    planetMass: null,
    planetDensity: null,
    planetTemperature: null,
    planetStellarFlux: null,
    planetOrbitalDistance: null,
    planetOrbitalPeriod: null,
    planetOrbitalEccentricity: null,
    starName: null,
    starClassification: null,
    starTemperature: null,
    starRadius: null,
    starLuminosity: null,
    starAge: null,
  });
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
            console.log(exoplanetResponseData);
            setExoplanetData(exoplanetResponseData)
          }
          break;
        default:
          break;
      }
    }

    getStellarData();
  }, [])

  const objectName = exoplanetName.replaceAll('%20', ' ');
  return (
    <div className="flex flex-col items-center min-h-screen bg-nebulaBG">
      <BackButton destination={`/database?query=${fromQuery}`} />
      <StarWeaveTitle size={5} />
      <p className="general-text text-[1.5vw]">{objectName}</p>
      <p className="general-text text-[1vw]">{stellarObjectCategory[location]}</p>
      <p className="general-text text-[1vw]"> {objectID} </p>
      <p className="general-text text-[1vw]"> {exoplanetData.discoveryMethod} </p>
    </div>
  );
}
