import { ConfigProvider } from "antd";
import { solaceTheme } from "@/app/lib/antd-config";
import type { Metadata } from "next";
import { ErrorBoundary } from "@/components/error/ErrorBoundary"

import "./globals.css";
import { mollieGlaston, lato } from "./fonts";

export const metadata: Metadata = {
  title: "Solace Candidate Assignment",
  description: "Show us what you got",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="https://fonts.googleapis.com" as="style" />
      </head>
      <body className={`${mollieGlaston.variable} ${lato.variable}`}>
        <ErrorBoundary>
          <ConfigProvider theme={solaceTheme}>
            {children}
          </ConfigProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
