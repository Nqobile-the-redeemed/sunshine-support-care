'use client'

import { useEffect, useMemo, useState } from 'react'
import { getRecaptchaToken, preloadRecaptcha } from '@/lib/recaptcha'
import { ApiError, verifySunshineWhatsappIntent } from '@/lib/webQuery'

const whatsappNumber = process.env.NEXT_PUBLIC_SUNSHINE_WHATSAPP_NUMBER ?? '447518519306'
const defaultMessage =
  process.env.NEXT_PUBLIC_SUNSHINE_WHATSAPP_MESSAGE ?? 'Hello Sunshine Support Care, I would like to make an enquiry.'

const options = [
  {
    intent: 'general_enquiry',
    label: 'General enquiry',
    message: defaultMessage
  },
  {
    intent: 'domiciliary_care',
    label: 'Domiciliary care',
    message: 'Hello Sunshine Support Care, I would like to enquire about domiciliary care.'
  },
  {
    intent: 'supported_living',
    label: 'Supported living',
    message: 'Hello Sunshine Support Care, I would like to enquire about supported living support.'
  },
  {
    intent: 'referral',
    label: 'Referral enquiry',
    message: 'Hello Sunshine Support Care, I would like to make a care referral.'
  },
  {
    intent: 'recruitment',
    label: 'Care job enquiry',
    message: 'Hello Sunshine Support Care, I would like to enquire about care job opportunities.'
  }
]

function buildWhatsappUrl(message: string) {
  return `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
}

function wait(ms: number) {
  return new Promise(resolve => window.setTimeout(resolve, ms))
}

export function WhatsappChatBox() {
  const [open, setOpen] = useState(false)
  const [startedAt] = useState(() => Math.floor(Date.now() / 1000))
  const [loadingIntent, setLoadingIntent] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const enabled = useMemo(() => whatsappNumber.replace(/\D/g, '').length >= 10, [])

  useEffect(() => {
    if (enabled) {
      preloadRecaptcha()
    }
  }, [enabled])

  if (!enabled) {
    return null
  }

  async function startChat(intent: string, message: string) {
    setError(null)
    setLoadingIntent(intent)

    try {
      const elapsed = Math.floor(Date.now() / 1000) - startedAt
      if (elapsed < 3) {
        await wait((3 - elapsed) * 1000)
      }

      const recaptchaToken = await getRecaptchaToken('sunshine_whatsapp')

      await verifySunshineWhatsappIntent({
        intent,
        sourceUrl: window.location.href,
        formStartedAt: startedAt,
        recaptchaToken,
        recaptchaAction: 'sunshine_whatsapp'
      })

      window.open(buildWhatsappUrl(message), '_blank', 'noopener,noreferrer')
      setOpen(false)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'WhatsApp chat could not be verified. Please try again.')
    } finally {
      setLoadingIntent(null)
    }
  }

  return (
    <div className='fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6'>
      {open && (
        <div className='w-[min(92vw,360px)] overflow-hidden rounded-lg border border-[#D8E4D5] bg-white shadow-2xl'>
          <div className='bg-[#2F7668] px-4 py-3 text-white'>
            <p className='text-sm font-bold'>Chat with Sunshine Support Care</p>
            <p className='mt-1 text-xs text-white/80'>
              Choose a topic and we will open WhatsApp after spam protection.
            </p>
          </div>
          <div className='space-y-2 p-3'>
            {options.map(option => (
              <button
                key={option.intent}
                type='button'
                disabled={loadingIntent !== null}
                onClick={() => startChat(option.intent, option.message)}
                className='flex min-h-11 w-full items-center justify-between rounded-md border border-[#E8DEC4] px-3 py-2 text-left text-sm font-semibold text-[#37313C] transition hover:border-[#2F7668] hover:bg-[#FFFCF4] disabled:cursor-not-allowed disabled:opacity-60'
              >
                <span>{option.label}</span>
                <span className='text-xs text-[#2F7668]'>
                  {loadingIntent === option.intent ? 'Checking...' : 'Open'}
                </span>
              </button>
            ))}
            {error && <p className='rounded-md bg-red-50 px-3 py-2 text-xs font-medium text-red-700'>{error}</p>}
            <p className='text-xs leading-5 text-[#5E5B63]'>Protected by Google reCAPTCHA before WhatsApp opens.</p>
          </div>
        </div>
      )}
      <button
        type='button'
        aria-expanded={open}
        onClick={() => setOpen(value => !value)}
        className='flex min-h-14 items-center gap-3 rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white shadow-xl transition hover:bg-[#1EAE56] focus:ring-4 focus:ring-[#25D366]/25 focus:outline-none'
      >
        <span className='flex h-8 w-8 items-center justify-center rounded-full bg-white text-xs font-black text-[#128C4A]'>
          WA
        </span>
        <span>{open ? 'Close chat' : 'WhatsApp chat'}</span>
      </button>
    </div>
  )
}
