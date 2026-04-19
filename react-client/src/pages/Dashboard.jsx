import {
  TrendingUp,
  Users,
  BarChart3,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'

export const Dashboard = () => {
  // Sample statistics data
  const stats = [
    {
      title: 'Total Partners',
      value: '2,543',
      change: '+12.5%',
      isPositive: true,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Active Meetings',
      value: '847',
      change: '+4.3%',
      isPositive: true,
      icon: Activity,
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Revenue',
      value: '$124.5K',
      change: '+18.2%',
      isPositive: true,
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Growth Rate',
      value: '24.8%',
      change: '-2.1%',
      isPositive: false,
      icon: BarChart3,
      color: 'from-orange-500 to-orange-600',
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
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back! Here's your B2B Hub overview.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          const ArrowIcon = stat.isPositive ? ArrowUpRight : ArrowDownRight
          const textColor = stat.isPositive ? 'text-green-600' : 'text-red-600'

          return (
            <div
              key={stat.title}
              className="card-elevated group"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`p-3 rounded-lg bg-gradient-to-br ${stat.color} text-white`}
                >
                  <Icon className="w-6 h-6" />
                </div>
              </div>

              <h3 className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </h3>
              <p className="text-2xl font-bold text-foreground mt-2">
                {stat.value}
              </p>

              <div className={`flex items-center gap-1 mt-3 ${textColor}`}>
                <ArrowIcon className="w-4 h-4" />
                <span className="text-sm font-medium">{stat.change}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Partners Table */}
        <div className="lg:col-span-2 card-elevated">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">
              Recent Partners
            </h2>
            <a
              href="#"
              className="text-sm text-primary hover:text-accent transition-colors"
            >
              View All →
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                    Company Name
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                    Join Date
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                    Meetings
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentPartners.map((partner, idx) => (
                  <tr
                    key={partner.id}
                    className={`border-b border-border transition-colors hover:bg-muted/50 ${
                      idx === recentPartners.length - 1 ? 'border-b-0' : ''
                    }`}
                  >
                    <td className="py-3 px-4 text-foreground font-medium">
                      {partner.name}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          partner.status === 'Active'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                        }`}
                      >
                        {partner.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      {partner.joinDate}
                    </td>
                    <td className="py-3 px-4 text-foreground font-medium">
                      {partner.meetings}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Stats Sidebar */}
        <div className="space-y-6">
          {/* Activity Card */}
          <div className="card-elevated">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Quick Stats
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Avg. Meetings/Partner
                </span>
                <span className="font-semibold text-foreground">12.4</span>
              </div>
              <div className="h-1 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                  style={{ width: '62%' }}
                />
              </div>

              <div className="flex items-center justify-between pt-3">
                <span className="text-sm text-muted-foreground">
                  Conversion Rate
                </span>
                <span className="font-semibold text-foreground">48.5%</span>
              </div>
              <div className="h-1 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                  style={{ width: '48.5%' }}
                />
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="card-elevated">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Upcoming Events
            </h3>
            <div className="space-y-3">
              <div className="card-subtle">
                <p className="text-sm font-medium text-foreground">
                  Partner Summit 2024
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  March 15, 2024
                </p>
              </div>
              <div className="card-subtle">
                <p className="text-sm font-medium text-foreground">
                  Q1 Strategy Review
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  March 20, 2024
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
