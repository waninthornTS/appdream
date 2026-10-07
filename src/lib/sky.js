import { useEffect, useState } from 'react'
import { useStored } from './storage'

// Time-of-day theme: the whole app's sky follows the clock.
export const SKIES = {
  morning: { emoji: '🌅', label: 'ยามเช้า', top: '#ffd9c2' },
  day: { emoji: '☀️', label: 'กลางวัน', top: '#bfe3ff' },
  evening: { emoji: '🌇', label: 'ยามเย็น', top: '#ffa9a0' },
  night: { emoji: '🌙', label: 'กลางคืน', top: '#24224f' },
}

export function skyFor(date) {
  const h = date.getHours()
  if (h >= 5 && h < 10) return 'morning'
  if (h >= 10 && h < 16) return 'day'
  if (h >= 16 && h < 19) return 'evening'
  return 'night'
}

export function useNow(intervalMs = 30000) {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])
  return now
}

// Sky follows the clock unless the user picked one in settings.
export function useSky(intervalMs) {
  const now = useNow(intervalMs)
  const [mode] = useStored('skyMode', 'auto')
  return { now, sky: SKIES[mode] ? mode : skyFor(now) }
}
