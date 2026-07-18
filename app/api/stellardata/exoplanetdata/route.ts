import { NextRequest, NextResponse } from "next/server";

import { ExoplanetDataType } from "@/types/StellarDataAPI";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const exoplanetID = searchParams.get("objectID");

  if (!exoplanetID) {
    return NextResponse.json({
      error: 502,
      status: "Exoplanet ID does not exist."
    })
  }

  const queryParams = `
    select hostname, discoverymethod, disc_year,pl_name, pl_orbper, pl_rade, pl_bmasse, pl_dens, pl_eqt, pl_orbsmax, pl_orbeccen, pl_insol, st_spectype, st_teff, st_rad, st_mass, st_lum, st_age
    from pscomppars
    where pl_name = '${exoplanetID}'
  `

  const objectResponse = await fetch(`https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=${encodeURIComponent(queryParams)}&format=json`);
  if (!objectResponse.ok) {
    return NextResponse.json({
      error: 502,
      status: `Exoplanet Archive Database returned ${objectResponse.status}`
    })
  }

  const [objectData] = await objectResponse.json();
  const exoplanetData: ExoplanetDataType = {
    discoveryMethod: objectData.discoverymethod,
    discoveryYear: objectData.disc_year,
    planetName: objectData.pl_name,
    planetRadius: objectData.pl_rade,
    planetMass: objectData.pl_bmasse,
    planetDensity: objectData.pl_dens,
    planetTemperature: objectData.pl_eqt,
    planetStellarFlux: objectData.pl_insol,
    planetOrbitalDistance: objectData.pl_orbsmax,
    planetOrbitalPeriod: objectData.pl_orbper,
    planetOrbitalEccentricity: objectData.pl_orbeccen,
    starName: objectData.hostname,
    starClassification: objectData.st_spectype,
    starTemperature: objectData.st_teff,
    starRadius: objectData.st_rad,
    starLuminosity: objectData.st_lum,
    starAge: objectData.st_age,
  }
  
  return NextResponse.json(exoplanetData);
}