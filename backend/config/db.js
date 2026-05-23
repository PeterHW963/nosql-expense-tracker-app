import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config(); // so u can access .env values

const uri = process.env.MONGODB_URI;
const dbname = "expense-tracker-trial-v2"; // name ur db here

if (!uri) {
  throw new Error("MONGODB_URI missing in .env");
}

let client;
let database;

export async function connectDB() {
  if (database) {
    return database;
  }

  client = new MongoClient(uri);
  await client.connect();

  database = client.db(dbname);
  console.log(`Connected to MongoDB. Database: ${dbname}`);

  return database;
}

// helper to expose client
export function getClient() {
  if (!client) {
    throw new Error("Mongo client not initialized. Call connectDB()");
  }
  return client;
}

export function getDB() {
  if (!database) {
    throw new Error("Database not initialized. Call connectDB()");
  }
  return database;
}

export async function closeDBConection() {
  if (client) {
    await client.close();
  }
}
