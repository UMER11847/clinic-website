import { MapPin, Video, ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden min-h-screen flex items-center pt-20"
      aria-label="Introduction"
    >
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-24 right-[-8%] h-96 w-96 rounded-full blur-3xl"
          style={{ background: 'oklch(0.42 0.07 200 / 0.12)' }}
        />
        <div
          className="absolute bottom-0 left-[-8%] h-80 w-80 rounded-full blur-3xl"
          style={{ background: 'oklch(0.55 0.08 155 / 0.16)' }}
        />
        <svg
          viewBox="0 0 1440 900"
          className="absolute inset-0 h-full w-full opacity-70"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <path
            d="M0 720C140 660 260 620 400 640C540 660 670 740 820 730C990 720 1100 610 1440 540"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.25"
          />
          <path
            d="M80 220C220 180 320 180 460 230C600 280 680 338 834 324C990 310 1120 220 1360 150"
            fill="none"
            stroke="var(--sage)"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.22"
          />
          <circle cx="1180" cy="200" r="96" fill="none" stroke="var(--primary)" strokeWidth="2" opacity="0.16" />
          <circle cx="250" cy="240" r="140" fill="none" stroke="var(--sage)" strokeWidth="2" opacity="0.14" />
          <rect x="1060" y="560" width="180" height="120" rx="24" fill="none" stroke="var(--foreground)" strokeOpacity="0.08" />
          <rect x="180" y="620" width="140" height="96" rx="20" fill="none" stroke="var(--foreground)" strokeOpacity="0.07" />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-20 w-full">
        <div className="max-w-3xl">
          {/* Registration badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-xs font-medium mb-8 border border-border">
            <span className="w-1.5 h-1.5 rounded-full bg-sage inline-block" />
            Registered Clinical Psychologist &bull; AHPC Registered
          </div>

          {/* Headline */}
          <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight text-balance mb-6">
            Compassionate,{' '}
            <span className="text-primary">evidence-based</span> therapy 
          </h1>

          {/* Subtext */}
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-10 max-w-2xl text-pretty">
            Offering trauma-informed therapy, relationship counseling, psychological assessments,
            clinical supervision, workshops, and consultation services in Karachi and online.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a
              href="#book"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors duration-200"
            >
              Book a Session
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-transparent border border-border text-foreground text-sm font-medium hover:bg-muted transition-colors duration-200"
            >
              Send a Message
            </a>
          </div>

          {/* Location badges */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-sage shrink-0" />
              <span>In-person: DHA &amp; PECHS, Karachi</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Video className="w-4 h-4 text-primary shrink-0" />
              <span>Online / Teletherapy sessions available</span>
            </div>
          </div>
        </div>

        {/* Credential highlights row */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '9+', label: 'Years of experience' },
            { value: '2000+', label: 'Clinical hours' },
            { value: 'CCS', label: 'certified clinical supervisor' },
            { value: 'MPhil', label: 'Clinical Psychology' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-card border border-border rounded-2xl px-5 py-5 text-center"
            >
              <p className="font-sans text-2xl font-semibold text-primary mb-1">{stat.value}</p>
              <p className="text-xs text-muted-foreground leading-snug">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
