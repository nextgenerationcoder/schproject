import type { ReactNode } from 'react'

import { Icon } from './components/Icon'

export interface NavItem {
  path: string
  label: string
  icon: ReactNode
}

export const navItems: NavItem[] = [
  { path: '/', label: 'Dashboard', icon: <Icon name="dashboard" /> },
  { path: '/anfragen', label: 'Anfragen', icon: <Icon name="inbox" /> },
  { path: '/angebote', label: 'Angebote', icon: <Icon name="document" /> },
  { path: '/produkte', label: 'Produkte', icon: <Icon name="box" /> },
  { path: '/kunden', label: 'Kunden', icon: <Icon name="users" /> },
  { path: '/einstellungen', label: 'Einstellungen', icon: <Icon name="settings" /> },
]

export function pageTitleFor(pathname: string): string {
  const match = navItems.find((item) => item.path === pathname)
  return match?.label ?? 'Seite nicht gefunden'
}
