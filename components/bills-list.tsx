import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Calendar, User, ExternalLink, Building, Tag } from "lucide-react"
import { ScrollAnimation } from "@/components/scroll-animation"

interface Bill {
  id: string
  number: string
  title: string
  description: string
  date: string
  sponsor: string
  sponsorParty: "D" | "R" | "I"
  chamber: "House" | "Senate"
  status: string
  lastAction: string
  policyArea?: string
  committees?: string[]
}

// Future bills from after November 2024 (fictional)
const introducedBills: Bill[] = [
  {
    id: "hr9512",
    number: "H.R. 9512",
    title: "Quantum Computing Research and Development Act of 2025",
    description: "To establish a comprehensive national quantum computing research program.",
    date: "January 15, 2025",
    sponsor: "Rep. Johnson, Eddie Bernice (D-TX-30)",
    sponsorParty: "D",
    chamber: "House",
    status: "Introduced",
    lastAction: "Referred to the House Committee on Science, Space, and Technology.",
    policyArea: "Science, Technology, Communications",
  },
  {
    id: "s5102",
    number: "S. 5102",
    title: "Rural Broadband Expansion Act of 2025",
    description: "A bill to expand broadband access in rural communities across America.",
    date: "January 12, 2025",
    sponsor: "Sen. Warnock, Raphael (D-GA)",
    sponsorParty: "D",
    chamber: "Senate",
    status: "Introduced",
    lastAction: "Read twice and referred to the Committee on Commerce, Science, and Transportation.",
    policyArea: "Communications",
  },
  {
    id: "hr9498",
    number: "H.R. 9498",
    title: "Renewable Energy Innovation and Manufacturing Act",
    description: "To promote domestic manufacturing of renewable energy technologies.",
    date: "December 18, 2024",
    sponsor: "Rep. Ocasio-Cortez, Alexandria (D-NY-14)",
    sponsorParty: "D",
    chamber: "House",
    status: "Introduced",
    lastAction: "Referred to the House Committee on Energy and Commerce.",
    policyArea: "Energy",
  },
  {
    id: "s5089",
    number: "S. 5089",
    title: "Cybersecurity Enhancement and Protection Act of 2024",
    description: "A bill to strengthen national cybersecurity infrastructure and protect critical systems.",
    date: "December 12, 2024",
    sponsor: "Sen. Warner, Mark (D-VA)",
    sponsorParty: "D",
    chamber: "Senate",
    status: "Introduced",
    lastAction: "Read twice and referred to the Committee on Homeland Security and Governmental Affairs.",
    policyArea: "Science, Technology, Communications",
  },
  {
    id: "hr9475",
    number: "H.R. 9475",
    title: "Small Business Innovation and Growth Act",
    description: "To provide tax incentives and grants for small business innovation and growth.",
    date: "December 5, 2024",
    sponsor: "Rep. Williams, Roger (R-TX-25)",
    sponsorParty: "R",
    chamber: "House",
    status: "Introduced",
    lastAction: "Referred to the House Committee on Small Business.",
    policyArea: "Commerce",
  },
]

const activeBills: Bill[] = [
  {
    id: "hr9450",
    number: "H.R. 9450",
    title: "Climate Resilience Infrastructure Act of 2024",
    description: "To improve infrastructure resilience against climate-related disasters.",
    date: "November 28, 2024",
    sponsor: "Rep. Castor, Kathy (D-FL-14)",
    sponsorParty: "D",
    chamber: "House",
    status: "Committee Consideration",
    lastAction: "Hearings held by the House Committee on Transportation and Infrastructure.",
    policyArea: "Emergency Management",
    committees: ["House Transportation and Infrastructure"],
  },
  {
    id: "s5045",
    number: "S. 5045",
    title: "Artificial Intelligence Ethics and Regulation Act",
    description:
      "A bill to establish ethical guidelines and regulatory frameworks for artificial intelligence systems.",
    date: "November 22, 2024",
    sponsor: "Sen. Wyden, Ron (D-OR)",
    sponsorParty: "D",
    chamber: "Senate",
    status: "Committee Consideration",
    lastAction: "Committee on Commerce, Science, and Transportation. Hearings held.",
    policyArea: "Science, Technology, Communications",
    committees: ["Senate Commerce, Science, and Transportation"],
  },
  {
    id: "hr9425",
    number: "H.R. 9425",
    title: "Healthcare Cost Reduction Act of 2024",
    description: "To reduce healthcare costs and improve access to affordable healthcare services.",
    date: "November 18, 2024",
    sponsor: "Rep. Pallone, Frank (D-NJ-6)",
    sponsorParty: "D",
    chamber: "House",
    status: "Committee Consideration",
    lastAction: "Markup completed by the House Committee on Energy and Commerce.",
    policyArea: "Health",
    committees: ["House Energy and Commerce"],
  },
]

const passedBills: Bill[] = [
  {
    id: "hr9410",
    number: "H.R. 9410",
    title: "Veterans Mental Health Services Enhancement Act",
    description: "To improve mental health services for veterans and their families.",
    date: "November 15, 2024",
    sponsor: "Rep. Takano, Mark (D-CA-41)",
    sponsorParty: "D",
    chamber: "House",
    status: "Passed House",
    lastAction: "Received in the Senate and referred to the Committee on Veterans' Affairs.",
    policyArea: "Armed Forces and National Security",
    committees: ["House Veterans' Affairs", "Senate Veterans' Affairs"],
  },
  {
    id: "s5020",
    number: "S. 5020",
    title: "Digital Privacy Protection Act of 2024",
    description: "A bill to enhance consumer privacy protections for personal data collected by digital platforms.",
    date: "November 12, 2024",
    sponsor: "Sen. Cantwell, Maria (D-WA)",
    sponsorParty: "D",
    chamber: "Senate",
    status: "Passed Senate",
    lastAction: "Received in the House and referred to the Committee on Energy and Commerce.",
    policyArea: "Civil Rights and Liberties, Minority Issues",
    committees: ["Senate Commerce, Science, and Transportation", "House Energy and Commerce"],
  },
  {
    id: "hr9395",
    number: "H.R. 9395",
    title: "Supply Chain Security and Resilience Act",
    description: "To strengthen the security and resilience of critical supply chains in the United States.",
    date: "November 8, 2024",
    sponsor: "Rep. McCaul, Michael (R-TX-10)",
    sponsorParty: "R",
    chamber: "House",
    status: "Passed House and Senate",
    lastAction: "Passed Senate with amendments by Yea-Nay Vote. 68 - 32.",
    policyArea: "Commerce",
    committees: ["House Foreign Affairs", "Senate Foreign Relations"],
  },
]

const enactedBills: Bill[] = [
  {
    id: "hr9380",
    number: "H.R. 9380",
    title: "National Defense Authorization Act for Fiscal Year 2025",
    description:
      "To authorize appropriations for fiscal year 2025 for military activities of the Department of Defense.",
    date: "December 20, 2024",
    sponsor: "Rep. Rogers, Mike (R-AL-3)",
    sponsorParty: "R",
    chamber: "House",
    status: "Enacted",
    lastAction: "Became Public Law No: 118-45.",
    policyArea: "Armed Forces and National Security",
    committees: ["House Armed Services", "Senate Armed Services"],
  },
  {
    id: "s5010",
    number: "S. 5010",
    title: "Consolidated Appropriations Act, 2025",
    description: "Making consolidated appropriations for the fiscal year ending September 30, 2025.",
    date: "December 16, 2024",
    sponsor: "Sen. Murray, Patty (D-WA)",
    sponsorParty: "D",
    chamber: "Senate",
    status: "Enacted",
    lastAction: "Became Public Law No: 118-44.",
    policyArea: "Economics and Public Finance",
    committees: ["Senate Appropriations", "House Appropriations"],
  },
  {
    id: "hr9365",
    number: "H.R. 9365",
    title: "Bipartisan Infrastructure Implementation Act",
    description:
      "To provide oversight and improvements to the implementation of the Infrastructure Investment and Jobs Act.",
    date: "November 30, 2024",
    sponsor: "Rep. DeFazio, Peter (D-OR-4)",
    sponsorParty: "D",
    chamber: "House",
    status: "Enacted",
    lastAction: "Became Public Law No: 118-43.",
    policyArea: "Transportation and Public Works",
    committees: ["House Transportation and Infrastructure", "Senate Environment and Public Works"],
  },
]

interface BillsListProps {
  type: "introduced" | "active" | "passed" | "enacted"
}

export function BillsList({ type }: BillsListProps) {
  const getBills = () => {
    switch (type) {
      case "introduced":
        return introducedBills
      case "active":
        return activeBills
      case "passed":
        return passedBills
      case "enacted":
        return enactedBills
      default:
        return introducedBills
    }
  }

  const bills = getBills()

  return (
    <div className="grid gap-6 pt-4">
      {bills.map((bill, index) => (
        <ScrollAnimation key={bill.id} stagger={index % 3 === 0 ? 1 : index % 3 === 1 ? 2 : 3}>
          <Card className="overflow-hidden transition-all hover:shadow-md">
            <CardHeader className="bg-muted/50 border-b">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge
                      variant="outline"
                      className={`${
                        bill.chamber === "House"
                          ? "bg-blue-100 text-blue-800 border-blue-200"
                          : "bg-red-100 text-red-800 border-red-200"
                      } dark:bg-opacity-20`}
                    >
                      {bill.chamber}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`${
                        bill.sponsorParty === "D"
                          ? "bg-blue-100 text-blue-800 border-blue-200"
                          : bill.sponsorParty === "R"
                            ? "bg-red-100 text-red-800 border-red-200"
                            : "bg-purple-100 text-purple-800 border-purple-200"
                      } dark:bg-opacity-20`}
                    >
                      {bill.sponsorParty}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">
                    {bill.number}: {bill.title.length > 100 ? bill.title.substring(0, 100) + "..." : bill.title}
                  </CardTitle>
                  {bill.description && <CardDescription className="mt-1">{bill.description}</CardDescription>}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center">
                  <Calendar className="h-3.5 w-3.5 mr-1" />
                  {bill.date}
                </div>
                <div className="flex items-center">
                  <User className="h-3.5 w-3.5 mr-1" />
                  {bill.sponsor}
                </div>
                {bill.policyArea && (
                  <div className="flex items-center">
                    <Tag className="h-3.5 w-3.5 mr-1" />
                    {bill.policyArea}
                  </div>
                )}
                {bill.committees && bill.committees.length > 0 && (
                  <div className="flex items-center">
                    <Building className="h-3.5 w-3.5 mr-1" />
                    {bill.committees.join(", ")}
                  </div>
                )}
              </div>
              <div className="bg-muted/30 p-3 rounded-md">
                <p className="text-sm font-medium">Latest Action:</p>
                <p className="text-sm text-muted-foreground">{bill.lastAction}</p>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/30 px-6 py-4">
              <Button asChild className="w-full sm:w-auto">
                <Link href={`/?bill=${bill.id}`} className="flex items-center justify-center">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Explain This Bill
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </ScrollAnimation>
      ))}
    </div>
  )
}
