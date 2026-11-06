import type { RequestStatus } from '../types/dashboard'

const statusConfig: Record<RequestStatus, { label: string; className: string }> = {
  new: { label: 'Neu', className: 'bg-sky-50 text-sky-700 ring-sky-200' },
  processing: { label: 'In Bearbeitung', className: 'bg-indigo-50 text-indigo-700 ring-indigo-200' },
  missing_information: { label: 'Fehlende Angaben', className: 'bg-amber-50 text-amber-800 ring-amber-200' },
  needs_review: { label: 'Manuelle Prüfung', className: 'bg-orange-50 text-orange-800 ring-orange-200' },
  ready_for_approval: { label: 'Zur Freigabe', className: 'bg-violet-50 text-violet-700 ring-violet-200' },
  approved: { label: 'Freigegeben', className: 'bg-emerald-50 text-emerald-700 ring-emerald-200' },
  completed: { label: 'Abgeschlossen', className: 'bg-slate-100 text-slate-700 ring-slate-200' },
}

export function StatusBadge({ status }: { status: RequestStatus }) {
  const { label, className } = statusConfig[status]
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${className}`}>
      {label}
    </span>
  )
}
