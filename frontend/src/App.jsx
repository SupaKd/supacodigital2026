import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Projects from './components/Projects'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import ScrollToTop from './components/ScrollToTop'

export default function App() {
  return (
    <>
      <Navbar />
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
        <Contact />
      </main>
      <Footer />
      <Chatbot />
      <ScrollToTop />
    </>
  )
}
