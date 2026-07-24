import { HorizonsDataType } from "@/types/StellarDataAPI";

export default function HorizonPlanetObjectPage({location, horizonsData}: {location: string, horizonsData: HorizonsDataType | null}) {
  if (location !== "horizons") {
    return null;
  }

  if (!horizonsData || horizonsData.type !== "planet") {
    return null;
  }

  return (
    <div className={`${horizonsData?.type === "planet" ? "" : "hidden"}`}>
      <p className="general-text"> Name: {horizonsData?.name} </p>
      <p className="general-text"> Mass: {horizonsData?.mass} </p>
      <p className="general-text"> Radius: {horizonsData?.radius} </p>
      <p className="general-text"> Density: {horizonsData?.density} </p>
      <p className="general-text"> Surface Gravity: {horizonsData?.surfaceGravity} </p>
      <p className="general-text"> Escape Velocity: {horizonsData?.escapeVelocity} </p>
      <p className="general-text"> Rotation Period: {horizonsData?.rotationPeriod} </p>
      <p className="general-text"> Temperature: {horizonsData?.temperature} </p>

      <p className="general-text"> Orbital Period: {horizonsData?.orbitalPeriod} </p>
      <p className="general-text"> Orbital Speed: {horizonsData?.orbitalSpeed} </p>
    </div>
  );
}