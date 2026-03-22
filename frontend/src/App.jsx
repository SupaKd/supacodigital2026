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

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const navLogoRef = useRef(null)

  return (
    <>
      {!loaded && (
        <Loader
          onDone={() => setLoaded(true)}
          navLogoRef={navLogoRef}
        />
      )}
      <Navbar navLogoRef={navLogoRef} />
      <main>
        <Hero />
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
        <Contact />
      </main>
      <Footer />
      <Chatbot />
      <ScrollToTop />
    </>
  )
}
