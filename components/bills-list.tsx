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
    id: "hr1234",
    number: "H.R. 1234",
    title: "Infrastructure Investment and Jobs Act",
    description:
      "A bill to authorize funds for Federal-aid highways, highway safety programs, and transit programs, and for other purposes.",
    date: "November 15, 2023",
    sponsor: "Rep. Peter DeFazio",
    status: "Passed",
  },
  {
    id: "s395",
    number: "S. 395",
    title: "Cybersecurity Enhancement Act",
    description:
      "A bill to improve cybersecurity in the United States through enhanced sharing of information about cybersecurity threats.",
    date: "October 7, 2023",
    sponsor: "Sen. Mark Warner",
    status: "Passed",
  },
  {
    id: "hr2471",
    number: "H.R. 2471",
    title: "Consolidated Appropriations Act",
    description:
      "Making consolidated appropriations for the fiscal year ending September 30, 2023, and for providing emergency assistance for the situation in Ukraine.",
    date: "March 15, 2023",
    sponsor: "Rep. Rosa DeLauro",
    status: "Passed",
  },
  {
    id: "s2938",
    number: "S. 2938",
    title: "Bipartisan Safer Communities Act",
    description:
      "A bill to make our communities safer by keeping guns out of dangerous hands, investing in mental health services, and protecting our children at school.",
    date: "June 25, 2023",
    sponsor: "Sen. Chris Murphy",
    status: "Passed",
  },
]

const submittedBills: Bill[] = [
  {
    id: "hr5376",
    number: "H.R. 5376",
    title: "Clean Energy Innovation Act",
    description: "A bill to establish programs to accelerate innovation and deployment of clean energy technologies.",
    date: "January 12, 2024",
    sponsor: "Rep. Frank Pallone",
    status: "In Committee",
  },
  {
    id: "s2093",
    number: "S. 2093",
    title: "For the People Act",
    description:
      "A bill to expand Americans' access to the ballot box, reduce the influence of big money in politics, strengthen ethics rules for public servants, and implement other anti-corruption measures.",
    date: "February 3, 2024",
    sponsor: "Sen. Amy Klobuchar",
    status: "Submitted",
  },
  {
    id: "hr3684",
    number: "H.R. 3684",
    title: "Digital Privacy Protection Act",
    description:
      "A bill to establish national data privacy standards and strengthen digital privacy protections for consumers.",
    date: "February 28, 2024",
    sponsor: "Rep. Cathy McMorris Rodgers",
    status: "In Committee",
  },
  {
    id: "s1260",
    number: "S. 1260",
    title: "Affordable Housing Access Act",
    description: "A bill to increase the supply of affordable housing and improve access to housing assistance.",
    date: "March 5, 2024",
    sponsor: "Sen. Sherrod Brown",
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
