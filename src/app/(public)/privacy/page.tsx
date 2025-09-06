import { generateMetadata as generateSEOMetadata } from "@/lib/seo"
import type { Metadata } from "next"
import { PageTransition } from "@/components/animations/page-transition"
import { FadeIn } from "@/components/animations/fade-in"

export const metadata: Metadata = generateSEOMetadata({
	title: "Privacy Policy",
	description: "Privacy Policy for Steve Down's website. Learn how we collect, use, and protect your personal information.",
	url: "/privacy",
})

export default function PrivacyPage() {
	return (
		<PageTransition>
			<div className="py-20 px-4">
				<div className="container max-w-4xl mx-auto">
					<FadeIn>
						<h1 className="text-4xl font-heading font-bold mb-8">Privacy Policy</h1>
						<p className="text-lg text-muted-foreground mb-8">
							Last updated: {new Date().toLocaleDateString()}
						</p>
					</FadeIn>

					<div className="prose prose-lg max-w-none">
						<FadeIn delay={0.2}>
							<h2>Introduction</h2>
							<p>
								Steve Down ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website stevedown.com (the "Site").
							</p>

							<h2>Information We Collect</h2>
							<h3>Personal Information</h3>
							<p>We may collect personal information that you voluntarily provide to us when you:</p>
							<ul>
								<li>Subscribe to our newsletter</li>
								<li>Contact us through our website</li>
								<li>Engage with our content</li>
							</ul>

							<h3>Automatically Collected Information</h3>
							<p>When you visit our Site, we may automatically collect certain information about your device, including:</p>
							<ul>
								<li>IP address</li>
								<li>Browser type and version</li>
								<li>Operating system</li>
								<li>Pages visited and time spent on pages</li>
								<li>Referring website</li>
							</ul>

							<h2>How We Use Your Information</h2>
							<p>We use the information we collect to:</p>
							<ul>
								<li>Provide and maintain our services</li>
								<li>Send you newsletters and updates (with your consent)</li>
								<li>Respond to your inquiries and requests</li>
								<li>Improve our website and user experience</li>
								<li>Analyze website usage and trends</li>
							</ul>

							<h2>Information Sharing</h2>
							<p>
								We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this Privacy Policy. We may share your information with:
							</p>
							<ul>
								<li>Service providers who assist us in operating our website</li>
								<li>Legal authorities when required by law</li>
							</ul>

							<h2>Data Security</h2>
							<p>
								We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
							</p>

							<h2>Your Rights</h2>
							<p>You have the right to:</p>
							<ul>
								<li>Access your personal information</li>
								<li>Correct inaccurate information</li>
								<li>Request deletion of your information</li>
								<li>Unsubscribe from our communications</li>
							</ul>

							<h2>Cookies</h2>
							<p>
								Our website may use cookies to enhance your experience. You can choose to disable cookies through your browser settings, though this may affect website functionality.
							</p>

							<h2>Changes to This Policy</h2>
							<p>
								We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
							</p>

							<h2>Contact Us</h2>
							<p>
								If you have any questions about this Privacy Policy, please contact us at hello@stevedown.com.
							</p>
						</FadeIn>
					</div>
				</div>
			</div>
		</PageTransition>
	)
}
