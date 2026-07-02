import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react'
import ContactForm from './contact-form'

const contactDetails = [
  {
    icon: Mail,
    label: 'Email',
    value: 'psych_health@outlook.com',
    href: 'mailto:psych_health@outlook.com',
  },
  {
    icon: Phone,
    label: 'Phone / WhatsApp',
    value: '+92 310 0201843',
    href: 'https://wa.me/923100201843',
  },
  {
    icon: MapPin,
    label: 'DHA Branch',
    value: 'DHA, Karachi',
    href: null,
  },
  {
    icon: MapPin,
    label: 'PECHS Branch',
    value: 'P.E.C.H.S, Karachi',
    href: null,
  },
]

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-muted/40">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">
            Get in Touch
          </p>
          <h2 className="font-sans text-3xl md:text-4xl font-semibold text-foreground mb-5 text-balance">
            Reach out to enquire or book
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            Fill in the form below to enquire about services, ask questions, or express interest
            in booking a session. You will receive a response as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact details sidebar */}
          <div className="flex flex-col gap-6">
            {/* Emergency note */}
            <div className="bg-destructive/8 border border-destructive/15 rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <MessageCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" aria-hidden="true" />
                <p className="text-xs text-destructive/90 leading-relaxed">
                  <strong>Please note:</strong> This form is not monitored for emergencies. If
                  you are in immediate distress or danger, please contact emergency services or
                  a crisis helpline.
                </p>
              </div>
            </div>

            {/* Contact info cards */}
            {contactDetails.map((detail) => {
              const Icon = detail.icon
              return (
                <div
                  key={detail.label}
                  className="bg-card border border-border rounded-2xl p-5 flex items-start gap-4"
                >
                  <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-accent shrink-0">
                    <Icon className="w-4 h-4 text-accent-foreground" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-0.5">
                      {detail.label}
                    </p>
                    {detail.href ? (
                      <a
                        href={detail.href}
                        target={detail.href?.startsWith('http') ? '_blank' : undefined}
                        rel={detail.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-sm text-foreground hover:text-primary transition-colors"
                      >
                        {detail.value}
                      </a>
                    ) : (
                      <p className="text-sm text-foreground">{detail.value}</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
