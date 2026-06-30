import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Lora, Inter, Geist_Mono } from 'next/font/google'
import './globals.css'

const themeScript = `
  (function () {
    try {
      const storedTheme = localStorage.getItem('theme')
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const isDark = storedTheme === 'dark' || (!storedTheme && systemPrefersDark)
      document.documentElement.classList.toggle('dark', isDark)
      document.documentElement.style.colorScheme = isDark ? 'dark' : 'light'
    } catch (e) {
      console.error(e)
    }
  })()
`

const lora = Lora({
  variable: '--font-lora',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Clinical Psychologist in Karachi | Therapy, EMDR, Assessments & Supervision',
  description:
    'Professional psychological therapy, EMDR trauma treatment, couples counseling, assessments, clinical supervision, workshops, and mental health consultation in Karachi and online.',
  generator: 'v0.app',
  keywords: [
    'clinical psychologist Karachi',
    'EMDR therapy Pakistan',
    'trauma therapy Karachi',
    'couples counseling Karachi',
    'psychological assessment',
    'clinical supervision',
    'mental health Karachi',
    'teletherapy Pakistan',
  ],
  icons: {
    icon: '/icon.svg',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: '#f5f0e8',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${lora.variable} ${inter.variable} ${geistMono.variable} bg-background`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
