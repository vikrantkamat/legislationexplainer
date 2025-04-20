import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

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
    id: "hr5376",
    number: "H.R. 5376",
    title: "Inflation Reduction Act of 2022",
    description:
      "A comprehensive bill addressing climate change, healthcare costs, and tax reform. It includes provisions for clean energy tax credits, prescription drug pricing reform, and corporate tax changes.",
    date: "August 16, 2022",
    sponsor: "Rep. John Yarmuth",
    status: "Passed",
  },
  {
    id: "hr4346",
    number: "H.R. 4346",
    title: "CHIPS and Science Act of 2022",
    description:
      "A bill to strengthen domestic semiconductor manufacturing, research and development, and supply chain security. It provides $52.7 billion for American semiconductor research, development, and production.",
    date: "August 9, 2022",
    sponsor: "Rep. Hakeem Jeffries",
    status: "Passed",
  },
  {
    id: "s2938",
    number: "S. 2938",
    title: "Bipartisan Safer Communities Act",
    description:
      "The first major federal gun safety legislation in decades. It enhances background checks for buyers under 21, provides funding for mental health services and school security, and closes the 'boyfriend loophole' in domestic violence cases.",
    date: "June 25, 2022",
    sponsor: "Sen. Chris Murphy",
    status: "Passed",
  },
  {
    id: "hr3684",
    number: "H.R. 3684",
    title: "Infrastructure Investment and Jobs Act",
    description:
      "A $1.2 trillion infrastructure package that funds improvements to roads, bridges, public transit, railways, the power grid, water systems, and broadband internet. It represents the largest federal investment in infrastructure in decades.",
    date: "November 15, 2021",
    sponsor: "Rep. Peter DeFazio",
    status: "Passed",
  },
]

const submittedBills: Bill[] = [
  {
    id: "hr8393",
    number: "H.R. 8393",
    title: "Puerto Rico Status Act",
    description:
      "A bill to provide for a plebiscite in Puerto Rico on the admission of Puerto Rico as a State of the Union, independence, or sovereignty in free association with the United States.",
    date: "March 18, 2024",
    sponsor: "Rep. Raúl Grijalva",
    status: "In Committee",
  },
  {
    id: "hr8152",
    number: "H.R. 8152",
    title: "American Data Privacy and Protection Act",
    description:
      "A comprehensive national data privacy framework that would provide consumers with data protections, establish a strong national standard, and give businesses clear rules for collecting and using personal data.",
    date: "February 16, 2024",
    sponsor: "Rep. Frank Pallone",
    status: "In Committee",
  },
  {
    id: "s4913",
    number: "S. 4913",
    title: "Digital Platform Commission Act",
    description:
      "A bill to establish the Digital Platform Commission as a federal body empowered to provide oversight, rules, and enforcement for digital platforms to protect consumers, promote competition, and assure the fairness and safety of algorithms.",
    date: "January 24, 2024",
    sponsor: "Sen. Michael Bennet",
    status: "Submitted",
  },
  {
    id: "hr9168",
    number: "H.R. 9168",
    title: "Affordable Housing Credit Improvement Act",
    description:
      "A bill to expand and strengthen the Low-Income Housing Tax Credit to increase affordable housing development, address the nationwide housing shortage, and provide more resources for vulnerable populations.",
    date: "December 7, 2023",
    sponsor: "Rep. Suzan DelBene",
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
        <Card key={bill.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{bill.title}</CardTitle>
                <CardDescription className="mt-1">
                  {bill.number} • Sponsored by {bill.sponsor}
                </CardDescription>
              </div>
              <Badge variant={type === "passed" ? "default" : "outline"}>{bill.status}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p>{bill.description}</p>
            <p className="text-sm text-muted-foreground mt-2">Date: {bill.date}</p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href={`/?bill=${bill.id}`}>Explain This Bill</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
