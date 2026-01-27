'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const DeviceFrame = () => {
  const frameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Device frame is controlled by GSAP in parent component
    // This component just provides the visual structure
  }, [])

  return (
    <div 
      ref={frameRef}
      className="relative bg-gradient-to-b from-gray-900 to-black shadow-2xl border border-gray-800"
      style={{
        width: '280px',
        height: '560px',
        borderRadius: '40px',
      }}
    >
      {/* Device screen */}
      <div className="absolute inset-2 bg-gradient-to-br from-slate-950 to-slate-900 rounded-3xl overflow-hidden">
        {/* Screen content placeholder */}
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center space-y-4 p-8">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg" />
            <div className="space-y-2">
              <div className="w-32 h-4 bg-gray-700 rounded-full mx-auto" />
              <div className="w-24 h-3 bg-gray-600 rounded-full mx-auto" />
              <div className="w-28 h-3 bg-gray-600 rounded-full mx-auto" />
            </div>
            <div className="grid grid-cols-3 gap-2 mt-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-8 h-8 bg-gray-700 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
        
        {/* Screen reflection effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
      </div>

      {/* Device notch (for mobile/tablet) */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full" />

      {/* Device camera */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rounded-full" />

      {/* Side buttons */}
      <div className="absolute right-0 top-20 w-1 h-12 bg-gray-700 rounded-l" />
      <div className="absolute right-0 top-36 w-1 h-8 bg-gray-700 rounded-l" />
      <div className="absolute left-0 top-24 w-1 h-16 bg-gray-700 rounded-r" />

      {/* Bottom home indicator (for mobile) */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 bg-gray-600 rounded-full" />
    </div>
  )
}

export default DeviceFrame
