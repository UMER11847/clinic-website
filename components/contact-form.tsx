'use client'

import { useState, useRef } from 'react'
import { Send, CheckCircle2, AlertCircle } from 'lucide-react'

type FormState = 'idle' | 'loading' | 'success' | 'error'

interface FormData {
  name: string
  email: string
  phone: string
  sessionFormat: string
  serviceInterest: string
  contactMethod: string
  message: string
  consent: boolean
  // honeypot (hidden from real users)
  website: string
}

const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
  sessionFormat: '',
  serviceInterest: '',
  contactMethod: '',
  message: '',
  consent: false,
  website: '',
}

const sessionFormats = [
  { value: 'in-person-dha', label: 'In-Person — DHA, Karachi' },
  { value: 'in-person-pechs', label: 'In-Person — PECHS, Karachi' },
  { value: 'online', label: 'Online / Teletherapy' },
]

const serviceOptions = [
  { value: 'individual-therapy', label: 'Individual Therapy' },
  { value: 'couples-therapy', label: 'Couples Therapy' },
  { value: 'assessment', label: 'Psychological Assessment' },
  { value: 'supervision', label: 'Clinical Supervision' },
  { value: 'workshop-training', label: 'Workshop / Training' },
  { value: 'organizational', label: 'Organizational Consultation' },
  { value: 'guest-lecture', label: 'Guest Lecture / Academic' },
  { value: 'other', label: 'Other' },
]

const contactMethods = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone Call' },
  { value: 'whatsapp', label: 'WhatsApp' },
]

function InputField({
  label,
  required,
  id,
  children,
}: {
  label: string
  required?: boolean
  id: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-destructive ml-0.5" aria-hidden="true">*</span>}
      </label>
      {children}
    </div>
  )
}

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200'

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [formState, setFormState] = useState<FormState>('idle')
  const formRef = useRef<HTMLFormElement>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Honeypot check
    if (formData.website) return

    setFormState('loading')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Submission failed')
      }

      setFormState('success')
      setFormData(initialFormData)
      formRef.current?.reset()
    } catch {
      setFormState('error')
    }
  }

  if (formState === 'success') {
    return (
      <div className="bg-card border border-border rounded-2xl p-10 text-center max-w-lg mx-auto">
        <div className="flex justify-center mb-5">
          <CheckCircle2 className="w-14 h-14 text-sage" aria-hidden="true" />
        </div>
        <h3 className="font-sans text-xl font-semibold text-foreground mb-3">
          Message received
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          Thank you for reaching out. Your message has been received, and the clinic will
          respond as soon as possible. Please note this form is not monitored for emergencies.
        </p>
        <button
          onClick={() => setFormState('idle')}
          className="px-6 py-2.5 rounded-full text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact and intake form"
      className="bg-card border border-border rounded-2xl p-7 md:p-10"
    >
      {/* Error banner */}
      {formState === 'error' && (
        <div
          role="alert"
          className="flex items-start gap-3 bg-destructive/10 border border-destructive/20 rounded-xl px-4 py-3 mb-6 text-sm text-destructive"
        >
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
          Something went wrong. Please try again or contact directly via email or phone.
        </div>
      )}

      {/* Honeypot — hidden from real users */}
      <div aria-hidden="true" className="absolute -left-[9999px] w-0 h-0 overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input
          type="text"
          id="website"
          name="website"
          value={formData.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <InputField label="Full Name" required id="name">
          <input
            type="text"
            id="name"
            name="name"
            required
            autoComplete="name"
            placeholder="Your full name"
            value={formData.name}
            onChange={handleChange}
            className={inputClass}
          />
        </InputField>

        {/* Email */}
        <InputField label="Email Address" required id="email">
          <input
            type="email"
            id="email"
            name="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            className={inputClass}
          />
        </InputField>

        {/* Phone */}
        <InputField label="Phone Number" id="phone">
          <input
            type="tel"
            id="phone"
            name="phone"
            autoComplete="tel"
            placeholder="+92 300 0000000"
            value={formData.phone}
            onChange={handleChange}
            className={inputClass}
          />
        </InputField>

        {/* Preferred Session Format */}
        <InputField label="Preferred Session Format" required id="sessionFormat">
          <select
            id="sessionFormat"
            name="sessionFormat"
            required
            value={formData.sessionFormat}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Select a format</option>
            {sessionFormats.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </InputField>

        {/* Service Interested In */}
        <InputField label="Service Interested In" required id="serviceInterest">
          <select
            id="serviceInterest"
            name="serviceInterest"
            required
            value={formData.serviceInterest}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Select a service</option>
            {serviceOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </InputField>

        {/* Preferred Contact Method */}
        <InputField label="Preferred Contact Method" required id="contactMethod">
          <select
            id="contactMethod"
            name="contactMethod"
            required
            value={formData.contactMethod}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Select a contact method</option>
            {contactMethods.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </InputField>
      </div>

      {/* Message */}
      <div className="mt-6">
        <InputField label="Message / Brief Concern" required id="message">
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="Briefly describe what brings you here or what you are looking for. You do not need to share anything you are not comfortable with."
            value={formData.message}
            onChange={handleChange}
            className={`${inputClass} resize-none`}
          />
        </InputField>
      </div>

      {/* Consent */}
      <div className="mt-6 flex items-start gap-3">
        <input
          type="checkbox"
          id="consent"
          name="consent"
          required
          checked={formData.consent}
          onChange={handleChange}
          className="mt-1 w-4 h-4 rounded border-input accent-primary shrink-0 cursor-pointer"
        />
        <label htmlFor="consent" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
          <span className="text-destructive" aria-hidden="true">* </span>
          I understand this form is not for emergencies and that submitting this form does not
          establish a therapeutic relationship.
        </label>
      </div>

      {/* Submit */}
      <div className="mt-8">
        <button
          type="submit"
          disabled={formState === 'loading' || !formData.consent}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {formState === 'loading' ? (
            <>
              <span className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" aria-hidden="true" />
              Sending...
            </>
          ) : (
            <>
              Send Message
              <Send className="w-4 h-4" aria-hidden="true" />
            </>
          )}
        </button>
        <p className="mt-4 text-xs text-muted-foreground">
          Fields marked <span className="text-destructive">*</span> are required. Your information
          is kept confidential and will only be used to respond to your enquiry.
        </p>
      </div>
    </form>
  )
}
