import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import { ExoplanetDataType } from "@/types/StellarDataAPI";
import { retryCall } from "@/utils/retryExponentialBackoff";

const upstashRedis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL as string,
  token: process.env.UPSTASH_REDIS_REST_TOKEN as string,
})

const rateLimit = new Ratelimit({
  redis: upstashRedis,
  limiter: Ratelimit.fixedWindow(100, "60 s"),
})

export async function GET(request: NextRequest) {
  const identifer = "getExoplanetStellarData";
  const rateLimitResult = await rateLimit.limit(identifer);

  if (!rateLimitResult.success) {
    return Response.json({
      message: "The API that calls the Exoplanet Data Archive has received too many requests.",
    }, {
      status: 429,
    })
  }

  const searchParams = request.nextUrl.searchParams;
  const exoplanetID = searchParams.get("objectID");

  if (!exoplanetID) {
    return NextResponse.json(
      {
        error: `Exoplanet ID does not exist.`,
      },
      {
        status: 404,
      }
    );
  }

  const queryParams = `
    select hostname, discoverymethod, disc_year,pl_name, pl_orbper, pl_rade, pl_bmasse, pl_dens, pl_eqt, pl_orbsmax, pl_orbeccen, pl_insol, st_spectype, st_teff, st_rad, st_mass, st_lum, st_age
    from pscomppars
    where pl_name = '${exoplanetID}'
  `

  const objectResponse = await retryCall(`https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=${encodeURIComponent(queryParams)}&format=json`);
  if (!objectResponse.ok) {
    return NextResponse.json(
      {
        error: `Exoplanet Archive returned ${objectResponse.status}`,
      },
      {
        status: objectResponse.status,
      }
    );
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