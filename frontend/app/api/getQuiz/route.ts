import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET() {
  // add data to the regular data store
  return NextResponse.json({ message: "TODO implement the quiz getter" });
}
