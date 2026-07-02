'use client'

import { useEffect } from 'react'
import { ExternalLink } from 'lucide-react'

// Replace this with your actual Calendly URL
const CALENDLY_URL = 'https://calendly.com/eishausmani6/30min'

export default function Booking() {
  useEffect(() => {
    // Load Calendly widget script
    const existingScript = document.getElementById('calendly-script')
    if (existingScript) return

    const script = document.createElement('script')
    script.id = 'calendly-script'
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      const s = document.getElementById('calendly-script')
      if (s) document.body.removeChild(s)
    }
  }, [])

  return (
    <section id="book" className="py-24 bg-muted/40">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">
            Booking
          </p>
          <h2 className="font-sans text-3xl md:text-4xl font-semibold text-foreground mb-5 text-balance">
            Book a session
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            Use the calendar below to schedule a session at a time that works for you. If you
            have questions first, feel free to reach out via the contact form.
          </p>
        </div>

        {/* Calendly embed */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
          <div
            className="calendly-inline-widget w-full"
            data-url={CALENDLY_URL}
            style={{ minWidth: '320px', height: '700px' }}
            aria-label="Calendly booking widget"
          />
        </div>

        {/* Fallback button */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            If the calendar does not load, you can book directly on Calendly.
          </p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-card text-foreground text-sm font-medium hover:bg-muted transition-colors duration-200"
          >
            Open Calendly Booking Page
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
