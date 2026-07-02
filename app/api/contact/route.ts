import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return null
  }

  return new Resend(apiKey)
}

const SESSION_FORMAT_LABELS: Record<string, string> = {
  'in-person-dha': 'In-Person — DHA, Karachi',
  'in-person-pechs': 'In-Person — PECHS, Karachi',
  online: 'Online / Teletherapy',
}

const SERVICE_LABELS: Record<string, string> = {
  'individual-therapy': 'Individual Therapy',
  'couples-therapy': 'Couples Therapy',
  assessment: 'Psychological Assessment',
  supervision: 'Clinical Supervision',
  'workshop-training': 'Workshop / Training',
  organizational: 'Organizational Consultation',
  'guest-lecture': 'Guest Lecture / Academic',
  other: 'Other',
}

const CONTACT_METHOD_LABELS: Record<string, string> = {
  email: 'Email',
  phone: 'Phone Call',
  whatsapp: 'WhatsApp',
}

function formatDate(date: Date): string {
  return date.toLocaleString('en-PK', {
    timeZone: 'Asia/Karachi',
    dateStyle: 'full',
    timeStyle: 'short',
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      name,
      email,
      phone,
      sessionFormat,
      serviceInterest,
      contactMethod,
      message,
      consent,
      website, // honeypot
    } = body

    // Honeypot check
    if (website) {
      // Silently succeed to not reveal the trap
      return NextResponse.json({ success: true })
    }

    // Validate required fields
    if (!name || !email || !sessionFormat || !serviceInterest || !contactMethod || !message || !consent) {
      return NextResponse.json(
        { error: 'Please fill in all required fields.' },
        { status: 400 }
      )
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    const submittedAt = formatDate(new Date())
    const toEmail = process.env.CONTACT_TO_EMAIL
    const fromEmail = process.env.CONTACT_FROM_EMAIL || 'noreply@yourdomain.com'
    const resend = getResendClient()

    if (!toEmail) {
      console.error('[Contact API] CONTACT_TO_EMAIL environment variable is not set.')
      return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 })
    }

    if (!resend) {
      console.error('[Contact API] RESEND_API_KEY environment variable is not set.')
      return NextResponse.json({ error: 'Email service is not configured.' }, { status: 500 })
    }

    const sessionFormatLabel = SESSION_FORMAT_LABELS[sessionFormat] ?? sessionFormat
    const serviceLabel = SERVICE_LABELS[serviceInterest] ?? serviceInterest
    const contactMethodLabel = CONTACT_METHOD_LABELS[contactMethod] ?? contactMethod

    // Therapist notification email
    const therapistEmailHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
      <body style="margin:0;padding:0;font-family:Georgia,serif;background:#f5f0e8;color:#2a2a3a;">
        <div style="max-width:600px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e8e2d8;">
          <div style="background:#3d7a8a;padding:32px 40px;">
            <h1 style="margin:0;font-size:20px;font-weight:600;color:#fff;">New Client Enquiry</h1>
            <p style="margin:6px 0 0;color:rgba(255,255,255,0.75);font-size:14px;font-family:system-ui,sans-serif;">Submitted: ${submittedAt}</p>
          </div>
          <div style="padding:40px;">
            <table style="width:100%;border-collapse:collapse;">
              ${[
                ['Name', name],
                ['Email', email],
                ['Phone', phone || 'Not provided'],
                ['Preferred Session Format', sessionFormatLabel],
                ['Service Interested In', serviceLabel],
                ['Preferred Contact Method', contactMethodLabel],
              ]
                .map(
                  ([label, value]) => `
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #f0ebe2;width:180px;">
                    <span style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#7a8a7a;font-family:system-ui,sans-serif;">${label}</span>
                  </td>
                  <td style="padding:12px 0;border-bottom:1px solid #f0ebe2;">
                    <span style="font-size:14px;color:#2a2a3a;font-family:system-ui,sans-serif;">${value}</span>
                  </td>
                </tr>`
                )
                .join('')}
            </table>
            <div style="margin-top:24px;">
              <p style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#7a8a7a;margin-bottom:10px;font-family:system-ui,sans-serif;">Message</p>
              <div style="background:#f5f0e8;border-radius:12px;padding:18px 20px;">
                <p style="margin:0;font-size:14px;line-height:1.7;color:#2a2a3a;font-family:system-ui,sans-serif;white-space:pre-wrap;">${message}</p>
              </div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `

    // Client confirmation email
    const clientEmailHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
      <body style="margin:0;padding:0;font-family:Georgia,serif;background:#f5f0e8;color:#2a2a3a;">
        <div style="max-width:600px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e8e2d8;">
          <div style="background:#3d7a8a;padding:32px 40px;">
            <h1 style="margin:0;font-size:20px;font-weight:600;color:#fff;">Message Received</h1>
          </div>
          <div style="padding:40px;">
            <p style="font-size:15px;line-height:1.7;color:#2a2a3a;margin-top:0;font-family:system-ui,sans-serif;">Dear ${name},</p>
            <p style="font-size:14px;line-height:1.8;color:#5a6a6a;font-family:system-ui,sans-serif;">
              Thank you for reaching out. Your message has been received, and the clinic will
              respond as soon as possible.
            </p>
            <p style="font-size:14px;line-height:1.8;color:#5a6a6a;font-family:system-ui,sans-serif;">
              <strong style="color:#2a2a3a;">Please note:</strong> This form is not monitored
              for emergencies. If you are in immediate distress or danger, please contact your
              local emergency services.
            </p>
            <div style="margin-top:32px;padding-top:24px;border-top:1px solid #f0ebe2;">
              <p style="font-size:12px;color:#9aa09a;font-family:system-ui,sans-serif;margin:0;">
                This is an automated confirmation. Please do not reply to this email.
              </p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `

    // Send both emails concurrently
    const [therapistResult, clientResult] = await Promise.allSettled([
      resend.emails.send({
        from: `Clinic Contact Form <${fromEmail}>`,
        to: toEmail,
        subject: `New Enquiry from ${name} — ${serviceLabel}`,
        html: therapistEmailHtml,
        replyTo: email,
      }),
      resend.emails.send({
        from: `Dr. [eisha usmani] <${fromEmail}>`,
        to: email,
        subject: 'Your message has been received',
        html: clientEmailHtml,
      }),
    ])

    if (therapistResult.status === 'rejected') {
      console.error('[Contact API] Failed to send therapist email:', therapistResult.reason)
      return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 })
    }

    if (clientResult.status === 'rejected') {
      console.warn('[Contact API] Failed to send client confirmation:', clientResult.reason)
      // Still return success — the main notification was sent
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Contact API] Unexpected error:', error)
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 })
  }
}
