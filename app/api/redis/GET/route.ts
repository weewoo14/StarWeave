import { NextRequest, NextResponse } from "next/server";

import { getRedisClient } from "@/database/redis";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const objectID = searchParams.get("objectID");

  if (!objectID) {
    return NextResponse.json({
      success: false,
      error: "No Object ID provided in the API call"
    },
    {
      status: 400,
    },
  )
  }

  const redis = await getRedisClient();
  if (!redis) {
    return NextResponse.json({
      success: false,
      error: "Redis Client did not connect."
    },
    {
      status: 401,
    },
  )
  }
  const getCachedResponse = await redis.get(objectID);
  if (!getCachedResponse) {
    return NextResponse.json({
      success: false,
      error: "No data found inside of the Redis cache."
    },
    {
      status: 404,
    },
  )
  }

  return NextResponse.json( JSON.parse(getCachedResponse) );


}