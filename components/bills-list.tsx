import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Calendar, FileText, User, ExternalLink } from "lucide-react"

interface Bill {
  id: string
  number: string
  title: string
  description: string
  date: string
  sponsor: string
  status: "Passed" | "Submitted" | "In Committee"
}

const passedBills: Bill[] = [
  {
    id: "hr3746",
    number: "H.R. 3746",
    title: "Fiscal Year 2024 National Defense Authorization Act",
    description:
      "Authorizes FY2024 appropriations and sets forth policies for Department of Defense programs and activities, including military personnel strengths, military construction, and compensation and benefits.",
    date: "December 22, 2023",
    sponsor: "Rep. Mike Rogers",
    status: "Passed",
  },
  {
    id: "hr2670",
    number: "H.R. 2670",
    title: "FY2024 Financial Services and General Government Appropriations Act",
    description:
      "Provides funding for the Treasury Department, the Judiciary, the Executive Office of the President, and various independent agencies for fiscal year 2024.",
    date: "March 9, 2024",
    sponsor: "Rep. Steve Womack",
    status: "Passed",
  },
  {
    id: "s1893",
    number: "S. 1893",
    title: "Preventing PFAS Runoff at Airports Act",
    description:
      "Directs the FAA to work with airports, aircraft manufacturers, and the EPA to identify alternatives to firefighting foam containing PFAS and to deploy systems to prevent environmental contamination.",
    date: "January 19, 2024",
    sponsor: "Sen. Gary Peters",
    status: "Passed",
  },
  {
    id: "hr5394",
    number: "H.R. 5394",
    title: "Supply Chain Disruption Task Force Act of 2023",
    description:
      "Establishes a Supply Chain Disruption Task Force to address supply chain disruptions and bottlenecks affecting interstate and international commerce.",
    date: "December 12, 2023",
    sponsor: "Rep. Chrissy Houlahan",
    status: "Passed",
  },
]

const submittedBills: Bill[] = [
  {
    id: "hr7024",
    number: "H.R. 7024",
    title: "Tax Relief for American Families and Workers Act of 2024",
    description:
      "Provides tax relief for American families and workers, including an enhanced child tax credit, business tax relief, and provisions related to affordable housing.",
    date: "April 15, 2024",
    sponsor: "Rep. Jason Smith",
    status: "In Committee",
  },
  {
    id: "s4795",
    number: "S. 4795",
    title: "Artificial Intelligence Research, Innovation, and Accountability Act of 2024",
    description:
      "Establishes a framework for the responsible development and deployment of artificial intelligence systems, including risk management, transparency requirements, and regulatory oversight.",
    date: "April 10, 2024",
    sponsor: "Sen. Chuck Schumer",
    status: "Submitted",
  },
  {
    id: "hr7213",
    number: "H.R. 7213",
    title: "Protecting Americans' Data from Foreign Adversaries Act of 2024",
    description:
      "Prohibits data brokers from selling or transferring sensitive personal information to foreign adversaries and establishes a framework to protect Americans' data from foreign threats.",
    date: "March 28, 2024",
    sponsor: "Rep. Raja Krishnamoorthi",
    status: "In Committee",
  },
  {
    id: "s4677",
    number: "S. 4677",
    title: "Clean Energy Manufacturing Jobs Act",
    description:
      "Establishes tax incentives and grant programs to support domestic manufacturing of clean energy technologies and create jobs in the renewable energy sector.",
    date: "March 14, 2024",
    sponsor: "Sen. Debbie Stabenow",
    status: "Submitted",
  },
]

interface BillsListProps {
  type: "passed" | "submitted"
}

export function BillsList({ type }: BillsListProps) {
  const bills = type === "passed" ? passedBills : submittedBills

  return (
    <div className="grid gap-6 pt-4">
      {bills.map((bill) => (
        <Card key={bill.id} className="overflow-hidden transition-all hover:shadow-md">
          <CardHeader className="bg-muted/50 border-b">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl">{bill.title}</CardTitle>
                <CardDescription className="mt-1 flex items-center">
                  <FileText className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                  {bill.number}
                </CardDescription>
              </div>
              <Badge variant={type === "passed" ? "default" : "outline"} className="ml-2">
                {bill.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="mb-4">{bill.description}</p>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="h-3.5 w-3.5 mr-1" />
                {bill.date}
              </div>
              <div className="flex items-center">
                <User className="h-3.5 w-3.5 mr-1" />
                Sponsored by {bill.sponsor}
              </div>
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
      ))}
    </div>
  )
}
