import { useMemo, useState } from "react";

import { MatchmakingList } from "@/components/matchmaking/MatchmakingList.jsx";
import { RequestMeetingModal } from "@/components/matchmaking/RequestMeetingModal.jsx";
import { TopBar } from "@/components/matchmaking/TopBar.jsx";

const INDUSTRIES = [
  { value: "all", label: "All Industries" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "fintech", label: "Fintech" },
  { value: "software", label: "Software" },
  { value: "logistics", label: "Logistics" },
  { value: "consulting", label: "Consulting" },
];

const GOALS = [
  { value: "all", label: "All Goals" },
  { value: "offering", label: "Offering" },
  { value: "seeking", label: "Seeking" },
];

const COMPANY_TYPES = [
  { value: "all", label: "All Company Types" },
  { value: "enterprise", label: "Enterprise" },
  { value: "scaleup", label: "Scale-up" },
  { value: "agency", label: "Agency" },
  { value: "distributor", label: "Distributor" },
];

const MATCHES = [
  {
    id: 1,
    name: "Mila Novak",
    title: "Head of Partnerships",
    company: "Northbridge Systems",
    industry: "software",
    goal: "seeking",
    companyType: "enterprise",
    available: true,
    goalText:
      "Looking for strategic partners for the DACH market expansion and long-term reseller channels.",
    tags: ["SaaS", "DACH", "Reseller Program", "Enterprise"],
  },
  {
    id: 2,
    name: "Emir Hadzic",
    title: "Commercial Director",
    company: "Adria Logistics Group",
    industry: "logistics",
    goal: "offering",
    companyType: "enterprise",
    available: false,
    goalText:
      "Offering cross-border fulfillment infrastructure for B2B e-commerce and wholesale operations in CEE.",
    tags: ["Fulfillment", "Cross-border", "CEE", "Warehousing"],
  },
  {
    id: 3,
    name: "Sara Kovac",
    title: "VP Business Development",
    company: "Raven Capital Tech",
    industry: "fintech",
    goal: "seeking",
    companyType: "scaleup",
    available: true,
    goalText:
      "Seeking payment and compliance partners to accelerate onboarding for medium-sized B2B merchants.",
    tags: ["Payments", "Compliance", "Risk", "API Integrations"],
  },
  {
    id: 4,
    name: "Luka Petrovski",
    title: "Founder & CEO",
    company: "Helix Advisory",
    industry: "consulting",
    goal: "offering",
    companyType: "agency",
    available: true,
    goalText:
      "Offering GTM consulting for industrial companies entering new European channels and verticals.",
    tags: ["Go-to-Market", "B2B Sales", "Industrial", "Market Entry"],
  },
  {
    id: 5,
    name: "Ana Markovic",
    title: "International Sales Lead",
    company: "Orion Components",
    industry: "manufacturing",
    goal: "seeking",
    companyType: "distributor",
    available: false,
    goalText:
      "Seeking OEM and distribution alliances for advanced machine components in automotive supply chains.",
    tags: ["OEM", "Automotive", "Supply Chain", "Distribution"],
  },
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

  const filteredMatches = useMemo(() => {
    const query = search.trim().toLowerCase();

    return MATCHES.filter((item) => {
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
  }, [search, filters, showAvailableOnly]);

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
        industries={INDUSTRIES}
        goals={GOALS}
        companyTypes={COMPANY_TYPES}
      />

      <MatchmakingList
        matches={filteredMatches}
        onRequestMeeting={handleRequestMeeting}
      />

      <RequestMeetingModal
        match={selectedMatch}
        open={isRequestMeetingOpen}
        onOpenChange={setIsRequestMeetingOpen}
      />
    </div>
  );
}
