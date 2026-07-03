'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, Moon, Sun, X } from 'lucide-react'

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M6.94 8.5A1.56 1.56 0 1 0 6.94 5.38a1.56 1.56 0 0 0 0 3.12ZM5.5 9.75h2.88V18H5.5zM10.3 9.75h2.76v1.12h.04c.38-.72 1.32-1.48 2.72-1.48 2.91 0 3.45 1.91 3.45 4.4V18H16.4v-7.54c0-1.8-.03-4.11-2.5-4.11-2.5 0-2.88 1.95-2.88 3.96V18H10.3z" />
    </svg>
  )
}

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Approaches', href: '#modalities' },
  { label: 'Book', href: '#book' },
  { label: 'Contact', href: '#contact' },
]

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/eisha.usmani?igsh=MTh5bm14M200dng5Zw==',
    icon: InstagramIcon,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/eisha-usmani-479968101/',
    icon: LinkedInIcon,
  },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })

    const storedTheme = window.localStorage.getItem('theme')
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initialTheme = storedTheme === 'dark' || (!storedTheme && systemPrefersDark) ? 'dark' : 'light'

    setTheme(initialTheme)
    document.documentElement.classList.toggle('dark', initialTheme === 'dark')
    document.documentElement.style.colorScheme = initialTheme

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = () => setIsOpen(false)

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    document.documentElement.classList.toggle('dark', nextTheme === 'dark')
    document.documentElement.style.colorScheme = nextTheme
    window.localStorage.setItem('theme', nextTheme)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/70 backdrop-blur-xl border-b border-border/40 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav
        className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo / Name */}
        <Link
          href="#home"
          className="font-sans text-lg font-semibold text-foreground tracking-tight hover:text-primary transition-colors"
          onClick={handleNavClick}
        >
          <span className="text-primary"></span> Eisha usmani
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80 text-foreground shadow-sm transition-colors hover:bg-muted"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <div className="flex items-center gap-2">
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-background/80 text-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/20 hover:bg-primary/10 hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              )
            })}
          </div>

          <a
            href="#book"
            className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
          >
            Book a Session
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-md text-foreground hover:bg-muted transition-colors"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-background/98 backdrop-blur-sm border-b border-border"
        >
          <ul className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={handleNavClick}
                  className="block py-3 px-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-muted rounded-md transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={toggleTheme}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80 text-foreground shadow-sm transition-colors hover:bg-muted"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
              <div className="flex items-center gap-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      onClick={handleNavClick}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-background/80 text-foreground shadow-sm transition-all duration-200 hover:border-primary/20 hover:bg-primary/10 hover:text-primary"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  )
                })}
              </div>
              <a
                href="#book"
                onClick={handleNavClick}
                className="block w-full text-center py-3 rounded-full text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Book a Session
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
