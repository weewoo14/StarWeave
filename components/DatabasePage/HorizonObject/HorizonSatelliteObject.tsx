import { HorizonsDataType } from "@/types/StellarDataAPI";

export default function HorizonSatellitetObjectPage({location, horizonsData}: {location: string, horizonsData: HorizonsDataType | null}) {
  return (
    <div className={`${location === "horizons" ? "" : "hidden"} ${horizonsData?.type === "satellite" ? "" : "hidden"}`}>

    </div>
  );
}