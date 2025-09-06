"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface HoverScaleProps {
	children: ReactNode
	className?: string
	scale?: number
	duration?: number
}

export function HoverScale({ 
	children, 
	className = "",
	scale = 1.05,
	duration = 0.2
}: HoverScaleProps) {
	return (
		<motion.div
			className={className}
			whileHover={{ 
				scale,
				transition: { duration }
			}}
			whileTap={{ scale: 0.95 }}
		>
			{children}
		</motion.div>
	)
}

export function HoverLift({ 
	children, 
	className = "",
	y = -8,
	duration = 0.2
}: {
	children: ReactNode
	className?: string
	y?: number
	duration?: number
}) {
	return (
		<motion.div
			className={className}
			whileHover={{ 
				y,
				transition: { duration }
			}}
		>
			{children}
		</motion.div>
	)
}
