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
  {
    id: "finance",
    name: "Financial Regulation",
    description: "Bills addressing banking, markets, and financial systems",
    color: "blue",
  },
  {
    id: "defense",
    name: "National Security",
    description: "Bills related to defense, military, and homeland security",
    color: "red",
  },
  {
    id: "civil_rights",
    name: "Civil Rights & Justice",
    description: "Bills addressing equality, justice reform, and civil liberties",
    color: "green",
  },
  {
    id: "technology",
    name: "Technology & Privacy",
    description: "Bills focused on tech regulation, data privacy, and innovation",
    color: "yellow",
  },
]

// Expanded collection of bills for each category
const bills: Record<string, Bill[]> = {
  healthcare: [
    { id: "h1", title: "Medicare Expansion Act", category: "healthcare" },
    { id: "h2", title: "Prescription Drug Price Control", category: "healthcare" },
    { id: "h3", title: "Hospital Funding Initiative", category: "healthcare" },
    { id: "h4", title: "Mental Health Services Act", category: "healthcare" },
    { id: "h5", title: "Rural Healthcare Access", category: "healthcare" },
    { id: "h6", title: "Telehealth Coverage Expansion", category: "healthcare" },
    { id: "h7", title: "Medical Research Funding", category: "healthcare" },
    { id: "h8", title: "Pandemic Preparedness Act", category: "healthcare" },
    { id: "h9", title: "Healthcare Worker Protection", category: "healthcare" },
    { id: "h10", title: "Vaccine Development Initiative", category: "healthcare" },
    { id: "h11", title: "Maternal Health Improvement", category: "healthcare" },
    { id: "h12", title: "Rare Disease Treatment Act", category: "healthcare" },
    { id: "h13", title: "Opioid Crisis Response", category: "healthcare" },
    { id: "h14", title: "Veterans Healthcare Access", category: "healthcare" },
    { id: "h15", title: "Children's Health Insurance", category: "healthcare" },
    { id: "h16", title: "Healthcare Price Transparency", category: "healthcare" },
    { id: "h17", title: "Medical Debt Relief Act", category: "healthcare" },
    { id: "h18", title: "Nursing Home Standards", category: "healthcare" },
    { id: "h19", title: "Emergency Medical Services", category: "healthcare" },
    { id: "h20", title: "Public Health Infrastructure", category: "healthcare" },
  ],
  environment: [
    { id: "e1", title: "Clean Air Standards", category: "environment" },
    { id: "e2", title: "Renewable Energy Investment", category: "environment" },
    { id: "e3", title: "National Parks Preservation", category: "environment" },
    { id: "e4", title: "Emissions Reduction Plan", category: "environment" },
    { id: "e5", title: "Ocean Conservation Act", category: "environment" },
    { id: "e6", title: "Wildfire Prevention Funding", category: "environment" },
    { id: "e7", title: "Clean Water Protection", category: "environment" },
    { id: "e8", title: "Endangered Species Act", category: "environment" },
    { id: "e9", title: "Sustainable Agriculture", category: "environment" },
    { id: "e10", title: "Plastic Pollution Reduction", category: "environment" },
    { id: "e11", title: "Green Infrastructure Act", category: "environment" },
    { id: "e12", title: "Forest Conservation Fund", category: "environment" },
    { id: "e13", title: "Climate Resilience Planning", category: "environment" },
    { id: "e14", title: "Coastal Protection Initiative", category: "environment" },
    { id: "e15", title: "Electric Vehicle Incentives", category: "environment" },
    { id: "e16", title: "Solar Energy Development", category: "environment" },
    { id: "e17", title: "Wildlife Corridor Protection", category: "environment" },
    { id: "e18", title: "Environmental Justice Act", category: "environment" },
    { id: "e19", title: "Carbon Capture Research", category: "environment" },
    { id: "e20", title: "Wetlands Restoration Fund", category: "environment" },
  ],
  education: [
    { id: "ed1", title: "Teacher Pay Increase", category: "education" },
    { id: "ed2", title: "Student Loan Forgiveness", category: "education" },
    { id: "ed3", title: "School Infrastructure Funding", category: "education" },
    { id: "ed4", title: "Early Childhood Education", category: "education" },
    { id: "ed5", title: "STEM Education Initiative", category: "education" },
    { id: "ed6", title: "College Affordability Act", category: "education" },
    { id: "ed7", title: "School Lunch Program", category: "education" },
    { id: "ed8", title: "Special Education Funding", category: "education" },
    { id: "ed9", title: "Digital Learning Access", category: "education" },
    { id: "ed10", title: "Teacher Training Standards", category: "education" },
    { id: "ed11", title: "Arts Education Funding", category: "education" },
    { id: "ed12", title: "School Safety Measures", category: "education" },
    { id: "ed13", title: "Vocational Training Act", category: "education" },
    { id: "ed14", title: "Literacy Improvement", category: "education" },
    { id: "ed15", title: "Rural Schools Support", category: "education" },
    { id: "ed16", title: "Gifted Student Programs", category: "education" },
    { id: "ed17", title: "Community College Access", category: "education" },
    { id: "ed18", title: "Education Research Grants", category: "education" },
    { id: "ed19", title: "School Counselor Funding", category: "education" },
    { id: "ed20", title: "Textbook Affordability Act", category: "education" },
  ],
  infrastructure: [
    { id: "i1", title: "Highway Funding Bill", category: "infrastructure" },
    { id: "i2", title: "Bridge Repair Initiative", category: "infrastructure" },
    { id: "i3", title: "Public Transit Expansion", category: "infrastructure" },
    { id: "i4", title: "Rural Broadband Access", category: "infrastructure" },
    { id: "i5", title: "Water System Modernization", category: "infrastructure" },
    { id: "i6", title: "Airport Improvement Program", category: "infrastructure" },
    { id: "i7", title: "Electric Grid Security", category: "infrastructure" },
    { id: "i8", title: "Port Development Act", category: "infrastructure" },
    { id: "i9", title: "Railway Safety Standards", category: "infrastructure" },
    { id: "i10", title: "Dam Rehabilitation Fund", category: "infrastructure" },
    { id: "i11", title: "Smart City Initiative", category: "infrastructure" },
    { id: "i12", title: "Public Housing Renovation", category: "infrastructure" },
    { id: "i13", title: "Stormwater Management", category: "infrastructure" },
    { id: "i14", title: "Natural Gas Pipeline Safety", category: "infrastructure" },
    { id: "i15", title: "Bicycle Infrastructure Act", category: "infrastructure" },
    { id: "i16", title: "Wastewater Treatment Funding", category: "infrastructure" },
    { id: "i17", title: "Telecommunications Act", category: "infrastructure" },
    { id: "i18", title: "Disaster Resilient Infrastructure", category: "infrastructure" },
    { id: "i19", title: "Public Facilities Accessibility", category: "infrastructure" },
    { id: "i20", title: "Urban Development Grant", category: "infrastructure" },
  ],
  finance: [
    { id: "f1", title: "Banking Regulation Reform", category: "finance" },
    { id: "f2", title: "Consumer Financial Protection", category: "finance" },
    { id: "f3", title: "Stock Market Oversight", category: "finance" },
    { id: "f4", title: "Retirement Security Act", category: "finance" },
    { id: "f5", title: "Cryptocurrency Regulation", category: "finance" },
    { id: "f6", title: "Small Business Lending", category: "finance" },
    { id: "f7", title: "Mortgage Lending Standards", category: "finance" },
    { id: "f8", title: "Credit Reporting Reform", category: "finance" },
    { id: "f9", title: "Insurance Market Stability", category: "finance" },
    { id: "f10", title: "Financial Literacy Education", category: "finance" },
    { id: "f11", title: "Corporate Transparency Act", category: "finance" },
    { id: "f12", title: "Payday Lending Regulation", category: "finance" },
    { id: "f13", title: "Investment Advisor Standards", category: "finance" },
    { id: "f14", title: "Federal Reserve Oversight", category: "finance" },
    { id: "f15", title: "Tax Code Simplification", category: "finance" },
    { id: "f16", title: "Debt Collection Practices", category: "finance" },
    { id: "f17", title: "Student Loan Servicing", category: "finance" },
    { id: "f18", title: "Financial Crisis Prevention", category: "finance" },
    { id: "f19", title: "Community Banking Support", category: "finance" },
    { id: "f20", title: "Foreign Investment Review", category: "finance" },
  ],
  defense: [
    { id: "d1", title: "Military Readiness Act", category: "defense" },
    { id: "d2", title: "Cybersecurity Enhancement", category: "defense" },
    { id: "d3", title: "Veterans Benefits Expansion", category: "defense" },
    { id: "d4", title: "Defense Procurement Reform", category: "defense" },
    { id: "d5", title: "Border Security Funding", category: "defense" },
    { id: "d6", title: "Military Family Support", category: "defense" },
    { id: "d7", title: "Intelligence Oversight Act", category: "defense" },
    { id: "d8", title: "Counter-Terrorism Funding", category: "defense" },
    { id: "d9", title: "Space Force Development", category: "defense" },
    { id: "d10", title: "Nuclear Security Protocol", category: "defense" },
    { id: "d11", title: "Military Base Realignment", category: "defense" },
    { id: "d12", title: "Veteran Healthcare Access", category: "defense" },
    { id: "d13", title: "Defense Technology Research", category: "defense" },
    { id: "d14", title: "Military Justice Reform", category: "defense" },
    { id: "d15", title: "Homeland Security Grant", category: "defense" },
    { id: "d16", title: "Foreign Military Assistance", category: "defense" },
    { id: "d17", title: "Combat Readiness Funding", category: "defense" },
    { id: "d18", title: "Military Housing Improvement", category: "defense" },
    { id: "d19", title: "Veteran Employment Act", category: "defense" },
    { id: "d20", title: "Defense Industrial Base", category: "defense" },
  ],
  civil_rights: [
    { id: "cr1", title: "Voting Rights Protection", category: "civil_rights" },
    { id: "cr2", title: "Criminal Justice Reform", category: "civil_rights" },
    { id: "cr3", title: "Equal Pay Enforcement", category: "civil_rights" },
    { id: "cr4", title: "Anti-Discrimination Act", category: "civil_rights" },
    { id: "cr5", title: "Police Accountability", category: "civil_rights" },
    { id: "cr6", title: "Immigration Reform", category: "civil_rights" },
    { id: "cr7", title: "Hate Crimes Prevention", category: "civil_rights" },
    { id: "cr8", title: "Prison Reform Initiative", category: "civil_rights" },
    { id: "cr9", title: "Disability Rights Act", category: "civil_rights" },
    { id: "cr10", title: "Racial Justice Commission", category: "civil_rights" },
    { id: "cr11", title: "LGBTQ+ Equality Act", category: "civil_rights" },
    { id: "cr12", title: "Bail System Reform", category: "civil_rights" },
    { id: "cr13", title: "Religious Freedom Protection", category: "civil_rights" },
    { id: "cr14", title: "Juvenile Justice Reform", category: "civil_rights" },
    { id: "cr15", title: "Workplace Harassment Prevention", category: "civil_rights" },
    { id: "cr16", title: "Immigrant Rights Protection", category: "civil_rights" },
    { id: "cr17", title: "Sentencing Reform Act", category: "civil_rights" },
    { id: "cr18", title: "Tribal Sovereignty Act", category: "civil_rights" },
    { id: "cr19", title: "Gender Equality Initiative", category: "civil_rights" },
    { id: "cr20", title: "Civil Asset Forfeiture Reform", category: "civil_rights" },
  ],
  technology: [
    { id: "t1", title: "Data Privacy Protection", category: "technology" },
    { id: "t2", title: "Artificial Intelligence Regulation", category: "technology" },
    { id: "t3", title: "Broadband Competition Act", category: "technology" },
    { id: "t4", title: "Cybersecurity Standards", category: "technology" },
    { id: "t5", title: "Digital Identity Protection", category: "technology" },
    { id: "t6", title: "Tech Antitrust Enforcement", category: "technology" },
    { id: "t7", title: "STEM Research Funding", category: "technology" },
    { id: "t8", title: "Internet of Things Security", category: "technology" },
    { id: "t9", title: "Digital Literacy Initiative", category: "technology" },
    { id: "t10", title: "Quantum Computing Research", category: "technology" },
    { id: "t11", title: "Social Media Transparency", category: "technology" },
    { id: "t12", title: "Facial Recognition Limits", category: "technology" },
    { id: "t13", title: "Digital Currency Regulation", category: "technology" },
    { id: "t14", title: "Tech Education Funding", category: "technology" },
    { id: "t15", title: "Net Neutrality Protection", category: "technology" },
    { id: "t16", title: "Automated Vehicle Standards", category: "technology" },
    { id: "t17", title: "Digital Accessibility Act", category: "technology" },
    { id: "t18", title: "Drone Regulation Framework", category: "technology" },
    { id: "t19", title: "Biotechnology Research", category: "technology" },
    { id: "t20", title: "Digital Rights Protection", category: "technology" },
  ],
}

// Function to generate game data
export function generateGameData() {
  // Select 4 random categories from the available categories
  const shuffledCategories = [...categories].sort(() => Math.random() - 0.5)
  const selectedCategories = shuffledCategories.slice(0, 4)

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
