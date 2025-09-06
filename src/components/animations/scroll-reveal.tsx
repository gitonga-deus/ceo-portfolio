"use client"

import { motion, useInView } from "framer-motion"
import { ReactNode, useRef } from "react"

interface ScrollRevealProps {
	children: ReactNode
	className?: string
	delay?: number
	duration?: number
	direction?: "up" | "down" | "left" | "right"
	threshold?: number
	once?: boolean
}

export function ScrollReveal({
	children,
	className = "",
	delay = 0,
	duration = 0.6,
	direction = "up",
	threshold = 0.1,
	once = true
}: ScrollRevealProps) {
	const ref = useRef(null)
	const isInView = useInView(ref, {
		amount: threshold,
		once
	})

	const directionOffset = {
		up: { y: 60, x: 0 },
		down: { y: -60, x: 0 },
		left: { y: 0, x: 60 },
		right: { y: 0, x: -60 }
	}

	return (
		<motion.div
			ref={ref}
			className={className}
			initial={{
				opacity: 0,
				...directionOffset[direction]
			}}
			animate={isInView ? {
				opacity: 1,
				y: 0,
				x: 0
			} : {
				opacity: 0,
				...directionOffset[direction]
			}}
			transition={{
				duration,
				delay,
				ease: [0.25, 0.25, 0, 1]
			}}
		>
			{children}
		</motion.div>
	)
}
