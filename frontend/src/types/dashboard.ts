export type RequestStatus =
  | 'new'
  | 'processing'
  | 'missing_information'
  | 'needs_review'
  | 'ready_for_approval'
  | 'approved'
  | 'completed'

export interface DashboardStats {
  totalRequests: number
  awaitingProcessing: number
  awaitingApproval: number
  completedQuotations: number
}

export interface RecentRequest {
  id: string
  customer: string
  subject: string
  receivedAt: string // ISO 8601
  status: RequestStatus
  assignee: string | null
}
