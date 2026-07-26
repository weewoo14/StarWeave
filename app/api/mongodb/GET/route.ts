import { NextRequest, NextResponse } from "next/server";

import SEARCHDATA from "@/database/models";
import mongoConnect from "@/database/mongodb";
import { stellarObjectResultType } from "@/types/SearchDataAPI";

export async function GET(request: NextRequest) {
  await mongoConnect();
  const stellarObjectResults: stellarObjectResultType[] = [];
  const allSearchDataQuery = await SEARCHDATA.find({});

  for (const stellarObject of allSearchDataQuery) {
    stellarObjectResults.push({
      id: stellarObject.id,
      name: stellarObject.name,
      location: stellarObject.location,
    })
  }

  return NextResponse.json(stellarObjectResults);

}