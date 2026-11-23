'use client'

import { Navigation } from '@/components/Navigation'
import { Hero } from '@/components/Hero'
import { Philosophy } from '@/components/About'
import { Services } from '@/components/Services'
import { Portfolio } from '@/components/Portfolio'
import { Process } from '@/components/Process'
import { Team } from '@/components/Team'
import { Testimonials } from '@/components/Testimonials'
import { Contact } from '@/components/Contact'
import { Toaster } from '@/components/ui/toaster'

const schema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'House of Design',
  image: 'https://houseofdesign.in/images/project-1.png',
  description: 'Luxury interior design studio in Pune, India. Specializing in residential, commercial, and hospitality projects across Pune and Maharashtra.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Plot 7, Koregaon Park Lane 3',
    addressLocality: 'Pune',
    addressRegion: 'Maharashtra',
    postalCode: '411001',
    addressCountry: 'IN',
  },
  telephone: '+91-20-4108-5500',
  email: 'hello@houseofdesign.in',
  priceRange: '$$$$',
  areaServed: 'Pune, Maharashtra, India',
  serviceType: ['Interior Design', 'Space Planning', '3D Visualization', 'Residential Design', 'Commercial Design'],
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navigation />
      <main>
        <Hero />
        <Philosophy />
        <Services />
        <Portfolio />
        <Process />
        <Team />
        <Testimonials />
        <Contact />
      </main>
      <footer className="bg-secondary py-16 border-t border-border/40">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <p className="font-serif text-2xl tracking-wide text-foreground mb-1">HOUSE OF DESIGN</p>
              <p className="text-xs uppercase tracking-[0.25em] text-primary/70 font-light">Pune, India</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-px bg-primary/30" />
              <p className="text-xs text-foreground/35 uppercase tracking-[0.2em] font-light">
                © {new Date().getFullYear()} House of Design. All rights reserved.
              </p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-foreground/50 text-xs font-light">hello@houseofdesign.in</p>
              <p className="text-foreground/35 text-xs font-light mt-1">+91 20 4108 5500</p>
            </div>
          </div>
        </div>
      </footer>
      <Toaster />
    </>
  )
}
