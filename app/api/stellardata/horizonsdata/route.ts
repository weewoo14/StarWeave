import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const upstashRedis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL as string,
  token: process.env.UPSTASH_REDIS_REST_TOKEN as string,
})

const rateLimit = new Ratelimit({
  redis: upstashRedis,
  limiter: Ratelimit.fixedWindow(100, "60 s"),
})

export async function GET(request: NextRequest) {
  const identifer = "getHorizonsStellarData";
  const rateLimitResult = await rateLimit.limit(identifer);

  if (!rateLimitResult.success) {
    return Response.json({
      message: "The API that calls the Horizons JPL API has received too many requests.",
    }, {
      status: 429,
    })
  }

  const searchParams = request.nextUrl.searchParams;
  const horizonsID = searchParams.get("objectID");

  if (!horizonsID) {
    return NextResponse.json(
      {
        error: `Horizons ID does not exist.`,
      },
      {
        status: 404,
      }
    );
  }

  const queryParams = new URLSearchParams({
    format: "json",
    COMMAND: `${horizonsID}`,
    MAKE_EPHEM: "NO",
  })

  const objectResponse = await fetch(`https://ssd.jpl.nasa.gov/api/horizons.api?${queryParams.toString()}`);
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

  const objectData = await objectResponse.json();

  return NextResponse.json(objectData);
}