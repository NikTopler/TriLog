import "@/styles/reset.scss";
import "@/styles/variables.scss";
import "@/styles/globals.scss";
import { LayoutProps } from "@/interfaces";
import ConditionalLayout from "./ConditionalLayout";

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
      </body>
    </html>
  )
}

export default RootLayout;