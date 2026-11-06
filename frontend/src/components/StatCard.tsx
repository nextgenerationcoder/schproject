import { DemoBadge } from './DemoDataNotice'
import { Icon, type IconName } from './Icon'

interface StatCardProps {
  label: string
  value: number
  icon: IconName
  accent: string // Tailwind classes for the icon container
  isDemo?: boolean
}

const numberFormat = new Intl.NumberFormat('de-DE')

export function StatCard({ label, value, icon, accent, isDemo = false }: StatCardProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-md ${accent}`}>
          <Icon name={icon} />
        </div>
        {isDemo && <DemoBadge />}
      </div>
      <div className="mt-4 text-3xl font-semibold tabular-nums text-slate-900">{numberFormat.format(value)}</div>
      <div className="mt-1 text-sm text-slate-500">{label}</div>
    </div>
  )
}
