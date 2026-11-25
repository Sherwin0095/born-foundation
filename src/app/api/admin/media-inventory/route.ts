import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/**
 * Protected Private Media Inventory Endpoint
 * Rejects unauthenticated callers with HTTP 401 so private source metadata
 * and restricted child-archive records never leak publicly.
 */
export async function GET(request: Request) {
  const supabase = await createSupabaseServerClient();

  if (supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }
  } else {
    // In offline mode, require explicit staff header/cookie or reject anonymous requests
    const staffToken = request.headers.get("x-born-offline-staff");
    if (!staffToken) {
      return NextResponse.json(
        { error: "Private media inventory requires authenticated staff authorisation." },
        { status: 401 }
      );
    }
  }

  const inventoryPath = path.join(process.cwd(), ".private", "media-inventory.json");
  if (!fs.existsSync(inventoryPath)) {
    return NextResponse.json({ error: "Inventory not yet generated" }, { status: 404 });
  }

  const raw = JSON.parse(fs.readFileSync(inventoryPath, "utf-8"));
  return NextResponse.json({
    totalSourceFiles: raw.totalSourceFiles,
    publicApprovedCount: raw.publicApprovedCount,
    pendingSafeguardingCount: raw.pendingSafeguardingCount,
  });
}
