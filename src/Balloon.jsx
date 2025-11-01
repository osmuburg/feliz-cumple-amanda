import React from 'react'
import { motion } from 'framer-motion'

/*
  Componente Balloon
  Prop: index -> para variar delay/posición
*/
export default function Balloon({ index = 0 }) {
  const startX = Math.random() * 100 // vw
  const size = 70 + Math.random() * 100 // px
  const duration = 12 + Math.random() * 10
  const delay = Math.random() * 6
  const hueVariants = [
    { fill: '#FF7A9A' }, // rosa
    { fill: '#FFD166' }, // dorado suave
    { fill: '#8EC5FF' }, // celeste
    { fill: '#C7A3FF' }, // lila
    { fill: '#FFF1B6' }  // crema
  ]
  const color = hueVariants[Math.floor(Math.random() * hueVariants.length)].fill
  const wobble = (Math.random() * 8) - 4

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: `${startX}vw`,
        width: size,
        height: size * 1.3,
        zIndex: 2,
        pointerEvents: 'none'
      }}
      initial={{ y: '110vh', opacity: 0, rotate: Math.random() * 40 - 20 }}
      animate={{
        y: ['110vh', '-15vh'],
        x: [`${startX}vw`, `${startX + wobble}vw`],
        opacity: [0.8, 1, 0.9],
        rotate: [0, 6, -4, 0]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeInOut'
      }}
    >
      <svg viewBox="0 0 64 84" width={size} height={size * 1.3} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={`g-${index}`} x1="0" x2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.95"/>
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.25"/>
          </linearGradient>
        </defs>
        <ellipse cx="32" cy="28" rx="22" ry="26" fill={`url(#g-${index})`} stroke="rgba(0,0,0,0.04)" strokeWidth="1.5"/>
        <path d="M28 52c2 6 8 10 8 10s6-4 8-10" stroke="rgba(0,0,0,0.08)" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <line x1="32" y1="62" x2="32" y2="80" stroke="#c6b39a" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </motion.div>
  )
}
