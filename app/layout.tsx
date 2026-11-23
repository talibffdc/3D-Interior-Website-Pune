import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'House of Design | Luxury Interior Design Studio Pune',
  description: "House of Design is Pune's premier luxury interior design studio. We transform spaces into soulful sanctuaries — residential, commercial, and hospitality projects crafted with purpose.",
  keywords: ['interior design Pune', 'luxury interior designer Pune', 'home interior design Pune', 'commercial interior design Pune', 'best interior designer Maharashtra'],
  metadataBase: new URL('https://houseofdesign.in'),
  alternates: { canonical: '/' },
  openGraph: {
    title: 'House of Design | Luxury Interior Design Pune',
    description: 'Pune’s most refined interior design studio. Cold modernism warmed by natural materials. Every space, intentional.',
    type: 'website',
    url: 'https://houseofdesign.in',
    images: ['/images/project-1.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'House of Design | Luxury Interior Design Pune',
    description: 'Pune’s most refined interior design studio. Every space, intentional.',
    images: ['/images/project-1.png'],
  },
  icons: { icon: '/favicon.svg' },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#17130f',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
