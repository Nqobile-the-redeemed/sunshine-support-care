'use client'
import Image from 'next/image'
import React, { useState } from 'react'

type ComingSoonFormState = {
  name: string
  email: string
  message: string
}

const initialState: ComingSoonFormState = {
  name: '',
  email: '',
  message: ''
}

export default function ComingSoonPage() {
  const [form, setForm] = useState<ComingSoonFormState>(initialState)
  const [status, setStatus] = useState<'idle' | 'submitted'>('idle')

  function onChange(field: keyof ComingSoonFormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setStatus('idle')
      setForm(prev => ({ ...prev, [field]: e.target.value }))
    }
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const payload: ComingSoonFormState = {
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim()
    }

    console.log('ComingSoon contact form submit', payload)

    setStatus('submitted')
    setForm(initialState)
  }

  return (
    <div className='min-h-screen bg-[#FCFCFA]'>
      <header className='mx-auto w-full max-w-(--breakpoint-2xl) px-4 pt-6 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between gap-4 rounded-2xl bg-gray-100/80 px-4 py-3 sm:px-6 sm:py-4'>
          <img src='/images/header-logo.svg' alt='Sunshine Support Care' className='h-8 w-auto shrink-0 sm:h-9' />
          <a
            href='tel:+447518519306'
            className='shrink-0 text-sm font-semibold text-[#2F2D3A] underline-offset-4 hover:underline sm:text-base'
          >
            +44 7518 519 306
          </a>
        </div>
      </header>

      <main className='mx-auto w-full max-w-(--breakpoint-2xl) px-4 pb-12 sm:px-6 lg:px-8'>
        <section className='shadow-theme-sm relative mt-6 overflow-hidden rounded-3xl bg-[#FFF3D2] px-5 pt-8 pb-10 sm:px-10 sm:pt-12 md:pb-16'>
          <div className='grid gap-8 md:grid-cols-12 md:items-end'>
            <div className='md:col-span-12'>
              <h1 className='text-center text-[clamp(2.75rem,8vw,6.75rem)] leading-[0.9] font-extrabold tracking-[0.08em] text-[#FFC94D] sm:text-left'>
                SOCIAL CARE
              </h1>
              <p className='mt-3 text-center text-xl font-extrabold tracking-[0.22em] text-[#2F2D3A] sm:text-2xl md:text-left'>
                COMING SOON
              </p>
            </div>

            <div className='relative z-10 md:col-span-7'>
              <p className='max-w-xl text-sm leading-6 text-[#2F2D3A]/80 sm:text-base'>
                We are a new care company that provides both domiciliary and supported living care. Our website is in
                development but feel free to contact us.
              </p>

              <form onSubmit={onSubmit} className='mt-6 max-w-xl' aria-label='Contact Sunshine Support Care'>
                <div className='grid gap-3 sm:grid-cols-2 sm:gap-4'>
                  <div>
                    <label htmlFor='coming-soon-name' className='sr-only'>
                      Name
                    </label>
                    <input
                      id='coming-soon-name'
                      name='name'
                      type='text'
                      autoComplete='name'
                      placeholder='Name'
                      value={form.name}
                      onChange={onChange('name')}
                      className='shadow-theme-xs w-full rounded-md bg-white px-4 py-2.5 text-sm text-[#2F2D3A] ring-1 ring-transparent outline-none placeholder:text-[#2F2D3A]/70 focus:ring-2 focus:ring-[#2F7668]/35'
                    />
                  </div>
                  <div>
                    <label htmlFor='coming-soon-email' className='sr-only'>
                      Email
                    </label>
                    <input
                      id='coming-soon-email'
                      name='email'
                      type='email'
                      autoComplete='email'
                      placeholder='Email'
                      value={form.email}
                      onChange={onChange('email')}
                      className='shadow-theme-xs w-full rounded-md bg-white px-4 py-2.5 text-sm text-[#2F2D3A] ring-1 ring-transparent outline-none placeholder:text-[#2F2D3A]/70 focus:ring-2 focus:ring-[#2F7668]/35'
                    />
                  </div>
                </div>

                <div className='mt-3 sm:mt-4'>
                  <label htmlFor='coming-soon-message' className='sr-only'>
                    Message
                  </label>
                  <textarea
                    id='coming-soon-message'
                    name='message'
                    placeholder='Message'
                    value={form.message}
                    onChange={onChange('message')}
                    rows={6}
                    className='shadow-theme-xs w-full resize-none rounded-md bg-white px-4 py-3 text-sm text-[#2F2D3A] ring-1 ring-transparent outline-none placeholder:text-[#2F2D3A]/70 focus:ring-2 focus:ring-[#2F7668]/35'
                  />
                </div>

                <button
                  type='submit'
                  className='shadow-theme-sm mt-3 w-full rounded-md bg-[#2F7668] px-4 py-3 text-sm font-semibold text-white transition outline-none hover:bg-[#285f54] focus-visible:ring-2 focus-visible:ring-[#2F7668]/50 focus-visible:ring-offset-2 sm:mt-4'
                >
                  Send
                </button>

                {status === 'submitted' ? (
                  <p className='mt-3 text-sm font-medium text-[#2F7668]' role='status'>
                    Thank you, we will be in touch soon.
                  </p>
                ) : null}
              </form>
            </div>

            <div className='relative md:col-span-5 md:self-end'>
              <div className='relative mx-auto mt-2 h-[360px] w-[280px] sm:h-[460px] sm:w-[360px] md:absolute md:right-6 md:bottom-0 md:mt-0 md:h-[560px] md:w-[420px] lg:h-[620px] lg:w-[480px]'>
                <Image
                  src='/images/nurse-image.png'
                  alt='Nurse'
                  fill
                  priority
                  className='pointer-events-none object-contain object-bottom select-none'
                />
              </div>
            </div>
          </div>
        </section>

        <footer className='relative -mt-6 sm:-mt-10'>
          <div className='shadow-theme-sm rounded-t-3xl bg-white px-5 py-8 sm:px-10 sm:py-10'>
            <div className='grid items-center gap-8 md:grid-cols-2'>
              <div className='flex justify-center md:justify-start'>
                <img src='/images/bottom-logo.svg' alt='Sunshine Support Care' className='h-16 w-auto sm:h-20' />
              </div>

              <address className='text-center text-sm leading-6 text-[#2F2D3A]/80 not-italic sm:text-base md:text-right'>
                <div>1 High Point,</div>
                <div>Ruthin Close,</div>
                <div>Luton</div>
                <div>LU1 5EJ</div>
                <div className='mt-4'>
                  <a
                    href='tel:+447518519306'
                    className='font-semibold text-[#2F2D3A] underline-offset-4 hover:underline'
                  >
                    +44 7518 519 306
                  </a>
                </div>
                <div className='mt-2'>
                  <a
                    href='mailto:info@sunshinesupportcare.com'
                    className='font-semibold text-[#2F2D3A] underline-offset-4 hover:underline'
                  >
                    info@sunshinesupportcare.com
                  </a>
                </div>
              </address>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
