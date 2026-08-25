import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// 1. CONFIGURATION SEO COMPLET POUR GOOGLE
export const metadata: Metadata = {
  metadataBase: new URL("https://techcorp-parking.vercel.app"),
  title: {
    default: "TechCorp Parking | Solution SaaS de Gestion de Parking d'Entreprise",
    template: "%s | TechCorp Parking",
  },
  description:
    "Optimisez l'attribution de places de parking en entreprise, gérez le travail hybride et réduisez les places vacantes grâce à notre application intelligente.",
  keywords: [
    "gestion parking entreprise",
    "application parking B2B",
    "flex office parking",
    "logiciel réservation parking travail hybride",
    "optimisation places parking collaborateurs",
    "TechCorp Parking",
  ],
  authors: [{ name: "TechCorp Parking" }],
  creator: "TechCorp Parking",
  publisher: "TechCorp Parking",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "TechCorp Parking | Gestion Intelligente de Parking d'Entreprise",
    description:
      "Fluidifiez le stationnement de vos collaborateurs, simplifiez le flex office et rentabilisez votre parking d'entreprise.",
    url: "https://techcorp-parking.vercel.app",
    siteName: "TechCorp Parking",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechCorp Parking | Solution de Gestion de Parking d'Entreprise",
    description: "Simplifiez l'attribution des places de parking pour vos équipes en flex-office.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // 2. EMPLACEMENT POUR LA CLÉ GOOGLE (VOIR ÉTAPE 3)
  verification: {
    google: "qfWz-ADm0zm8dZzQZRBWzATQTfOIxQVmcM01A3t6pvk",
  },
};

// 3. DONNÉES STRUCTURÉES GEO (SCHEMA.ORG POUR LES MOTEURS IA : CHATGPT, GEMINI, PERPLEXITY)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "TechCorp Parking",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
    description: "Démo et essai gratuit pour entreprises",
  },
  description:
    "Application SaaS B2B de gestion et d'optimisation de places de parking pour les entreprises en travail hybride et flex office.",
  url: "https://techcorp-parking.vercel.app",
  author: {
    "@type": "Organization",
    name: "TechCorp Parking",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="dark">
      <head>
        {/* Script d'injection JSON-LD pour l'indexation IA */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} bg-[#050505] text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
