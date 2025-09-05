import Head from "next/head"

interface SEOHeadProps {
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
	twitterCard?: "summary" | "summary_large_image" | "app" | "player"
	noIndex?: boolean
	canonical?: string
}

export function SEOHead({
	title = "Steve Down - CEO & Author",
	description = "Experienced CEO and entrepreneur building innovative companies and sharing insights on business, technology, and leadership.",
	keywords = ["CEO", "entrepreneur", "business", "technology", "leadership", "innovation", "startup", "author"],
	image = "/og-image.jpg",
	url,
	type = "website",
	publishedTime,
	modifiedTime,
	author = "Steve Down",
	siteName = "Steve Down",
	twitterCard = "summary_large_image",
	noIndex = false,
	canonical,
}: SEOHeadProps) {
	const fullTitle = title.includes("Steve Down") ? title : `${title} | Steve Down`
	const fullUrl = url ? `${process.env.NEXT_PUBLIC_SITE_URL}${url}` : process.env.NEXT_PUBLIC_SITE_URL
	const fullImage = image.startsWith("http") ? image : `${process.env.NEXT_PUBLIC_SITE_URL}${image}`

	return (
		<Head>
			{/* Basic Meta Tags */}
			<title>{fullTitle}</title>
			<meta name="description" content={description} />
			<meta name="keywords" content={keywords.join(", ")} />
			<meta name="author" content={author} />
			<meta name="viewport" content="width=device-width, initial-scale=1" />

			{/* Canonical URL */}
			{canonical && <link rel="canonical" href={canonical} />}

			{/* Robots */}
			{noIndex && <meta name="robots" content="noindex, nofollow" />}

			{/* Open Graph */}
			<meta property="og:type" content={type} />
			<meta property="og:title" content={fullTitle} />
			<meta property="og:description" content={description} />
			<meta property="og:image" content={fullImage} />
			<meta property="og:url" content={fullUrl} />
			<meta property="og:site_name" content={siteName} />

			{/* Article specific */}
			{type === "article" && publishedTime && (
				<meta property="article:published_time" content={publishedTime} />
			)}
			{type === "article" && modifiedTime && (
				<meta property="article:modified_time" content={modifiedTime} />
			)}
			{type === "article" && author && (
				<meta property="article:author" content={author} />
			)}

			{/* Twitter Card */}
			<meta name="twitter:card" content={twitterCard} />
			<meta name="twitter:title" content={fullTitle} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content={fullImage} />
			<meta name="twitter:creator" content="@steve" />
			<meta name="twitter:site" content="@steve" />

			{/* Additional SEO */}
			<meta name="theme-color" content="#000000" />
			<meta name="msapplication-TileColor" content="#000000" />

			{/* Structured Data for Person/Organization */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "Person",
						name: "Steve Down",
						jobTitle: "CEO & Entrepreneur",
						description: description,
						url: fullUrl,
						image: fullImage,
						sameAs: [
							"https://linkedin.com/in/steve",
							"https://twitter.com/steve",
							"https://facebook.com/steve",
							"https://youtube.com/@steve"
						],
						worksFor: {
							"@type": "Organization",
							name: "Steve Down Companies"
						}
					})
				}}
			/>
		</Head>
	)
}
