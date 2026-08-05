import { NextRequest, NextResponse } from "next/server";

import Models from "@/database/models";
import mongoConnect from "@/database/mongodb";
import { stellarObjectResultType } from "@/types/SearchDataAPI";

export async function POST(request: NextRequest) {
  await mongoConnect();
  const allSearchData: stellarObjectResultType[] = await request.json();
  const writeOperation = allSearchData.map((stellarObject) => ({
    updateOne: {
      filter: {id: stellarObject.id},
      update: {$set: stellarObject},
      upsert: true,
    }
  }));

  Models.SEARCHDATA.bulkWrite(writeOperation);

  return NextResponse.json({success: true})
}