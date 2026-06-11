import React from 'react'
import { motion } from 'framer-motion'

// Scroll-triggered reveal with optional stagger via `delay`.
export default function Reveal({ children, delay = 0, y = 28, as = 'div', className, ...rest }) {
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
