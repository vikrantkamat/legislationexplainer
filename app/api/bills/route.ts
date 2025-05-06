import { type NextRequest, NextResponse } from "next/server"
import { fetchBillsByStatus, mapCongressBillToAppBill } from "@/lib/congress-api"

export async function GET(request: NextRequest) {
  // Get query parameters
  const searchParams = request.nextUrl.searchParams
  const status = (searchParams.get("status") as "introduced" | "active" | "passed" | "enacted") || "introduced"
  const page = Number.parseInt(searchParams.get("page") || "1", 10)
  const limit = Number.parseInt(searchParams.get("limit") || "5", 10)
  const offset = (page - 1) * limit

  try {
    // Fetch bills from Congress.gov API
    const response = await fetchBillsByStatus(status, offset, limit)

    // Map the response to our app's bill format
    const bills = response.bills.bills.map(mapCongressBillToAppBill)

    // Calculate total pages
    const totalItems = response.bills.count
    const totalPages = Math.ceil(totalItems / limit)

    return NextResponse.json({
      bills,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
      },
    })
  } catch (error) {
    console.error("Error in bills API route:", error)
    return NextResponse.json({ error: "Failed to fetch bills from Congress.gov" }, { status: 500 })
  }
}
