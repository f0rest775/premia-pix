'use client'
import { useState, useEffect, useCallback } from 'react'
import { Timer } from 'lucide-react'

export function CountDown() {
  const [timeLeft, setTimeLeft] = useState(15 * 60)
  const [isClient, setIsClient] = useState(false)

  const formatTime = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }, [])

  const getInitialTime = useCallback(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedTime = localStorage.getItem('countdownTimeLeft')
      const savedTimestamp = localStorage.getItem('countdownTimestamp')

      if (savedTime && savedTimestamp) {
        const elapsedSeconds = Math.floor((Date.now() - parseInt(savedTimestamp)) / 1000)
        const remainingTime = Math.max(parseInt(savedTime) - elapsedSeconds, 0)
        return remainingTime
      }
    }

    return 15 * 60
  }, [])

  const saveToLocalStorage = useCallback((time: number) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('countdownTimeLeft', time.toString())
      localStorage.setItem('countdownTimestamp', Date.now().toString())
    }
  }, [])

  const tick = useCallback(() => {
    setTimeLeft((prev) => {
      const newTime = Math.max(prev - 1, 0)

      if (newTime % 10 === 0 || newTime === 0) {
        saveToLocalStorage(newTime)
      }

      return newTime
    })
  }, [saveToLocalStorage])

  useEffect(() => {
    setTimeLeft(getInitialTime())
    setIsClient(true)
  }, [getInitialTime])

  useEffect(() => {
    if (isClient && timeLeft > 0) {
      const intervalId = setInterval(tick, 1000)
      return () => clearInterval(intervalId)
    }
  }, [timeLeft, tick, isClient])

  return (
    <div
      className="w-full bg-red-500 h-16 z-10 sticky top-0 flex items-center justify-center gap-6"
    >
      <div className="flex items-center gap-3 pl-3">
        <Timer className="size-8 text-white" />
        <h2
          className="text-3xl font-bold text-white"
        >
          {isClient ? formatTime(timeLeft) : formatTime(15 * 60)}
        </h2>
      </div>

      <span
        className="text-base text-center font-bold text-white"
      >
        Pague a taxa e receba imediatamente.
      </span>
    </div>
  )
}