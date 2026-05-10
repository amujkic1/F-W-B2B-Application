import { Search } from 'lucide-react'

import { Input } from '@/components/ui/input.jsx'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.jsx'
import { Switch } from '@/components/ui/switch.jsx'

export function TopBar({
  search,
  onSearchChange,
  filters,
  onFilterChange,
  showAvailableOnly,
  onShowAvailableOnlyChange,
  industries,
  companyTypes,
}) {
  return (
    <section className="sticky top-4 z-30 mb-6 rounded-[1.25rem] border border-input/80 bg-card p-4 shadow-sm">
      <div className="grid gap-3 lg:grid-cols-[1.2fr_1fr_1fr_1fr_auto] lg:items-center">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by person, company, or keyword"
            className="pl-10"
          />
        </div>

        <Select
          value={filters.industry}
          onValueChange={(next) => onFilterChange('industry', next)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Industry" />
          </SelectTrigger>
          <SelectContent>
            {industries.map((industry) => (
              <SelectItem key={industry.value} value={industry.value}>
                {industry.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.companyType}
          onValueChange={(next) => onFilterChange('companyType', next)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Company Type" />
          </SelectTrigger>
          <SelectContent>
            {companyTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <label className="inline-flex h-11 items-center justify-between gap-3 rounded-xl border border-input/80 bg-background/90 px-3 text-sm text-foreground lg:min-w-[220px]">
          <span className="whitespace-nowrap">Show available only</span>
          <Switch
            checked={showAvailableOnly}
            onCheckedChange={onShowAvailableOnlyChange}
          />
        </label>
      </div>
    </section>
  )
}
