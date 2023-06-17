import 'bootstrap/dist/css/bootstrap.min.css';
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
    <html lang="en" data-bs-theme="dark">
      <body className={inter.className} style={{padding: "1%"}}>
        {children}
      </body>
    </html>
  )
}
