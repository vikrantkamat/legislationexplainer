// First, let's create a mapping of bill titles to their IDs
export const billTitleToId: Record<string, string> = {
  "Quantum Computing Research and Development Act of 2025": "hr9512",
  "Rural Broadband Expansion Act of 2025": "s5102",
  "Renewable Energy Innovation and Manufacturing Act": "hr9498",
  "Cybersecurity Enhancement and Protection Act of 2024": "s5089",
  "Small Business Innovation and Growth Act": "hr9475",
  "Climate Resilience Infrastructure Act of 2024": "hr9450",
  "Artificial Intelligence Ethics and Regulation Act": "s5045",
  "Healthcare Cost Reduction Act of 2024": "hr9425",
  "Veterans Mental Health Services Enhancement Act": "hr9410",
  "Digital Privacy Protection Act of 2024": "s5020",
  "Supply Chain Security and Resilience Act": "hr9395",
  "National Defense Authorization Act for Fiscal Year 2025": "hr9380",
  "Consolidated Appropriations Act, 2025": "s5010",
  "Bipartisan Infrastructure Implementation Act": "hr9365",
  "Data Privacy and Protection Act of 2025": "hr9600",
  "Clean Energy Transition Act of 2025": "s5150",
  "Affordable Housing and Homelessness Prevention Act of 2025": "hr9625",
  "National AI Safety and Innovation Act of 2025": "s5175",
  "Mental Health Access Improvement Act of 2025": "hr9650",
  "Education Modernization and Opportunity Act of 2025": "hr9675",
  "Water Resources Protection Act of 2025": "s5200",
  "Transportation Innovation and Safety Act of 2025": "hr9700",
  "Public Health Preparedness and Response Act of 2025": "s5225",
  "Small Business Recovery and Resilience Act of 2025": "hr9725",
  "Agricultural Sustainability and Innovation Act of 2025": "s5250",
  "Consumer Protection and Market Fairness Act of 2025": "hr9750",
  "Veterans Benefits and Services Improvement Act of 2025": "s5275",
  "Clean Air and Climate Action Act of 2025": "hr9775",
  "Financial Services Innovation and Security Act of 2025": "s5300",
  "Energy Infrastructure Modernization Act of 2025": "hr9800",
}

// Original bill data
export const billTexts: Record<string, string> = {
  hr9512: `
Quantum Computing Research and Development Act of 2025

TITLE I—QUANTUM COMPUTING RESEARCH AND DEVELOPMENT

Sec. 101. Short title.
Sec. 102. Definitions.
Sec. 103. National Quantum Computing Research and Development Program.
Sec. 104. National Science Foundation quantum computing activities.
Sec. 105. Department of Energy quantum computing activities.
Sec. 106. National Institute of Standards and Technology quantum computing activities.
Sec. 107. Quantum computing education and workforce development.
Sec. 108. Quantum computing technology transfer.
Sec. 109. International cooperation and standards.
Sec. 110. Authorization of appropriations.

TITLE II—QUANTUM COMPUTING SECURITY

Sec. 201. Quantum computing security research.
Sec. 202. Post-quantum cryptography standards.
Sec. 203. Quantum-resistant communications and data security.
Sec. 204. Critical infrastructure quantum readiness.
Sec. 205. Authorization of appropriations.

TITLE III—QUANTUM COMPUTING APPLICATIONS

Sec. 301. Quantum computing applications research.
Sec. 302. Quantum computing for scientific discovery.
Sec. 303. Quantum computing for artificial intelligence.
Sec. 304. Quantum computing for healthcare and drug discovery.
Sec. 305. Quantum computing for climate modeling and environmental science.
Sec. 306. Authorization of appropriations.
`,
  s5102: `
Rural Broadband Expansion Act of 2025

TITLE I—RURAL BROADBAND DEPLOYMENT

Sec. 101. Short title.
Sec. 102. Definitions.
Sec. 103. Rural Broadband Deployment Fund.
Sec. 104. Rural Broadband Deployment Program.
Sec. 105. Eligibility requirements.
Sec. 106. Application process.
Sec. 107. Selection criteria.
Sec. 108. Reporting requirements.
Sec. 109. Authorization of appropriations.

TITLE II—BROADBAND INFRASTRUCTURE

Sec. 201. Broadband infrastructure deployment.
Sec. 202. Streamlining broadband deployment on Federal lands.
Sec. 203. Dig once requirements.
Sec. 204. Rural broadband integration working group.
Sec. 205. Authorization of appropriations.

TITLE III—DIGITAL EQUITY AND INCLUSION

Sec. 301. Digital equity and inclusion program.
Sec. 302. Digital literacy and skills development.
Sec. 303. Community anchor institutions.
Sec. 304. Broadband adoption and use.
Sec. 305. Authorization of appropriations.
`,
  hr9498: `
Renewable Energy Innovation and Manufacturing Act

TITLE I—RENEWABLE ENERGY MANUFACTURING

Sec. 101. Short title.
Sec. 102. Definitions.
Sec. 103. Renewable Energy Manufacturing Grant Program.
Sec. 104. Renewable Energy Manufacturing Tax Credits.
Sec. 105. Renewable Energy Supply Chain Development.
Sec. 106. Domestic Content Requirements.
Sec. 107. Authorization of appropriations.

TITLE II—RENEWABLE ENERGY INNOVATION

Sec. 201. Renewable Energy Innovation Program.
Sec. 202. Advanced Renewable Energy Research and Development.
Sec. 203. Renewable Energy Technology Commercialization.
Sec. 204. Renewable Energy Demonstration Projects.
Sec. 205. Authorization of appropriations.

TITLE III—WORKFORCE DEVELOPMENT

Sec. 301. Renewable Energy Workforce Development Program.
Sec. 302. Renewable Energy Manufacturing Training Grants.
Sec. 303. Renewable Energy Career and Technical Education.
Sec. 304. Authorization of appropriations.
`,
  s5089: `
Cybersecurity Enhancement and Protection Act of 2024

TITLE I—CRITICAL INFRASTRUCTURE CYBERSECURITY

Sec. 101. Short title.
Sec. 102. Definitions.
Sec. 103. Critical Infrastructure Cybersecurity Program.
Sec. 104. Cybersecurity Standards and Best Practices.
Sec. 105. Critical Infrastructure Cybersecurity Grants.
Sec. 106. Cybersecurity Information Sharing.
Sec. 107. Authorization of appropriations.

TITLE II—FEDERAL CYBERSECURITY

Sec. 201. Federal Cybersecurity Enhancement.
Sec. 202. Federal Cybersecurity Workforce Development.
Sec. 203. Federal Cybersecurity Modernization Fund.
Sec. 204. Federal Cybersecurity Risk Assessment.
Sec. 205. Authorization of appropriations.

TITLE III—CYBERSECURITY RESEARCH AND DEVELOPMENT

Sec. 301. Cybersecurity Research and Development Program.
Sec. 302. Cybersecurity Education and Training.
Sec. 303. Cybersecurity Technology Transfer.
Sec. 304. International Cybersecurity Cooperation.
Sec. 305. Authorization of appropriations.
`,
  hr9475: `
Small Business Innovation and Growth Act

TITLE I—SMALL BUSINESS INNOVATION

Sec. 101. Short title.
Sec. 102. Definitions.
Sec. 103. Small Business Innovation Research Program Enhancement.
Sec. 104. Small Business Technology Transfer Program Enhancement.
Sec. 105. Small Business Innovation Tax Credits.
Sec. 106. Small Business Innovation Grants.
Sec. 107. Authorization of appropriations.

TITLE II—SMALL BUSINESS GROWTH

Sec. 201. Small Business Growth Fund.
Sec. 202. Small Business Lending Enhancement.
Sec. 203. Small Business Regulatory Relief.
Sec. 204. Small Business Export Promotion.
Sec. 205. Authorization of appropriations.

TITLE III—SMALL BUSINESS WORKFORCE DEVELOPMENT

Sec. 301. Small Business Workforce Development Program.
Sec. 302. Small Business Apprenticeship Grants.
Sec. 303. Small Business Skills Training.
Sec. 304. Authorization of appropriations.
`,
  hr9450: `
Climate Resilience Infrastructure Act of 2024

TITLE I—CLIMATE RESILIENT INFRASTRUCTURE

Sec. 101. Short title.
Sec. 102. Definitions.
Sec. 103. Climate Resilient Infrastructure Program.
Sec. 104. Climate Resilience Standards and Guidelines.
Sec. 105. Climate Resilient Infrastructure Grants.
Sec. 106. Climate Risk Assessment and Planning.
Sec. 107. Authorization of appropriations.

TITLE II—DISASTER MITIGATION AND RESPONSE

Sec. 201. Disaster Mitigation Enhancement.
Sec. 202. Pre-Disaster Mitigation Fund.
Sec. 203. Community Resilience Planning Grants.
Sec. 204. Critical Infrastructure Protection.
Sec. 205. Authorization of appropriations.

TITLE III—CLIMATE ADAPTATION

Sec. 301. Climate Adaptation Program.
Sec. 302. Climate Data and Monitoring.
Sec. 303. Climate-Ready Communities Initiative.
Sec. 304. Climate Adaptation Research and Development.
Sec. 305. Authorization of appropriations.
`,
  s5045: `
Artificial Intelligence Ethics and Regulation Act

TITLE I—ARTIFICIAL INTELLIGENCE GOVERNANCE

Sec. 101. Short title.
Sec. 102. Definitions.
Sec. 103. Artificial Intelligence Ethics Commission.
Sec. 104. Artificial Intelligence Risk Assessment Framework.
Sec. 105. Artificial Intelligence Impact Statements.
Sec. 106. Artificial Intelligence Transparency Requirements.
Sec. 107. Authorization of appropriations.

TITLE II—ARTIFICIAL INTELLIGENCE RESEARCH AND DEVELOPMENT

Sec. 201. Artificial Intelligence Research and Development Program.
Sec. 202. Artificial Intelligence Standards Development.
Sec. 203. Artificial Intelligence Education and Workforce Development.
Sec. 204. Artificial Intelligence Research Grants.
Sec. 205. Authorization of appropriations.

TITLE III—ARTIFICIAL INTELLIGENCE APPLICATIONS

Sec. 301. Artificial Intelligence in Government.
Sec. 302. Artificial Intelligence in Healthcare.
Sec. 303. Artificial Intelligence in Transportation.
Sec. 304. Artificial Intelligence in Energy and Environment.
Sec. 305. Authorization of appropriations.
`,
  hr9425: `
Healthcare Cost Reduction Act of 2024

TITLE I—PRESCRIPTION DRUG AFFORDABILITY

Sec. 101. Short title.
Sec. 102. Definitions.
Sec. 103. Prescription Drug Price Negotiation.
Sec. 104. Prescription Drug Importation.
Sec. 105. Generic Drug and Biosimilar Market Entry.
Sec. 106. Prescription Drug Price Transparency.
Sec. 107. Authorization of appropriations.

TITLE II—HEALTH INSURANCE MARKET REFORMS

Sec. 201. Health Insurance Premium Reduction Program.
Sec. 202. Health Insurance Market Stabilization.
Sec. 203. Health Insurance Coverage Expansion.
Sec. 204. Health Insurance Consumer Protections.
Sec. 205. Authorization of appropriations.

TITLE III—HEALTHCARE SYSTEM IMPROVEMENTS

Sec. 301. Healthcare Value-Based Payment Programs.
Sec. 302. Healthcare Administrative Simplification.
Sec. 303. Healthcare Price Transparency.
Sec. 304. Healthcare Quality Improvement.
Sec. 305. Authorization of appropriations.
`,
  hr9410: `
Veterans Mental Health Services Enhancement Act

TITLE I—VETERANS MENTAL HEALTH SERVICES

Sec. 101. Short title.
Sec. 102. Definitions.
Sec. 103. Veterans Mental Health Services Enhancement Program.
Sec. 104. Veterans Mental Health Workforce Development.
Sec. 105. Veterans Mental Health Research.
Sec. 106. Veterans Mental Health Outreach.
Sec. 107. Authorization of appropriations.

TITLE II—VETERANS SUICIDE PREVENTION

Sec. 201. Veterans Suicide Prevention Program Enhancement.
Sec. 202. Veterans Crisis Line Enhancement.
Sec. 203. Veterans Peer Support Programs.
Sec. 204. Veterans Suicide Prevention Research.
Sec. 205. Authorization of appropriations.

TITLE III—VETERANS FAMILIES SUPPORT

Sec. 301. Veterans Family Support Programs.
Sec. 302. Veterans Caregiver Support Enhancement.
Sec. 303. Veterans Family Mental Health Services.
Sec. 304. Veterans Family Outreach and Education.
Sec. 305. Authorization of appropriations.
`,
  s5020: `
Digital Privacy Protection Act of 2024

TITLE I—CONSUMER PRIVACY RIGHTS

Sec. 101. Short title.
Sec. 102. Definitions.
Sec. 103. Consumer Privacy Rights.
Sec. 104. Data Minimization Requirements.
Sec. 105. Consumer Control Over Personal Data.
Sec. 106. Transparency Requirements.
Sec. 107. Authorization of appropriations.

TITLE II—DATA SECURITY

Sec. 201. Data Security Requirements.
Sec. 202. Data Breach Notification.
Sec. 203. Data Security Standards.
Sec. 204. Data Security Enforcement.
Sec. 205. Authorization of appropriations.

TITLE III—DIGITAL PLATFORM REGULATION

Sec. 301. Digital Platform Transparency Requirements.
Sec. 302. Digital Platform Accountability.
Sec. 303. Digital Platform Competition.
Sec. 304. Digital Platform Research Access.
Sec. 305. Authorization of appropriations.
`,
  hr9395: `
Supply Chain Security and Resilience Act

TITLE I—SUPPLY CHAIN SECURITY

Sec. 101. Short title.
Sec. 102. Definitions.
Sec. 103. Supply Chain Security Program.
Sec. 104. Critical Supply Chain Identification.
Sec. 105. Supply Chain Risk Assessment.
Sec. 106. Supply Chain Security Standards.
Sec. 107. Authorization of appropriations.

TITLE II—SUPPLY CHAIN RESILIENCE

Sec. 201. Supply Chain Resilience Program.
Sec. 202. Domestic Manufacturing Capacity.
Sec. 203. Strategic Stockpile Enhancement.
Sec. 204. Supply Chain Monitoring and Early Warning System.
Sec. 205. Authorization of appropriations.

TITLE III—INTERNATIONAL SUPPLY CHAIN COOPERATION

Sec. 301. International Supply Chain Cooperation Program.
Sec. 302. Supply Chain Diplomatic Initiatives.
Sec. 303. Supply Chain Trade Agreements.
Sec. 304. Supply Chain Development Assistance.
Sec. 305. Authorization of appropriations.
`,
  hr9380: `
National Defense Authorization Act for Fiscal Year 2025

DIVISION A—DEPARTMENT OF DEFENSE AUTHORIZATIONS

TITLE I—PROCUREMENT
Subtitle A—Authorization of Appropriations
Sec. 101. Authorization of appropriations.

Subtitle B—Army Programs
Sec. 111. Multiyear procurement authority for AH–64E Apache helicopters.
Sec. 112. Multiyear procurement authority for UH–60M/HH–60M Black Hawk helicopters.
Sec. 113. Multiyear procurement authority for CH–47F Chinook helicopters.

TITLE II—RESEARCH, DEVELOPMENT, TEST, AND EVALUATION
Subtitle A—Authorization of Appropriations
Sec. 201. Authorization of appropriations.

Subtitle B—Program Requirements, Restrictions, and Limitations
Sec. 211. Modification of requirements relating to certain cooperative research and development agreements.
Sec. 212. Collaborative program for research and engineering for advanced materials for national security.

TITLE III—OPERATION AND MAINTENANCE
Subtitle A—Authorization of Appropriations
Sec. 301. Authorization of appropriations.

Subtitle B—Energy and Environment
Sec. 311. Military Aviation and Installation Assurance Clearinghouse for review of mission obstructions.
Sec. 312. Military installation resilience.
`,
  s5010: `
Consolidated Appropriations Act, 2025

DIVISION A—AGRICULTURE, RURAL DEVELOPMENT, FOOD AND DRUG ADMINISTRATION, AND RELATED AGENCIES APPROPRIATIONS ACT, 2025

TITLE I—AGRICULTURAL PROGRAMS
TITLE II—FARM PRODUCTION AND CONSERVATION PROGRAMS
TITLE III—RURAL DEVELOPMENT PROGRAMS
TITLE IV—DOMESTIC FOOD PROGRAMS
TITLE V—FOREIGN ASSISTANCE AND RELATED PROGRAMS
TITLE VI—RELATED AGENCIES AND FOOD AND DRUG ADMINISTRATION
TITLE VII—GENERAL PROVISIONS

DIVISION B—COMMERCE, JUSTICE, SCIENCE, AND RELATED AGENCIES APPROPRIATIONS ACT, 2025

TITLE I—DEPARTMENT OF COMMERCE
TITLE II—DEPARTMENT OF JUSTICE
TITLE III—SCIENCE
TITLE IV—RELATED AGENCIES
TITLE V—GENERAL PROVISIONS

DIVISION C—DEPARTMENT OF DEFENSE APPROPRIATIONS ACT, 2025

TITLE I—MILITARY PERSONNEL
TITLE II—OPERATION AND MAINTENANCE
TITLE III—PROCUREMENT
TITLE IV—RESEARCH, DEVELOPMENT, TEST AND EVALUATION
TITLE V—REVOLVING AND MANAGEMENT FUNDS
TITLE VI—OTHER DEPARTMENT OF DEFENSE PROGRAMS
TITLE VII—RELATED AGENCIES
TITLE VIII—GENERAL PROVISIONS
`,
  hr9365: `
Bipartisan Infrastructure Implementation Act

TITLE I—INFRASTRUCTURE IMPLEMENTATION OVERSIGHT

Sec. 101. Short title.
Sec. 102. Definitions.
Sec. 103. Infrastructure Implementation Oversight Board.
Sec. 104. Infrastructure Implementation Reporting Requirements.
Sec. 105. Infrastructure Implementation Transparency Portal.
Sec. 106. Infrastructure Implementation Accountability Measures.
Sec. 107. Authorization of appropriations.

TITLE II—INFRASTRUCTURE IMPLEMENTATION IMPROVEMENTS

Sec. 201. Infrastructure Permitting Acceleration.
Sec. 202. Infrastructure Workforce Development Enhancement.
Sec. 203. Infrastructure Materials Supply Chain Improvements.
Sec. 204. Infrastructure Project Delivery Optimization.
Sec. 205. Authorization of appropriations.

TITLE III—INFRASTRUCTURE IMPLEMENTATION TECHNICAL ASSISTANCE

Sec. 301. State and Local Technical Assistance Program.
Sec. 302. Rural Infrastructure Technical Assistance.
Sec. 303. Tribal Infrastructure Technical Assistance.
Sec. 304. Infrastructure Implementation Best Practices.
Sec. 305. Authorization of appropriations.
`,
  // Adding new bills
  hr9600: `
Data Privacy and Protection Act of 2025

TITLE I—CONSUMER DATA RIGHTS

Sec. 101. Short title.
Sec. 102. Definitions.
Sec. 103. Consumer Data Rights.
Sec. 104. Right to Access and Delete Personal Data.
Sec. 105. Right to Data Portability.
Sec. 106. Right to Opt Out of Data Sales and Targeted Advertising.
Sec. 107. Authorization of appropriations.

TITLE II—BUSINESS OBLIGATIONS

Sec. 201. Data Minimization Requirements.
Sec. 202. Privacy by Design.
Sec. 203. Transparency Requirements.
Sec. 204. Data Security Requirements.
Sec. 205. Authorization of appropriations.

TITLE III—ENFORCEMENT

Sec. 301. Federal Trade Commission Authority.
Sec. 302. State Attorney General Enforcement.
Sec. 303. Private Right of Action.
Sec. 304. Penalties and Remedies.
Sec. 305. Authorization of appropriations.
`,
  s5150: `
Clean Energy Transition Act of 2025

TITLE I—CLEAN ENERGY DEPLOYMENT

Sec. 101. Short title.
Sec. 102. Definitions.
Sec. 103. Clean Energy Deployment Program.
Sec. 104. Clean Energy Investment Tax Credits.
Sec. 105. Grid Modernization and Resilience.
Sec. 106. Clean Energy Manufacturing Incentives.
Sec. 107. Authorization of appropriations.

TITLE II—CLIMATE RESILIENCE

Sec. 201. Climate Resilience Planning.
Sec. 202. Climate Adaptation Fund.
Sec. 203. Community Climate Resilience Grants.
Sec. 204. Climate Science and Research.
Sec. 205. Authorization of appropriations.

TITLE III—JUST TRANSITION

Sec. 301. Energy Worker Transition Program.
Sec. 302. Community Economic Development Assistance.
Sec. 303. Energy Transition Workforce Training.
Sec. 304. Environmental Justice Initiatives.
Sec. 305. Authorization of appropriations.
`,
  hr9625: `
Affordable Housing and Homelessness Prevention Act of 2025

TITLE I—AFFORDABLE HOUSING DEVELOPMENT

Sec. 101. Short title.
Sec. 102. Definitions.
Sec. 103. Affordable Housing Development Fund.
Sec. 104. Low-Income Housing Tax Credit Enhancement.
Sec. 105. First-Time Homebuyer Assistance.
Sec. 106. Housing Trust Fund Expansion.
Sec. 107. Authorization of appropriations.

TITLE II—HOMELESSNESS PREVENTION

Sec. 201. Homelessness Prevention Program.
Sec. 202. Emergency Rental Assistance.
Sec. 203. Supportive Housing Services.
Sec. 204. Rapid Rehousing Initiatives.
Sec. 205. Authorization of appropriations.

TITLE III—HOUSING STABILITY

Sec. 301. Housing Stability Fund.
Sec. 302. Eviction Prevention Services.
Sec. 303. Housing Counseling Programs.
Sec. 304. Fair Housing Enforcement.
Sec. 305. Authorization of appropriations.
`,
  s5175: `
National AI Safety and Innovation Act of 2025

TITLE I—AI GOVERNANCE AND SAFETY

Sec. 101. Short title.
Sec. 102. Definitions.
Sec. 103. National AI Safety Board.
Sec. 104. AI Risk Assessment Framework.
Sec. 105. AI Safety Standards.
Sec. 106. High-Risk AI Systems Oversight.
Sec. 107. Authorization of appropriations.

TITLE II—AI RESEARCH AND INNOVATION

Sec. 201. National AI Research Program.
Sec. 202. AI Research Infrastructure.
Sec. 203. AI Talent Development.
Sec. 204. International AI Cooperation.
Sec. 205. Authorization of appropriations.

TITLE III—AI APPLICATIONS AND IMPACTS

Sec. 301. AI in Government Services.
Sec. 302. AI in Healthcare.
Sec. 303. AI in Education.
Sec. 304. AI Workforce Impacts.
Sec. 305. Authorization of appropriations.
`,
  hr9650: `
Mental Health Access Improvement Act of 2025

TITLE I—MENTAL HEALTH SERVICES EXPANSION

Sec. 101. Short title.
Sec. 102. Definitions.
Sec. 103. Mental Health Services Expansion Program.
Sec. 104. Mental Health Parity Enforcement.
Sec. 105. Telehealth Mental Health Services.
Sec. 106. School-Based Mental Health Services.
Sec. 107. Authorization of appropriations.

TITLE II—MENTAL HEALTH WORKFORCE

Sec. 201. Mental Health Professional Workforce Development.
Sec. 202. Mental Health Provider Education and Training.
Sec. 203. Loan Repayment for Mental Health Professionals.
Sec. 204. Rural Mental Health Provider Incentives.
Sec. 205. Authorization of appropriations.

TITLE III—MENTAL HEALTH RESEARCH AND INNOVATION

Sec. 301. Mental Health Research Program.
Sec. 302. Digital Mental Health Tools.
Sec. 303. Mental Health Early Intervention.
Sec. 304. Mental Health Crisis Response.
Sec. 305. Authorization of appropriations.
`,
  // Adding more bills to ensure we have enough for each category
  hr9675: `
Education Modernization and Opportunity Act of 2025

TITLE I—K-12 EDUCATION MODERNIZATION

Sec. 101. Short title.
Sec. 102. Definitions.
Sec. 103. Digital Learning Infrastructure Grants.
Sec. 104. Teacher Technology Training Program.
Sec. 105. Modern Curriculum Development.
Sec. 106. Student Digital Literacy Initiative.
Sec. 107. Authorization of appropriations.

TITLE II—HIGHER EDUCATION OPPORTUNITY

Sec. 201. College Affordability Program.
Sec. 202. Student Loan Reform.
Sec. 203. Career and Technical Education Enhancement.
Sec. 204. Higher Education Innovation Grants.
Sec. 205. Authorization of appropriations.

TITLE III—WORKFORCE READINESS

Sec. 301. Workforce Development Modernization.
Sec. 302. Industry-Education Partnerships.
Sec. 303. Lifelong Learning Accounts.
Sec. 304. Skills-Based Hiring Initiatives.
Sec. 305. Authorization of appropriations.
`,
  s5200: `
Water Resources Protection Act of 2025

TITLE I—CLEAN WATER INFRASTRUCTURE

Sec. 101. Short title.
Sec. 102. Definitions.
Sec. 103. Clean Water Infrastructure Fund.
Sec. 104. Lead Pipe Replacement Program.
Sec. 105. Water System Modernization Grants.
Sec. 106. Rural Water Systems Assistance.
Sec. 107. Authorization of appropriations.

TITLE II—WATER QUALITY PROTECTION

Sec. 201. Source Water Protection Program.
Sec. 202. Emerging Contaminants Monitoring.
Sec. 203. Agricultural Runoff Mitigation.
Sec. 204. Industrial Discharge Standards.
Sec. 205. Authorization of appropriations.

TITLE III—WATER RESOURCE MANAGEMENT

Sec. 301. Drought Resilience Program.
Sec. 302. Flood Prevention and Mitigation.
Sec. 303. Watershed Restoration Initiatives.
Sec. 304. Water Conservation Incentives.
Sec. 305. Authorization of appropriations.
`,
  hr9700: `
Transportation Innovation and Safety Act of 2025

TITLE I—TRANSPORTATION INFRASTRUCTURE

Sec. 101. Short title.
Sec. 102. Definitions.
Sec. 103. Surface Transportation Modernization Fund.
Sec. 104. Bridge Repair and Replacement Program.
Sec. 105. Public Transit Enhancement Grants.
Sec. 106. Transportation Electrification Initiative.
Sec. 107. Authorization of appropriations.

TITLE II—TRANSPORTATION SAFETY

Sec. 201. Vehicle Safety Standards Modernization.
Sec. 202. Automated Vehicle Safety Framework.
Sec. 203. Pedestrian and Cyclist Safety Program.
Sec. 204. Rural Road Safety Improvement.
Sec. 205. Authorization of appropriations.

TITLE III—TRANSPORTATION INNOVATION

Sec. 301. Transportation Innovation Research Program.
Sec. 302. Smart Infrastructure Deployment.
Sec. 303. Sustainable Transportation Initiatives.
Sec. 304. Transportation Workforce Development.
Sec. 305. Authorization of appropriations.
`,
  s5225: `
Public Health Preparedness and Response Act of 2025

TITLE I—PUBLIC HEALTH INFRASTRUCTURE

Sec. 101. Short title.
Sec. 102. Definitions.
Sec. 103. Public Health Infrastructure Modernization.
Sec. 104. Laboratory Capacity Enhancement.
Sec. 105. Disease Surveillance Systems.
Sec. 106. Public Health Workforce Development.
Sec. 107. Authorization of appropriations.

TITLE II—EMERGENCY PREPAREDNESS AND RESPONSE

Sec. 201. Strategic National Stockpile Enhancement.
Sec. 202. Medical Supply Chain Security.
Sec. 203. Emergency Response Coordination.
Sec. 204. Medical Countermeasures Development.
Sec. 205. Authorization of appropriations.

TITLE III—COMMUNITY RESILIENCE

Sec. 301. Community Health Resilience Program.
Sec. 302. Health Equity Initiatives.
Sec. 303. Mental Health Emergency Response.
Sec. 304. Public Health Communications.
Sec. 305. Authorization of appropriations.
`,
  hr9725: `
Small Business Recovery and Resilience Act of 2025

TITLE I—SMALL BUSINESS RECOVERY

Sec. 101. Short title.
Sec. 102. Definitions.
Sec. 103. Small Business Recovery Grant Program.
Sec. 104. Small Business Loan Forgiveness.
Sec. 105. Small Business Tax Relief.
Sec. 106. Small Business Debt Restructuring.
Sec. 107. Authorization of appropriations.

TITLE II—SMALL BUSINESS RESILIENCE

Sec. 201. Business Continuity Planning Program.
Sec. 202. Digital Transformation Assistance.
Sec. 203. Supply Chain Diversification Support.
Sec. 204. Small Business Cybersecurity Assistance.
Sec. 205. Authorization of appropriations.

TITLE III—ENTREPRENEURSHIP SUPPORT

Sec. 301. Entrepreneurship Development Program.
Sec. 302. Underserved Communities Business Development.
Sec. 303. Innovation and Research Support.
Sec. 304. Business Mentorship Initiative.
Sec. 305. Authorization of appropriations.
`,
  s5250: `
Agricultural Sustainability and Innovation Act of 2025

TITLE I—SUSTAINABLE AGRICULTURE

Sec. 101. Short title.
Sec. 102. Definitions.
Sec. 103. Sustainable Farming Practices Program.
Sec. 104. Soil Health Initiative.
Sec. 105. Water Conservation in Agriculture.
Sec. 106. Greenhouse Gas Reduction in Agriculture.
Sec. 107. Authorization of appropriations.

TITLE II—AGRICULTURAL INNOVATION

Sec. 201. Agricultural Research and Development Enhancement.
Sec. 202. Precision Agriculture Technology Adoption.
Sec. 203. Agricultural Biotechnology Research.
Sec. 204. Climate-Resilient Crop Development.
Sec. 205. Authorization of appropriations.

TITLE III—RURAL DEVELOPMENT

Sec. 301. Rural Economic Development Initiative.
Sec. 302. Rural Broadband Expansion.
Sec. 303. Rural Healthcare Improvement.
Sec. 304. Rural Workforce Development.
Sec. 305. Authorization of appropriations.
`,
  hr9750: `
Consumer Protection and Market Fairness Act of 2025

TITLE I—CONSUMER PROTECTION

Sec. 101. Short title.
Sec. 102. Definitions.
Sec. 103. Consumer Financial Protection Enhancement.
Sec. 104. Digital Consumer Protection Standards.
Sec. 105. Product Safety Modernization.
Sec. 106. Consumer Privacy Safeguards.
Sec. 107. Authorization of appropriations.

TITLE II—MARKET FAIRNESS

Sec. 201. Antitrust Enforcement Enhancement.
Sec. 202. Digital Market Competition.
Sec. 203. Small Business Competition Protection.
Sec. 204. Merger Review Modernization.
Sec. 205. Authorization of appropriations.

TITLE III—ENFORCEMENT AND OVERSIGHT

Sec. 301. Regulatory Enforcement Coordination.
Sec. 302. Consumer Redress Improvement.
Sec. 303. Market Monitoring and Analysis.
Sec. 304. International Cooperation on Consumer Protection.
Sec. 305. Authorization of appropriations.
`,
  s5275: `
Veterans Benefits and Services Improvement Act of 2025

TITLE I—VETERANS HEALTHCARE

Sec. 101. Short title.
Sec. 102. Definitions.
Sec. 103. VA Healthcare System Modernization.
Sec. 104. Veterans Mental Health Services Enhancement.
Sec.   103. VA Healthcare System Modernization.
Sec. 104. Veterans Mental Health Services Enhancement.
Sec. 105. Rural Veterans Healthcare Access.
Sec. 106. Women Veterans Healthcare Services.
Sec. 107. Authorization of appropriations.

TITLE II—VETERANS BENEFITS

Sec. 201. Disability Compensation Improvement.
Sec. 202. GI Bill Enhancement.
Sec. 203. Veterans Housing Assistance Modernization.
Sec. 204. Veterans Employment Services.
Sec. 205. Authorization of appropriations.

TITLE III—VETERANS SERVICES

Sec. 301. VA Claims Processing Modernization.
Sec. 302. Veterans Transition Assistance Enhancement.
Sec. 303. Veterans Community Support Programs.
Sec. 304. Veterans Caregivers Support Services.
Sec. 305. Authorization of appropriations.
`,
  hr9775: `
Clean Air and Climate Action Act of 2025

TITLE I—CLEAN AIR PROTECTION

Sec. 101. Short title.
Sec. 102. Definitions.
Sec. 103. Air Quality Standards Modernization.
Sec. 104. Air Pollution Monitoring Enhancement.
Sec. 105. Industrial Emissions Reduction Program.
Sec. 106. Clean Transportation Initiatives.
Sec. 107. Authorization of appropriations.

TITLE II—CLIMATE ACTION

Sec. 201. Greenhouse Gas Reduction Targets.
Sec. 202. Clean Energy Transition Support.
Sec. 203. Carbon Capture and Sequestration Program.
Sec. 204. Climate Resilience Planning.
Sec. 205. Authorization of appropriations.

TITLE III—ENVIRONMENTAL JUSTICE

Sec. 301. Environmental Justice Program Enhancement.
Sec. 302. Community Air Monitoring Grants.
Sec. 303. Just Transition Support for Communities.
Sec. 304. Public Health Impact Assessment.
Sec. 305. Authorization of appropriations.
`,
  s5300: `
Financial Services Innovation and Security Act of 2025

TITLE I—FINANCIAL INNOVATION

Sec. 101. Short title.
Sec. 102. Definitions.
Sec. 103. Financial Technology Regulatory Framework.
Sec. 104. Digital Assets and Cryptocurrency Regulation.
Sec. 105. Financial Inclusion Innovation Program.
Sec. 106. Open Banking Standards.
Sec. 107. Authorization of appropriations.

TITLE II—FINANCIAL SECURITY

Sec. 201. Cybersecurity Standards for Financial Institutions.
Sec. 202. Financial Fraud Prevention and Detection.
Sec. 203. Systemic Risk Monitoring Enhancement.
Sec. 204. Financial Privacy Protection.
Sec. 205. Authorization of appropriations.

TITLE III—FINANCIAL MARKET STABILITY

Sec. 301. Market Volatility Monitoring Program.
Sec. 302. Financial Crisis Prevention Measures.
Sec. 303. International Financial Coordination.
Sec. 304. Consumer Financial Education Initiatives.
Sec. 305. Authorization of appropriations.
`,
  // Adding Energy Infrastructure Modernization Act
  hr9800: `
Energy Infrastructure Modernization Act of 2025

TITLE I—ENERGY GRID MODERNIZATION

Sec. 101. Short title.
Sec. 102. Definitions.
Sec. 103. Grid Modernization Program.
Sec. 104. Smart Grid Investment Grants.
Sec. 105. Grid Resilience and Security Enhancement.
Sec. 106. Transmission Infrastructure Expansion.
Sec. 107. Authorization of appropriations.

TITLE II—ENERGY STORAGE AND DISTRIBUTION

Sec. 201. Energy Storage Research and Deployment.
Sec. 202. Battery Technology Innovation.
Sec. 203. Hydrogen Infrastructure Development.
Sec. 204. Distributed Energy Resources Integration.
Sec. 205. Authorization of appropriations.

TITLE III—CRITICAL ENERGY INFRASTRUCTURE

Sec. 301. Critical Energy Infrastructure Protection.
Sec. 302. Cybersecurity for Energy Delivery Systems.
Sec. 303. Physical Security Enhancement.
Sec. 304. Energy Infrastructure Workforce Development.
Sec. 305. Authorization of appropriations.
`,
}

// Data for bill generation
const policyAreas = [
  "Agriculture and Food",
  "Armed Forces and National Security",
  "Civil Rights and Liberties",
  "Commerce",
  "Communications",
  "Congress",
  "Crime and Law Enforcement",
  "Economics and Public Finance",
  "Education",
  "Emergency Management",
  "Energy",
  "Environmental Protection",
  "Families",
  "Finance and Financial Sector",
  "Foreign Trade and International Finance",
  "Government Operations and Politics",
  "Health",
  "Housing and Community Development",
  "Immigration",
  "International Affairs",
  "Labor and Employment",
  "Native Americans",
  "Public Lands and Natural Resources",
  "Science, Technology, Communications",
  "Social Welfare",
  "Sports and Recreation",
  "Taxation",
  "Transportation and Public Works",
  "Water Resources Development",
]

const houseCommittees = [
  "House Agriculture",
  "House Appropriations",
  "House Armed Services",
  "House Budget",
  "House Education and the Workforce",
  "House Energy and Commerce",
  "House Ethics",
  "House Financial Services",
  "House Foreign Affairs",
  "House Homeland Security",
  "House Intelligence",
  "House Judiciary",
  "House Natural Resources",
  "House Oversight and Accountability",
  "House Rules",
  "House Science, Space, and Technology",
  "House Small Business",
  "House Transportation and Infrastructure",
  "House Veterans' Affairs",
  "House Ways and Means",
]

const senateCommittees = [
  "Senate Agriculture, Nutrition, and Forestry",
  "Senate Appropriations",
  "Senate Armed Services",
  "Senate Banking, Housing, and Urban Affairs",
  "Senate Budget",
  "Senate Commerce, Science, and Transportation",
  "Senate Energy and Natural Resources",
  "Senate Environment and Public Works",
  "Senate Finance",
  "Senate Foreign Relations",
  "Senate Health, Education, Labor, and Pensions",
  "Senate Homeland Security and Governmental Affairs",
  "Senate Indian Affairs",
  "Senate Intelligence",
  "Senate Judiciary",
  "Senate Rules and Administration",
  "Senate Small Business and Entrepreneurship",
  "Senate Veterans' Affairs",
]

const houseSponsors = [
  "Rep. Johnson, Eddie Bernice (D-TX-30)",
  "Rep. Ocasio-Cortez, Alexandria (D-NY-14)",
  "Rep. Williams, Roger (R-TX-25)",
  "Rep. Castor, Kathy (D-FL-14)",
  "Rep. Pallone, Frank (D-NJ-6)",
  "Rep. Takano, Mark (D-CA-41)",
  "Rep. McCaul, Michael (R-TX-10)",
  "Rep. Rogers, Mike (R-AL-3)",
  "Rep. DeFazio, Peter (D-OR-4)",
  "Rep. Pelosi, Nancy (D-CA-11)",
  "Rep. McCarthy, Kevin (R-CA-20)",
  "Rep. Scalise, Steve (R-LA-1)",
  "Rep. Clyburn, James E. (D-SC-6)",
  "Rep. Jeffries, Hakeem (D-NY-8)",
  "Rep. Cheney, Liz (R-WY-At Large)",
  "Rep. Jordan, Jim (R-OH-4)",
  "Rep. Schiff, Adam (D-CA-28)",
  "Rep. Nadler, Jerrold (D-NY-10)",
  "Rep. Jayapal, Pramila (D-WA-7)",
  "Rep. Greene, Marjorie Taylor (R-GA-14)",
  "Rep. Gaetz, Matt (R-FL-1)",
  "Rep. Omar, Ilhan (D-MN-5)",
  "Rep. Pressley, Ayanna (D-MA-7)",
  "Rep. Tlaib, Rashida (D-MI-12)",
  "Rep. Crenshaw, Dan (R-TX-2)",
]

const senateSponsors = [
  "Sen. Warnock, Raphael (D-GA)",
  "Sen. Warner, Mark (D-VA)",
  "Sen. Wyden, Ron (D-OR)",
  "Sen. Cantwell, Maria (D-WA)",
  "Sen. Murray, Patty (D-WA)",
  "Sen. Schumer, Charles (D-NY)",
  "Sen. McConnell, Mitch (R-KY)",
  "Sen. Durbin, Richard (D-IL)",
  "Sen. Thune, John (R-SD)",
  "Sen. Warren, Elizabeth (D-MA)",
  "Sen. Sanders, Bernie (I-VT)",
  "Sen. Cruz, Ted (R-TX)",
  "Sen. Rubio, Marco (R-FL)",
  "Sen. Klobuchar, Amy (D-MN)",
  "Sen. Booker, Cory (D-NJ)",
  "Sen. Hawley, Josh (R-MO)",
  "Sen. Cotton, Tom (R-AR)",
  "Sen. Gillibrand, Kirsten (D-NY)",
  "Sen. Manchin, Joe (D-WV)",
  "Sen. Romney, Mitt (R-UT)",
]

// Function to generate a date within a specific range
function generateDateInRange(startDate: Date, endDate: Date) {
  const timestamp = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime())
  const date = new Date(timestamp)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

// Function to generate dates for different bill categories
function generateBillDate(type: "introduced" | "active" | "passed" | "enacted") {
  // Current date is April 28, 2025
  const currentDate = new Date(2025, 3, 28)

  // Different date ranges for different bill types
  switch (type) {
    case "introduced":
      // Most recent: last 30 days
      const introStart = new Date(currentDate)
      introStart.setDate(currentDate.getDate() - 30)
      return generateDateInRange(introStart, currentDate)

    case "active":
      // 30-90 days ago
      const activeStart = new Date(currentDate)
      activeStart.setDate(currentDate.getDate() - 90)
      const activeEnd = new Date(currentDate)
      activeEnd.setDate(currentDate.getDate() - 30)
      return generateDateInRange(activeStart, activeEnd)

    case "passed":
      // 90-180 days ago
      const passedStart = new Date(currentDate)
      passedStart.setDate(currentDate.getDate() - 180)
      const passedEnd = new Date(currentDate)
      passedEnd.setDate(currentDate.getDate() - 90)
      return generateDateInRange(passedStart, passedEnd)

    case "enacted":
      // 180-365 days ago
      const enactedStart = new Date(currentDate)
      enactedStart.setDate(currentDate.getDate() - 365)
      const enactedEnd = new Date(currentDate)
      enactedEnd.setDate(currentDate.getDate() - 180)
      return generateDateInRange(enactedStart, enactedEnd)
  }
}

// Function to generate random committees
function generateCommittees(chamber: "House" | "Senate", count = 1) {
  const committees = chamber === "House" ? houseCommittees : senateCommittees
  const result = []

  for (let i = 0; i < count && i < committees.length; i++) {
    const randomIndex = Math.floor(Math.random() * committees.length)
    if (!result.includes(committees[randomIndex])) {
      result.push(committees[randomIndex])
    } else {
      i-- // Try again if we got a duplicate
    }
  }

  return result
}

// Function to generate a random last action based on bill status
function generateLastAction(status: string, chamber: "House" | "Senate") {
  const actions = {
    Introduced: [
      `Referred to the ${chamber} Committee on ${chamber === "House" ? houseCommittees[Math.floor(Math.random() * houseCommittees.length)].replace("House ", "") : senateCommittees[Math.floor(Math.random() * senateCommittees.length)].replace("Senate ", "")}.`,
      `Read ${chamber === "Senate" ? "twice and " : ""}referred to the Committee on ${chamber === "House" ? houseCommittees[Math.floor(Math.random() * houseCommittees.length)].replace("House ", "") : senateCommittees[Math.floor(Math.random() * senateCommittees.length)].replace("Senate ", "")}.`,
      `Introduced in ${chamber}.`,
    ],
    "Committee Consideration": [
      `Hearings held by the ${chamber} Committee on ${chamber === "House" ? houseCommittees[Math.floor(Math.random() * houseCommittees.length)].replace("House ", "") : senateCommittees[Math.floor(Math.random() * senateCommittees.length)].replace("Senate ", "")}.`,
      `Markup completed by the ${chamber} Committee on ${chamber === "House" ? houseCommittees[Math.floor(Math.random() * houseCommittees.length)].replace("House ", "") : senateCommittees[Math.floor(Math.random() * senateCommittees.length)].replace("Senate ", "")}.`,
      `Committee on ${chamber === "House" ? houseCommittees[Math.floor(Math.random() * houseCommittees.length)].replace("House ", "") : senateCommittees[Math.floor(Math.random() * senateCommittees.length)].replace("Senate ", "")}. Hearings held.`,
      `Ordered to be reported by the ${chamber} Committee on ${chamber === "House" ? houseCommittees[Math.floor(Math.random() * houseCommittees.length)].replace("House ", "") : senateCommittees[Math.floor(Math.random() * senateCommittees.length)].replace("Senate ", "")}.`,
    ],
    "Passed House": [
      "Received in the Senate and referred to the Committee on Finance.",
      "Passed House by voice vote.",
      "Passed House by Yea-Nay Vote: 256 - 178.",
      "Passed House by recorded vote: 234 - 193, 8 Present.",
    ],
    "Passed Senate": [
      "Received in the House and referred to the Committee on Energy and Commerce.",
      "Passed Senate by voice vote.",
      "Passed Senate by Yea-Nay Vote: 68 - 32.",
      "Passed Senate with an amendment by 72 - 28.",
    ],
    "Passed House and Senate": [
      "Resolving differences -- House actions.",
      "Passed Senate with amendments by Yea-Nay Vote. 68 - 32.",
      "Conference report agreed to in House by 245 - 187.",
      "Presented to President.",
    ],
    Enacted: [
      "Became Public Law No: 118-45.",
      "Signed by President.",
      "Became Public Law No: 118-44.",
      "Became Public Law No: 118-43.",
    ],
  }

  const actionOptions = actions[status as keyof typeof actions] || ["Status updated."]
  return actionOptions[Math.floor(Math.random() * actionOptions.length)]
}

// Function to generate bills with consistent order and get the 10 most recent
export function generateBills(type: "introduced" | "active" | "passed" | "enacted", count: number) {
  // Create an array to hold our bills
  const bills = []

  // Get all available bill IDs from billTexts
  const availableBillIds = Object.keys(billTexts)

  // Filter bills based on type
  // For this example, we'll use a simple pattern to determine bill type:
  // - hr96xx and s51xx for introduced
  // - hr94xx and s50xx for active
  // - hr93xx and s52xx for passed
  // - hr97xx and s53xx for enacted
  let filteredBillIds: string[] = []

  switch (type) {
    case "introduced":
      filteredBillIds = availableBillIds.filter((id) => id.startsWith("hr96") || id.startsWith("s51"))
      break
    case "active":
      filteredBillIds = availableBillIds.filter((id) => id.startsWith("hr94") || id.startsWith("s50"))
      break
    case "passed":
      filteredBillIds = availableBillIds.filter((id) => id.startsWith("hr93") || id.startsWith("s52"))
      break
    case "enacted":
      filteredBillIds = availableBillIds.filter(
        (id) => id.startsWith("hr97") || id.startsWith("s53") || id.startsWith("hr98"),
      )
      break
  }

  // If we don't have enough bills of the specific type, add some from other types
  if (filteredBillIds.length < count) {
    const remainingBillIds = availableBillIds.filter((id) => !filteredBillIds.includes(id))
    filteredBillIds = [...filteredBillIds, ...remainingBillIds.slice(0, count - filteredBillIds.length)]
  }

  // Take only the number of bills requested
  filteredBillIds = filteredBillIds.slice(0, count)

  // Generate bill data for each ID
  for (const billId of filteredBillIds) {
    const billText = billTexts[billId]
    const billTitle = billText.trim().split("\n")[0].trim()

    // Determine chamber based on bill ID
    const chamber = billId.startsWith("hr") ? "House" : "Senate"

    // Generate bill number from ID
    const billNumber = billId.startsWith("hr") ? `H.R. ${billId.substring(2)}` : `S. ${billId.substring(1)}`

    // Determine status based on type
    let status
    if (type === "passed") {
      status = chamber === "House" ? "Passed House" : "Passed Senate"
      if (Number.parseInt(billId.substring(2)) % 5 === 0) status = "Passed House and Senate"
    } else {
      status = type === "introduced" ? "Introduced" : type === "active" ? "Committee Consideration" : "Enacted"
    }

    // Generate sponsor party
    const sponsorParty =
      Number.parseInt(billId.substring(2)) % 10 < 7 ? "D" : Number.parseInt(billId.substring(2)) % 10 === 7 ? "I" : "R"

    // Generate committees
    const committeeCount = 1 + (Number.parseInt(billId.substring(2)) % 3)
    const committees = generateCommittees(chamber, committeeCount)

    // Generate date
    const date = generateBillDate(type)

    // Select sponsor
    const sponsorList = chamber === "House" ? houseSponsors : senateSponsors
    const sponsorIndex = Number.parseInt(billId.substring(2)) % sponsorList.length
    const sponsor = sponsorList[sponsorIndex]

    // Generate policy area
    const policyAreaIndex = Number.parseInt(billId.substring(2)) % policyAreas.length
    const policyArea = policyAreas[policyAreaIndex]

    // Generate description and last action
    const description = `To ${billTitle.toLowerCase().includes("act") ? "implement" : "establish"} comprehensive reforms and improvements in ${policyArea.toLowerCase()}.`
    const lastAction = generateLastAction(status, chamber)

    bills.push({
      id: billId,
      number: billNumber,
      title: billTitle,
      description: description,
      date: date,
      sponsor: sponsor,
      sponsorParty: sponsorParty,
      chamber: chamber,
      status: status,
      lastAction: lastAction,
      policyArea: policyArea,
      committees: committees,
    })
  }

  // Sort bills by date (most recent first)
  bills.sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return dateB.getTime() - dateA.getTime()
  })

  return bills
}
