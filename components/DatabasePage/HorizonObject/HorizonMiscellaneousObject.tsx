import { HorizonsDataType } from "@/types/StellarDataAPI";

export default function HorizonMiscellaneousObjectPage({location, horizonsData}: {location: string, horizonsData: HorizonsDataType | null}) {

  if (location !== "horizons") {
    return null;
  }

  if (!horizonsData || horizonsData.type !== "miscellaneous") {
    return null;
  }

  return (
    <div className={`${location === "horizons" ? "" : "hidden"} ${horizonsData?.type === "miscellaneous" ? "" : "hidden"}`}>
      <p className="general-text"> Name: {horizonsData?.data} </p>
    </div>
  );
}