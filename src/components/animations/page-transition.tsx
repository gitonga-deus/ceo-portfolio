"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface PageTransitionProps {
	children: ReactNode
	className?: string
}

export function PageTransition({ children, className = "" }: PageTransitionProps) {
	return (
		<motion.div
			className={className}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{
				duration: 0.4,
				ease: [0.25, 0.25, 0, 1]
			}}
		>
			{children}
		</motion.div>
	)
}

export function SlideIn({ 
	children, 
	className = "",
	direction = "right"
}: {
	children: ReactNode
	className?: string
	direction?: "left" | "right" | "up" | "down"
}) {
	const directionOffset = {
		left: { x: -100 },
		right: { x: 100 },
		up: { y: -100 },
		down: { y: 100 }
	}

	return (
		<motion.div
			className={className}
			initial={{ 
				opacity: 0, 
				...directionOffset[direction]
			}}
			animate={{ 
				opacity: 1, 
				x: 0, 
				y: 0 
			}}
			exit={{ 
				opacity: 0, 
				...directionOffset[direction]
			}}
			transition={{
				duration: 0.5,
				ease: [0.25, 0.25, 0, 1]
			}}
		>
			{children}
		</motion.div>
	)
}
