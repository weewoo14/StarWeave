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