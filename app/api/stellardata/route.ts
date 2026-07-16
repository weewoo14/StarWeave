import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const stellarObjectName = searchParams.get("objectName");
  const stellarObjectLocation = searchParams.get("location");

  if (!stellarObjectName || !stellarObjectLocation) {
    return NextResponse.json({
      error: 501,
      status: 'Name or location does not exist'
    })
  }

  let objectData: string = ''

  switch (stellarObjectLocation) {
    case 'horizons':
      objectData = stellarObjectName;
      break;

    case 'exoplanet':
      objectData = stellarObjectName;
      break;
    default:
      break;
  }

  return NextResponse.json({
    objectData
  })
}
