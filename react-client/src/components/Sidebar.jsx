import { LayoutDashboard, Users, Settings, ChevronRight, LogOut } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

export const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation()

  const navItems = [
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      label: 'Partners',
      href: '/partners',
      icon: Users,
    },
    {
      label: 'Settings',
      href: '/settings',
      icon: Settings,
    },
  ]

  const isActive = (href) => location.pathname === href

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-950/50 backdrop-blur-[2px] md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 z-[60] flex h-screen w-72 flex-col border-r border-border/70 bg-background/90 backdrop-blur-xl transition-transform duration-300 md:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="border-b border-border/70 px-5 py-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent-secondary text-sm font-semibold text-white shadow-accent">
                F-W
              </div>
              <div>
                <span className="section-label text-muted-foreground">Minimalist Modern</span>
                <p className="text-sm font-semibold text-foreground">B2B Hub</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/70 bg-card/90 text-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/30 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20 md:hidden"
              aria-label="Close menu"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="mt-4 flex items-center gap-2 rounded-2xl border border-border/70 bg-muted/35 px-3 py-2">
            <span className="section-pill-dot animate-pulse-dot" />
            <span className="text-xs text-muted-foreground">Workspace online</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6">
          <p className="section-label mb-4 px-3 text-muted-foreground">Main Menu</p>

          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={onClose}
                  className={`group flex items-center gap-3 rounded-2xl px-3 py-3 transition-all duration-200 ${
                    active
                      ? 'bg-gradient-to-r from-primary/10 to-accent-secondary/10 text-foreground shadow-sm ring-1 ring-accent/15'
                      : 'text-muted-foreground hover:bg-muted/70 hover:text-foreground'
                  }`}
                >
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 ${
                      active
                        ? 'bg-gradient-to-br from-primary to-accent-secondary text-white shadow-accent'
                        : 'bg-muted/70 text-muted-foreground group-hover:bg-card group-hover:text-accent'
                    }`}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                  </span>
                  <span className="flex-1 text-sm font-medium">{item.label}</span>
                  {active && <ChevronRight className="h-4 w-4 text-accent" />}
                </Link>
              )
            })}
          </div>
        </nav>

        <div className="border-t border-border/70 p-4">
          <button className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-foreground transition-colors hover:bg-muted/70">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted/70 text-muted-foreground">
              <LogOut className="h-5 w-5" />
            </span>
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}
