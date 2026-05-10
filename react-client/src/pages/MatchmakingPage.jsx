import { useMemo, useState } from "react";

import { MatchmakingList } from "@/components/matchmaking/MatchmakingList.jsx";
import { profileToMatch } from "@/components/matchmaking/profileToMatch.js";
import { RequestMeetingModal } from "@/components/matchmaking/RequestMeetingModal.jsx";
import { TopBar } from "@/components/matchmaking/TopBar.jsx";
import { useCompanyTypes } from "@/queries/useCompanyTypes.js";
import { useIndustries } from "@/queries/useIndustries.js";
import { useProfiles } from "@/queries/useProfiles.js";

const GOALS = [
  { value: "all", label: "All Goals" },
  { value: "offering", label: "Offering" },
  { value: "seeking", label: "Seeking" },
];

export function MatchmakingPage() {
  const [search, setSearch] = useState("");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [isRequestMeetingOpen, setIsRequestMeetingOpen] = useState(false);
  const [filters, setFilters] = useState({
    industry: "all",
    goal: "all",
    companyType: "all",
  });

  const { data: industriesData } = useIndustries({ limit: 100 });
  const { data: companyTypesData } = useCompanyTypes({ limit: 100 });
  const { data, isLoading, isError, error } = useProfiles({
    limit: 50,
    accepting_meetings: showAvailableOnly ? true : undefined,
  });

  const industries = useMemo(() => {
    const options = (industriesData?.items ?? []).map((industry) => ({
      value: industry.id,
      label: industry.name,
    }));

    return [{ value: "all", label: "All Industries" }, ...options];
  }, [industriesData?.items]);

  const companyTypes = useMemo(() => {
    const options = (companyTypesData?.items ?? []).map((companyType) => ({
      value: companyType.id,
      label: companyType.name,
    }));

    return [{ value: "all", label: "All Company Types" }, ...options];
  }, [companyTypesData?.items]);

  const matches = useMemo(() => {
    return (data?.items ?? []).map(profileToMatch);
  }, [data?.items]);

  const filteredMatches = useMemo(() => {
    const query = search.trim().toLowerCase();

    return matches.filter((item) => {
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.company.toLowerCase().includes(query) ||
        item.goalText.toLowerCase().includes(query) ||
        item.tags.some((tag) => tag.toLowerCase().includes(query));

      const matchesIndustry =
        filters.industry === "all" || item.industry === filters.industry;
      const matchesGoal = filters.goal === "all" || item.goal === filters.goal;
      const matchesCompanyType =
        filters.companyType === "all" ||
        item.companyType === filters.companyType;
      const matchesAvailability = !showAvailableOnly || item.available;

      return (
        matchesSearch &&
        matchesIndustry &&
        matchesGoal &&
        matchesCompanyType &&
        matchesAvailability
      );
    });
  }, [matches, search, filters, showAvailableOnly]);

  function handleFilterChange(key, value) {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function handleRequestMeeting(match) {
    setSelectedMatch(match);
    setIsRequestMeetingOpen(true);
  }

  return (
    <div className="animate-reveal">
      <div className="mb-6 space-y-2">
        <p className="section-label text-muted-foreground">B2B Matchmaking</p>
        <h1 className="text-3xl tracking-[-0.03em] text-foreground md:text-4xl">
          Partner Discovery
        </h1>
        <p className="max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
          Discover relevant partners, filter by business intent, and start
          high-value conversations.
        </p>
      </div>

      <TopBar
        search={search}
        onSearchChange={setSearch}
        filters={filters}
        onFilterChange={handleFilterChange}
        showAvailableOnly={showAvailableOnly}
        onShowAvailableOnlyChange={setShowAvailableOnly}
        industries={industries}
        goals={GOALS}
        companyTypes={companyTypes}
      />

      {isLoading ? (
        <div className="rounded-[1.25rem] border border-input/80 bg-card/95 px-5 py-10 text-center shadow-sm">
          <h3 className="text-lg font-semibold tracking-[-0.02em] text-foreground">
            Loading matches
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Finding available profiles for matchmaking.
          </p>
        </div>
      ) : isError ? (
        <div className="rounded-[1.25rem] border border-destructive/30 bg-card/95 px-5 py-10 text-center shadow-sm">
          <h3 className="text-lg font-semibold tracking-[-0.02em] text-foreground">
            Matches could not be loaded
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {error?.message ?? "Please try again in a moment."}
          </p>
        </div>
      ) : (
        <MatchmakingList
          matches={filteredMatches}
          onRequestMeeting={handleRequestMeeting}
        />
      )}

      <RequestMeetingModal
        match={selectedMatch}
        open={isRequestMeetingOpen}
        onOpenChange={setIsRequestMeetingOpen}
      />
    </div>
  );
}
