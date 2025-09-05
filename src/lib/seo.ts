import type { Metadata } from "next"

interface SEOConfig {
	title?: string
	description?: string
	keywords?: string[]
	image?: string
	url?: string
	type?: "website" | "article" | "profile"
	publishedTime?: string
	modifiedTime?: string
	author?: string
	siteName?: string
	noIndex?: boolean
	canonical?: string
}

const defaultConfig = {
	siteName: "Steve Johnson",
	siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://stevejohnson.com",
	defaultTitle: "Steve Johnson - CEO & Entrepreneur",
	defaultDescription: "Experienced CEO and entrepreneur building innovative companies and sharing insights on business, technology, and leadership.",
	defaultImage: "/og-image.jpg",
	defaultKeywords: ["CEO", "entrepreneur", "business", "technology", "leadership", "innovation", "startup"],
	twitterHandle: "@steve",
	author: "Steve Johnson"
}

export function generateMetadata({
	title,
	description = defaultConfig.defaultDescription,
	keywords = defaultConfig.defaultKeywords,
	image = defaultConfig.defaultImage,
	url,
	type = "website",
	publishedTime,
	modifiedTime,
	author = defaultConfig.author,
	siteName = defaultConfig.siteName,
	noIndex = false,
	canonical,
}: SEOConfig = {}): Metadata {
	const fullTitle = title 
		? (title.includes(defaultConfig.siteName) ? title : `${title} | ${defaultConfig.siteName}`)
		: defaultConfig.defaultTitle

	const fullUrl = url ? `${defaultConfig.siteUrl}${url}` : defaultConfig.siteUrl
	const fullImage = image.startsWith("http") ? image : `${defaultConfig.siteUrl}${image}`

	const metadata: Metadata = {
		title: fullTitle,
		description,
		keywords: keywords.join(", "),
		authors: [{ name: author }],
		creator: author,
		publisher: siteName,
		
		// Open Graph
		openGraph: {
			type: type as any,
			title: fullTitle,
			description,
			url: fullUrl,
			siteName,
			images: [
				{
					url: fullImage,
					width: 1200,
					height: 630,
					alt: fullTitle,
				},
			],
			...(type === "article" && publishedTime && {
				publishedTime,
				...(modifiedTime && { modifiedTime }),
				authors: [author],
			}),
		},

		// Twitter
		twitter: {
			card: "summary_large_image",
			title: fullTitle,
			description,
			images: [fullImage],
			creator: defaultConfig.twitterHandle,
			site: defaultConfig.twitterHandle,
		},

		// Additional
		...(noIndex && { robots: "noindex, nofollow" }),
		...(canonical && { alternates: { canonical } }),

		// Verification and other meta
		other: {
			"theme-color": "#000000",
			"msapplication-TileColor": "#000000",
		},
	}

	return metadata
}

// Structured data generators
export function generatePersonStructuredData() {
	return {
		"@context": "https://schema.org",
		"@type": "Person",
		name: defaultConfig.author,
		jobTitle: "CEO & Entrepreneur",
		description: defaultConfig.defaultDescription,
		url: defaultConfig.siteUrl,
		image: `${defaultConfig.siteUrl}${defaultConfig.defaultImage}`,
		sameAs: [
			"https://linkedin.com/in/steve",
			"https://twitter.com/steve",
			"https://facebook.com/steve",
			"https://youtube.com/@steve"
		],
		worksFor: {
			"@type": "Organization",
			name: "Steve Johnson Companies"
		}
	}
}

export function generateArticleStructuredData({
	title,
	description,
	url,
	image,
	publishedTime,
	modifiedTime,
	author = defaultConfig.author,
}: {
	title: string
	description: string
	url: string
	image?: string
	publishedTime: string
	modifiedTime?: string
	author?: string
}) {
	return {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: title,
		description,
		url: `${defaultConfig.siteUrl}${url}`,
		image: image ? (image.startsWith("http") ? image : `${defaultConfig.siteUrl}${image}`) : `${defaultConfig.siteUrl}${defaultConfig.defaultImage}`,
		datePublished: publishedTime,
		...(modifiedTime && { dateModified: modifiedTime }),
		author: {
			"@type": "Person",
			name: author,
			url: defaultConfig.siteUrl
		},
		publisher: {
			"@type": "Organization",
			name: defaultConfig.siteName,
			logo: {
				"@type": "ImageObject",
				url: `${defaultConfig.siteUrl}/logo.png`
			}
		}
	}
}

export function generateOrganizationStructuredData() {
	return {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: defaultConfig.siteName,
		url: defaultConfig.siteUrl,
		logo: `${defaultConfig.siteUrl}/logo.png`,
		description: defaultConfig.defaultDescription,
		founder: {
			"@type": "Person",
			name: defaultConfig.author
		},
		sameAs: [
			"https://linkedin.com/in/steve",
			"https://twitter.com/steve",
			"https://facebook.com/steve",
			"https://youtube.com/@steve"
		]
	}
}

export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: item.name,
			item: `${defaultConfig.siteUrl}${item.url}`
		}))
	}
}
