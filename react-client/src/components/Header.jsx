import { Search, Moon, Sun, LogOut, Settings } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

export const Header = ({ onMenuToggle }) => {
  const { isDark, toggleTheme } = useTheme()

  return (
    <header className="sticky-header h-16 px-6 md:px-8 flex items-center justify-between gap-4">
      {/* Left: Menu Toggle + Search */}
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={onMenuToggle}
          className="md:hidden p-2 hover:bg-muted rounded-[var(--radius)] transition-colors"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <div className="hidden sm:flex items-center flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="search-input pl-10"
            />
          </div>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Mobile Search Icon */}
        <button className="sm:hidden p-2 hover:bg-muted rounded-[var(--radius)] transition-colors">
          <Search className="w-5 h-5" />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="btn-ghost p-2 h-10 w-10"
          aria-label="Toggle dark mode"
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-amber-500" />
          ) : (
            <Moon className="w-5 h-5 text-slate-400" />
          )}
        </button>

        {/* Divider */}
        <div className="hidden sm:block w-px h-6 bg-border" />

        {/* User Profile Dropdown */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-semibold">
              JD
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-foreground">John Doe</p>
              <p className="text-xs text-muted-foreground">Admin</p>
            </div>
          </div>

          {/* Profile Menu Dropdown */}
          <div className="relative group">
            <button className="p-1 hover:bg-muted rounded-[var(--radius)] transition-colors">
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-0 w-48 bg-card border border-border rounded-[var(--radius)] shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <a
                href="#profile"
                className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted rounded-t-[var(--radius)] transition-colors"
              >
                <Settings className="w-4 h-4" />
                Profile Settings
              </a>
              <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted rounded-b-[var(--radius)] transition-colors border-t border-border">
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Profile Icon */}
        <button className="sm:hidden w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-semibold">
          JD
        </button>
      </div>
    </header>
  )
}
