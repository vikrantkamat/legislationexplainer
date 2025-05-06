// Congress.gov API service
const API_KEY = process.env.CONGRESS_API_KEY
const BASE_URL = "https://api.congress.gov/v3"

// Types for Congress.gov API responses
export interface CongressBill {
  congress: number
  type: string
  number: string
  url: string
  title: string
  originChamber: string
  originChamberCode: string
  updateDate: string
  updateDateIncludingText: string
  introducedDate: string
  latestAction: {
    actionDate: string
    text: string
  }
  sponsors: {
    item: {
      bioguideId: string
      fullName: string
      firstName: string
      middleName: string
      lastName: string
      party: string
      state: string
      url: string
    }[]
  }
  committees?: {
    items: {
      name: string
      systemCode: string
      chamber: string
      type: string
      url: string
    }[]
  }
  policyArea?: {
    name: string
  }
  subjects?: {
    items: {
      name: string
    }[]
  }
}

export interface CongressApiResponse {
  bills: {
    count: number
    bills: CongressBill[]
  }
  pagination: {
    count: number
    next: string
  }
  request: {
    contentType: string
    format: string
  }
}

// Function to fetch bills by status
export async function fetchBillsByStatus(
  status: "introduced" | "active" | "passed" | "enacted",
  offset = 0,
  limit = 20,
): Promise<CongressApiResponse> {
  // Map our status to Congress.gov API parameters
  const apiParams: Record<string, string> = {
    offset: offset.toString(),
    limit: limit.toString(),
    sort: "updateDate desc",
    api_key: API_KEY,
  }

  // Add status-specific parameters
  switch (status) {
    case "introduced":
      // Recently introduced bills (last 30 days)
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      const formattedDate = thirtyDaysAgo.toISOString().split("T")[0]
      apiParams.fromDateTime = `${formattedDate}T00:00:00Z`
      break
    case "active":
      // Bills in committee
      apiParams.billStatus = "Active"
      break
    case "passed":
      // Bills passed by either chamber
      apiParams.billStatus = "Passed One Chamber"
      break
    case "enacted":
      // Bills that became law
      apiParams.billStatus = "Became Law"
      break
  }

  // Build the URL with query parameters
  const queryParams = new URLSearchParams(apiParams).toString()
  const url = `${BASE_URL}/bill?${queryParams}`

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Congress.gov API error: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching bills from Congress.gov API:", error)
    throw error
  }
}

// Function to map Congress.gov API data to our Bill interface
export function mapCongressBillToAppBill(congressBill: CongressBill) {
  // Extract party from sponsor data
  const sponsorParty =
    congressBill.sponsors?.item[0]?.party === "D" ? "D" : congressBill.sponsors?.item[0]?.party === "R" ? "R" : "I"

  // Format the bill number
  const formattedNumber = `${congressBill.type} ${congressBill.number}`

  // Format the sponsor string similar to our mock data
  const sponsor = congressBill.sponsors?.item[0]
  const sponsorString = sponsor
    ? `${sponsor.party === "D" ? "Rep." : "Sen."} ${sponsor.lastName}, ${sponsor.firstName} (${sponsor.party}-${sponsor.state})`
    : "Unknown Sponsor"

  // Determine chamber
  const chamber = congressBill.originChamberCode === "H" ? "House" : "Senate"

  // Determine status based on our categories
  let status = "Introduced"
  if (congressBill.latestAction?.text?.includes("Became Public Law")) {
    status = "Enacted"
  } else if (congressBill.latestAction?.text?.includes("Passed")) {
    if (congressBill.latestAction?.text?.includes("Senate") && chamber === "House") {
      status = "Passed House and Senate"
    } else if (congressBill.latestAction?.text?.includes("House") && chamber === "Senate") {
      status = "Passed House and Senate"
    } else {
      status = chamber === "House" ? "Passed House" : "Passed Senate"
    }
  } else if (congressBill.latestAction?.text?.includes("Committee")) {
    status = "Committee Consideration"
  }

  // Extract committees if available
  const committees = congressBill.committees?.items.map((committee) => committee.name) || []

  return {
    id: `${congressBill.type.toLowerCase()}${congressBill.number}`,
    number: formattedNumber,
    title: congressBill.title,
    description: congressBill.title, // Using title as description since API doesn't provide a separate description
    date: new Date(congressBill.introducedDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    sponsor: sponsorString,
    sponsorParty: sponsorParty as "D" | "R" | "I",
    chamber: chamber,
    status: status,
    lastAction: congressBill.latestAction?.text || "No action recorded",
    policyArea: congressBill.policyArea?.name || congressBill.subjects?.items[0]?.name || "General",
    committees: committees,
  }
}
