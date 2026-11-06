import type { RecentRequest } from '../types/dashboard'
import { DemoBadge } from './DemoDataNotice'
import { StatusBadge } from './StatusBadge'

const dateFormat = new Intl.DateTimeFormat('de-DE', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Europe/Berlin',
})

export function RecentRequestsTable({ requests }: { requests: RecentRequest[] }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
        <h2 className="text-base font-semibold text-slate-900">Neueste Anfragen</h2>
        <DemoBadge />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th scope="col" className="px-5 py-3">Nr.</th>
              <th scope="col" className="px-5 py-3">Kunde</th>
              <th scope="col" className="px-5 py-3">Betreff</th>
              <th scope="col" className="px-5 py-3">Eingang</th>
              <th scope="col" className="px-5 py-3">Status</th>
              <th scope="col" className="px-5 py-3">Bearbeiter</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {requests.map((request) => (
              <tr key={request.id} className="hover:bg-slate-50">
                <td className="whitespace-nowrap px-5 py-3 font-mono text-xs text-slate-500">{request.id}</td>
                <td className="whitespace-nowrap px-5 py-3 font-medium text-slate-900">{request.customer}</td>
                <td className="px-5 py-3 text-slate-700">{request.subject}</td>
                <td className="whitespace-nowrap px-5 py-3 tabular-nums text-slate-600">
                  {dateFormat.format(new Date(request.receivedAt))}
                </td>
                <td className="whitespace-nowrap px-5 py-3">
                  <StatusBadge status={request.status} />
                </td>
                <td className="whitespace-nowrap px-5 py-3 text-slate-600">
                  {request.assignee ?? <span className="text-slate-400">nicht zugewiesen</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
