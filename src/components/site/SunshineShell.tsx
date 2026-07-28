import Image from 'next/image'
import Link from 'next/link'

export function SunshineHeader() {
  return (
    <header className='sticky top-0 z-40 border-b border-[#EEE3C6] bg-[#FFFCF4]/95 backdrop-blur'>
      <div className='mx-auto flex max-w-6xl items-center justify-between gap-5 px-4 py-4 sm:px-6 lg:px-8'>
        <Link href='/' aria-label='Sunshine Support Care home'>
          <Image src='/images/header-logo.svg' alt='Sunshine Support Care' width={150} height={32} priority />
        </Link>
        <nav className='flex items-center gap-4 text-sm font-semibold text-[#37313C] sm:gap-7'>
          <Link href='/' className='hover:text-[#2F7668]'>
            Home
          </Link>
          <Link href='/contact' className='hover:text-[#2F7668]'>
            Contact
          </Link>
          <a
            href='tel:+447518519306'
            className='hidden rounded-md bg-[#2F7668] px-4 py-2 text-white transition hover:bg-[#285f54] sm:inline-flex'
          >
            Call us
          </a>
        </nav>
      </div>
    </header>
  )
}

export function SunshineFooter() {
  return (
    <footer className='bg-[#37313C] px-4 py-10 text-white sm:px-6 lg:px-8'>
      <div className='mx-auto grid max-w-6xl gap-8 md:grid-cols-[1fr_1.4fr] md:items-center'>
        <Image
          src='/images/bottom-logo.svg'
          alt='Sunshine Support Care'
          width={180}
          height={180}
          className='h-28 w-auto'
        />
        <div className='grid gap-5 text-sm leading-6 text-white/75 sm:grid-cols-3'>
          <div>
            <p className='font-semibold text-white'>Address</p>
            <p className='mt-2'>1 High Point, Ruthin Close, Luton, LU1 5EJ</p>
          </div>
          <div>
            <p className='font-semibold text-white'>Phone</p>
            <a className='mt-2 block hover:text-[#FFD159]' href='tel:+447518519306'>
              +44 7518 519 306
            </a>
          </div>
          <div>
            <p className='font-semibold text-white'>Email</p>
            <a className='mt-2 block hover:text-[#FFD159]' href='mailto:admin@sunshinsupportcare.co.uk'>
              admin@sunshinsupportcare.co.uk
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export function SunshinePageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-screen bg-[#FFFCF4] text-[#37313C]'>
      <SunshineHeader />
      {children}
      <SunshineFooter />
    </div>
  )
}
