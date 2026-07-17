import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const exoplanetID = searchParams.get("objectID");

  if (!exoplanetID) {
    return NextResponse.json({
      error: 501,
      status: "The exoplanet ID is empty."
    })
  }

  // Change host name to planet name later
  const queryParams = `
    select hostname, pl_name, pl_orbper, pl_rade, pl_bmasse
    from ps
    where hostname = '${exoplanetID}'
  `

  const objectResponse = await fetch(`https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=${encodeURIComponent(queryParams)}&format=json`);
  if (!objectResponse.ok) {
    return NextResponse.json({
      error: 502,
      status: `Exoplanet Archive data returned ${objectResponse.status}`
    })
  }

  const objectData = await objectResponse.json();

  return NextResponse.json(objectData);
}