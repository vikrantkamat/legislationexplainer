import type { Bill, Category } from "@/components/bill-sort/bill-sort-game"

// Define categories
const categories: Category[] = [
  {
    id: "environment",
    name: "Environment",
    description: "Bills focused on environmental protection, climate change, and conservation efforts.",
    color: "bg-emerald-600",
  },
  {
    id: "economy",
    name: "Economy",
    description: "Bills related to economic policy, taxes, business regulation, and financial systems.",
    color: "bg-blue-600",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    description: "Bills addressing healthcare access, medical research, insurance, and public health.",
    color: "bg-red-600",
  },
  {
    id: "civil_rights",
    name: "Civil Rights",
    description: "Bills concerning voting rights, equality, justice reform, and civil liberties.",
    color: "bg-purple-600",
  },
  {
    id: "education",
    name: "Education",
    description: "Bills focused on schools, higher education, student loans, and educational policy.",
    color: "bg-amber-600",
  },
  {
    id: "infrastructure",
    name: "Infrastructure",
    description: "Bills related to transportation, public works, internet access, and utilities.",
    color: "bg-slate-600",
  },
  {
    id: "defense",
    name: "Defense & Security",
    description: "Bills addressing national security, military, veterans affairs, and cybersecurity.",
    color: "bg-indigo-600",
  },
  {
    id: "immigration",
    name: "Immigration",
    description: "Bills concerning border security, immigration reform, and citizenship pathways.",
    color: "bg-orange-600",
  },
]

// Define bills for each category
const allBills: Record<string, Bill[]> = {
  environment: [
    { id: "env1", title: "Climate Protection Act", category: "environment" },
    { id: "env2", title: "Clean Water Standards Bill", category: "environment" },
    { id: "env3", title: "Renewable Energy Incentives", category: "environment" },
    { id: "env4", title: "National Parks Preservation", category: "environment" },
    { id: "env5", title: "Carbon Emissions Reduction", category: "environment" },
    { id: "env6", title: "Wildlife Conservation Fund", category: "environment" },
    { id: "env7", title: "Green Infrastructure Act", category: "environment" },
    { id: "env8", title: "Sustainable Agriculture Bill", category: "environment" },
  ],
  economy: [
    { id: "econ1", title: "Small Business Tax Cut", category: "economy" },
    { id: "econ2", title: "Job Creation Incentives", category: "economy" },
    { id: "econ3", title: "Banking Regulation Reform", category: "economy" },
    { id: "econ4", title: "Trade Agreement Authority", category: "economy" },
    { id: "econ5", title: "Minimum Wage Adjustment", category: "economy" },
    { id: "econ6", title: "Consumer Protection Act", category: "economy" },
    { id: "econ7", title: "Corporate Transparency Law", category: "economy" },
    { id: "econ8", title: "Market Competition Bill", category: "economy" },
  ],
  healthcare: [
    { id: "health1", title: "Healthcare for All Act", category: "healthcare" },
    { id: "health2", title: "Prescription Drug Pricing", category: "healthcare" },
    { id: "health3", title: "Mental Health Services", category: "healthcare" },
    { id: "health4", title: "Medical Research Funding", category: "healthcare" },
    { id: "health5", title: "Rural Hospital Support", category: "healthcare" },
    { id: "health6", title: "Pandemic Preparedness", category: "healthcare" },
    { id: "health7", title: "Healthcare Worker Protection", category: "healthcare" },
    { id: "health8", title: "Telehealth Expansion Act", category: "healthcare" },
  ],
  civil_rights: [
    { id: "civil1", title: "Voting Access Improvement", category: "civil_rights" },
    { id: "civil2", title: "Criminal Justice Reform", category: "civil_rights" },
    { id: "civil3", title: "Equal Pay Enforcement", category: "civil_rights" },
    { id: "civil4", title: "Anti-Discrimination Act", category: "civil_rights" },
    { id: "civil5", title: "Police Accountability Bill", category: "civil_rights" },
    { id: "civil6", title: "Privacy Protection Act", category: "civil_rights" },
    { id: "civil7", title: "Hate Crimes Prevention", category: "civil_rights" },
    { id: "civil8", title: "Free Speech Protection", category: "civil_rights" },
  ],
  education: [
    { id: "edu1", title: "Student Loan Forgiveness", category: "education" },
    { id: "edu2", title: "Teacher Pay Increase Act", category: "education" },
    { id: "edu3", title: "School Modernization Fund", category: "education" },
    { id: "edu4", title: "Early Childhood Education", category: "education" },
    { id: "edu5", title: "College Affordability Act", category: "education" },
    { id: "edu6", title: "STEM Education Initiative", category: "education" },
    { id: "edu7", title: "School Lunch Program", category: "education" },
    { id: "edu8", title: "Digital Learning Access", category: "education" },
  ],
  infrastructure: [
    { id: "infra1", title: "Highway Improvement Act", category: "infrastructure" },
    { id: "infra2", title: "Broadband for All Initiative", category: "infrastructure" },
    { id: "infra3", title: "Public Transit Funding", category: "infrastructure" },
    { id: "infra4", title: "Water Systems Upgrade", category: "infrastructure" },
    { id: "infra5", title: "Electric Grid Modernization", category: "infrastructure" },
    { id: "infra6", title: "Bridge Safety Standards", category: "infrastructure" },
    { id: "infra7", title: "Rural Connectivity Act", category: "infrastructure" },
    { id: "infra8", title: "Airport Improvement Fund", category: "infrastructure" },
  ],
  defense: [
    { id: "def1", title: "Military Readiness Act", category: "defense" },
    { id: "def2", title: "Veterans Healthcare Access", category: "defense" },
    { id: "def3", title: "Cybersecurity Enhancement", category: "defense" },
    { id: "def4", title: "Defense Procurement Reform", category: "defense" },
    { id: "def5", title: "Military Family Support", category: "defense" },
    { id: "def6", title: "Intelligence Oversight Bill", category: "defense" },
    { id: "def7", title: "Counter-Terrorism Funding", category: "defense" },
    { id: "def8", title: "Veterans Education Benefits", category: "defense" },
  ],
  immigration: [
    { id: "immig1", title: "Border Security Act", category: "immigration" },
    { id: "immig2", title: "Citizenship Pathway Bill", category: "immigration" },
    { id: "immig3", title: "Asylum Process Reform", category: "immigration" },
    { id: "immig4", title: "Visa System Modernization", category: "immigration" },
    { id: "immig5", title: "Immigrant Worker Program", category: "immigration" },
    { id: "immig6", title: "Refugee Assistance Act", category: "immigration" },
    { id: "immig7", title: "Immigration Court Reform", category: "immigration" },
    { id: "immig8", title: "Family Reunification Act", category: "immigration" },
  ],
}

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

// Generate game data
export function generateGameData() {
  // Randomly select 4 categories
  const shuffledCategories = shuffleArray(categories)
  const selectedCategories = shuffledCategories.slice(0, 4)

  // Select 4 bills from each category
  const selectedBills: Bill[] = []

  selectedCategories.forEach((category) => {
    const categoryBills = allBills[category.id]
    const shuffledBills = shuffleArray(categoryBills)
    const selectedCategoryBills = shuffledBills.slice(0, 4)
    selectedBills.push(...selectedCategoryBills)
  })

  // Shuffle the bills for display
  const shuffledBills = shuffleArray(selectedBills)

  return {
    bills: shuffledBills,
    categories: selectedCategories,
  }
}
