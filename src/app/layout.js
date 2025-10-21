import '@progress/kendo-theme-bootstrap/dist/all.css';
import './globals.css';
import { RetentionProvider } from '../contexts/RetentionContext';

export const metadata = {
  title: "Tenant Retention Analysis Dashboard",
  description: "Comprehensive tenant retention analysis dashboard with multi-filter capabilities, interactive data visualizations, and real-time analytics for housing professionals.",
  keywords: "tenant retention, housing analytics, dashboard, data visualization, retention analysis, property management, housing data",
  authors: [{ name: "Svitlana Horodylova" }],
  openGraph: {
    title: "Tenant Retention Analysis Dashboard",
    description: "Comprehensive tenant retention analysis dashboard with multi-filter capabilities, interactive data visualizations, and real-time analytics for housing professionals.",
    images: [
      {
        url: "/favicon.svg",
        width: 1200,
        height: 630,
        alt: "Tenant Retention Analysis Dashboard"
      }
    ],
    locale: "en_US",
    type: "website",
    siteName: "Tenant Retention Dashboard"
  },
  twitter: {
    card: "summary_large_image",
    title: "Tenant Retention Analysis Dashboard",
    description: "Comprehensive tenant retention analysis dashboard with multi-filter capabilities and interactive data visualizations for housing professionals.",
    images: ["/favicon.svg"]
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <RetentionProvider>
          {children}
        </RetentionProvider>
      </body>
    </html>
  )
}