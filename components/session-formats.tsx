import { MapPin, Video } from 'lucide-react'

const formats = [
  {
    icon: MapPin,
    title: 'In-Person — DHA Branch',
    subtitle: 'Defence Housing Authority, Karachi',
    description:
      'Face-to-face sessions in a private, confidential, and comfortable clinical setting in DHA Karachi.',
    highlight: false,
  },
  {
    icon: MapPin,
    title: 'In-Person — PECHS Branch',
    subtitle: 'P.E.C.H.S, Karachi',
    description:
      'In-person sessions available at the PECHS location, providing accessible care across Karachi.',
    highlight: false,
  },
  {
    icon: Video,
    title: 'Online / Teletherapy',
    subtitle: 'Nationwide & International',
    description:
      'Secure video sessions from the comfort of your own space. Available to clients across Pakistan and internationally.',
    highlight: true,
  },
]

export default function SessionFormats() {
  return (
    <section id="formats" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">
            Session Formats
          </p>
          <h2 className="font-sans text-3xl md:text-4xl font-semibold text-foreground mb-5 text-balance">
            Flexible options to suit your needs
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            Sessions are available in-person at two Karachi locations, or online for those who
            prefer the flexibility of teletherapy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {formats.map((f) => {
            const Icon = f.icon
            return (
              <div
                key={f.title}
                className={`rounded-2xl p-8 border transition-all duration-200 ${
                  f.highlight
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-card text-foreground border-border hover:shadow-sm'
                }`}
              >
                <div
                  className={`flex items-center justify-center w-11 h-11 rounded-xl mb-6 ${
                    f.highlight ? 'bg-primary-foreground/15' : 'bg-accent'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${f.highlight ? 'text-primary-foreground' : 'text-accent-foreground'}`}
                    aria-hidden="true"
                  />
                </div>
                <h3
                  className={`font-sans text-base font-semibold mb-1 ${
                    f.highlight ? 'text-primary-foreground' : 'text-foreground'
                  }`}
                >
                  {f.title}
                </h3>
                <p
                  className={`text-xs font-medium mb-4 ${
                    f.highlight ? 'text-primary-foreground/70' : 'text-muted-foreground'
                  }`}
                >
                  {f.subtitle}
                </p>
                <p
                  className={`text-sm leading-relaxed ${
                    f.highlight ? 'text-primary-foreground/85' : 'text-muted-foreground'
                  }`}
                >
                  {f.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
