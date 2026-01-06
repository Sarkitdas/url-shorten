import { connectDB } from "../config/dbclient";

const COLLECTION = "urls";

const Url = {
  async incrementClicks(shortCode) {
    const db = await connectDB();
    const code = String(shortCode).trim();

    // increment clicks
    const updateResult = await db.collection(COLLECTION).updateOne(
      { shortCode: code },
      { $inc: { clicks: 1 } }
    );

    if (updateResult.matchedCount === 0) {
      return null;
    }

    return db.collection(COLLECTION).findOne({ shortCode: code });
  },

  async findOne(query) {
    const db = await connectDB();
    return db.collection(COLLECTION).findOne(query);
  },

  async create(doc) {
    const db = await connectDB();
    const res = await db.collection(COLLECTION).insertOne(doc);
    return { _id: res.insertedId, ...doc };
  },
  async findMany(query) {
  const db = await connectDB();
  return db
    .collection("urls")
    .find(query)
    .sort({ createdAt: -1 })
    .toArray(); // ✅ toArray() returns an array
},
};

export default Url;
