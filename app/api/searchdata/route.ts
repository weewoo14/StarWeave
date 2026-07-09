import { getHorizonsData } from "@/utils/SearchDataAPI";
import { stellarObjectResultType } from "@/types/SearchDataAPI";

export async function GET(request: Request) {
  const stellarObjectResults: stellarObjectResultType[] = [];

  // NASA Horizons Major Body
  const horizonsMBResponse = await fetch("https://ssd.jpl.nasa.gov/api/horizons.api?format=json&COMMAND='MB'");

  if (!horizonsMBResponse.ok) {
    return Response.json(
      {error: `Horizon Data returned ${horizonsMBResponse.status}`},
      {status: 502}
    )
  }

  const horizonsMBData = await horizonsMBResponse.json();
  const horizonsResults = getHorizonsData( horizonsMBData.result );

  if (!horizonsResults) {
    return Response.json(
      {error: "Horizon Data is undefined"},
      {status: 401}
    )
  }

  for (const horizonResult of horizonsResults) {
    stellarObjectResults.push({
      name: horizonResult.name,
      location: 'horizons'
    })
  }

  // NASA Exoplanet Archive
  const exoplanetResponse = await fetch("https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+hostname+from+ps&format=json");

  if (!exoplanetResponse.ok) {
    return Response.json(
      {error: `Exoplanet Archive data returned ${exoplanetResponse.status}`},
      {status: 502}
    )
  }

  const exoplanetData = await exoplanetResponse.json();

  if (!exoplanetData) {
    return Response.json(
      {error: "Exoplanet Data is undefined"},
      {status: 401}
    )
  }

  for (const exoplanetResult of exoplanetData) {
    stellarObjectResults.push({
      name: exoplanetResult.hostname,
      location: 'exoplanet'
    })
  }

  return Response.json(stellarObjectResults);
}