import { useEffect, useState } from 'react'

import { fetchHealth } from '../services/api'
import type { BackendConnectionState } from '../types/health'

const POLL_INTERVAL_MS = 30_000

/** Polls GET /api/health and exposes the backend connection state. */
export function useBackendHealth(): BackendConnectionState {
  const [state, setState] = useState<BackendConnectionState>({ kind: 'checking' })

  useEffect(() => {
    let controller = new AbortController()

    const check = async () => {
      controller.abort()
      controller = new AbortController()
      try {
        const health = await fetchHealth(controller.signal)
        setState({ kind: health.status === 'ok' ? 'online' : 'degraded', health })
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return
        setState({ kind: 'offline', error: error instanceof Error ? error.message : String(error) })
      }
    }

    void check()
    const timer = window.setInterval(() => void check(), POLL_INTERVAL_MS)
    return () => {
      window.clearInterval(timer)
      controller.abort()
    }
  }, [])

  return state
}
