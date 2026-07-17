import { useState, useEffect } from "react";

import BackButton from "@/utils/BackButton";
import StarWeaveTitle from "@/utils/Title";

type IndividualObjectProps = {
  objectID: string;
  name: string;
  location: string;
  fromQuery: string;
};

const stellarObjectCategory: Record<string, string> = {
  horizons: "Horizon Major Body",
  exoplanet: "Exoplanet",
};

export default function IndividualObject({ objectID, name, location, fromQuery }: IndividualObjectProps) {
  const [allStellarObjectData, setAllStellarObjectData] = useState<string>('');

  useEffect(() => {
    async function getStellarData() {
      const searchParams = new URLSearchParams({
        objectID: objectID,
        location: location,
      })

      let response;
      let data;
      switch (location) {
        case "horizons":
          response = await fetch(`/api/stellardata/horizonsdata?${searchParams.toString()}`);
          if (response && response.ok) {
            data = await response.json();
            setAllStellarObjectData(data.result);
          }
          break;
        case "exoplanet":
          response = await fetch(`/api/stellardata/exoplanetdata?${searchParams.toString()}`);
          if (response && response.ok) {
            data = await response.json();
            console.log(data);
          }
          break;
        default:
          break;
      }
    }

    getStellarData();
  }, [])

  const objectName = name.replaceAll('%20', ' ');
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
