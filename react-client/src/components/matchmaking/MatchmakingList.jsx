import { MatchCard } from '@/components/matchmaking/MatchCard.jsx'

export function MatchmakingList({ matches }) {
  if (!matches.length) {
    return (
      <div className="rounded-[1.25rem] border border-input/80 bg-card/95 px-5 py-10 text-center shadow-sm">
        <h3 className="text-lg font-semibold tracking-[-0.02em] text-foreground">
          No matches found
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Try adjusting the smart filters to broaden the result set.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {matches.map((match) => (
        <MatchCard key={match.id} match={match} />
      ))}
    </div>
  )
}