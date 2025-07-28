import { NextResponse } from "next/server";
import type { HttpResult } from "@/app/types/httpResult";

export function createResponse<T>(result: HttpResult<T>, status = 200) {
  return NextResponse.json(result, { status });
}
