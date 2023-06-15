import './globals.css'
import { Inter } from 'next/font/google'
import React from "react";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Discord Bot Documentation',
  description: 'Documentation on discord bots.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{padding: "1%"}}>
        <header>

        </header>
        <main>{children}</main>
        <footer>

        </footer>
      </body>
    </html>
  )
}
