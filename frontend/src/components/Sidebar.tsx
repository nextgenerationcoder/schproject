import { NavLink } from 'react-router-dom'

import { navItems } from '../navigation'
import { Icon } from './Icon'

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-30 bg-slate-900/40 lg:hidden ${open ? 'block' : 'hidden'}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-brand-900 text-brand-50 transition-transform lg:static lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Hauptnavigation"
      >
        <div className="flex h-16 items-center justify-between gap-3 border-b border-white/10 px-5">
          <div className="flex items-center gap-3">
            <img src="/favicon.svg" alt="" className="h-8 w-8" />
            <div className="leading-tight">
              <div className="text-sm font-semibold">Angebotsassistent</div>
              <div className="text-xs text-brand-100/70">Verkaufsinnendienst</div>
            </div>
          </div>
          <button
            type="button"
            className="rounded p-1 text-brand-100 hover:bg-white/10 lg:hidden"
            onClick={onClose}
            aria-label="Navigation schließen"
          >
            <Icon name="close" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-700 text-white shadow-sm ring-1 ring-inset ring-white/15'
                    : 'text-brand-100/80 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-white/10 px-5 py-4 text-xs text-brand-100/60">
          Entwicklungsstand: Schritt 1
        </div>
      </aside>
    </>
  )
}
