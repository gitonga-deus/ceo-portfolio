import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
	console.log("🌱 Starting minimal database seeding...")

	// Create admin user only
	console.log("👤 Creating admin user...")

	// Check if admin already exists
	const existingAdmin = await prisma.user.findUnique({
		where: { email: "admin@example.com" }
	})

	if (existingAdmin) {
		console.log("ℹ️ Admin user already exists, skipping...")
	} else {
		const hashedPassword = await bcrypt.hash("admin123", 12)
		await prisma.user.create({
			data: {
				email: "admin@example.com",
				password: hashedPassword,
				name: "Admin User",
				role: "ADMIN",
			},
		})
		console.log("✅ Admin user created successfully!")
	}

	// Create a basic category
	console.log("📂 Creating basic category...")
	const category = await prisma.category.upsert({
		where: { slug: "general" },
		update: {},
		create: {
			name: "General",
			slug: "general",
			description: "General posts and updates",
		},
	})

	// Create a basic tag
	console.log("🏷️ Creating basic tag...")
	const tag = await prisma.tag.upsert({
		where: { slug: "announcement" },
		update: {},
		create: {
			name: "Announcement",
			slug: "announcement",
		},
	})

	console.log("✅ Minimal seeding completed!")
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
