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
			<div className="pt-24 pb-20 px-4 sm:pt-28 lg:pt-32">
				<div className="container max-w-4xl mx-auto">
					<FadeIn>
						<h1 className="text-4xl font-heading font-bold mb-8">Privacy Policy</h1>
						<p className="text-lg text-muted-foreground mb-8">
							Last updated: {new Date().toLocaleDateString()}
						</p>
					</FadeIn>

					<div className="space-y-6">
						<FadeIn delay={0.2}>
							<div className="space-y-2 mb-6">
								<h2 className="text-2xl font-heading font-bold text-foreground">Introduction</h2>
								<p className="text-muted-foreground">
									Steve Down ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website stevedown.com (the "Site").
								</p>
							</div>

							<div className="space-y-2 mb-6">
								<h2 className="text-2xl font-heading font-bold text-foreground">Information We Collect</h2>
								<div className="space-y-2 mb-4">
									<h3 className="text-xl font-semibold text-foreground">Personal Information</h3>
									<p className="text-muted-foreground">We may collect personal information that you voluntarily provide to us when you:</p>
									<ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
										<li>Subscribe to our newsletter</li>
										<li>Contact us through our website</li>
										<li>Engage with our content</li>
									</ul>
								</div>
								<div className="space-y-2 mb-4">
									<h3 className="text-xl font-semibold text-foreground">Automatically Collected Information</h3>
									<p className="text-muted-foreground">When you visit our Site, we may automatically collect certain information about your device, including:</p>
									<ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
										<li>IP address</li>
										<li>Browser type and version</li>
										<li>Operating system</li>
										<li>Pages visited and time spent on pages</li>
										<li>Referring website</li>
									</ul>
								</div>
							</div>

							<div className="space-y-2 mb-6">
								<h2 className="text-2xl font-heading font-bold text-foreground">How We Use Your Information</h2>
								<p className="text-muted-foreground">We use the information we collect to:</p>
								<ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
									<li>Provide and maintain our services</li>
									<li>Send you newsletters and updates (with your consent)</li>
									<li>Respond to your inquiries and requests</li>
									<li>Improve our website and user experience</li>
									<li>Analyze website usage and trends</li>
								</ul>
							</div>

							<div className="space-y-2 mb-6">
								<h2 className="text-2xl font-heading font-bold text-foreground">Information Sharing</h2>
								<p className="text-muted-foreground">
									We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this Privacy Policy. We may share your information with:
								</p>
								<ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
									<li>Service providers who assist us in operating our website</li>
									<li>Legal authorities when required by law</li>
								</ul>
							</div>

							<div className="space-y-2 mb-6">
								<h2 className="text-2xl font-heading font-bold text-foreground">Data Security</h2>
								<p className="text-muted-foreground">
									We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
								</p>
							</div>

							<div className="space-y-2 mb-6">
								<h2 className="text-2xl font-heading font-bold text-foreground">Your Rights</h2>
								<p className="text-muted-foreground">You have the right to:</p>
								<ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
									<li>Access your personal information</li>
									<li>Correct inaccurate information</li>
									<li>Request deletion of your information</li>
									<li>Unsubscribe from our communications</li>
								</ul>
							</div>

							<div className="space-y-2 mb-6">
								<h2 className="text-2xl font-heading font-bold text-foreground">Cookies</h2>
								<p className="text-muted-foreground">
									Our website may use cookies to enhance your experience. You can choose to disable cookies through your browser settings, though this may affect website functionality.
								</p>
							</div>

							<div className="space-y-2 mb-6">
								<h2 className="text-2xl font-heading font-bold text-foreground">Changes to This Policy</h2>
								<p className="text-muted-foreground">
									We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
								</p>
							</div>

							<div className="space-y-2 mb-6">
								<h2 className="text-2xl font-heading font-bold text-foreground">Contact Us</h2>
								<p className="text-muted-foreground">
									If you have any questions about this Privacy Policy, please contact us at <span className="text-primary font-medium">hello@stevedown.com</span>.
								</p>
							</div>
						</FadeIn>
					</div>
				</div>
			</div>
		</PageTransition>
	)
}
