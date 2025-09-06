"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface StaggerContainerProps {
	children: ReactNode
	className?: string
	staggerDelay?: number
}

export function StaggerContainer({ 
	children, 
	className = "",
	staggerDelay = 0.1
}: StaggerContainerProps) {
	return (
		<motion.div
			className={className}
			initial="hidden"
			animate="visible"
			variants={{
				hidden: { opacity: 0 },
				visible: {
					opacity: 1,
					transition: {
						staggerChildren: staggerDelay
					}
				}
			}}
		>
			{children}
		</motion.div>
	)
}

export function StaggerItem({ 
	children, 
	className = "",
	direction = "up"
}: {
	children: ReactNode
	className?: string
	direction?: "up" | "down" | "left" | "right"
}) {
	const directionOffset = {
		up: { y: 40, x: 0 },
		down: { y: -40, x: 0 },
		left: { y: 0, x: 40 },
		right: { y: 0, x: -40 }
	}

	return (
		<motion.div
			className={className}
			variants={{
				hidden: { 
					opacity: 0, 
					...directionOffset[direction]
				},
				visible: {
					opacity: 1,
					y: 0,
					x: 0,
					transition: {
						duration: 0.6,
						ease: [0.25, 0.25, 0, 1]
					}
				}
			}}
		>
			{children}
		</motion.div>
	)
}
