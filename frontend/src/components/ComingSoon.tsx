import { Icon } from './Icon'

interface ComingSoonProps {
  title: string
  description: string
  plannedFeatures: string[]
}

/** Placeholder for pages whose functionality is not implemented yet. */
export function ComingSoon({ title, description, plannedFeatures }: ComingSoonProps) {
  return (
    <section className="rounded-lg border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
        <Icon name="wrench" className="h-6 w-6" />
      </div>
      <h2 className="mt-4 text-lg font-semibold text-slate-900">{title}</h2>
      <p className="mt-1 text-sm font-medium text-brand-700">Folgt in einem späteren Entwicklungsschritt</p>
      <p className="mx-auto mt-3 max-w-xl text-sm text-slate-600">{description}</p>
      <p className="mx-auto mt-2 max-w-xl text-xs text-slate-500">
        Diese Seite hat noch keine Funktion. Es werden keine Daten geladen oder gespeichert.
      </p>
      <div className="mx-auto mt-6 max-w-md text-left">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Geplante Funktionen</h3>
        <ul className="mt-2 space-y-1.5 text-sm text-slate-700">
          {plannedFeatures.map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <Icon name="clock" className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
