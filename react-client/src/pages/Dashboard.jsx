import {
  TrendingUp,
  Users,
  BarChart3,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  ArrowRight,
} from 'lucide-react'

export const Dashboard = () => {
  const stats = [
    {
      title: 'Total Partners',
      value: '2,543',
      change: '+12.5%',
      isPositive: true,
      icon: Users,
      accent: 'from-primary to-accent-secondary',
    },
    {
      title: 'Active Meetings',
      value: '847',
      change: '+4.3%',
      isPositive: true,
      icon: Activity,
      accent: 'from-sky-500 to-cyan-500',
    },
    {
      title: 'Revenue',
      value: '$124.5K',
      change: '+18.2%',
      isPositive: true,
      icon: TrendingUp,
      accent: 'from-emerald-500 to-teal-500',
    },
    {
      title: 'Growth Rate',
      value: '24.8%',
      change: '-2.1%',
      isPositive: false,
      icon: BarChart3,
      accent: 'from-amber-500 to-orange-500',
    },
  ]

  const recentPartners = [
    {
      id: 1,
      name: 'Acme Corporation',
      status: 'Active',
      joinDate: '2024-01-15',
      meetings: 12,
    },
    {
      id: 2,
      name: 'TechStart Inc',
      status: 'Active',
      joinDate: '2024-01-20',
      meetings: 8,
    },
    {
      id: 3,
      name: 'Global Solutions',
      status: 'Pending',
      joinDate: '2024-02-01',
      meetings: 3,
    },
    {
      id: 4,
      name: 'Innovation Labs',
      status: 'Active',
      joinDate: '2024-02-05',
      meetings: 15,
    },
  ]

  return (
    <div className="space-y-10">
      <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div className="space-y-6">
          <div className="section-pill w-fit">
            <span className="section-pill-dot animate-pulse-dot" />
            <span className="section-label text-accent">Operations dashboard</span>
          </div>

          <div className="space-y-4">
            <h1 className="max-w-3xl text-4xl leading-[1.05] tracking-[-0.04em] md:text-5xl lg:text-[4.5rem]">
              Partner operations, <span className="gradient-text">made legible.</span>
            </h1>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
              A cleaner view of partner momentum, meetings, and revenue across the workspace.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="shell-panel shell-panel-hover p-5">
              <p className="section-label text-muted-foreground">Total partners</p>
              <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-foreground">2,543</p>
              <p className="mt-2 text-sm text-muted-foreground">+12.5% from last month</p>
            </div>
            <div className="shell-panel shell-panel-hover p-5">
              <p className="section-label text-muted-foreground">Active meetings</p>
              <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-foreground">847</p>
              <p className="mt-2 text-sm text-muted-foreground">Live scheduling pipeline</p>
            </div>
            <div className="shell-panel shell-panel-hover p-5">
              <p className="section-label text-muted-foreground">Revenue</p>
              <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-foreground">$124.5K</p>
              <p className="mt-2 text-sm text-muted-foreground">Trailing 30 days</p>
            </div>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="gradient-border animate-reveal">
            <div className="relative overflow-hidden rounded-[calc(1.75rem-1px)] bg-card p-6">
              <div className="absolute inset-0 dot-grid opacity-[0.06]" />
              <div className="relative min-h-[360px] rounded-[1.5rem] border border-border/70 bg-background/80 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="section-label text-muted-foreground">Live snapshot</p>
                    <p className="mt-2 text-xl font-semibold tracking-[-0.03em] text-foreground">
                      The workspace is breathing.
                    </p>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent-secondary text-white shadow-accent">
                    <Sparkles className="h-5 w-5" />
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-center">
                  <div className="relative h-52 w-52 rounded-full border border-border/60 animate-spin-slow">
                    <div className="absolute left-1/2 top-2 h-3 w-3 -translate-x-1/2 rounded-full bg-accent" />
                    <div className="absolute bottom-2 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-accent-secondary" />
                    <div className="absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-primary" />
                    <div className="absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-foreground" />
                  </div>
                </div>

                <div className="absolute left-8 top-36 w-40 rounded-2xl border border-border/70 bg-card/95 p-4 shadow-[0_16px_40px_rgba(15,23,42,0.08)] animate-float">
                  <p className="section-label text-muted-foreground">Trend</p>
                  <p className="mt-2 text-lg font-semibold tracking-[-0.03em] text-foreground">+18.2%</p>
                </div>

                <div className="absolute bottom-8 right-8 w-44 rounded-2xl border border-border/70 bg-card/95 p-4 shadow-[0_16px_40px_rgba(15,23,42,0.08)] animate-float-delayed">
                  <p className="section-label text-muted-foreground">Momentum</p>
                  <p className="mt-2 text-lg font-semibold tracking-[-0.03em] text-foreground">847 live meetings</p>
                </div>

                <div className="absolute bottom-8 left-1/2 h-20 w-20 -translate-x-1/2 rounded-[1.5rem] bg-gradient-to-br from-primary to-accent-secondary shadow-accent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="surface-inverted overflow-hidden p-6 md:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
          <div>
            <div className="section-pill w-fit border-white/10 bg-white/5">
              <span className="section-pill-dot animate-pulse-dot bg-white shadow-[0_0_0_6px_rgba(255,255,255,0.12)]" />
              <span className="section-label text-white/70">Momentum</span>
            </div>

            <h2 className="mt-5 max-w-2xl text-3xl leading-tight tracking-[-0.03em] md:text-4xl">
              Signal first, clutter last.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80 md:text-base">
              The layout foregrounds trend lines, active work, and live activity without forcing the eye through a dense wall of widgets.
            </p>

            <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
              <span className="h-2 w-2 rounded-full bg-white" />
              Real-time workspace health is stable
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="section-label text-white/50">Activity</p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">92%</p>
              <p className="mt-3 h-1.5 rounded-full bg-white/10">
                <span className="block h-full w-[92%] rounded-full bg-gradient-to-r from-primary to-accent-secondary" />
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="section-label text-white/50">Response</p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">1.8h</p>
              <p className="mt-3 h-1.5 rounded-full bg-white/10">
                <span className="block h-full w-[64%] rounded-full bg-gradient-to-r from-primary to-accent-secondary" />
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="section-label text-white/50">Forecast</p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">Stable</p>
              <p className="mt-3 h-1.5 rounded-full bg-white/10">
                <span className="block h-full w-[78%] rounded-full bg-gradient-to-r from-primary to-accent-secondary" />
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          const ArrowIcon = stat.isPositive ? ArrowUpRight : ArrowDownRight
          const textColor = stat.isPositive ? 'text-emerald-600' : 'text-red-600'

          return (
            <div key={stat.title} className="shell-panel shell-panel-hover group p-6">
              <div className="flex items-start justify-between">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.accent} text-white shadow-accent`}>
                  <Icon className="h-6 w-6" />
                </div>
                <span className={`section-label ${stat.isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
                  {stat.isPositive ? 'up' : 'down'}
                </span>
              </div>

              <h3 className="mt-6 text-sm font-medium text-muted-foreground">
                {stat.title}
              </h3>
              <p className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-foreground">
                {stat.value}
              </p>

              <div className={`mt-3 flex items-center gap-1 ${textColor}`}>
                <ArrowIcon className="h-4 w-4" />
                <span className="text-sm font-medium">{stat.change}</span>
              </div>
            </div>
          )
        })}
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <div className="shell-panel overflow-hidden">
          <div className="flex items-center justify-between border-b border-border/70 px-6 py-5">
            <div>
              <p className="section-label text-muted-foreground">Recent partners</p>
              <h2 className="mt-2 text-2xl tracking-[-0.03em] text-foreground">
                Activity you can scan in seconds.
              </h2>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-accent-secondary"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/70 bg-muted/20">
                  <th className="px-6 py-4 text-left font-medium text-muted-foreground">
                    Company Name
                  </th>
                  <th className="px-6 py-4 text-left font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left font-medium text-muted-foreground">
                    Join Date
                  </th>
                  <th className="px-6 py-4 text-left font-medium text-muted-foreground">
                    Meetings
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentPartners.map((partner, idx) => (
                  <tr
                    key={partner.id}
                    className={`border-b border-border/60 transition-colors hover:bg-muted/30 ${
                      idx === recentPartners.length - 1 ? 'border-b-0' : ''
                    }`}
                  >
                    <td className="px-6 py-4 font-medium text-foreground">
                      {partner.name}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          partner.status === 'Active'
                            ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                            : 'bg-amber-500/10 text-amber-700 dark:text-amber-300'
                        }`}
                      >
                        {partner.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {partner.joinDate}
                    </td>
                    <td className="px-6 py-4 font-medium text-foreground">
                      {partner.meetings}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="shell-panel p-6">
            <p className="section-label text-muted-foreground">Quick stats</p>
            <h3 className="mt-2 text-2xl tracking-[-0.03em] text-foreground">
              Quick Stats
            </h3>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Avg. Meetings/Partner
                </span>
                <span className="font-semibold text-foreground">12.4</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-accent-secondary"
                  style={{ width: '62%' }}
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-sm text-muted-foreground">
                  Conversion Rate
                </span>
                <span className="font-semibold text-foreground">48.5%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-accent-secondary"
                  style={{ width: '48.5%' }}
                />
              </div>
            </div>
          </div>

          <div className="shell-panel p-6">
            <p className="section-label text-muted-foreground">Upcoming events</p>
            <h3 className="mt-2 text-2xl tracking-[-0.03em] text-foreground">
              Upcoming Events
            </h3>
            <div className="mt-6 space-y-3">
              <div className="rounded-2xl border border-border/70 bg-muted/35 p-4">
                <p className="text-sm font-medium text-foreground">
                  Partner Summit 2024
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  March 15, 2024
                </p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-muted/35 p-4">
                <p className="text-sm font-medium text-foreground">
                  Q1 Strategy Review
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  March 20, 2024
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}