import {
  ArrowRight,
  Building2,
  CalendarCheck2,
  CheckCircle2,
  Filter,
  Handshake,
  Search,
  ShieldCheck,
  Sparkles,
  Tags,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

import heroImage from "@/assets/hero.png";
import { buttonVariants } from "@/components/ui/button.jsx";

const valuePillars = [
  "Partner discovery",
  "Meeting requests",
  "Availability-aware scheduling",
  "Company profiles",
  "Intent-based matching",
];

const steps = [
  {
    title: "Create your profile",
    description:
      "Add your company, business goals, industries, tags, and meeting preferences.",
    icon: Building2,
  },
  {
    title: "Discover relevant matches",
    description:
      "Search and filter partners by intent, company type, industry, and availability.",
    icon: Search,
  },
  {
    title: "Request meetings",
    description:
      "Start focused conversations with the companies that fit your business needs.",
    icon: CalendarCheck2,
  },
];

const features = [
  {
    title: "Smart partner discovery",
    description:
      "Find companies by business intent, profile data, tags, industry, and company type.",
    icon: Filter,
  },
  {
    title: "Availability-aware matching",
    description:
      "Surface profiles that are ready for meetings and avoid stale outreach.",
    icon: CheckCircle2,
  },
  {
    title: "Meeting request workflow",
    description:
      "Move from discovery to a concrete next step without leaving the workspace.",
    icon: Handshake,
  },
  {
    title: "Organized company context",
    description:
      "Keep partner identity, goals, and relationship signals easy to scan.",
    icon: Tags,
  },
];

const audiences = [
  "B2B networks",
  "Startup ecosystems",
  "Chambers of commerce",
  "Trade fairs",
  "Partner programs",
  "Vendor discovery teams",
];

function ProductPreview() {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="rounded-[1.75rem] border border-border/70 bg-card p-3 shadow-[0_24px_70px_rgba(15,23,42,0.12)]">
        <div className="overflow-hidden rounded-[1.35rem] border border-border/70 bg-background">
          <div className="flex items-center justify-between border-b border-border/70 px-4 py-3">
            <div>
              <p className="section-label text-muted-foreground">
                Matchmaking
              </p>
              <p className="mt-1 text-sm font-semibold text-foreground">
                Partner Discovery
              </p>
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Available
            </div>
          </div>

          <div className="grid gap-4 p-4 md:grid-cols-[0.8fr_1.2fr]">
            <div className="space-y-3">
              <div className="rounded-2xl border border-border/70 bg-card p-3">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Search className="h-4 w-4 text-accent" />
                  Search partners
                </div>
                <div className="mt-3 h-9 rounded-xl border border-input bg-background px-3 py-2 text-xs text-muted-foreground">
                  fintech, export, logistics
                </div>
              </div>

              {["Industry", "Business goal", "Company type"].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-xl border border-border/70 bg-card px-3 py-2 text-xs"
                >
                  <span className="text-muted-foreground">{item}</span>
                  <span className="font-medium text-foreground">All</span>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              {[
                {
                  name: "Northstar Supply",
                  meta: "Seeking distribution partners",
                  tags: ["Logistics", "Retail"],
                },
                {
                  name: "Atlas Fintech",
                  meta: "Offering embedded payments",
                  tags: ["Fintech", "API"],
                },
              ].map((match) => (
                <div
                  key={match.name}
                  className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold tracking-[-0.01em] text-foreground">
                        {match.name}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {match.meta}
                      </p>
                    </div>
                    <Users className="h-5 w-5 text-accent" />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {match.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs font-medium text-emerald-600">
                      Accepting meetings
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                      Request
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent-secondary text-white shadow-accent">
              <Handshake className="h-5 w-5" />
            </span>
            <span className="text-sm font-semibold tracking-[-0.01em] md:text-base">
              F-W B2B
            </span>
          </Link>

          <div className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
            <a href="#features" className="transition-colors hover:text-foreground">
              Features
            </a>
            <a href="#workflow" className="transition-colors hover:text-foreground">
              How it works
            </a>
            <a href="#audience" className="transition-colors hover:text-foreground">
              Use cases
            </a>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              Sign in
            </Link>
            <Link
              to="/register"
              className={buttonVariants({ size: "sm" })}
            >
              Get started
            </Link>
          </div>
        </nav>
      </header>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-14 sm:px-6 md:pt-20 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:px-8">
        <div className="animate-reveal">
          <div className="section-pill w-fit">
            <span className="section-pill-dot" />
            <span className="section-label text-accent">
              B2B matchmaking workspace
            </span>
          </div>

          <h1 className="mt-6 max-w-4xl text-5xl leading-[1.02] tracking-[-0.04em] md:text-6xl lg:text-7xl">
            Find the right business partners faster.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
            Discover companies aligned with your goals, filter by industry and
            intent, and request meetings with available partners in a focused
            B2B workspace.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/register"
              className={buttonVariants({ size: "lg", className: "sm:w-auto" })}
            >
              Get started
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/login"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className: "sm:w-auto",
              })}
            >
              Sign in
            </Link>
          </div>

          <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
            {[
              ["2.5k+", "Partner profiles"],
              ["847", "Active meetings"],
              ["24%", "Growth signal"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-border/70 bg-card px-4 py-3 shadow-sm"
              >
                <p className="text-2xl font-semibold tracking-[-0.03em] text-foreground">
                  {value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="animate-reveal lg:pt-8">
          <ProductPreview />
        </div>
      </section>

      <section className="border-y border-border/70 bg-card/70">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 px-4 py-5 sm:px-6 lg:px-8">
          {valuePillars.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background px-4 py-2 text-sm text-muted-foreground shadow-sm"
            >
              <ShieldCheck className="h-4 w-4 text-accent" />
              {item}
            </span>
          ))}
        </div>
      </section>

      <section
        id="workflow"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="max-w-2xl">
          <p className="section-label text-accent">How it works</p>
          <h2 className="mt-3 text-3xl leading-tight tracking-[-0.03em] md:text-4xl">
            From profile to meeting request in three clear steps.
          </h2>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <article
                key={step.title}
                className="rounded-[1.5rem] border border-border/70 bg-card p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="section-label text-muted-foreground">
                    Step {index + 1}
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <Icon className="h-5 w-5" />
                  </span>
                </div>
                <h3 className="mt-6 text-xl tracking-[-0.02em]">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {step.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section id="features" className="bg-card/70">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
          <div>
            <p className="section-label text-accent">Features</p>
            <h2 className="mt-3 text-3xl leading-tight tracking-[-0.03em] md:text-4xl">
              Built around the real work of B2B introductions.
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
              The landing page points visitors toward the strongest product
              loop: create context, discover relevant companies, and request a
              meeting when there is a real fit.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="rounded-[1.5rem] border border-border/70 bg-background p-5 shadow-sm"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-accent">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-lg tracking-[-0.02em]">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="audience"
        className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-center lg:px-8"
      >
        <div>
          <div className="section-pill w-fit">
            <span className="section-pill-dot" />
            <span className="section-label text-accent">Use cases</span>
          </div>
          <h2 className="mt-5 text-3xl leading-tight tracking-[-0.03em] md:text-4xl">
            Built for business networks where the right introduction matters.
          </h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {audiences.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card px-4 py-3 shadow-sm"
            >
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium">{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[1.75rem] border border-border/70 bg-card px-6 py-10 shadow-[0_18px_48px_rgba(15,23,42,0.08)] md:px-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="section-label text-accent">Ready to connect</p>
              <h2 className="mt-3 text-3xl leading-tight tracking-[-0.03em] text-foreground md:text-4xl">
                Start building better business connections.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
                Give teams a cleaner way to find relevant partners, coordinate
                availability, and turn interest into meetings.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Link
                to="/register"
                className={buttonVariants({ size: "lg" })}
              >
                Create account
              </Link>
              <Link
                to="/login"
                className={buttonVariants({
                  variant: "outline",
                  size: "lg",
                })}
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
