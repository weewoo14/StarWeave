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
  limiter: Ratelimit.fixedWindow(50, "60 s"),
})

export async function POST(request: NextRequest) {
  const identifer = "MongoDBSpecificObjectPOST";
  const rateLimitRequest = await rateLimit.limit(identifer);

  if (!rateLimitRequest.success) {
    return NextResponse.json({
      message: "The MongoDB Specific Object POST has reached its rate limit. Please try again later.",
    }, {
      status: 429,
    })
  }

  await mongoConnect();
  const specificObjectData = await request.json();

  if (specificObjectData.location === "horizons") {
    switch (specificObjectData.stellarData.type) {
      case "planet":
        try {
          await Models.HORIZONSPLANETMODEL.create(specificObjectData.stellarData);
        } catch (err) {
          return NextResponse.json({
            message: `MongoDB Specific Object Post ran into the error: ${err}`,
          }, {
            status: 404,
          })
        }
        break;
      
      case "star":
        try {
          await Models.HORIZONSSTARMODEL.create(specificObjectData.stellarData);
        } catch (err) {
          return NextResponse.json({
            message: `MongoDB Specific Object Post ran into the error: ${err}`,
          }, {
            status: 404,
          })
        }
        break;
      
      case "satellite":
        try {
          await Models.HORIZONSSATELLITEMODEL.create(specificObjectData.stellarData);
        } catch (err) {
          return NextResponse.json({
            message: `MongoDB Specific Object Post ran into the error: ${err}`,
          }, {
            status: 404,
          })
        }
        break;
      
      case "miscellaneous":
        try {
          await Models.HORIZONSMISCELLANEOUSMODEL.create(specificObjectData.stellarData);
        } catch (err) {
          return NextResponse.json({
            message: `MongoDB Specific Object Post ran into the error: ${err}`,
          }, {
            status: 404,
          })
        }
        break;
    
      default:
        return NextResponse.json({
          message: "None of the current horizons object types met the POST'd data."
        }, {
          status: 404
        });
    }
  } else if (specificObjectData.location === "exoplanet") {
      try {
        await Models.EXOPLANETDATAMODEL.create(specificObjectData.stellarData);
      } catch (err) {
        return NextResponse.json({
          message: `MongoDB Specific Object Post ran into the error: ${err}`,
        }, {
          status: 404,
        })
      }
  } else {
    return NextResponse.json({
      message: "Object location type does not fit any current ones."
    }, {
      status: 404
    })
  }

  return NextResponse.json({success: true})

}