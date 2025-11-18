import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { RootProvider } from "fumadocs-ui/provider";
import { GeistMono } from "geist/font/mono";
import { Inter } from "next/font/google";
import { Metadata } from "next/types";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import type { ReactNode } from "react";
import "./global.css";

// TODO: Change metadata and domain link
export const metadata: Metadata = {
  title: "FrontierCS",
  metadataBase: new URL("https://frontier-cs.org"),
  description: "FrontierCS is a benchmark of open-ended problems across diverse areas of computer science.",
  icons: {
    icon: [
      { url: "/favicon.ico" }, // TODO: Change favicon icon
    ],
  },
  // TODO: Add OpenGraph image
  openGraph: {
    title: "FrontierCS - The Next Frontier of Computer Science",
    description: "A benchmark of open-ended problems across diverse areas of computer science.",
    // images: "/og/frontiercs-og.png",
    url: "https://frontiercs.ai",
    siteName: "FrontierCS",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FrontierCS - The Next Frontier of Computer Science",
    description: "A benchmark of open-ended problems across diverse areas of computer science.",
    // images: [
    //   {
    //     url: "/og/frontiercs-og.png",
    //     width: 1200,
    //     height: 630,
    //   },
    // ],
  },
};

const inter = Inter({
  subsets: ["latin"],
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={cn(inter.className, GeistMono.variable)}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col">
        <RootProvider>
          <NuqsAdapter>{children}</NuqsAdapter>
        </RootProvider>
        <Toaster />
      </body>
    </html>
  );
}
