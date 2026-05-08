import { BriefcaseBusiness, Building2 } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Separator } from '@/components/ui/separator.jsx'

function initials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export function MatchCard({ match, onRequestMeeting }) {
  return (
    <Card className="w-full hover:translate-y-0">
      <CardContent className="px-4 pb-4 pt-4 sm:px-5 lg:px-6 lg:pb-6 lg:pt-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <div className="flex min-w-0 flex-1 items-start gap-4 lg:max-w-[290px] lg:flex-[0.95]">
            <Avatar className="size-14 rounded-2xl">
              <AvatarImage src={match.avatar} alt={match.name} />
              <AvatarFallback>{initials(match.name)}</AvatarFallback>
            </Avatar>

            <div className="min-w-0 space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="truncate text-lg font-semibold tracking-[-0.02em] text-foreground">
                  {match.name}
                </h3>
                <span
                  className={`inline-flex h-2.5 w-2.5 shrink-0 rounded-full ${
                    match.available ? 'bg-primary' : 'bg-muted-foreground/50'
                  }`}
                  aria-label={match.available ? 'Available' : 'Fully booked'}
                  title={match.available ? 'Available' : 'Fully booked'}
                />
              </div>

              <div className="space-y-1 text-sm text-muted-foreground">
                <p className="inline-flex items-center gap-2">
                  <BriefcaseBusiness className="h-4 w-4" />
                  {match.title}
                </p>
                <p className="inline-flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  {match.company}
                </p>
              </div>

              <Badge variant={match.available ? 'default' : 'secondary'}>
                {match.available ? 'Available' : 'Fully Booked'}
              </Badge>
            </div>
          </div>

          <Separator className="lg:hidden" />
          <Separator orientation="vertical" className="hidden lg:block lg:h-24" />

          <div className="min-w-0 flex-1 space-y-4 lg:flex-[1.35]">
            <p className="text-sm leading-7 text-foreground/90">{match.goalText}</p>

            <div className="flex flex-wrap gap-2">
              {match.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <Separator className="lg:hidden" />
          <Separator orientation="vertical" className="hidden lg:block lg:h-24" />

          <div className="flex w-full flex-col gap-2 lg:w-auto lg:min-w-[180px]">
            <Button
              disabled={!match.available}
              onClick={() => onRequestMeeting?.(match)}
            >
              Request Meeting
            </Button>
            <Button variant="outline">Send Message</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
