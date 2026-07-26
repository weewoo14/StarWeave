import mongoose from "mongoose";

if (!process.env.MONGO_URI) {
  throw new Error("Invalid/Missing environment variable: MONOGODB KEY");
}

const MONGO_URI = process.env.MONGO_URI;

declare global {
  var mongoosePromise: Promise<typeof mongoose> | undefined;
}

export default async function mongoConnect() {
  mongoose.set("strictQuery", true);
  mongoose.set("strictPopulate", false);
  
  if (!global.mongoosePromise) {
    global.mongoosePromise = mongoose.connect(MONGO_URI);
  }

  return global.mongoosePromise;

}