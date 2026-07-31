import { NextRequest, NextResponse } from "next/server";

import { getRedisClient } from "@/database/redis";

export async function POST(request: NextRequest) {
  const data = await request.json();
  if (!data) {
    return NextResponse.json({
      success: false,
      error: "No data was provided in the Redis POST API call."
    },
    {
      status: 404,
    },
  )
  }

  const redis = await getRedisClient();
  if (!redis) {
    return NextResponse.json({
      success: false,
      error: "The Redis Client did not connect."
    },
    {
      status: 401,
    },
  )
  }

  await redis.set(`stellarObjectCache:${data.objectID}`, JSON.stringify(data.stellarObject));
  return NextResponse.json({sucess: true});

}