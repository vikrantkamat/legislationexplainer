import type { Bill, Category } from "@/components/bill-sort/bill-sort-game"

// Sample categories with their respective bills
const categories: Category[] = [
  {
    id: "healthcare",
    name: "Healthcare Legislation",
    description: "Bills related to healthcare policy and reform",
    color: "blue",
  },
  {
    id: "environment",
    name: "Environmental Protection",
    description: "Bills focused on environmental conservation and climate change",
    color: "green",
  },
  {
    id: "education",
    name: "Education Reform",
    description: "Bills addressing education policy and school funding",
    color: "red",
  },
  {
    id: "infrastructure",
    name: "Infrastructure Development",
    description: "Bills related to infrastructure projects and funding",
    color: "yellow",
  },
]

// Sample bills for each category
const bills: Record<string, Bill[]> = {
  healthcare: [
    { id: "h1", title: "Medicare Expansion Act", category: "healthcare" },
    { id: "h2", title: "Prescription Drug Price Control", category: "healthcare" },
    { id: "h3", title: "Hospital Funding Initiative", category: "healthcare" },
    { id: "h4", title: "Mental Health Services Act", category: "healthcare" },
    { id: "h5", title: "Rural Healthcare Access", category: "healthcare" },
    { id: "h6", title: "Telehealth Coverage Expansion", category: "healthcare" },
  ],
  environment: [
    { id: "e1", title: "Clean Air Standards", category: "environment" },
    { id: "e2", title: "Renewable Energy Investment", category: "environment" },
    { id: "e3", title: "National Parks Preservation", category: "environment" },
    { id: "e4", title: "Emissions Reduction Plan", category: "environment" },
    { id: "e5", title: "Ocean Conservation Act", category: "environment" },
    { id: "e6", title: "Wildfire Prevention Funding", category: "environment" },
  ],
  education: [
    { id: "ed1", title: "Teacher Pay Increase", category: "education" },
    { id: "ed2", title: "Student Loan Forgiveness", category: "education" },
    { id: "ed3", title: "School Infrastructure Funding", category: "education" },
    { id: "ed4", title: "Early Childhood Education", category: "education" },
    { id: "ed5", title: "STEM Education Initiative", category: "education" },
    { id: "ed6", title: "College Affordability Act", category: "education" },
  ],
  infrastructure: [
    { id: "i1", title: "Highway Funding Bill", category: "infrastructure" },
    { id: "i2", title: "Bridge Repair Initiative", category: "infrastructure" },
    { id: "i3", title: "Public Transit Expansion", category: "infrastructure" },
    { id: "i4", title: "Rural Broadband Access", category: "infrastructure" },
    { id: "i5", title: "Water System Modernization", category: "infrastructure" },
    { id: "i6", title: "Airport Improvement Program", category: "infrastructure" },
  ],
}

// Function to generate game data
export function generateGameData() {
  // Select all categories
  const selectedCategories = [...categories]

  // For each category, select 4 random bills
  const selectedBills: Bill[] = []

  selectedCategories.forEach((category) => {
    const categoryBills = [...bills[category.id]]
    // Shuffle the bills
    for (let i = categoryBills.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[categoryBills[i], categoryBills[j]] = [categoryBills[j], categoryBills[i]]
    }
    // Select the first 4 bills
    selectedBills.push(...categoryBills.slice(0, 4))
  })

  // Shuffle the selected bills
  for (let i = selectedBills.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[selectedBills[i], selectedBills[j]] = [selectedBills[j], selectedBills[i]]
  }

  return {
    categories: selectedCategories,
    bills: selectedBills,
  }
}
