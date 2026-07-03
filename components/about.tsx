import { GraduationCap, Award, BookOpen, Users } from 'lucide-react'

const credentials = [
  {
    icon: GraduationCap,
    title: 'Academic Qualifications',
    items: [
      'MPhil in Clinical Psychology',
      'Specialist Certification in Clinical Supervision, LSCCH UK',
      'EMDR Europe Advanced Accreditation',
    ],
  },
  {
    icon: Award,
    title: 'Professional Affiliations',
    items: [
      'Allied Health Professions Council (AHPC)',
      'Registered with AHPC',
      'Affiliated with Pakistan Psychological Association (PPA)',
      'Member, Pakistan Association of Clinical Psychologists (PACP)',
      'Member, EMDR Pakistan, EMDR Asia, EMDR Europe',
    ],
  },
  {
    icon: BookOpen,
    title: 'Research Article',
    items: [
      'Using EMDR to Treat Rape trauma and associated Self0-Disgust: A Case Study at Journal of EMDR Asia (JEA), 2024',
      'Published research in Journal of EMDR Asia, 2024',
      'Conference presentations at EMDR National Conference, 2023',
    ],
  },
  {
    icon: Users,
    title: 'Clinical Experience',
    items: [
      '9+ years of clinical practice',
      '2,000+ documented clinical hours',
      'Work with individuals, couples, and of age 17+',
    ],
  },
]

export default function About() {
  return (
    <section id="about" className="py-24 bg-muted/40">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">
            About the Therapist
          </p>
          <h2 className="font-sans text-3xl md:text-4xl font-semibold text-foreground mb-5 text-balance">
            A qualified, experienced, and registered clinical psychologist
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            With advanced training in EMDR, Internal Family Systems, and couples therapy, the
            practice is grounded in evidence-based approaches delivered with warmth, cultural
            sensitivity, and a deep commitment to ethical care. Each client is met with
            respect, confidentiality, and a collaborative therapeutic relationship.
          </p>
        </div>

        {/* Credential cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {credentials.map((section) => {
            const Icon = section.icon
            return (
              <div
                key={section.title}
                className="bg-card border border-border rounded-2xl p-7 hover:shadow-sm transition-shadow duration-200"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent">
                    <Icon className="w-5 h-5 text-accent-foreground" aria-hidden="true" />
                  </div>
                  <h3 className="font-sans text-base font-semibold text-foreground">
                    {section.title}
                  </h3>
                </div>
                <ul className="space-y-2.5" role="list">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <span
                        aria-hidden="true"
                        className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sage shrink-0"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* Ethical note */}
        <p className="mt-10 text-xs text-muted-foreground text-center max-w-xl mx-auto leading-relaxed">
          All therapy and supervision is conducted within the ethical frameworks of registered
          professional bodies. Confidentiality, informed consent, and client well-being are
          central to every aspect of the practice.
        </p>
      </div>
    </section>
  )
}
