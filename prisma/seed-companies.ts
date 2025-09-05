import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedCompanies() {
  console.log('Seeding companies...')

  const companies = [
    {
      name: "TechFlow Solutions",
      slug: "techflow-solutions",
      description: "AI-powered workflow automation platform helping businesses streamline their operations and increase productivity through intelligent process optimization.",
      industry: "SaaS",
      status: "ACTIVE" as const,
      founded: "2022",
      website: "https://techflow.example.com",
      featured: true,
      sortOrder: 1,
    },
    {
      name: "HealthBridge Analytics",
      slug: "healthbridge-analytics",
      description: "Healthcare data analytics platform that helps medical professionals make better patient care decisions through advanced data visualization and predictive analytics.",
      industry: "HealthTech",
      status: "ACTIVE" as const,
      founded: "2021",
      website: "https://healthbridge.example.com",
      featured: true,
      sortOrder: 2,
    },
    {
      name: "GreenEnergy Ventures",
      slug: "greenenergy-ventures",
      description: "Renewable energy solutions for commercial and residential properties, focusing on solar and wind power installations with smart grid integration.",
      industry: "CleanTech",
      status: "ACTIVE" as const,
      founded: "2020",
      website: "https://greenenergy.example.com",
      featured: false,
      sortOrder: 3,
    },
    {
      name: "FinanceFirst",
      slug: "financefirst",
      description: "Digital banking platform that provided innovative financial services to underserved communities before being acquired by a major financial institution.",
      industry: "FinTech",
      status: "ACQUIRED" as const,
      founded: "2018",
      website: null,
      featured: false,
      sortOrder: 4,
    },
    {
      name: "EduTech Innovations",
      slug: "edutech-innovations",
      description: "Online learning platform that revolutionizes education through personalized learning paths and AI-driven content recommendations.",
      industry: "EdTech",
      status: "ACTIVE" as const,
      founded: "2023",
      website: "https://edutech.example.com",
      featured: false,
      sortOrder: 5,
    },
    {
      name: "RetailBot",
      slug: "retailbot",
      description: "E-commerce automation platform that was successfully sold to a major retail technology company after achieving significant market penetration.",
      industry: "E-commerce",
      status: "SOLD" as const,
      founded: "2019",
      website: null,
      featured: false,
      sortOrder: 6,
    }
  ]

  for (const company of companies) {
    await prisma.company.upsert({
      where: { slug: company.slug },
      update: company,
      create: company,
    })
  }

  console.log('Companies seeded successfully!')
}

seedCompanies()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
