import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import Models from "@/database/models";
import mongoConnect from "@/database/mongodb";
import { stellarObjectResultType } from "@/types/SearchDataAPI";

const upstashRedis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL as string,
  token: process.env.UPSTASH_REDIS_REST_TOKEN as string,
})

const rateLimit = new Ratelimit({
  redis: upstashRedis,
  limiter: Ratelimit.fixedWindow(25, "60 s"),
})

export async function GET(request: NextRequest) {
  const identifer = "getMongoDBSearchData";
  const rateLimitResult = await rateLimit.limit(identifer);

  if (!rateLimitResult.success) {
    return NextResponse.json({
      message: "MongoDB GET API to get all search data has received too many requests."
    }, {
      status: 429
    })
  }

  await mongoConnect();
  const stellarObjectResults: stellarObjectResultType[] = [];
  const allSearchDataQuery = await Models.SEARCHDATA.find({});

  for (const stellarObject of allSearchDataQuery) {
    stellarObjectResults.push({
      id: stellarObject.id,
      name: stellarObject.name,
      location: stellarObject.location,
    })
  }

  return NextResponse.json(stellarObjectResults);

}