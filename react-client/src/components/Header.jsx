import { Search, Moon, Sun, LogOut, Settings } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

export const Header = ({ onMenuToggle }) => {
  const { isDark, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 flex h-20 items-center gap-4 border-b border-border/60 bg-background/75 px-4 backdrop-blur-xl md:pl-72 md:px-8">
      <div className="flex flex-1 items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border/70 bg-card/90 text-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/30 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20 md:hidden"
          aria-label="Toggle menu"
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <div className="hidden lg:flex flex-1 max-w-2xl items-center">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="h-11 w-full rounded-2xl border border-border/70 bg-card/90 pl-11 pr-4 text-sm shadow-sm outline-none transition-all duration-200 placeholder:text-muted-foreground/60 focus:border-accent focus:ring-2 focus:ring-accent/15"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border/70 bg-card/90 text-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/30 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20 lg:hidden"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </button>

        <button
          onClick={toggleTheme}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border/70 bg-card/90 text-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20"
          aria-label="Toggle dark mode"
        >
          {isDark ? (
            <Sun className="h-5 w-5 text-amber-500" />
          ) : (
            <Moon className="h-5 w-5 text-slate-400" />
          )}
        </button>

        <div className="hidden h-7 w-px bg-border/70 sm:block" />

        <div className="hidden items-center gap-3 sm:flex">
          <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card/90 px-3 py-2 shadow-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent-secondary text-sm font-semibold text-white shadow-accent">
              JD
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">John Doe</p>
              <p className="text-xs text-muted-foreground">Admin</p>
            </div>
          </div>

          <div className="relative group">
            <button className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/70 bg-card/90 text-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20">
              <svg
                className="h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-3 w-56 rounded-2xl border border-border/70 bg-card/95 p-2 shadow-[0_24px_60px_rgba(15,23,42,0.12)] opacity-0 invisible transition-all duration-200 group-hover:visible group-hover:opacity-100">
              <a
                href="#profile"
                className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm text-foreground transition-colors hover:bg-muted/70"
              >
                <Settings className="h-4 w-4" />
                Profile Settings
              </a>
              <button className="mt-1 flex w-full items-center gap-2 rounded-xl border-t border-border/70 px-4 py-3 text-sm text-foreground transition-colors hover:bg-muted/70">
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>

        <button className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent-secondary text-sm font-semibold text-white shadow-accent sm:hidden">
          JD
        </button>
      </div>
    </header>
  )
}
