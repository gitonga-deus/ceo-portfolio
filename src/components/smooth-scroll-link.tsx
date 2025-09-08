"use client"

import Link from "next/link"
import { ReactNode } from "react"

interface SmoothScrollLinkProps {
	href: string
	children: ReactNode
	className?: string
}

export function SmoothScrollLink({ href, children, className }: SmoothScrollLinkProps) {
	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		if (href.startsWith("#")) {
			e.preventDefault()
			const targetId = href.substring(1) // Remove "#"
			const targetElement = document.getElementById(targetId)
			if (targetElement) {
				targetElement.scrollIntoView({
					behavior: "smooth",
					block: "start",
				})
			}
		}
	}

	return (
		<Link href={href} onClick={handleClick} className={className}>
			{children}
		</Link>
	)
}
