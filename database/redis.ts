import { createClient } from "redis";

let redisClient: ReturnType<typeof createClient> | null = null;

export async function getRedisClient() {
  if (!redisClient) {
    redisClient = createClient();

    redisClient.on("error", (err) => {
      console.log("Redis Client Error", err);
    });

    await redisClient.connect();
  }

  return redisClient;
}