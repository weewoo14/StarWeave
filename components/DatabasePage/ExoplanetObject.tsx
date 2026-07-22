import { ExoplanetDataType } from "@/types/StellarDataAPI";

export default function ExoplanetObjectPage({location, exoplanetData}: {location: string, exoplanetData: ExoplanetDataType | null}) {
  return (
    <div className={`${location === "exoplanet" ? "" : "hidden"} ${exoplanetData === null ? "hidden" : ""}`}>
      <p className="general-text"> Discovery Year: {exoplanetData?.discoveryMethod} </p>
      <p className="general-text"> Discovery Method: {exoplanetData?.discoveryYear} </p>
      
      <p className="general-text"> Name: {exoplanetData?.planetName} </p>
      <p className="general-text"> Radius: {exoplanetData?.planetRadius} </p>
      <p className="general-text"> Mass: {exoplanetData?.planetMass} </p>
      <p className="general-text"> Density: {exoplanetData?.planetDensity} </p>
      <p className="general-text"> Temperature: {exoplanetData?.planetTemperature} </p>
      <p className="general-text"> Stellar Flux: {exoplanetData?.planetStellarFlux} </p>

      <p className="general-text"> Orbital Distance: {exoplanetData?.planetOrbitalDistance} </p>
      <p className="general-text"> Orbital Period: {exoplanetData?.planetOrbitalPeriod} </p>
      <p className="general-text"> Orbital Eccentricity: {exoplanetData?.planetOrbitalEccentricity} </p>

      <p className="general-text"> Star Name: {exoplanetData?.starName} </p>
      <p className="general-text"> Star Classification: {exoplanetData?.starClassification} </p>
      <p className="general-text"> Star Temperature: {exoplanetData?.starTemperature} </p>
      <p className="general-text"> Star Radius: {exoplanetData?.starRadius} </p>
      <p className="general-text"> Star Luminosity: {exoplanetData?.starLuminosity} </p>
      <p className="general-text"> Star Age: {exoplanetData?.starAge} </p>
    </div>
  );
}