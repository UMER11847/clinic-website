const modalities = [
  {
    acronym: 'EMDR',
    name: 'Eye Movement Desensitization & Reprocessing',
    level: 'Advanced Accredited',
    description:
      'A highly researched therapy for processing trauma and distressing memories, reducing their long-term impact.',
  },
  {
    acronym: 'IFS',
    name: 'Internal Family Systems',
    description:
      'Explores internal "parts" of the self to promote self-leadership, healing, and emotional integration.',
  },
  {
    acronym: 'EFT',
    name: 'Emotion-Focused Therapy',
    description:
      'Helps clients identify, experience, and regulate emotions in a healthy and constructive way.',
  },
  {
    acronym: 'CBT',
    name: 'Cognitive Behavioural Therapy',
    description:
      'Identifies and challenges unhelpful thought patterns and behaviors to support lasting change.',
  },
  {
    acronym: 'DBT',
    name: 'Dialectical Behaviour Therapy',
    description:
      'Builds skills in distress tolerance, emotional regulation, mindfulness, and interpersonal effectiveness.',
  },
  {
    acronym: 'ACT',
    name: 'Acceptance & Commitment Therapy',
    description:
      'Encourages psychological flexibility by accepting difficult thoughts and committing to valued action.',
  },
  {
    acronym: 'GMT',
    name: 'Gottman Method Couples Therapy',
    description:
      'Research-based couples therapy that builds friendship, manages conflict, and creates shared meaning.',
  },
  {
    acronym: 'MBS',
    name: 'Mindfulness & Somatic Techniques',
    description:
      'Body-aware, present-moment practices that support nervous system regulation and grounding.',
  },
]

export default function Modalities() {
  return (
    <section id="modalities" className="py-24 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">
            Therapeutic Approaches
          </p>
          <h2 className="font-sans text-3xl md:text-4xl font-semibold text-foreground mb-5 text-balance">
            Integrative, evidence-based methods
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            Therapy is tailored to each individual. The approach draws from multiple
            evidence-based modalities, integrated thoughtfully to best support your needs and goals.
          </p>
        </div>

        {/* Modality grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {modalities.map((m) => (
            <div
              key={m.acronym}
              className="bg-card border border-border rounded-2xl p-6 hover:shadow-sm hover:border-primary/20 transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="font-sans text-xl font-semibold text-primary">{m.acronym}</span>
                {m.level && (
                  <span className="text-[10px] font-medium text-sage bg-sage-light px-2 py-0.5 rounded-full whitespace-nowrap">
                    {m.level}
                  </span>
                )}
              </div>
              <p className="text-xs font-medium text-foreground/70 mb-3 leading-snug">{m.name}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{m.description}</p>
            </div>
          ))}
        </div>

        {/* Client population note */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-card border border-border rounded-2xl px-8 py-6 max-w-lg">
            <p className="font-sans text-sm font-semibold text-foreground mb-2">Who I Work With</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">I work primarily with</strong>
              <br />
              late adolescents 17+ <br />
              Adults <br />
              Couples
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
