import { NextResponse } from "next/server"
import { fetchBillsByStatus } from "@/lib/congress-api"

export async function GET() {
  try {
    // Fetch just one bill to test the connection
    const response = await fetchBillsByStatus("introduced", 0, 1)

    // Return success with minimal data to verify it's working
    return NextResponse.json({
      success: true,
      billCount: response.bills.count,
      sampleBill:
        response.bills.bills.length > 0
          ? {
              number: response.bills.bills[0].number,
              title: response.bills.bills[0].title,
            }
          : null,
    })
  } catch (error) {
    console.error("Error testing Congress.gov API:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
