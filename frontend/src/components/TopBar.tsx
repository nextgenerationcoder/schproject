import type { BackendConnectionState } from '../types/health'
import { ConnectionIndicator } from './ConnectionIndicator'
import { Icon } from './Icon'

interface TopBarProps {
  title: string
  connection: BackendConnectionState
  onMenuClick: () => void
}

export function TopBar({ title, connection, onMenuClick }: TopBarProps) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-slate-200 bg-white px-4 sm:px-6">
      <button
        type="button"
        className="rounded p-1.5 text-slate-600 hover:bg-slate-100 lg:hidden"
        onClick={onMenuClick}
        aria-label="Navigation öffnen"
      >
        <Icon name="menu" />
      </button>

      <div className="min-w-0 flex-1">
        <div className="hidden text-xs font-medium uppercase tracking-wide text-slate-400 sm:block">
          Angebotsassistent Verkaufsinnendienst
        </div>
        <h1 className="truncate text-lg font-semibold text-slate-900">{title}</h1>
      </div>

      <ConnectionIndicator state={connection} />

      {/* Placeholder profile: authentication is added in a later development step. */}
      <div className="flex items-center gap-3" title="Platzhalter – Anmeldung folgt in einem späteren Schritt">
        <div className="hidden text-right leading-tight md:block">
          <div className="text-sm font-medium text-slate-800">Max Mustermann</div>
          <div className="text-xs text-slate-500">Verkaufsinnendienst (Platzhalter)</div>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-800">
          MM
        </div>
      </div>
    </header>
  )
}
