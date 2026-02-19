import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://life-in-weeks-yzy.vercel.app"),
  title: "Life in Weeks",
  description: "A visual map of my life, where each week I've been alive is a little box.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><linearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'><stop offset='0%25' style='stop-color:%233b82f6'/><stop offset='100%25' style='stop-color:%231e40af'/></linearGradient></defs><rect width='100' height='100' rx='20' fill='url(%23grad)'/><text x='50' y='70' font-family='system-ui,sans-serif' font-size='55' font-weight='bold' fill='white' text-anchor='middle'>YY</text></svg>",
  },
  openGraph: {
    title: "Life in Weeks",
    description: "A visual map of my life, where each week I've been alive is a little box.",
    images: [
      {
        url: "/globe.svg",
        width: 1200,
        height: 630,
        alt: "Life in Weeks - Visual timeline of Yizhou Yu's life",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Life in Weeks",
    description: "A visual map of my life, where each week I've been alive is a little box.",
    images: ["/globe.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
