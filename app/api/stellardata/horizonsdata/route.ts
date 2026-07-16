import { NextRequest, NextResponse } from "next/server";

export default async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const horizonsName = searchParams.get("objectName");
  
  if (!horizonsName) {
    return NextResponse.json({
      status: 501,
      error: "Horizons object name was not found."
    })
  }

  const queryParams = new URLSearchParams({
    foramt: "json",
    COMMAND: `${horizonsName}`,
    MAKE_EPHEM: "NO",
  })
  const objectData = await fetch(`https://ssd.jpl.nasa.gov/api/horizons.api?${queryParams.toString()}`);
}