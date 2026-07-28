import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { SunshinePageShell } from '@/components/site/SunshineShell'

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Sunshine Support Care provides domiciliary care and supported living support in Luton with a warm, person-centred approach.'
}

const services = [
  {
    title: 'Domiciliary care',
    body: 'Practical, respectful support at home with daily routines, wellbeing checks and consistent communication.'
  },
  {
    title: 'Supported living',
    body: 'Person-centred support that helps people build independence while staying connected to safe daily care.'
  },
  {
    title: 'Family and referral enquiries',
    body: 'A clear first conversation for families, professionals and organisations looking for the right care pathway.'
  }
]

const values = ['Kind support', 'Reliable communication', 'Person-centred planning', 'Local care presence']

export default function HomePage() {
  return (
    <SunshinePageShell>
      <main>
        <section className='overflow-hidden bg-[#FFF3D2]'>
          <div className='mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8'>
            <div className='flex flex-col justify-center'>
              <p className='mb-4 inline-flex w-fit rounded-full border border-[#E9C85D] bg-white/70 px-3 py-1 text-xs font-bold tracking-[0.08em] text-[#2F7668] uppercase'>
                Domiciliary and supported living care
              </p>
              <h1 className='text-4xl leading-tight font-extrabold text-[#37313C] sm:text-5xl lg:text-6xl'>
                Support that brings steadiness, dignity and warmth into daily care.
              </h1>
              <p className='mt-6 max-w-2xl text-lg leading-8 text-[#625B66]'>
                Sunshine Support Care helps people and families arrange compassionate care support across home care and
                supported living needs.
              </p>
              <div className='mt-8 flex flex-col gap-3 sm:flex-row'>
                <Link
                  href='/contact'
                  className='shadow-theme-sm inline-flex min-h-11 items-center justify-center rounded-md bg-[#2F7668] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#285f54]'
                >
                  Contact us
                </Link>
                <a
                  href='tel:+447518519306'
                  className='inline-flex min-h-11 items-center justify-center rounded-md border border-[#2F7668] bg-white px-5 py-3 text-sm font-bold text-[#2F7668] transition hover:bg-[#F8F2DE]'
                >
                  +44 7518 519 306
                </a>
              </div>
            </div>

            <div className='relative min-h-[420px]'>
              <div className='absolute inset-x-8 bottom-0 h-72 rounded-t-full bg-[#FFD159]/70' />
              <Image
                src='/images/nurse-image.png'
                alt='Care professional from Sunshine Support Care'
                fill
                priority
                className='object-contain object-bottom'
              />
            </div>
          </div>
        </section>

        <section className='bg-white px-4 py-16 sm:px-6 lg:px-8'>
          <div className='mx-auto max-w-6xl'>
            <div className='max-w-2xl'>
              <p className='text-sm font-bold tracking-[0.08em] text-[#2F7668] uppercase'>How we help</p>
              <h2 className='mt-3 text-3xl font-bold text-[#37313C]'>Care support shaped around real daily needs.</h2>
            </div>
            <div className='mt-8 grid gap-5 md:grid-cols-3'>
              {services.map(service => (
                <article key={service.title} className='rounded-lg border border-[#EEE3C6] bg-[#FFFCF4] p-6'>
                  <h3 className='text-lg font-bold text-[#37313C]'>{service.title}</h3>
                  <p className='mt-3 text-sm leading-6 text-[#625B66]'>{service.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className='bg-[#F8F2DE] px-4 py-16 sm:px-6 lg:px-8'>
          <div className='mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center'>
            <div>
              <p className='text-sm font-bold tracking-[0.08em] text-[#2F7668] uppercase'>Our approach</p>
              <h2 className='mt-3 text-3xl font-bold text-[#37313C]'>Care should feel clear before it begins.</h2>
              <p className='mt-4 text-base leading-7 text-[#625B66]'>
                Use the contact form to share what kind of support you are looking for, who the support is for and the
                best way to reach you.
              </p>
            </div>
            <div className='grid gap-3 sm:grid-cols-2'>
              {values.map(value => (
                <div
                  key={value}
                  className='shadow-theme-xs rounded-md bg-white px-4 py-4 text-sm font-bold text-[#37313C]'
                >
                  {value}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </SunshinePageShell>
  )
}
