'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import DeviceFrame from './devices/DeviceFrame'
import FloatingCard from './ui/FloatingCard'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface FloatingCardData {
  id: string
  title: string
  description: string
  initialX: number
  initialY: number
  delay: number
}

const DeviceStorySection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const deviceRef = useRef<HTMLDivElement>(null)
  const leftTextRef = useRef<HTMLDivElement>(null)
  const rightTextRef = useRef<HTMLDivElement>(null)
  const keyboardRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  
  const [floatingCards, setFloatingCards] = useState<FloatingCardData[]>([])
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    const cards: FloatingCardData[] = [
      { id: '1', title: 'Responsive', description: 'Adapts to any screen', initialX: -150, initialY: -100, delay: 0.1 },
      { id: '2', title: 'Fast', description: 'Optimized performance', initialX: 150, initialY: -120, delay: 0.2 },
      { id: '3', title: 'Modern', description: 'Latest technologies', initialX: -180, initialY: 80, delay: 0.3 },
      { id: '4', title: 'Secure', description: 'Built with security', initialX: 170, initialY: 100, delay: 0.4 },
      { id: '5', title: 'Scalable', description: 'Grows with your needs', initialX: -120, initialY: -50, delay: 0.5 },
      { id: '6', title: 'Intuitive', description: 'User-friendly design', initialX: 140, initialY: 60, delay: 0.6 },
    ]
    setFloatingCards(cards)
  }, [])

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768)
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current || !deviceRef.current || !leftTextRef.current || !rightTextRef.current || !keyboardRef.current || !cardsRef.current) return

    const section = sectionRef.current
    const container = containerRef.current
    const device = deviceRef.current
    const leftText = leftTextRef.current
    const rightText = rightTextRef.current
    const keyboard = keyboardRef.current
    const cards = cardsRef.current

    // Responsive behavior with matchMedia
    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      // Desktop - Full animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: true,
          start: 'top top',
          end: '+=3000',
        },
      })

      // Scene 1: Mobile (0-33%)
      tl.set(device, {
        width: '280px',
        height: '560px',
        borderRadius: '40px',
        x: '100px',
        rotateY: 0,
        rotateX: 0,
        translateZ: 0,
      })
      tl.set(leftText, { opacity: 1, x: 0 })
      tl.set(rightText, { opacity: 0, x: 50 })
      tl.set(keyboard, { opacity: 0, y: 20 })

      // Scene 2: Tablet (33-66%)
      tl.to(device, {
        width: '500px',
        height: '350px',
        borderRadius: '20px',
        x: 0,
        rotateY: 5,
        ease: 'power2.inOut',
      }, 0)
      tl.to(leftText, {
        opacity: 0,
        x: -50,
        ease: 'power2.inOut',
      }, 0)
      tl.to(rightText, {
        opacity: 1,
        x: 0,
        ease: 'power2.inOut',
      }, 0)

      // Scene 3: Laptop (66-100%)
      tl.to(device, {
        width: '900px',
        height: '550px',
        borderRadius: '12px',
        rotateY: 0,
        rotateX: -5,
        translateZ: 50,
        ease: 'power2.inOut',
      }, 0.33)
      tl.to(keyboard, {
        opacity: 1,
        y: 0,
        ease: 'power2.inOut',
      }, 0.5)

      // Floating cards entrance (starts at 66%)
      tl.to(cards.children, {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.1,
        ease: 'power2.out',
      }, 0.66)

      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      }
    })

    mm.add('(max-width: 767px)', () => {
      // Mobile - Simplified animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          scrub: true,
          start: 'top top',
          end: '+=1000',
        },
      })

      // Simple fade-in for stacked devices
      tl.from(device, {
        opacity: 0,
        y: 50,
        ease: 'power2.out',
      })
      tl.from(leftText, {
        opacity: 0,
        y: 30,
        ease: 'power2.out',
      }, 0.2)
      tl.from(rightText, {
        opacity: 0,
        y: 30,
        ease: 'power2.out',
      }, 0.4)
      tl.from(cards.children, {
        opacity: 0,
        y: 20,
        stagger: 0.05,
        ease: 'power2.out',
      }, 0.6)

      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      }
    })

    return () => {
      mm.revert()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [isDesktop])

  return (
    <section 
      ref={sectionRef}
      className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden"
      style={{ height: isDesktop ? '400vh' : 'auto' }}
    >
      <div 
        ref={containerRef}
        className={`${isDesktop ? 'sticky top-0 h-screen' : 'relative min-h-screen'} flex items-center justify-center`}
      >
        <div className="relative w-full max-w-6xl mx-auto px-8">
          {/* Left text container */}
          <div 
            ref={leftTextRef}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 text-white space-y-4"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Mobile First
            </h2>
            <p className="text-lg text-gray-300">
              Experience seamless performance on any device with our responsive design.
            </p>
            <p className="text-sm text-gray-400">
              Optimized for touch interactions and mobile workflows.
            </p>
          </div>

          {/* Device container */}
          <div className="relative flex items-center justify-center">
            {/* Gradient glow behind device */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl rounded-full" />
            
            {/* Device frame */}
            <div ref={deviceRef} className="relative z-10">
              <DeviceFrame />
            </div>

            {/* Keyboard base (for laptop) */}
            <div 
              ref={keyboardRef}
              className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-96 h-24 bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700"
            >
              <div className="flex justify-center items-center h-full space-x-2">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="w-8 h-8 bg-gray-700 rounded shadow-inner" />
                ))}
              </div>
            </div>
          </div>

          {/* Right text container */}
          <div 
            ref={rightTextRef}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 text-white space-y-4"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Desktop Power
            </h2>
            <p className="text-lg text-gray-300">
              Unleash full productivity with advanced features and keyboard shortcuts.
            </p>
            <p className="text-sm text-gray-400">
              Professional tools for demanding workflows and complex projects.
            </p>
          </div>

          {/* Floating cards */}
          <div 
            ref={cardsRef}
            className="absolute inset-0 pointer-events-none"
          >
            {floatingCards.map((card) => (
              <div
                key={card.id}
                className="absolute top-1/2 left-1/2"
                style={{
                  transform: `translate(${card.initialX}px, ${card.initialY}px)`,
                }}
              >
                <FloatingCard
                  title={card.title}
                  description={card.description}
                  delay={card.delay}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default DeviceStorySection
