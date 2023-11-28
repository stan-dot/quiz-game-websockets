import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export type ResponseData = {
  message: string;
};

export async function GET() {
  // initalize a new session in the socket server
  // add data to the regular data store
  return NextResponse.json({ message: "TODO implement the quiz getter" });
}
