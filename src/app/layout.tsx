import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://life-in-weeks-yzy.vercel.app"),
  title: "Life in Weeks",
  description: "A visual map of my life, where each week I've been alive is a little box.",
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
