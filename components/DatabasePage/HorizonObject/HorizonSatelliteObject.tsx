import { HorizonsDataType } from "@/types/StellarDataAPI";

export default function HorizonSatellitetObjectPage({location, horizonsData}: {location: string, horizonsData: HorizonsDataType | null}) {
  if (location !== "horizons") {
    return null;
  }

  if (!horizonsData || horizonsData.type !== "satellite") {
    return null;
  }

  return (
    <div className={`${location === "horizons" ? "" : "hidden"} ${horizonsData?.type === "satellite" ? "" : "hidden"}`}>
      <p className="general-text"> Name: {horizonsData?.name} </p>
      <p className="general-text"> Mass: {horizonsData?.mass} </p>
      <p className="general-text"> Radius: {horizonsData?.radius} </p>
      <p className="general-text"> Density: {horizonsData?.density} </p>
      <p className="general-text"> Semi-Major Axis Length: {horizonsData?.semiMajorAxis} </p>
      <p className="general-text"> Orbital Period: {horizonsData?.orbitalPeriod} </p>
      <p className="general-text"> Eccentricity: {horizonsData?.eccentricity} </p>
    </div>
  );
}