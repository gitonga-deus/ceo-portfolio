import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css"
import { generateMetadata as generateSEOMetadata, generatePersonStructuredData } from "@/lib/seo"
import { StructuredData } from "@/components/seo/structured-data";
import { AuthProvider } from "@/components/auth-provider";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});


export const metadata: Metadata = generateSEOMetadata()

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<StructuredData data={generatePersonStructuredData()} />
			</head>
			<body
				className={`${geistSans.className} antialiased`}
			>
				<AuthProvider>
					{children}
				</AuthProvider>
			</body>
		</html>
	);
}
