/**
 * FICTIONAL DEMONSTRATION DATA (Step 1).
 *
 * These values are invented for layout purposes only. They are not loaded from the
 * backend and do not represent real customers, requests or quotations. They will be
 * replaced by API data once the request and quotation modules exist (Step 2+).
 */
import type { DashboardStats, RecentRequest } from '../types/dashboard'

export const demoStats: DashboardStats = {
  totalRequests: 128,
  awaitingProcessing: 14,
  awaitingApproval: 6,
  completedQuotations: 97,
}

export const demoRecentRequests: RecentRequest[] = [
  {
    id: 'DEMO-1042',
    customer: 'Musterfirma GmbH',
    subject: 'Angebot Brezeln und Croissants für Firmenfeier',
    receivedAt: '2026-11-06T08:14:00+01:00',
    status: 'new',
    assignee: null,
  },
  {
    id: 'DEMO-1041',
    customer: 'Beispiel Kanzlei Schmidt & Partner',
    subject: 'Frühstücksbuffet für 40 Personen',
    receivedAt: '2026-11-05T16:42:00+01:00',
    status: 'missing_information',
    assignee: 'A. Becker',
  },
  {
    id: 'DEMO-1040',
    customer: 'Grundschule Am Lindenweg (fiktiv)',
    subject: 'Kuchen für Schulfest – Lieferung möglich?',
    receivedAt: '2026-11-05T11:03:00+01:00',
    status: 'needs_review',
    assignee: 'M. Wagner',
  },
  {
    id: 'DEMO-1039',
    customer: 'Demo Autohaus Nord',
    subject: 'Belegte Brötchen für Kundenevent',
    receivedAt: '2026-11-04T09:27:00+01:00',
    status: 'ready_for_approval',
    assignee: 'A. Becker',
  },
  {
    id: 'DEMO-1038',
    customer: 'Testverein e. V.',
    subject: 'Torte zum 50-jährigen Jubiläum',
    receivedAt: '2026-11-03T14:55:00+01:00',
    status: 'completed',
    assignee: 'S. Hoffmann',
  },
]
