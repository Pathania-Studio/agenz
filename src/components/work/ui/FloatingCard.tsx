'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface FloatingCardProps {
  title: string
  description: string
  delay: number
}

const FloatingCard = ({ title, description, delay }: FloatingCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initial state set by GSAP in parent component
    // This component handles the continuous Framer Motion animation
  }, [])

  // Random animation parameters for variety
  const yAmplitude = 10 + Math.random() * 15
  const rotateAmplitude = 2 + Math.random() * 3
  const duration = 3 + Math.random() * 2

  return (
    <motion.div
      ref={cardRef}
      className="pointer-events-auto"
      initial={{ opacity: 0, y: 60, scale: 0.8 }}
      // GSAP handles entrance animation, Framer Motion handles continuous loop
      animate={{
        y: [0, -yAmplitude, 0],
        rotate: [0, rotateAmplitude, -rotateAmplitude, 0],
      }}
      transition={{
        y: {
          duration,
          repeat: Infinity,
          ease: 'easeInOut',
          delay,
        },
        rotate: {
          duration: duration * 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay,
        },
      }}
    >
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-xl hover:bg-white/15 transition-colors duration-300">
        <div className="space-y-2">
          <h3 className="text-white font-semibold text-sm">{title}</h3>
          <p className="text-gray-300 text-xs leading-relaxed">{description}</p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full" />
        <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full" />
      </div>
    </motion.div>
  )
}

export default FloatingCard
