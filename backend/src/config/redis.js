import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const redisUrl = process.env.REDIS_URL;
if (!redisUrl) {
  throw new Error("REDIS_URL missing in .env");
}

let redisClient;

export async function connectRedis() {
  if (redisClient?.isOpen) {
    return redisClient;
  }

  redisClient = createClient({
    url: redisUrl,
  });

  redisClient.on("error", (error) => {
    console.error("Redis Client Error:", error);
  });

  await redisClient.connect();
  console.log("Connected to Redis Cloud");

  return redisClient;
}

export function getRedis() {
  if (!redisClient || !redisClient.isOpen) {
    throw new Error("Redis not initialized. Call connectRedis() first.");
  }
  return redisClient;
}

export async function closeRedisConnection() {
  if (redisClient?.isOpen) {
    await redisClient.quit();
  }
}
