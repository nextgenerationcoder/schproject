/** Mirrors backend `app/schemas/health.py`. */
export interface DatabaseHealth {
  status: 'ok' | 'error'
  detail: string | null
}

export interface HealthResponse {
  status: 'ok' | 'degraded'
  app_name: string
  version: string
  environment: string
  database: DatabaseHealth
}

/** Connection state as shown in the UI. */
export type BackendConnectionState =
  | { kind: 'checking' }
  | { kind: 'online'; health: HealthResponse }
  | { kind: 'degraded'; health: HealthResponse }
  | { kind: 'offline'; error: string }
