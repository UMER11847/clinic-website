import { MapPin, Mail, Phone } from 'lucide-react'

const footerLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Approaches', href: '#modalities' },
  { label: 'Book a Session', href: '#book' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Clinic info */}
          <div>
            <p className="font-sans text-lg font-semibold text-primary-foreground mb-2">
              Eisha Usmani
            </p>
            <p className="text-sm text-primary-foreground/60 mb-1">Clinical Psychologist</p>
            <p className="text-sm text-primary-foreground/60 mb-1">MPhil Clinical Psychology</p>
            <p className="text-sm text-primary-foreground/60">AHPC Registered</p>
          </div>

          {/* Contact */}
          <div>
            <p className="font-sans text-sm font-semibold text-primary-foreground mb-4 uppercase tracking-widest">
              Contact
            </p>
            <ul className="space-y-3" role="list">
              <li className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <MapPin className="w-4 h-4 text-primary-foreground/40 shrink-0" aria-hidden="true" />
                DHA &amp; PECHS, Karachi
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-primary-foreground/40 shrink-0" aria-hidden="true" />
                <a
                  href="mailto:psych_health@outlook.com"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  psych_health@outlook.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-primary-foreground/40 shrink-0" aria-hidden="true" />
                <a
                  href="https://wa.me/923100201843"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  +92 310 0201843

                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <span className="w-4 h-4 text-primary-foreground/40 shrink-0 flex items-center justify-center" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.522 5.847L.057 23.882l6.187-1.445A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.988 0-3.842-.549-5.428-1.499l-.39-.23-4.028.94.975-3.918-.254-.403A9.795 9.795 0 0 1 2.182 12c0-5.412 4.406-9.818 9.818-9.818 5.412 0 9.818 4.406 9.818 9.818 0 5.412-4.406 9.818-9.818 9.818z" />
                  </svg>
                </span>
                Online sessions available
              </li>
            </ul>
          </div>

          {/* Nav links */}
          <div>
            <p className="font-sans text-sm font-semibold text-primary-foreground mb-4 uppercase tracking-widest">
              Navigation
            </p>
            <ul className="space-y-2.5" role="list">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/10 pt-8">
          {/* Ethical disclaimer */}
          <p className="text-xs text-primary-foreground/45 leading-relaxed max-w-2xl mb-4">
            This website is for informational purposes only and is not a substitute for
            emergency mental health support. If you are in immediate danger or crisis, please
            contact local emergency services.
          </p>
          <p className="text-xs text-primary-foreground/35">
            &copy; {new Date().getFullYear()} Dr. [Therapist Name]. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
