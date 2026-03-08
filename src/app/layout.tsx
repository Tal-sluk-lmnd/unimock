import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import './globals.css'
import ParentCommunication from '@/components/ParentCommunication'

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-lato',
})

export const metadata: Metadata = {
  title: 'Unimock',
  description: 'A Next.js webapp',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${lato.variable} font-lato`}>
        <ParentCommunication />
        {children}
      </body>
    </html>
  )
}
