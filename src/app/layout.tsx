import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Music Demo - Web Monetization',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Web Monetization Payment Pointer */}
        <meta name="monetization" content="https://ilp.chimoney.com/YOUR_USERNAME" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}