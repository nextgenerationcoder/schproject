import type { HealthResponse } from '../types/health'

/**
 * Base URL of the backend API. Empty by default so that requests go to the same origin
 * (the Vite dev server proxies /api to FastAPI). Override with VITE_API_BASE_URL.
 */
const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? ''

export class ApiError extends Error {
  readonly status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

async function getJson<T>(path: string, signal?: AbortSignal): Promise<{ status: number; data: T }> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { Accept: 'application/json' },
    signal,
  })
  const data = (await response.json().catch(() => null)) as T | null
  if (data === null) {
    throw new ApiError(response.status, `Unexpected response from ${path} (HTTP ${response.status})`)
  }
  return { status: response.status, data }
}

/** The health endpoint returns 503 with a body when the database is unreachable. */
export async function fetchHealth(signal?: AbortSignal): Promise<HealthResponse> {
  const { status, data } = await getJson<HealthResponse>('/api/health', signal)
  if (status !== 200 && status !== 503) {
    throw new ApiError(status, `Health check failed (HTTP ${status})`)
  }
  return data
}
