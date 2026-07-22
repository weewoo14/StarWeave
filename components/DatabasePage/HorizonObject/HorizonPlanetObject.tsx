import { HorizonsDataType } from "@/types/StellarDataAPI";

export default function HorizonPlanetObjectPage({location, horizonsData}: {location: string, horizonsData: HorizonsDataType | null}) {
  return (
    <div className={`${location === "horizons" ? "" : "hidden"} ${horizonsData?.type === "planet" ? "" : "hidden"}`}>

    </div>
  );
}