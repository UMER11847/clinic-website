import {
  Heart,
  Users,
  ClipboardList,
  GraduationCap,
  Mic,
  Building2,
  BookOpen,
} from 'lucide-react'

const services = [
  {
    icon: Heart,
    title: 'Individual Therapy',
    description:
      'Supportive, evidence-based therapy for a range of concerns, tailored to the individual.',
    items: [
      'Trauma and PTSD treatment using EMDR',
      'Emotional abuse and attachment-related trauma',
      'Anxiety, depression, and mood disorders',
      'OCD and Adult ADHD',
      'Personality disorders',
      'Grief and identity exploration',
      'Emotional regulation and resilience-building',
    ],
  },
  {
    icon: Users,
    title: 'Couples & Relationship Therapy',
    description:
      'Structured, compassionate support for couples navigating relationship challenges.',
    items: [
      'Marital and relationship counseling',
      'Conflict resolution',
      'Gottman Method-based interventions',
      'Emotional abuse recovery within relationships',
    ],
  },
  {
    icon: ClipboardList,
    title: 'Psychological Assessments',
    description:
      'Comprehensive psychodiagnostic and cognitive evaluations for adults.',
    items: [
      'Psychodiagnostic and psychological evaluations',
      'Personality assessment batteries',
      'Cognitive assessment batteries',
      'Behavioral assessment batteries',
    ],
  },
  {
    icon: GraduationCap,
    title: 'Clinical Supervision & Training',
    description:
      'Structured supervision and development support for therapists and interns.',
    items: [
      'Clinical supervision for therapists and interns',
      'Therapist development and skill-building workshops',
      'Ethics and reflective practice training',
    ],
  },
  {
    icon: Mic,
    title: 'Workshops & Community Programs',
    description:
      'Educational workshops and programs for individuals, organizations, and communities.',
    items: [
      'Trauma-informed care training',
      'Emotional abuse awareness workshops',
      'Divorce recovery support',
      'Mental health and well-being seminars',
      'Stress management workshops',
    ],
  },
  {
    icon: Building2,
    title: 'Organizational Consultation',
    description:
      'Strategic and clinical consultation for mental health organizations and practices.',
    items: [
      'Clinical project design, oversight, and quality assurance',
      'Setting up and supervising clinical supervision structures',
      'Designing therapist training and certification programs',
      'Ethical compliance and documentation systems',
      'Strategic planning for workshops, trainings, and panel recruitment',
      'Consultation for clinics scaling supervision infrastructure',
    ],
  },
  {
    icon: BookOpen,
    title: 'Guest Lectures & Academic Teaching',
    description:
      'Engaging academic contributions for universities, nursing institutions, and seminars.',
    items: [
      'Guest lectures for universities',
      'Teaching for nursing institutions',
      'Academic mental health seminars',
    ],
  },
]

export default function Services() {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">
            Services
          </p>
          <h2 className="font-sans text-3xl md:text-4xl font-semibold text-foreground mb-5 text-balance">
            Comprehensive psychological services
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            Services are offered with a trauma-informed, culturally sensitive approach for
            individuals, couples, clinicians, and organizations.
          </p>
        </div>

        {/* Service cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                className="bg-card border border-border rounded-2xl p-7 flex flex-col hover:shadow-sm hover:border-primary/20 transition-all duration-200"
              >
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-secondary mb-5 shrink-0">
                  <Icon className="w-5 h-5 text-secondary-foreground" aria-hidden="true" />
                </div>
                <h3 className="font-sans text-base font-semibold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  {service.description}
                </p>
                <ul className="mt-auto space-y-2" role="list">
                  {service.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-1.5 w-1 h-1 rounded-full bg-sage shrink-0"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
