import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { RootProvider } from "fumadocs-ui/provider";
import { GeistMono } from "geist/font/mono";
import { Inter } from "next/font/google";
import { Metadata } from "next/types";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import type { ReactNode } from "react";
import "./global.css";


export const metadata: Metadata = {
  title: "UEval",
  metadataBase: new URL("https://wenhaochai.com/ueval"),
  description: "UEval is a challenging real-world benchmark for multimodal generation of unified models that are capable of generating both images and text.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
    ],
  },
  openGraph: {
    title: "UEval: A Real-World Benchmark for Unified Multimodal Generation",
    description: "UEval is a challenging real-world benchmark for multimodal generation of unified models that are capable of generating both images and text.",
    images: "/og/og.png",
    url: "https://wenhaochai.com/ueval",
    siteName: "UEval",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UEval: A Real-World Benchmark for Unified Multimodal Generation",
    description: "UEval is a challenging real-world benchmark for multimodal generation of unified models that are capable of generating both images and text.",
    images: [
      {
        url: "/og/og.png",
        width: 1200,
        height: 630,
      },
    ],
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
