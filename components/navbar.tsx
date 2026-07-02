'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, Moon, Sun, X } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Approaches', href: '#modalities' },
  { label: 'Book', href: '#book' },
  { label: 'Contact', href: '#contact' },
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
          <span className="text-primary">Dr.</span> Eisha usmani
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
