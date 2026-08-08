import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import { getRedisClient } from "@/database/redis";

const upstashRedis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL as string,
  token: process.env.UPSTASH_REDIS_REST_TOKEN as string,
})

const rateLimit = new Ratelimit({
  redis: upstashRedis,
  limiter: Ratelimit.fixedWindow(100, "60 s"),
})

export async function GET(request: NextRequest) {
  const identifier = "getRedisCacheAPI";
  const rateLimitResult = await rateLimit.limit(identifier);
  
  if (!rateLimitResult.success) {
    return NextResponse.json({
      message: "GET Redis Cache API has been rate limited.",
      rateLimitState: rateLimitResult,
    },
    {
      status: 429
    })
  }


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
  const getCachedResponse = await redis.get(`stellarObjectCache:${objectID}`);
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

  return NextResponse.json( getCachedResponse );


}