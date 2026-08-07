import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import { stellarObjectResultType } from "@/types/SearchDataAPI";
import { parseHorizonsData } from "@/utils/SearchDataAPI";
import { retryCall } from "@/utils/retryExponentialBackoff";

const upstashRedis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL as string,
  token: process.env.UPSTASH_REDIS_REST_TOKEN as string,
});

const rateLimit = new Ratelimit({
  redis: upstashRedis,
  limiter: Ratelimit.fixedWindow(25, "60 s"),
})

export async function GET() {
  const identifer = "customSearchDataAPI";
  const rateLimitResult = await rateLimit.limit(identifer);
  
  if (!rateLimitResult.success) {
    return Response.json({
      message: "Custom Search Data API has received too many requests",
    }, {
      status: 429
    })
  }


  const stellarObjectResults: stellarObjectResultType[] = [];

  // NASA Horizons Major Body
  const horizonsMBResponse = await retryCall(
    "https://ssd.jpl.nasa.gov/api/horizons.api?format=json&COMMAND='MB'"
  );

  if (!horizonsMBResponse.ok) {
    return Response.json(
      { error: `Horizons Data returned ${horizonsMBResponse.status}` },
      { status: horizonsMBResponse.status }
    );
  }

  const horizonsMBData = await horizonsMBResponse.json();
  const horizonsResults = parseHorizonsData(horizonsMBData.result);

  if (!horizonsResults) {
    return Response.json({ error: "Horizon Data is undefined" }, { status: 401 });
  }

  for (const horizonResult of horizonsResults) {
    stellarObjectResults.push({
      id: horizonResult.id,
      name: horizonResult.name,
      location: "horizons",
    });
  }

  // NASA Exoplanet Archive
  const exoplanetResponse = await retryCall(
    "https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+pl_name+from+pscomppars&format=json"
  );

  if (!exoplanetResponse.ok) {
    return Response.json(
      { error: `Exoplanet Archive data returned ${exoplanetResponse.status}` },
      { status: exoplanetResponse.status }
    );
  }

  const exoplanetData = await exoplanetResponse.json();

  if (!exoplanetData) {
    return Response.json({ error: "Exoplanet Data is undefined" }, { status: 401 });
  }

  for (const exoplanetResult of exoplanetData) {
    stellarObjectResults.push({
      id: exoplanetResult.pl_name,
      name: exoplanetResult.pl_name,
      location: "exoplanet",
    });
  }

  return Response.json(stellarObjectResults);
}
