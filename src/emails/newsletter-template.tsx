import { Body, Container, Head, Heading, Html, Link, Preview, Section, Text } from "@react-email/components"

interface NewsletterTemplateProps {
  subject: string
  content: string
  unsubscribeUrl?: string
}

export default function NewsletterTemplate({ subject, content, unsubscribeUrl = "#" }: NewsletterTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>{subject}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={h1}>Steve's Portfolio</Heading>
            <Text style={tagline}>Building the Future, One Company at a Time</Text>
          </Section>

          {/* Main Content */}
          <Section style={contentSection}>
            <Heading style={h2}>{subject}</Heading>
            <div style={contentText} dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, "<br />") }} />
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>You're receiving this email because you subscribed to Steve's newsletter.</Text>
            <Text style={footerText}>
              <Link href={unsubscribeUrl} style={unsubscribeLink}>
                Unsubscribe
              </Link>
              {" | "}
              <Link href="https://steveportfolio.com" style={link}>
                Visit Website
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: "#ffffff",
  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
}

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "600px",
}

const header = {
  padding: "32px 24px",
  textAlign: "center" as const,
  borderBottom: "1px solid #e5e7eb",
}

const h1 = {
  color: "#0891b2",
  fontSize: "32px",
  fontWeight: "900",
  margin: "0 0 8px",
  lineHeight: "1.2",
}

const tagline = {
  color: "#6b7280",
  fontSize: "16px",
  margin: "0",
}

const contentSection = {
  padding: "32px 24px",
}

const h2 = {
  color: "#111827",
  fontSize: "24px",
  fontWeight: "700",
  margin: "0 0 16px",
  lineHeight: "1.3",
}

const contentText = {
  color: "#374151",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "0",
}

const footer = {
  padding: "24px",
  borderTop: "1px solid #e5e7eb",
  textAlign: "center" as const,
}

const footerText = {
  color: "#6b7280",
  fontSize: "14px",
  margin: "8px 0",
}

const link = {
  color: "#0891b2",
  textDecoration: "underline",
}

const unsubscribeLink = {
  color: "#9ca3af",
  textDecoration: "underline",
}
