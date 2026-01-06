import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
let client;
let db;

export async function connectDB() {
  if (db) return db;

  if (!uri) {
    throw new Error("MONGODB_URI not defined");
  }

  client = new MongoClient(uri);
  await client.connect();

  db = client.db("urlshortner"); // make sure this DB name is correct
  return db;
}
