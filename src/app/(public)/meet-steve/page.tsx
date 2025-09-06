"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building2, Users, TrendingUp, Award, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { PageTransition } from "@/components/animations/page-transition"

const skills = [
	"Strategic Planning",
	"Business Development",
	"Team Leadership",
	"Product Management",
	"Financial Planning",
	"Market Analysis",
	"Innovation",
	"Scaling Operations",
	"Investor Relations",
]

const achievements = [
	{
		icon: Building2,
		number: "5+",
		label: "Companies Founded",
		description: "Successfully built and scaled multiple businesses"
	},
	{
		icon: Users,
		number: "200+",
		label: "Team Members",
		description: "Talented professionals hired and mentored"
	},
	{
		icon: TrendingUp,
		number: "$50M+",
		label: "Revenue Generated",
		description: "Combined revenue across portfolio companies"
	},
	{
		icon: Award,
		number: "10+",
		label: "Years Experience",
		description: "Decade of entrepreneurial leadership"
	}
]

export default function MeetStevePage() {
	return (
		<PageTransition>
			<div className="min-h-screen">
				{/* Hero Section */}
				<section className="relative overflow-hidden bg-white" aria-labelledby="about-hero-heading">
					<div className="mx-auto max-w-6xl pt-10 pb-8 md:pt-10 md:pb-16">
						<div className="grid items-center gap-10 md:grid-cols-12">
							{/* Left: Text */}
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6 }}
								className="md:col-span-6 lg:pr-6"
							>
								<motion.h1
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0.2 }}
									id="about-hero-heading"
									className="text-4xl font-extrabold leading-tight tracking-tight md:text-5xl"
								>
									Meet <span className="text-primary">Steve</span>
								</motion.h1>
								<motion.p
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0.3 }}
									className="mt-4 max-w-prose text-base leading-7 text-muted-foreground md:text-lg md:leading-8"
								>
									Entrepreneur, innovator, and passionate business builder with over a decade of experience creating companies that matter.
								</motion.p>

								{/* CTA Buttons */}
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0.5 }}
									className="mt-8 flex flex-col sm:flex-row gap-4"
								>
									<Button asChild size="lg" className="px-8">
										<Link href="/companies">
											View My Companies <ArrowRight className="ml-2 h-5 w-5" />
										</Link>
									</Button>
									<Button asChild variant="outline" size="lg" className="px-8">
										<Link href="/blog">Read My Blog</Link>
									</Button>
								</motion.div>
							</motion.div>

							{/* Right: Square portrait card */}
							<motion.div
								initial={{ opacity: 0, x: 30 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.7, delay: 0.3 }}
								className="relative md:col-span-6"
							>
								{/* Main square portrait card */}
								<motion.figure
									initial={{ opacity: 0, rotate: -2 }}
									whileInView={{ opacity: 1, rotate: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.8, delay: 0.3 }}
									className="overflow-hidden rounded-lg aspect-auto border bg-background p-2 shadow-sm"
								>
									<div className="relative aspect-square overflow-hidden rounded">
										<Image
											src="/placeholder.svg"
											alt="Steve Down portrait"
											width={720}
											height={360}
											className="object-cover"
											priority
										/>
									</div>
								</motion.figure>
							</motion.div>
						</div>
					</div>
				</section>

				{/* Achievements Section */}
				<section className="py-20 px-4 bg-muted/20">
					<div className="container max-w-6xl mx-auto">
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
							className="grid grid-cols-2 lg:grid-cols-4 gap-8"
						>
							{achievements.map((achievement, index) => {
								const Icon = achievement.icon
								return (
									<motion.div
										key={index}
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.6, delay: index * 0.1 }}
									>
										<Card className="text-center rounded-md p-6 border bg-background shadow-none hover:shadow-sm transition-all duration-300">
											<CardContent className=" space-y-4">
												<div className="w-12 h-12 mx-auto flex items-center justify-center">
													<Icon className="h-6 w-6 text-primary" />
												</div>
												<div>
													<div className="font-heading font-black text-3xl text-primary mb-1">
														{achievement.number}
													</div>
													<div className="font-semibold text-sm mb-2">
														{achievement.label}
													</div>
													<div className="text-xs text-muted-foreground text-balance leading-relaxed">
														{achievement.description}
													</div>
												</div>
											</CardContent>
										</Card>
									</motion.div>
								)
							})}
						</motion.div>
					</div>
				</section>

				{/* Story Section */}
				<section className="py-20 px-4 bg-white">
					<div className="container max-w-4xl mx-auto">
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
							className="text-center mb-12"
						>
							<h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">My Story</h2>
							<p className="text-lg text-muted-foreground">
								The journey of building companies that create meaningful impact
							</p>
						</motion.div>

						<div className="">
							<motion.div
								initial={{ opacity: 0, x: -30 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: 0.2 }}
								className="space-y-6"
							>
								<p className="text-lg leading-relaxed">
									I've always been fascinated by the intersection of technology, business, and human potential. My journey began over a decade ago when I founded my first company straight out of college.
								</p>
								<p className="text-lg leading-relaxed">
									Since then, I've had the privilege of building multiple successful companies across various industries, from fintech to healthcare technology.
								</p>
							</motion.div>
							<motion.div
								initial={{ opacity: 0, x: 30 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: 0.4 }}
								className="space-y-6"
							>
								<p className="text-lg leading-relaxed">
									Today, I focus on identifying emerging market opportunities and building companies that can scale to make a significant impact.
								</p>
								<p className="text-lg leading-relaxed">
									When I'm not building companies, you'll find me mentoring other entrepreneurs, writing about business and innovation, or exploring new technologies.
								</p>
							</motion.div>
						</div>
					</div>
				</section>

				{/* Skills Section */}
				<section className="py-20 px-4 bg-muted/20">
					<div className="container max-w-5xl mx-auto">
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
							className="text-center mb-8"
						>
							<h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">Core Expertise</h2>
							<p className="text-lg text-muted-foreground">
								Skills and competencies developed through years of entrepreneurial experience
							</p>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className="flex flex-wrap justify-center gap-3"
						>
							{skills.map((skill, index) => (
								<motion.div
									key={skill}
									initial={{ opacity: 0, scale: 0.8 }}
									whileInView={{ opacity: 1, scale: 1 }}
									viewport={{ once: true }}
									transition={{ duration: 0.4, delay: index * 0.05 }}
								>
									<Badge
										variant="outline"
										className="text-sm py-2 px-6 rounded-xl transition-colors cursor-default border"
									>
										{skill}
									</Badge>
								</motion.div>
							))}
						</motion.div>
					</div>
				</section>


			</div>
		</PageTransition>
	)
}
