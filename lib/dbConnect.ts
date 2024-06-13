import mongoose from "mongoose";

const connection: any = {};
const MONGODB_URI: string = process.env.MONGODB_URI as string;

async function dbConnect() {
  if (connection.isConnected) return;

  const db = await mongoose.connect(MONGODB_URI);

  connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;
