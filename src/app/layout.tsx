import { LayoutProps } from "@/types";
import ConditionalLayout from "./ConditionalLayout";
import { Analytics } from '@vercel/analytics/react';

import "@/styles/reset.scss";
import "@/styles/globals.scss";

export const metadata = {
  title: 'TriLog',
  description: 'TriLog is a website for triathletes to log their training and racing.',
  keywords: 'next.js, react'
}

function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body>
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
        <Analytics />
      </body>
    </html>
  )
}

export default RootLayout;