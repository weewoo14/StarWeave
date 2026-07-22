import { HorizonsDataType } from "@/types/StellarDataAPI";

export default function HorizonMiscellaneousObjectPage({location, horizonsData}: {location: string, horizonsData: HorizonsDataType | null}) {
  return (
    <div className={`${location === "horizons" ? "" : "hidden"} ${horizonsData?.type === "miscellaneous" ? "" : "hidden"}`}>

    </div>
  );
}