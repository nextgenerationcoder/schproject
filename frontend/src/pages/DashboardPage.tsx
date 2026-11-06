import { DemoDataNotice } from '../components/DemoDataNotice'
import { RecentRequestsTable } from '../components/RecentRequestsTable'
import { StatCard } from '../components/StatCard'
import { demoRecentRequests, demoStats } from '../data/demoData'

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <DemoDataNotice />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Anfragen gesamt" value={demoStats.totalRequests} icon="inbox" accent="bg-sky-50 text-sky-700" isDemo />
        <StatCard
          label="Anfragen in Warteschlange"
          value={demoStats.awaitingProcessing}
          icon="clock"
          accent="bg-amber-50 text-amber-700"
          isDemo
        />
        <StatCard
          label="Angebote zur Freigabe"
          value={demoStats.awaitingApproval}
          icon="document"
          accent="bg-violet-50 text-violet-700"
          isDemo
        />
        <StatCard
          label="Abgeschlossene Angebote"
          value={demoStats.completedQuotations}
          icon="check"
          accent="bg-emerald-50 text-emerald-700"
          isDemo
        />
      </div>

      <RecentRequestsTable requests={demoRecentRequests} />
    </div>
  )
}
