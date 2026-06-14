import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { SiteProvider } from './context/site'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsappFab from './components/WhatsappFab'
import { trackPageView } from './lib/analytics'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Media from './pages/Media'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'

function RouteEffects() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
    trackPageView(pathname)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <SiteProvider>
      <RouteEffects />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:serviceSlug/:subSlug" element={<ServiceDetail />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/media" element={<Media />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <WhatsappFab />
    </SiteProvider>
  )
}
