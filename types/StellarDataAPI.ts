export type ExoplanetDataType = {

  discoveryMethod: string | null,
  discoveryYear: number | null,

  planetName: string | null,
  planetRadius: number | null,
  planetMass: number | null,
  planetDensity: number | null,
  planetTemperature: number | null,
  planetStellarFlux: number | null,

  planetOrbitalDistance: number | null,
  planetOrbitalPeriod: number | null,
  planetOrbitalEccentricity: number | null,

  starName: string | null,
  starClassification: string | null,
  starTemperature: number | null,
  starRadius: number | null,
  starLuminosity: number | null,
  starAge: number | null,

}

type HorizonsMainBodyType = {
  name: string | null,
  mass: string | null,
  radius: string | null,
  density: string | null,
  surfaceGravity: string | null,
  escapeVelocity: string | null,
  rotationPeriod: string | null,
  temperature: string | null,
}

export type HorizonsPlanetType = HorizonsMainBodyType & {
  orbitalPeriod: string | null,
  orbitalSpeed: string | null,
}

export type HorizonsStarType = HorizonsMainBodyType & {
  luminosity: string | null,
  photosphericDepth: string | null,
  chromosphericDepth: string | null,
  solarConstant: string | null,
}

export type HorizonsSatelliteType = {
  name: string | null,
  mass: string| null,
  radius: string | null,
  density: string | null,
  semiMajorAxis: string | null,
  orbitalPeriod: string | null,
  eccentricity: string | null,
}

export type HorizonsMiscellanousType = {
  data: string,
}