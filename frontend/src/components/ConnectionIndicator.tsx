import type { BackendConnectionState } from '../types/health'

const presentation = {
  checking: { dot: 'bg-slate-400 animate-pulse', label: 'Verbindung wird geprüft …' },
  online: { dot: 'bg-emerald-500', label: 'Backend verbunden' },
  degraded: { dot: 'bg-amber-500', label: 'Datenbank nicht erreichbar' },
  offline: { dot: 'bg-red-500', label: 'Backend nicht erreichbar' },
} as const

function tooltipFor(state: BackendConnectionState): string {
  switch (state.kind) {
    case 'checking':
      return 'Statusabfrage läuft'
    case 'online':
    case 'degraded':
      return `API v${state.health.version} · Umgebung: ${state.health.environment} · Datenbank: ${
        state.health.database.status === 'ok' ? 'OK' : 'Fehler'
      }`
    case 'offline':
      return state.error
  }
}

export function ConnectionIndicator({ state }: { state: BackendConnectionState }) {
  const { dot, label } = presentation[state.kind]
  return (
    <div
      className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700"
      title={tooltipFor(state)}
      role="status"
      aria-live="polite"
    >
      <span className={`h-2 w-2 rounded-full ${dot}`} aria-hidden="true" />
      <span className="hidden sm:inline">{label}</span>
    </div>
  )
}
