import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const horizonsID = searchParams.get("objectID");

  if (!horizonsID) {
    return NextResponse.json({
      error: 501,
      status: "Horizons ID does not exist"
    })
  }

  const queryParams = new URLSearchParams({
    format: "json",
    COMMAND: `${horizonsID}`,
    MAKE_EPHEM: "NO",
  })

  const objectResponse = await fetch(`https://ssd.jpl.nasa.gov/api/horizons.api?${queryParams.toString()}`);
  if (!objectResponse.ok) {
    return NextResponse.json({
      error: 502,
      status: `Horizons returned ${objectResponse.status}`
    })
  }

  const objectData = await objectResponse.json();

  return NextResponse.json(objectData);
}