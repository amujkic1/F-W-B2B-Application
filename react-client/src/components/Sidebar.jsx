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
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 bg-card border-r border-border z-40
          transition-transform duration-300 md:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo Section */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-border bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm">
              F-W
            </div>
            <span className="font-semibold text-foreground hidden sm:inline">
              B2B Hub
            </span>
          </div>
          <button
            onClick={onClose}
            className="md:hidden p-1 hover:bg-muted rounded-[var(--radius)] transition-colors"
            aria-label="Close menu"
          >
            <svg
              className="w-5 h-5"
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

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-2">
          <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Main Menu
          </p>

          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)

            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={onClose}
                className={`
                  flex items-center gap-3 px-3 py-3 rounded-[var(--radius)] transition-all duration-200
                  ${
                    active
                      ? 'bg-primary/10 text-primary font-semibold'
                      : 'text-foreground hover:bg-muted'
                  }
                `}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="flex-1">{item.label}</span>
                {active && (
                  <ChevronRight className="w-4 h-4 text-primary" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Bottom Section */}
        <div className="border-t border-border p-3">
          <button className="w-full flex items-center gap-3 px-3 py-3 rounded-[var(--radius)] text-foreground hover:bg-muted transition-colors">
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}
