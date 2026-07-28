export type WebQueryResponse = {
  id: string
  status: string
  webSource: string
  receivedAt: string
}

export type WhatsappIntentResponse = {
  verified: boolean
  intent: string
  webSource: string
  expiresIn: number
}

export type WhatsappIntentPayload = {
  intent: string
  sourceUrl: string
  formStartedAt: number
  website?: string
  recaptchaToken?: string | null
  recaptchaAction?: string
}

export type SunshineContactSubmission = {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  details: Record<string, string>
  sourceUrl: string
  website?: string
  formStartedAt: number
  recaptchaToken?: string | null
  recaptchaAction?: string
}

type ApiEnvelope<T> = {
  success?: boolean
  message?: string
  data?: T
  errors?: Record<string, string[]>
}

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly errors: Record<string, string[]> = {}
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

const API_BASE_URL = process.env.NEXT_PUBLIC_SUNSHINE_API_BASE_URL?.replace(/\/$/, '') ?? ''
const WEB_SOURCE = process.env.NEXT_PUBLIC_SUNSHINE_WEB_SOURCE ?? 'sunshinesupportcare.co.uk'

export async function submitSunshineContact(payload: SunshineContactSubmission) {
  const formData = new FormData()

  formData.set('name', payload.name)
  formData.set('email', payload.email)
  formData.set('phone', payload.phone ?? '')
  formData.set('subject', payload.subject)
  formData.set('enquiry_type', 'contact')
  formData.set('comment', payload.message)
  formData.set('details', JSON.stringify(payload.details))
  formData.set('consent', '1')
  formData.set('form_started_at', String(payload.formStartedAt))
  formData.set('source_url', payload.sourceUrl)
  formData.set('web_source', WEB_SOURCE)
  formData.set('website', payload.website ?? '')

  if (payload.recaptchaToken) {
    formData.set('recaptcha_token', payload.recaptchaToken)
    formData.set('recaptcha_action', payload.recaptchaAction ?? 'sunshine_contact')
  }

  const response = await fetch(`${API_BASE_URL}/v1/web-queries`, {
    method: 'POST',
    headers: {
      Accept: 'application/json'
    },
    body: formData
  })

  let body: ApiEnvelope<WebQueryResponse> = {}

  try {
    body = (await response.json()) as ApiEnvelope<WebQueryResponse>
  } catch {
    // Keep status fallback below for proxy/html errors.
  }

  if (!response.ok || body.success === false) {
    const validationMessage = Object.values(body.errors ?? {}).flat()[0]
    throw new ApiError(validationMessage ?? body.message ?? 'Your message could not be sent.', body.errors)
  }

  return body.data
}

export async function verifySunshineWhatsappIntent(payload: WhatsappIntentPayload) {
  const formData = new FormData()

  formData.set('intent', payload.intent)
  formData.set('form_started_at', String(payload.formStartedAt))
  formData.set('source_url', payload.sourceUrl)
  formData.set('web_source', WEB_SOURCE)
  formData.set('website', payload.website ?? '')

  if (payload.recaptchaToken) {
    formData.set('recaptcha_token', payload.recaptchaToken)
    formData.set('recaptcha_action', payload.recaptchaAction ?? 'sunshine_whatsapp')
  }

  const response = await fetch(`${API_BASE_URL}/v1/whatsapp-intents`, {
    method: 'POST',
    headers: {
      Accept: 'application/json'
    },
    body: formData
  })

  let body: ApiEnvelope<WhatsappIntentResponse> = {}

  try {
    body = (await response.json()) as ApiEnvelope<WhatsappIntentResponse>
  } catch {
    // Keep status fallback below for proxy/html errors.
  }

  if (!response.ok || body.success === false) {
    const validationMessage = Object.values(body.errors ?? {}).flat()[0]
    throw new ApiError(validationMessage ?? body.message ?? 'The WhatsApp chat could not be started.', body.errors)
  }

  return body.data
}
