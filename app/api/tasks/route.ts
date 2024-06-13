import dbConnect from "@/lib/dbConnect";
import tasks from "@/models/tasks";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  try {
    const data = await tasks.find({});

    return NextResponse.json({ message: "ok", data }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 500 });
  }
}
export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const task = await req.json();

    const data = await tasks.create(task);

    return NextResponse.json(
      { message: "task created", data },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 500 });
  }
}
