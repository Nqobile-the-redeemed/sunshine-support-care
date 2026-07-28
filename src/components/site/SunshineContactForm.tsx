'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'
import { getRecaptchaToken, preloadRecaptcha } from '@/lib/recaptcha'
import { ApiError, submitSunshineContact } from '@/lib/webQuery'

type ContactValues = {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

const fieldClass =
  'w-full rounded-md border border-[#DDD2B7] bg-white px-4 py-3 text-sm text-[#37313C] shadow-theme-xs placeholder:text-[#756D78] focus:border-[#2F7668] focus:ring-4 focus:ring-[#2F7668]/10 focus:outline-none'
const errorFieldClass =
  'w-full rounded-md border border-error-500 bg-white px-4 py-3 text-sm text-[#37313C] shadow-theme-xs placeholder:text-[#756D78] focus:border-error-500 focus:ring-4 focus:ring-error-500/10 focus:outline-none'

function validate(values: ContactValues, consent: boolean) {
  const errors: Partial<Record<keyof ContactValues | 'consent', string>> = {}

  if (values.name.length < 2) {
    errors.name = 'Enter your name.'
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Enter a valid email address.'
  }

  if (values.subject.length < 3) {
    errors.subject = 'Enter a subject.'
  }

  if (values.message.length < 10) {
    errors.message = 'Enter a message with at least 10 characters.'
  }

  if (!consent) {
    errors.consent = 'Please confirm Sunshine Support Care can contact you about this enquiry.'
  }

  return errors
}

export function SunshineContactForm() {
  const formStartedAt = useRef(Math.floor(Date.now() / 1000))
  const [errors, setErrors] = useState<Partial<Record<keyof ContactValues | 'consent', string>>>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'sent' | 'failed'>('idle')
  const [message, setMessage] = useState('')

  useEffect(() => {
    preloadRecaptcha()
  }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const values = {
      name: String(formData.get('name') ?? '').trim(),
      email: String(formData.get('email') ?? '').trim(),
      phone: String(formData.get('phone') ?? '').trim(),
      subject: String(formData.get('subject') ?? '').trim(),
      message: String(formData.get('message') ?? '').trim()
    }
    const nextErrors = validate(values, formData.get('consent') === 'on')

    setErrors(nextErrors)
    setMessage('')

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    try {
      setStatus('submitting')
      const recaptchaAction = 'sunshine_contact'
      const recaptchaToken = await getRecaptchaToken(recaptchaAction)

      await submitSunshineContact({
        ...values,
        details: {
          Subject: values.subject,
          Message: values.message,
          Phone: values.phone || 'Not provided'
        },
        sourceUrl: window.location.href,
        website: String(formData.get('website') ?? ''),
        formStartedAt: formStartedAt.current,
        recaptchaToken,
        recaptchaAction
      })

      setStatus('sent')
      setMessage('Thank you. Your message has been sent to Sunshine Support Care.')
      form.reset()
      formStartedAt.current = Math.floor(Date.now() / 1000)
    } catch (error) {
      setStatus('failed')
      setMessage(
        error instanceof ApiError || error instanceof Error ? error.message : 'Your message could not be sent.'
      )
    }
  }

  return (
    <div className='shadow-theme-lg rounded-lg border border-[#EEE3C6] bg-white p-6'>
      <div className='border-b border-[#EEE3C6] pb-5'>
        <h2 className='text-2xl font-bold text-[#37313C]'>Contact Sunshine Support Care</h2>
        <p className='mt-2 text-sm leading-6 text-[#625B66]'>
          Send a message about care support, supported living, referrals or general enquiries.
        </p>
      </div>

      <form className='mt-6 grid gap-5' noValidate onSubmit={handleSubmit}>
        <input type='text' name='website' tabIndex={-1} autoComplete='off' aria-hidden='true' className='hidden' />

        <div className='grid gap-5 md:grid-cols-2'>
          <div>
            <label htmlFor='name' className='mb-1.5 block text-sm font-semibold'>
              Full name <span className='text-error-500'>*</span>
            </label>
            <input id='name' name='name' type='text' className={errors.name ? errorFieldClass : fieldClass} />
            {errors.name && <p className='text-error-600 mt-1.5 text-xs font-medium'>{errors.name}</p>}
          </div>

          <div>
            <label htmlFor='email' className='mb-1.5 block text-sm font-semibold'>
              Email address <span className='text-error-500'>*</span>
            </label>
            <input id='email' name='email' type='email' className={errors.email ? errorFieldClass : fieldClass} />
            {errors.email && <p className='text-error-600 mt-1.5 text-xs font-medium'>{errors.email}</p>}
          </div>
        </div>

        <div>
          <label htmlFor='phone' className='mb-1.5 block text-sm font-semibold'>
            Phone number
          </label>
          <input id='phone' name='phone' type='tel' className={fieldClass} />
        </div>

        <div>
          <label htmlFor='subject' className='mb-1.5 block text-sm font-semibold'>
            Subject <span className='text-error-500'>*</span>
          </label>
          <input id='subject' name='subject' type='text' className={errors.subject ? errorFieldClass : fieldClass} />
          {errors.subject && <p className='text-error-600 mt-1.5 text-xs font-medium'>{errors.subject}</p>}
        </div>

        <div>
          <label htmlFor='message' className='mb-1.5 block text-sm font-semibold'>
            Message <span className='text-error-500'>*</span>
          </label>
          <textarea id='message' name='message' rows={6} className={errors.message ? errorFieldClass : fieldClass} />
          {errors.message && <p className='text-error-600 mt-1.5 text-xs font-medium'>{errors.message}</p>}
        </div>

        <div>
          <label className='flex items-start gap-3 rounded-md border border-[#EEE3C6] bg-[#FFFCF4] p-4 text-sm leading-6 text-[#625B66]'>
            <input
              type='checkbox'
              name='consent'
              className='mt-1 h-4 w-4 rounded border-[#DDD2B7] text-[#2F7668] focus:ring-[#2F7668]'
            />
            <span>
              I agree that Sunshine Support Care can contact me about this enquiry and handle my details for that
              purpose.
            </span>
          </label>
          {errors.consent && <p className='text-error-600 mt-1.5 text-xs font-medium'>{errors.consent}</p>}
        </div>

        <p className='text-xs leading-5 text-[#756D78]'>
          Protected by Google reCAPTCHA. Backend verification is required before accepting submissions.
        </p>

        <button
          type='submit'
          disabled={status === 'submitting'}
          className='shadow-theme-xs inline-flex min-h-11 items-center justify-center rounded-md bg-[#2F7668] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#285f54] focus:ring-4 focus:ring-[#2F7668]/20 focus:outline-none disabled:bg-[#8FB8AE]'
        >
          {status === 'submitting' ? 'Sending...' : 'Send message'}
        </button>

        {message && (
          <p
            className={`text-sm font-semibold ${status === 'sent' ? 'text-success-700' : 'text-error-600'}`}
            role='alert'
          >
            {message}
          </p>
        )}
      </form>
    </div>
  )
}
