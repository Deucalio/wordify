import { NextResponse } from "next/server";

export async function POST(req) {
  let data;
  data = await req.json();
  console.log("Request data:", data); // Inspect the payload
  return NextResponse.json({
    status: 200,
  });
}
