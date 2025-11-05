import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
    console.log("🌱 Starting database seeding...")

    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log("🧹 Cleaning existing data...")
    await prisma.blogPostTag.deleteMany()
    await prisma.blogPost.deleteMany()
    await prisma.tag.deleteMany()
    await prisma.category.deleteMany()
    await prisma.newsletterSubscriber.deleteMany()
    await prisma.emailCampaign.deleteMany()
    await prisma.user.deleteMany()

    // Create admin user
    console.log("👤 Creating admin user...")
    const hashedPassword = await bcrypt.hash("admin123", 12)
    const adminUser = await prisma.user.create({
        data: {
            email: "admin@example.com",
            password: hashedPassword,
            name: "Admin User",
            role: "ADMIN",
        },
    })
    
//     // Create categories
//     console.log("📂 Creating categories...")
//     const categories = await Promise.all([
//         prisma.category.create({
//             data: {
//                 name: "Technology",
//                 slug: "technology",
//                 description: "Latest trends and insights in technology",
//             },
//         }),
//         prisma.category.create({
//             data: {
//                 name: "Business",
//                 slug: "business",
//                 description: "Business strategies and entrepreneurship",
//             },
//         }),
//         prisma.category.create({
//             data: {
//                 name: "Leadership",
//                 slug: "leadership",
//                 description: "Leadership insights and management tips",
//             },
//         }),
//         prisma.category.create({
//             data: {
//                 name: "Innovation",
//                 slug: "innovation",
//                 description: "Innovation and creative thinking",
//             },
//         }),
//     ])

//     // Create tags
//     console.log("🏷️ Creating tags...")
//     const tags = await Promise.all([
//         prisma.tag.create({ data: { name: "AI", slug: "ai" } }),
//         prisma.tag.create({ data: { name: "Machine Learning", slug: "machine-learning" } }),
//         prisma.tag.create({ data: { name: "Startup", slug: "startup" } }),
//         prisma.tag.create({ data: { name: "Strategy", slug: "strategy" } }),
//         prisma.tag.create({ data: { name: "Team Building", slug: "team-building" } }),
//         prisma.tag.create({ data: { name: "Digital Transformation", slug: "digital-transformation" } }),
//         prisma.tag.create({ data: { name: "Remote Work", slug: "remote-work" } }),
//         prisma.tag.create({ data: { name: "Productivity", slug: "productivity" } }),
//     ])

//     // Create blog posts
//     console.log("📝 Creating blog posts...")
//     const blogPosts = [
//         {
//             title: "The Future of AI in Business",
//             slug: "future-of-ai-in-business",
//             content: `# The Future of AI in Business

// Artificial Intelligence is revolutionizing the way we do business. From automating routine tasks to providing deep insights through data analysis, AI is becoming an indispensable tool for modern enterprises.

// ## Key Areas of Impact

// ### 1. Customer Service
// AI-powered chatbots and virtual assistants are transforming customer service by providing 24/7 support and instant responses to common queries.

// ### 2. Data Analysis
// Machine learning algorithms can process vast amounts of data to identify patterns and trends that would be impossible for humans to detect.

// ### 3. Process Automation
// Robotic Process Automation (RPA) is streamlining business processes and reducing operational costs.

// ## Challenges and Considerations

// While AI offers tremendous opportunities, businesses must also consider:
// - Data privacy and security
// - Ethical implications
// - Employee training and adaptation
// - Integration with existing systems

// The future belongs to organizations that can successfully integrate AI while maintaining human-centered values.`,
//             excerpt: "Exploring how artificial intelligence is transforming modern business operations and what the future holds.",
//             published: true,
//             publishedAt: new Date("2024-01-15"),
//             authorId: adminUser.id,
//             categoryId: categories[0].id, // Technology
//             tagIds: [tags[0].id, tags[1].id], // AI, Machine Learning
//         },
//         {
//             title: "Building High-Performance Teams in Remote Environments",
//             slug: "building-high-performance-teams-remote",
//             content: `# Building High-Performance Teams in Remote Environments

// The shift to remote work has fundamentally changed how we build and manage teams. Success in this new environment requires intentional strategies and tools.

// ## Essential Elements

// ### Communication
// Clear, frequent communication is the foundation of remote team success. Establish regular check-ins and use multiple communication channels.

// ### Trust and Autonomy
// Remote teams thrive when members have autonomy and trust each other to deliver results.

// ### Technology Stack
// Invest in the right tools for collaboration, project management, and communication.

// ## Best Practices

// 1. Set clear expectations and goals
// 2. Foster informal interactions
// 3. Provide regular feedback
// 4. Celebrate achievements
// 5. Invest in team development

// Remote work isn't just about working from home—it's about creating a culture that enables people to do their best work regardless of location.`,
//             excerpt: "Strategies for creating and managing high-performance teams in remote work environments.",
//             published: true,
//             publishedAt: new Date("2024-01-10"),
//             authorId: editorUser.id,
//             categoryId: categories[2].id, // Leadership
//             tagIds: [tags[4].id, tags[6].id], // Team Building, Remote Work
//         },
//         {
//             title: "Digital Transformation: A CEO's Guide",
//             slug: "digital-transformation-ceo-guide",
//             content: `# Digital Transformation: A CEO's Guide

// Digital transformation is not just about technology—it's about reimagining how your organization creates value in the digital age.

// ## The Strategic Imperative

// In today's rapidly evolving business landscape, digital transformation has become a strategic imperative rather than a nice-to-have initiative.

// ## Key Success Factors

// ### Leadership Commitment
// Transformation starts at the top. CEOs must champion the change and allocate necessary resources.

// ### Customer-Centric Approach
// Put customer needs at the center of your transformation strategy.

// ### Cultural Change
// Technology is only as good as the people using it. Invest in change management and training.

// ### Data-Driven Decisions
// Use data and analytics to guide your transformation journey.

// ## Common Pitfalls to Avoid

// - Focusing only on technology without considering people and processes
// - Underestimating the time and resources required
// - Lack of clear vision and strategy
// - Resistance to change

// Success requires a holistic approach that addresses technology, people, and processes simultaneously.`,
//             excerpt: "A comprehensive guide for CEOs navigating digital transformation initiatives.",
//             published: true,
//             publishedAt: new Date("2024-01-05"),
//             authorId: adminUser.id,
//             categoryId: categories[1].id, // Business
//             tagIds: [tags[3].id, tags[5].id], // Strategy, Digital Transformation
//         },
//         {
//             title: "Innovation Culture: How to Foster Creativity in Your Organization",
//             slug: "innovation-culture-foster-creativity",
//             content: `# Innovation Culture: How to Foster Creativity in Your Organization

// Creating a culture of innovation is essential for long-term business success. Here's how to build an environment where creativity thrives.

// ## The Innovation Mindset

// Innovation isn't just about having great ideas—it's about creating systems and processes that consistently generate, evaluate, and implement new solutions.

// ## Building Blocks of Innovation Culture

// ### Psychological Safety
// People need to feel safe to share ideas, take risks, and even fail without fear of punishment.

// ### Diverse Perspectives
// Innovation thrives when diverse voices and perspectives are included in the conversation.

// ### Time and Resources
// Allocate dedicated time and resources for experimentation and exploration.

// ### Recognition and Rewards
// Celebrate both successes and intelligent failures that lead to learning.

// ## Practical Steps

// 1. Create innovation time (like Google's 20% time)
// 2. Establish cross-functional innovation teams
// 3. Implement idea management systems
// 4. Provide innovation training and workshops
// 5. Partner with external innovators and startups

// Remember: Innovation is not a destination but a continuous journey of improvement and adaptation.`,
//             excerpt: "Practical strategies for building and maintaining a culture of innovation in your organization.",
//             published: false, // Draft post
//             authorId: editorUser.id,
//             categoryId: categories[3].id, // Innovation
//             tagIds: [tags[3].id, tags[4].id], // Strategy, Team Building
//         },
//     ]

//     for (const postData of blogPosts) {
//         const { tagIds, ...postWithoutTags } = postData
//         const post = await prisma.blogPost.create({
//             data: postWithoutTags,
//         })

//         // Create blog post tags
//         for (const tagId of tagIds) {
//             await prisma.blogPostTag.create({
//                 data: {
//                     blogPostId: post.id,
//                     tagId: tagId,
//                 },
//             })
//         }
//     }

//     // Create newsletter subscribers
//     console.log("📧 Creating newsletter subscribers...")
//     await Promise.all([
//         prisma.newsletterSubscriber.create({
//             data: {
//                 email: "subscriber1@example.com",
//                 name: "John Doe",
//                 status: "ACTIVE",
//             },
//         }),
//         prisma.newsletterSubscriber.create({
//             data: {
//                 email: "subscriber2@example.com",
//                 name: "Jane Smith",
//                 status: "ACTIVE",
//             },
//         }),
//         prisma.newsletterSubscriber.create({
//             data: {
//                 email: "unsubscribed@example.com",
//                 name: "Former Subscriber",
//                 status: "UNSUBSCRIBED",
//                 unsubscribedAt: new Date(),
//             },
//         }),
//     ])

//     // Create email campaigns
//     console.log("📬 Creating email campaigns...")
//     await Promise.all([
//         prisma.emailCampaign.create({
//             data: {
//                 subject: "Welcome to Our Newsletter!",
//                 content: "Thank you for subscribing to our newsletter. Stay tuned for exciting updates!",
//                 htmlContent: "<h1>Welcome!</h1><p>Thank you for subscribing to our newsletter. Stay tuned for exciting updates!</p>",
//                 status: "SENT",
//                 sentAt: new Date("2024-01-01"),
//                 recipientCount: 100,
//                 openCount: 75,
//                 clickCount: 25,
//             },
//         }),
//         prisma.emailCampaign.create({
//             data: {
//                 subject: "Monthly Business Insights - January 2024",
//                 content: "Here are the top business insights for this month...",
//                 htmlContent: "<h1>Monthly Business Insights</h1><p>Here are the top business insights for this month...</p>",
//                 status: "DRAFT",
//                 recipientCount: 0,
//                 openCount: 0,
//                 clickCount: 0,
//             },
//         }),
//     ])

    console.log("✅ Database seeding completed successfully!")
    console.log("\n📊 Summary:")
    console.log(`- Created ${await prisma.user.count()} users`)
    // console.log(`- Created ${await prisma.category.count()} categories`)
    // console.log(`- Created ${await prisma.tag.count()} tags`)
    // console.log(`- Created ${await prisma.blogPost.count()} blog posts`)
    // console.log(`- Created ${await prisma.newsletterSubscriber.count()} newsletter subscribers`)
    // console.log(`- Created ${await prisma.emailCampaign.count()} email campaigns`)

    console.log("\n🔑 Login Credentials:")
    console.log("Admin: admin@example.com / admin123")
}

main()
    .catch((e) => {
        console.error("❌ Error during seeding:", e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })