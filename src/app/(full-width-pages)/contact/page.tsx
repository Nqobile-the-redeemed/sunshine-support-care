import type { Metadata } from 'next'
import { SunshineContactForm } from '@/components/site/SunshineContactForm'
import { SunshinePageShell } from '@/components/site/SunshineShell'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact Sunshine Support Care for domiciliary care, supported living care, referrals or general support enquiries.'
}

export default function ContactPage() {
  return (
    <SunshinePageShell>
      <main className='bg-white'>
        <section className='bg-[#FFF3D2] px-4 py-14 sm:px-6 sm:py-18 lg:px-8'>
          <div className='mx-auto max-w-6xl'>
            <p className='mb-4 inline-flex rounded-full border border-[#E9C85D] bg-white/70 px-3 py-1 text-xs font-bold tracking-[0.08em] text-[#2F7668] uppercase'>
              Contact
            </p>
            <h1 className='max-w-3xl text-4xl font-extrabold text-[#37313C] sm:text-5xl'>
              Tell us what support you need.
            </h1>
            <p className='mt-5 max-w-2xl text-lg leading-8 text-[#625B66]'>
              Send a message and Sunshine Support Care will respond using the details you provide.
            </p>
          </div>
        </section>

        <section className='px-4 py-14 sm:px-6 lg:px-8'>
          <div className='mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1.2fr]'>
            <div className='rounded-lg border border-[#EEE3C6] bg-[#FFFCF4] p-6'>
              <h2 className='text-xl font-bold text-[#37313C]'>Sunshine Support Care</h2>
              <div className='mt-5 space-y-5 text-sm leading-6 text-[#625B66]'>
                <div>
                  <p className='font-bold text-[#37313C]'>Phone</p>
                  <a href='tel:+447518519306' className='hover:text-[#2F7668]'>
                    +44 7518 519 306
                  </a>
                </div>
                <div>
                  <p className='font-bold text-[#37313C]'>Email</p>
                  <a href='mailto:admin@sunshinsupportcare.co.uk' className='break-all hover:text-[#2F7668]'>
                    admin@sunshinsupportcare.co.uk
                  </a>
                </div>
                <div>
                  <p className='font-bold text-[#37313C]'>Address</p>
                  <p>1 High Point, Ruthin Close, Luton, LU1 5EJ</p>
                </div>
              </div>
            </div>
            <SunshineContactForm />
          </div>
        </section>
      </main>
    </SunshinePageShell>
  )
}
