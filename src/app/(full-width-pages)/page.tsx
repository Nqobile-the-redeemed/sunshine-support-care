import type { Metadata } from 'next'
import ComingSoonPage from '@/components/ComingSoonPage'
import React from 'react'

export const metadata: Metadata = {
  title: 'Coming Soon | Sunshine Support Care',
  description:
    'Sunshine Support Care provides domiciliary and supported living care. Our website is in development — feel free to contact us.'
}

export default function HomePage() {
  return <ComingSoonPage />
}
