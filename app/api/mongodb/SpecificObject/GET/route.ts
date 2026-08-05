import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import mongoConnect from "@/database/mongodb";
import Models from "@/database/models";

const upstashRedis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL as string,
  token: process.env.UPSTASH_REDIS_REST_TOKEN as string,
})

const rateLimit = new Ratelimit({
  redis: upstashRedis,
  limiter: Ratelimit.fixedWindow(100, "60 s"),
})

export async function GET(request: NextRequest) {
  const identifier = "MongoDBSpecificObjectGET";
  const rateLimitRequest = await rateLimit.limit(identifier);

  if (!rateLimitRequest.success) {
    return NextResponse.json({
      message: "The MongoDB Specific Object POST has reached its rate limit. Please try again later.",
    }, {
      status: 429,
    })
  }

  const searchParams = request.nextUrl.searchParams;
  const objectLocation = searchParams.get("objectLocation");
  const objectName = searchParams.get("objectName");
  if (!objectLocation || !objectName) {
    return NextResponse.json({
      message: "Object Name or the Object Location does not exist, and can therefore not be queried."
    }, {
      status: 404
    })
  }

  await mongoConnect();
  switch (objectLocation) {
    case "horizons":
      console.log(objectName);
      const horizonsPlanetQuery = await Models.HORIZONSPLANETMODEL.findOne({name: objectName});
      if (horizonsPlanetQuery) {
        return NextResponse.json(horizonsPlanetQuery);
      }

      const horizonsStarQuery = await Models.HORIZONSSTARMODEL.findOne({name: objectName});
      if (horizonsStarQuery) {
        return NextResponse.json(horizonsStarQuery);
      }

      const horizonsSatelliteQuery = await Models.HORIZONSSATELLITEMODEL.findOne({name: objectName});
      if (horizonsSatelliteQuery) {
        return NextResponse.json(horizonsSatelliteQuery);
      }

      const horizonsMiscellaneousSchema = await Models.HORIZONSMISCELLANEOUSMODEL.findOne({name: objectName});
      if (horizonsMiscellaneousSchema) {
        return NextResponse.json(horizonsMiscellaneousSchema);
      }
      
      return NextResponse.json({
        message: "Horizons Object does not exist",
      }, {
        status: 404
      })
    
    case "exoplanet":
      const exoplanetDataQuery = await Models.EXOPLANETDATAMODEL.findOne({planetName: objectName});
      if (exoplanetDataQuery) {
        return NextResponse.json(exoplanetDataQuery);
      }

      return NextResponse.json({
        message: "Exoplanet Object does not exist",
      }, {
        status: 404
      });
  
    default:
      return NextResponse.json({
        message: "Object Location does not exist",
      }, {
        status: 404
      });
  }

}