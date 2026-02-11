import { NextResponse } from "next/server";

let failures = [
  { id: 1, order_id: "ORD201", reason: "Customer not available", location: "Kothrud", partner: "Shadowfax", failure_time: "2026-02-10T09:30:00" },
  { id: 2, order_id: "ORD202", reason: "Wrong address", location: "Baner", partner: "Shadowfax", failure_time: "2026-02-10T11:00:00" },
  { id: 3, order_id: "ORD203", reason: "Customer not available", location: "Wakad", partner: "Shadowfax", failure_time: "2026-02-10T14:30:00" },
  { id: 4, order_id: "ORD204", reason: "Address not reachable", location: "Hinjewadi", partner: "Shadowfax", failure_time: "2026-02-10T16:10:00" },
  { id: 5, order_id: "ORD205", reason: "Customer not available", location: "Kothrud", partner: "Shadowfax", failure_time: "2026-02-10T18:20:00" },
  { id: 6, order_id: "ORD206", reason: "Payment issue", location: "Baner", partner: "Shadowfax", failure_time: "2026-02-10T20:00:00" },
  { id: 7, order_id: "ORD207", reason: "Customer not available", location: "Aundh", partner: "Shadowfax", failure_time: "2026-02-11T10:30:00" },
  { id: 8, order_id: "ORD208", reason: "Wrong address", location: "Wakad", partner: "Shadowfax", failure_time: "2026-02-11T12:15:00" },
  { id: 9, order_id: "ORD209", reason: "Customer not available", location: "Hinjewadi", partner: "Shadowfax", failure_time: "2026-02-11T15:10:00" },
  { id: 10, order_id: "ORD210", reason: "Address not reachable", location: "Kothrud", partner: "Shadowfax", failure_time: "2026-02-11T17:40:00" },
  { id: 11, order_id: "ORD211", reason: "Customer not available", location: "Baner", partner: "Shadowfax", failure_time: "2026-02-11T19:10:00" },
  { id: 12, order_id: "ORD212", reason: "Payment issue", location: "Aundh", partner: "Shadowfax", failure_time: "2026-02-11T21:00:00" },
  { id: 13, order_id: "ORD213", reason: "Customer not available", location: "Kothrud", partner: "Shadowfax", failure_time: "2026-02-12T10:00:00" },
  { id: 14, order_id: "ORD214", reason: "Wrong address", location: "Baner", partner: "Shadowfax", failure_time: "2026-02-12T13:30:00" },
  { id: 15, order_id: "ORD215", reason: "Customer not available", location: "Wakad", partner: "Shadowfax", failure_time: "2026-02-12T18:20:00" },
  { id: 16, order_id: "ORD216", reason: "Address not reachable", location: "Hinjewadi", partner: "Shadowfax", failure_time: "2026-02-12T20:10:00" },
];

export async function GET() {
  return NextResponse.json(failures);
}
