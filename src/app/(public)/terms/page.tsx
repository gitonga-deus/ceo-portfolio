import { generateMetadata as generateSEOMetadata } from "@/lib/seo"
import type { Metadata } from "next"
import { PageTransition } from "@/components/animations/page-transition"
import { FadeIn } from "@/components/animations/fade-in"

export const metadata: Metadata = generateSEOMetadata({
	title: "Terms of Service",
	description: "Terms of Service for Steve Down's website. Read our terms and conditions for using our website and services.",
	url: "/terms",
})

export default function TermsPage() {
	return (
		<PageTransition>
			<div className="py-20 px-4">
				<div className="container max-w-4xl mx-auto">
					<FadeIn>
						<h1 className="text-4xl font-heading font-bold mb-8">Terms of Service</h1>
						<p className="text-lg text-muted-foreground mb-8">
							Last updated: {new Date().toLocaleDateString()}
						</p>
					</FadeIn>

					<div className="prose prose-lg max-w-none">
						<FadeIn delay={0.2}>
							<h2>Agreement to Terms</h2>
							<p>
								By accessing and using stevedown.com (the "Site"), you accept and agree to be bound by the terms and provision of this agreement.
							</p>

							<h2>Use License</h2>
							<p>
								Permission is granted to temporarily download one copy of the materials on Steve Down's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
							</p>
							<ul>
								<li>Modify or copy the materials</li>
								<li>Use the materials for any commercial purpose or for any public display</li>
								<li>Attempt to reverse engineer any software contained on the website</li>
								<li>Remove any copyright or other proprietary notations from the materials</li>
							</ul>

							<h2>Disclaimer</h2>
							<p>
								The materials on Steve Down's website are provided on an 'as is' basis. Steve Down makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
							</p>

							<h2>Limitations</h2>
							<p>
								In no event shall Steve Down or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Steve Down's website, even if Steve Down or an authorized representative has been notified orally or in writing of the possibility of such damage.
							</p>

							<h2>Accuracy of Materials</h2>
							<p>
								The materials appearing on Steve Down's website could include technical, typographical, or photographic errors. Steve Down does not warrant that any of the materials on its website are accurate, complete, or current.
							</p>

							<h2>Links</h2>
							<p>
								Steve Down has not reviewed all of the sites linked to our website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Steve Down of the site.
							</p>

							<h2>Modifications</h2>
							<p>
								Steve Down may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
							</p>

							<h2>Governing Law</h2>
							<p>
								These terms and conditions are governed by and construed in accordance with the laws of the United States and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
							</p>

							<h2>User Content</h2>
							<p>
								If you submit content to our website (such as comments or newsletter subscriptions), you grant us a non-exclusive, royalty-free, perpetual, and worldwide license to use, modify, and display such content.
							</p>

							<h2>Privacy Policy</h2>
							<p>
								Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Site, to understand our practices.
							</p>

							<h2>Contact Information</h2>
							<p>
								If you have any questions about these Terms of Service, please contact us at hello@stevedown.com.
							</p>
						</FadeIn>
					</div>
				</div>
			</div>
		</PageTransition>
	)
}
