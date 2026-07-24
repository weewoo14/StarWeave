import { HorizonsDataType } from "@/types/StellarDataAPI";

export default function HorizonStarObjectPage({location, horizonsData}: {location: string, horizonsData: HorizonsDataType | null}) {

  if (location !== "horizons") {
    return null;
  }

  if (!horizonsData || horizonsData.type !== "star") {
    return null;
  }

  return (
    <div className={`${location === "horizons" ? "" : "hidden"} ${horizonsData?.type === "star" ? "" : "hidden"}`}>
      <p className="general-text"> Name: {horizonsData?.name} </p>
      <p className="general-text"> Mass: {horizonsData?.mass} </p>
      <p className="general-text"> Radius: {horizonsData?.radius} </p>
      <p className="general-text"> Density: {horizonsData?.density} </p>
      <p className="general-text"> Surface Gravity: {horizonsData?.surfaceGravity} </p>
      <p className="general-text"> Escape Velocity: {horizonsData?.escapeVelocity} </p>
      <p className="general-text"> Rotation Period: {horizonsData?.rotationPeriod} </p>
      <p className="general-text"> Temperature: {horizonsData?.temperature} </p>

      <p className="general-text"> Luminosity: {horizonsData?.luminosity} </p>
      <p className="general-text"> Photospheric Depth: {horizonsData?.photosphericDepth} </p>
      <p className="general-text"> Chromospheric Depth: {horizonsData?.chromosphericDepth} </p>
      <p className="general-text"> Solar Constant: {horizonsData?.solarConstant} </p>
    </div>
  );
}