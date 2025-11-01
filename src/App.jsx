// file: src/App.jsx
import React, { useEffect, useRef, useState } from 'react'
import Balloon from './Balloon'
import confetti from 'canvas-confetti'
import { motion } from 'framer-motion'

const BALLOON_COUNT = 10

function triggerConfetti() {
  const duration = 1.5 * 1000
  const animationEnd = Date.now() + duration
  const defaults = { startVelocity: 30, spread: 160, ticks: 60, zIndex: 999 }

  const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now()

    if (timeLeft <= 0) {
      return clearInterval(interval)
    }

    const particleCount = 50 * (timeLeft / duration)
    confetti(Object.assign({}, defaults, {
      particleCount: Math.floor(particleCount),
      origin: { x: Math.random(), y: Math.random() * 0.2 }
    }))
  }, 250)
}

export default function App() {
  const [audioAllowed, setAudioAllowed] = useState(true)
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    // disparar confetti al montar
    triggerConfetti()

    // preparar audio
    const audioPath = import.meta.env.BASE_URL + 'birthday.mp3'
    const audio = new Audio(audioPath)
    audio.loop = true
    audio.volume = 0.22
    audioRef.current = audio

    audio.play()
      .then(() => {
        setIsPlaying(true)
      })
      .catch(() => {
        // autoplay bloqueado por navegador; mostrar botón
        setAudioAllowed(false)
        setIsPlaying(false)
      })

    return () => {
      audio.pause()
    }
  }, [])

  function handlePlayClick() {
    if (!audioRef.current) return
    audioRef.current.play()
      .then(() => {
        setIsPlaying(true)
        setAudioAllowed(true)
      })
      .catch(() => {
        setAudioAllowed(false)
      })
  }

  return (
    <div className="page">
      {/* capa de globos */}
      <div className="balloons-layer" aria-hidden>
        {Array.from({ length: BALLOON_COUNT }).map((_, i) => <Balloon key={i} index={i} />)}
      </div>

      {/* mensaje central */}
      <div className="center-layer">
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="message-card"
        >
          <h1>🎉 ¡Feliz cumple, Flaquita! 🎂</h1>
          <p>
            4 años aguantando mis locuras… ¡eso sí merece una medalla! 🏅😂  
            Que la vida te siga llenando de risas, aventuras, desgracias de la U (por la anécdota xd) y mil razones para sonreír.  
            Te quiero mucho!!!! 💖
          </p>
          <div className="small-note">— Tu compa SAPOMB favorito 😎</div>

        </motion.div>

        {/* botón audio fallback */}
        {!audioAllowed && (
          <button className="play-btn" onClick={handlePlayClick}>
            🎶 Reproducir música
          </button>
        )}

        {/* indicador pequeño de reproducción */}
        {audioAllowed && isPlaying && <div className="playing-dot">♪</div>}
      </div>

      {/* pie */}
      <div className="footer">1 de noviembre — 22 años</div>
    </div>
  )
}
