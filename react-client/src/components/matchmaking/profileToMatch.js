export function profileToMatch(profile) {
  const company = profile.company
  const offeringTags = company?.offering_tags ?? []
  const seekingTags = company?.seeking_tags ?? []
  const tags = [...new Set([...offeringTags, ...seekingTags])]

  return {
    id: profile.id,
    recipient_user_id: profile.user_id,
    name: [profile.first_name, profile.last_name].filter(Boolean).join(" "),
    title: profile.position,
    avatar: profile.avatar_url,
    company: company?.company_name ?? "Independent professional",
    industry: company?.industry_id ?? "all",
    goal: seekingTags.length ? "seeking" : "offering",
    companyType: company?.company_type_id ?? "all",
    available: profile.accepting_meetings ?? true,
    goalText:
      profile.bio ||
      company?.tagline ||
      profile.availability_note ||
      "Open to relevant B2B introductions and partnership conversations.",
    tags: tags.length ? tags : ["B2B"],
  }
}
