import { useCallback, useEffect, useState } from 'react'

const PREFIX = 'leafy:'

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    return raw == null ? fallback : JSON.parse(raw)
  } catch {
    return fallback
  }
}

// Same-key hooks in different components stay in sync via this event.
const EVENT = 'leafy-storage'

export function useStored(key, fallback) {
  const [value, setValue] = useState(() => read(key, fallback))

  useEffect(() => {
    const onChange = (e) => {
      if (e.detail === key) setValue(read(key, fallback))
    }
    window.addEventListener(EVENT, onChange)
    return () => window.removeEventListener(EVENT, onChange)
    // fallback is a literal at every call site
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  const update = useCallback(
    (next) => {
      setValue((prev) => {
        const v = typeof next === 'function' ? next(prev) : next
        try {
          localStorage.setItem(PREFIX + key, JSON.stringify(v))
        } catch {
          /* storage full or blocked: keep in memory only */
        }
        queueMicrotask(() => window.dispatchEvent(new CustomEvent(EVENT, { detail: key })))
        return v
      })
    },
    [key],
  )

  return [value, update]
}

// Bookmarks: ids like "topic:sql/select" or "chord:C/major"
export function useSaved() {
  const [saved, setSaved] = useStored('saved', [])
  const isSaved = (id) => saved.includes(id)
  const toggle = (id) => setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [id, ...s]))
  return { saved, isSaved, toggle }
}

// Owner's nickname. Earlier builds used a placeholder; treat it as unset.
export function useName() {
  const [name, setName] = useStored('name', 'Dream')
  return [name === 'เจ้าของบ้าน' ? 'Dream' : name, setName]
}
