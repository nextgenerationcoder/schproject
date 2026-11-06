import { Icon } from './Icon'

/** Banner that marks fictional demonstration content. */
export function DemoDataNotice() {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
      <Icon name="alert" className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
      <p>
        <span className="font-semibold">Demonstrationsdaten:</span> Alle Kennzahlen und Anfragen auf dieser Seite sind
        frei erfunden und dienen nur der Darstellung. Echte Daten werden in einem späteren Entwicklungsschritt
        angebunden.
      </p>
    </div>
  )
}

export function DemoBadge() {
  return (
    <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-800">
      Demo
    </span>
  )
}
