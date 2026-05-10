import { MatchCard } from '@/components/matchmaking/MatchCard.jsx'
import { EmptyState } from '@/components/ui/empty-state.jsx'

export function MatchmakingList({ matches, onRequestMeeting }) {
  if (!matches.length) {
    return (
      <EmptyState
        title="No matches found"
        description="Try adjusting the smart filters to broaden the result set."
      />
    )
  }

  return (
    <div className="space-y-4">
      {matches.map((match) => (
        <MatchCard
          key={match.id}
          match={match}
          onRequestMeeting={onRequestMeeting}
        />
      ))}
    </div>
  )
}
