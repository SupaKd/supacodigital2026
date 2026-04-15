import { useState, useRef } from 'react'
import './App.css'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Projects from './components/Projects'
import Testimonials from './components/Testimonials'
import Zone from './components/Zone'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import ScrollToTop from './components/ScrollToTop'
import CalendlyModal from './components/CalendlyModal'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [calendlyOpen, setCalendlyOpen] = useState(false)
  const navLogoRef = useRef(null)

  return (
    <>
      {!loaded && (
        <Loader
          onDone={() => setLoaded(true)}
          navLogoRef={navLogoRef}
        />
      )}
      {calendlyOpen && <CalendlyModal onClose={() => setCalendlyOpen(false)} />}
      <Navbar navLogoRef={navLogoRef} onOpenCalendly={() => setCalendlyOpen(true)} />
      <main>
        <Hero onOpenCalendly={() => setCalendlyOpen(true)} />
        <div className="divider divider--dark" />
        <About />
        <div className="divider divider--light" />
        <Services />
        <div className="divider" />
        <Projects />
        <div className="divider" />
        <Testimonials />
        <div className="divider" />
        <Zone />
        <div className="divider" />
        <Contact onOpenCalendly={() => setCalendlyOpen(true)} />
      </main>
      <Footer />
      <Chatbot />
      <ScrollToTop />
    </>
  )
}
