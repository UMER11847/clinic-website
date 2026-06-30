import Navbar from '@/components/navbar'
import Hero from '@/components/hero'
import About from '@/components/about'
import Services from '@/components/services'
import Modalities from '@/components/modalities'
import SessionFormats from '@/components/session-formats'
import Booking from '@/components/booking'
import Contact from '@/components/contact'
import Footer from '@/components/footer'

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Modalities />
        <SessionFormats />
        <Booking />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
