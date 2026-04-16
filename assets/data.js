export const SITE = {
  name: "Vyom",
  brand: "Oracular",
  domainHint: "vyom-astro",
  lastUpdated: "2026-04-16"
};

export const COMPETITORS = [
  {
    slug: "astrosage",
    name: "AstroSage",
    company: "OjasSoft",
    batch: "batch1",
    market: "India",
    audience: "General Indian astrology users",
    pricing: "Free + paid consult/report",
    oneLiner: "Strong legacy reach, but narrower Varga and deep-research coverage."
  },
  {
    slug: "astrotalk",
    name: "AstroTalk",
    company: "AstroTalk",
    batch: "batch1",
    market: "India",
    audience: "Consultation-first users",
    pricing: "Free + per-minute consultations",
    oneLiner: "Huge consultation network, less product depth in advanced charting."
  },
  {
    slug: "align27",
    name: "Align27",
    company: "GMan Labs",
    batch: "batch1",
    market: "Global",
    audience: "Ritual and lifestyle users",
    pricing: "Subscription",
    oneLiner: "Modern wellness-led product, lighter Vedic technical depth."
  },
  {
    slug: "costar",
    name: "Co-Star",
    company: "Co-Star",
    batch: "batch1",
    market: "Global",
    audience: "Western casual astrology users",
    pricing: "Free + premium",
    oneLiner: "Popular Western app, not built for deep Vedic workflows."
  },
  {
    slug: "clickastro",
    name: "Clickastro",
    company: "Astro-Vision",
    batch: "batch1",
    market: "India",
    audience: "Regional and report-driven users",
    pricing: "Free + reports",
    oneLiner: "Trusted legacy brand with useful basics, fewer modern interactive tools."
  },
  {
    slug: "astroyogi",
    name: "Astroyogi",
    company: "Netway",
    batch: "batch2",
    market: "India",
    audience: "Consult + daily feed users",
    pricing: "Free + per-minute consultation",
    oneLiner: "Large India user base, more consult-led than product-led depth."
  },
  {
    slug: "instaastro",
    name: "InstaAstro",
    company: "InstaAstro",
    batch: "batch2",
    market: "India",
    audience: "Younger mobile users",
    pricing: "Free + per-consult",
    oneLiner: "Fast-growing consultation app with lighter technical chart stack."
  },
  {
    slug: "ganeshaspeaks",
    name: "GaneshaSpeaks",
    company: "Wellness Tech",
    batch: "batch2",
    market: "India",
    audience: "Traditional horoscope users",
    pricing: "Free + per-consult",
    oneLiner: "Strong daily content brand with less chart interactivity."
  },
  {
    slug: "chani",
    name: "CHANI",
    company: "Chani Nicholas",
    batch: "batch2",
    market: "Global",
    audience: "Western wellness audience",
    pricing: "Subscription",
    oneLiner: "Strong editorial voice and rituals, focused on Western framework."
  },
  {
    slug: "melooha",
    name: "Melooha",
    company: "Astroverse",
    batch: "batch2",
    market: "India",
    audience: "Young professionals",
    pricing: "Free + paid reports",
    oneLiner: "Modern India app with momentum, but fewer pro-level tools."
  }
];

export const BATCHES = {
  batch1: {
    title: "Vyom vs AstroSage, AstroTalk, Align27, Co-Star, Clickastro",
    slugs: ["astrosage", "astrotalk", "align27", "costar", "clickastro"],
    groups: [
      {
        id: "core",
        title: "Core features",
        rows: [
          { f: "Birth chart / Kundli", v: "Yes", c: { astrosage: "Yes", astrotalk: "Yes", align27: "Basic", costar: "Western only", clickastro: "Yes" } },
          { f: "Divisional charts (Varga)", v: "D1-D144 full", c: { astrosage: "D1-D16 only", astrotalk: "Limited", align27: "No", costar: "No", clickastro: "Some" } },
          { f: "Research vargas (D81, D108, D144)", v: "Yes", c: { astrosage: "No", astrotalk: "No", align27: "No", costar: "No", clickastro: "No" } },
          { f: "Vimshottari Dasha depth", v: "Maha-Pratyantar", c: { astrosage: "5 levels + Yogini", astrotalk: "Basic", align27: "Mahadasha only", costar: "No", clickastro: "Basic" } },
          { f: "Automated Yoga identification", v: "100s of yogas", c: { astrosage: "Some", astrotalk: "No", align27: "No", costar: "No", clickastro: "No" } },
          { f: "Live transit overlay on natal", v: "Yes", c: { astrosage: "Yes", astrotalk: "No", align27: "Partial", costar: "Western", clickastro: "No" } },
          { f: "Moon calendar and transit", v: "Yes", c: { astrosage: "Yes", astrotalk: "No", align27: "Chandrashtama", costar: "Moon phase", clickastro: "No" } },
          { f: "Kundli Milan (36-point)", v: "Yes", c: { astrosage: "Yes", astrotalk: "Yes", align27: "Basic", costar: "Western compat.", clickastro: "Yes" } },
          { f: "Mangal Dosha calculator", v: "Yes", c: { astrosage: "Yes", astrotalk: "Yes", align27: "No", costar: "No", clickastro: "Yes" } },
          { f: "Numerology", v: "Pythagorean + Vedic", c: { astrosage: "Vedic only", astrotalk: "Basic", align27: "No", costar: "No", clickastro: "Basic" } },
          { f: "Daily horoscope feed", v: "No", c: { astrosage: "Yes", astrotalk: "Yes", align27: "Yes", costar: "Yes", clickastro: "Yes" } },
          { f: "Panchang / Choghadiya", v: "Separate app", c: { astrosage: "Yes", astrotalk: "Yes", align27: "Hora only", costar: "No", clickastro: "Yes" } },
          { f: "Daily Vedic Scoreboard", v: "Yes", c: { astrosage: "No", astrotalk: "No", align27: "Green/Amber/Red", costar: "No", clickastro: "No" } },
          { f: "Personalized remedies", v: "Yes", c: { astrosage: "Some", astrotalk: "Some", align27: "Yes", costar: "No", clickastro: "No" } },
          { f: "Astrologer consultation", v: "No", c: { astrosage: "Yes", astrotalk: "Yes", align27: "No", costar: "No", clickastro: "Yes" } }
        ]
      },
      {
        id: "tech",
        title: "Technology",
        rows: [
          { f: "Integrated AI", v: "Uttara AI", c: { astrosage: "Bhrigoo.ai", astrotalk: "Generic AI", align27: "No", costar: "Generic AI", clickastro: "No" } },
          { f: "Learning tools / Vedic glossary", v: "Yes", c: { astrosage: "Text tutorials", astrotalk: "No", align27: "No", costar: "Limited", clickastro: "No" } },
          { f: "CRM for astrologers", v: "Yes", c: { astrosage: "No", astrotalk: "No", align27: "No", costar: "No", clickastro: "No" } },
          { f: "Seamless chart sharing", v: "Yes", c: { astrosage: "No", astrotalk: "No", align27: "No", costar: "No", clickastro: "No" } },
          { f: "Dual-chart / overlay mode", v: "Yes", c: { astrosage: "No", astrotalk: "No", align27: "Comparison", costar: "No", clickastro: "No" } },
          { f: "Multiple ayanamsa support", v: "Yes", c: { astrosage: "Yes", astrotalk: "No", align27: "No", costar: "No", clickastro: "Yes" } },
          { f: "Long-range planner", v: "No", c: { astrosage: "No", astrotalk: "No", align27: "Yes", costar: "No", clickastro: "No" } }
        ]
      },
      {
        id: "ux",
        title: "Experience",
        rows: [
          { f: "Ad-free", v: "Yes", c: { astrosage: "Paid only", astrotalk: "Paid only", align27: "Paid only", costar: "Paid only", clickastro: "Paid only" } },
          { f: "Chart styles (N / S / E)", v: "Yes", c: { astrosage: "Yes", astrotalk: "N+S only", align27: "No", costar: "No", clickastro: "Some" } },
          { f: "Tap-to-learn chart", v: "Yes", c: { astrosage: "No", astrotalk: "No", align27: "No", costar: "No", clickastro: "No" } },
          { f: "Watch / widget support", v: "No", c: { astrosage: "No", astrotalk: "No", align27: "Yes", costar: "No", clickastro: "No" } },
          { f: "Calendar integration", v: "No", c: { astrosage: "Hindu calendar", astrotalk: "No", align27: "Yes", costar: "No", clickastro: "No" } },
          { f: "Offline support", v: "Partial", c: { astrosage: "Partial", astrotalk: "No", align27: "No", costar: "No", clickastro: "No" } },
          { f: "Platform", v: "iOS, Android, Mac, Vision", c: { astrosage: "iOS, Android, Web", astrotalk: "iOS, Android", align27: "iOS, Android, Mac", costar: "iOS, Android", clickastro: "iOS, Android, Web" } },
          { f: "Languages", v: "EN, HI, ES, DE", c: { astrosage: "9 Indian languages", astrotalk: "EN, HI", align27: "EN only", costar: "EN only", clickastro: "EN + regional" } }
        ]
      },
      {
        id: "biz",
        title: "Business model",
        rows: [
          { f: "Base pricing (annual)", v: "$24.90/yr", c: { astrosage: "Free + per consult", astrotalk: "Free + per min", align27: "$79.99/yr", costar: "Free + premium", clickastro: "Free + reports" } },
          { f: "Token / per-consult model", v: "Token add-ons", c: { astrosage: "Yes", astrotalk: "Yes", align27: "No", costar: "No", clickastro: "Yes" } },
          { f: "Data privacy / no data selling", v: "Yes", c: { astrosage: "Not stated", astrotalk: "Not stated", align27: "Not stated", costar: "Not stated", clickastro: "Not stated" } },
          { f: "Target audience", v: "Beginners + Pros", c: { astrosage: "General India", astrotalk: "Consultation seekers", align27: "Daily wellness", costar: "Western casuals", clickastro: "South India + general" } }
        ]
      }
    ]
  },
  batch2: {
    title: "Vyom vs Astroyogi, InstaAstro, GaneshaSpeaks, CHANI, Melooha",
    slugs: ["astroyogi", "instaastro", "ganeshaspeaks", "chani", "melooha"],
    groups: [
      {
        id: "core",
        title: "Core features",
        rows: [
          { f: "Birth chart / Kundli", v: "Yes", c: { astroyogi: "Yes", instaastro: "Yes", ganeshaspeaks: "Basic", chani: "Western", melooha: "Yes" } },
          { f: "Divisional charts (Varga)", v: "D1-D144", c: { astroyogi: "No", instaastro: "No", ganeshaspeaks: "No", chani: "No", melooha: "No" } },
          { f: "Dasha system", v: "Maha-Pratyantar", c: { astroyogi: "Basic", instaastro: "Basic", ganeshaspeaks: "Basic", chani: "No", melooha: "Basic" } },
          { f: "Automated Yoga identification", v: "100s", c: { astroyogi: "No", instaastro: "No", ganeshaspeaks: "No", chani: "No", melooha: "No" } },
          { f: "Live transit overlay on natal", v: "Yes", c: { astroyogi: "No", instaastro: "No", ganeshaspeaks: "No", chani: "Partial", melooha: "Partial" } },
          { f: "Panchang / Choghadiya", v: "Yes", c: { astroyogi: "Yes", instaastro: "Yes", ganeshaspeaks: "No", chani: "No", melooha: "No" } },
          { f: "Kundli Milan (36-point)", v: "Yes", c: { astroyogi: "Yes", instaastro: "Yes", ganeshaspeaks: "Basic", chani: "No", melooha: "Yes" } },
          { f: "Mangal Dosha calculator", v: "Yes", c: { astroyogi: "Via astrologer", instaastro: "Via astrologer", ganeshaspeaks: "No", chani: "No", melooha: "No" } },
          { f: "Numerology", v: "Pythagorean + Vedic", c: { astroyogi: "Yes", instaastro: "Yes", ganeshaspeaks: "No", chani: "No", melooha: "No" } },
          { f: "Moon calendar and phases", v: "Yes", c: { astroyogi: "Basic", instaastro: "Basic", ganeshaspeaks: "No", chani: "Yes", melooha: "Lunar calendar" } },
          { f: "Daily horoscope feed", v: "Vedic Scoreboard", c: { astroyogi: "Yes", instaastro: "Yes", ganeshaspeaks: "Yes", chani: "Yes", melooha: "Yes" } },
          { f: "Weekly / monthly forecasts", v: "Coming soon", c: { astroyogi: "Yes", instaastro: "Yes", ganeshaspeaks: "Yes", chani: "Yes", melooha: "Yes" } },
          { f: "Personalized remedies", v: "Yes", c: { astroyogi: "Some", instaastro: "Some", ganeshaspeaks: "Some", chani: "Rituals only", melooha: "No" } },
          { f: "Tarot readings", v: "Coming soon", c: { astroyogi: "Yes", instaastro: "Yes", ganeshaspeaks: "No", chani: "Card of week", melooha: "No" } },
          { f: "Astrologer consultation", v: "No", c: { astroyogi: "5000+ astrologers", instaastro: "1200+ astrologers", ganeshaspeaks: "200+ astrologers", chani: "No", melooha: "No" } },
          { f: "Vastu / Feng Shui / Palmistry", v: "Coming soon", c: { astroyogi: "Yes", instaastro: "Some", ganeshaspeaks: "No", chani: "No", melooha: "No" } },
          { f: "Wellness / therapy counselling", v: "Coming soon", c: { astroyogi: "No", instaastro: "No", ganeshaspeaks: "Therapist chat", chani: "Meditations", melooha: "No" } }
        ]
      },
      {
        id: "tech",
        title: "Technology",
        rows: [
          { f: "AI integration", v: "Uttara AI (chart-based)", c: { astroyogi: "No", instaastro: "AI matching", ganeshaspeaks: "No", chani: "No AI, human written", melooha: "200+ algo AI engine" } },
          { f: "Personalization basis", v: "Full birth chart", c: { astroyogi: "Sun/Moon sign", instaastro: "Birth chart", ganeshaspeaks: "Sun sign", chani: "Rising sign", melooha: "Birth date/time/place" } },
          { f: "Learning tools / Vedic glossary", v: "Yes", c: { astroyogi: "No", instaastro: "Blogs only", ganeshaspeaks: "No", chani: "Education courses", melooha: "No" } },
          { f: "Interactive tap-to-learn chart", v: "Yes", c: { astroyogi: "No", instaastro: "No", ganeshaspeaks: "No", chani: "No", melooha: "No" } },
          { f: "CRM for astrologers", v: "Yes", c: { astroyogi: "No", instaastro: "No", ganeshaspeaks: "No", chani: "No", melooha: "No" } },
          { f: "Chart deep link sharing", v: "Yes", c: { astroyogi: "No", instaastro: "No", ganeshaspeaks: "No", chani: "No", melooha: "No" } },
          { f: "Guided meditations / audio", v: "Coming soon", c: { astroyogi: "No", instaastro: "No", ganeshaspeaks: "Wellness", chani: "Yes", melooha: "No" } },
          { f: "Journal / reflection prompts", v: "Coming soon", c: { astroyogi: "No", instaastro: "No", ganeshaspeaks: "No", chani: "Yes", melooha: "No" } },
          { f: "Podcast / weekly audio reading", v: "Coming soon", c: { astroyogi: "Yogi Live sessions", instaastro: "No", ganeshaspeaks: "No", chani: "Yes", melooha: "No" } }
        ]
      },
      {
        id: "ux",
        title: "Experience",
        rows: [
          { f: "Ad-free", v: "Yes", c: { astroyogi: "Paid only", instaastro: "Paid only", ganeshaspeaks: "Paid only", chani: "Paid only", melooha: "Paid only" } },
          { f: "Chart styles (N / S / E)", v: "Yes", c: { astroyogi: "Some", instaastro: "No", ganeshaspeaks: "No", chani: "No", melooha: "No" } },
          { f: "Platform", v: "iOS, Android, Mac, Vision", c: { astroyogi: "iOS, Android", instaastro: "iOS, Android", ganeshaspeaks: "iOS, Android", chani: "iOS, Android", melooha: "iOS, Android" } },
          { f: "Languages", v: "EN, HI, ES, DE", c: { astroyogi: "EN, HI + regional", instaastro: "EN, HI", ganeshaspeaks: "EN, HI + regional", chani: "EN only", melooha: "EN, HI" } },
          { f: "Data privacy stance", v: "No data selling, encrypted", c: { astroyogi: "Not stated", instaastro: "Not stated", ganeshaspeaks: "Not stated", chani: "Not stated", melooha: "Encrypted in transit" } },
          { f: "Target audience", v: "Beginners + Pros", c: { astroyogi: "30M users, India global", instaastro: "Young India", ganeshaspeaks: "Traditional India", chani: "Feminist / wellness West", melooha: "Young professionals India" } }
        ]
      },
      {
        id: "biz",
        title: "Business model",
        rows: [
          { f: "Base pricing (annual)", v: "$24.90/yr", c: { astroyogi: "Free + $0.65/min consult", instaastro: "Free + per consult", ganeshaspeaks: "Free + per consult", chani: "~$35/yr premium", melooha: "Free + paid reports" } },
          { f: "Revenue model", v: "Subscription + tokens", c: { astroyogi: "Per-minute consult", instaastro: "Per-minute consult", ganeshaspeaks: "Per-minute consult", chani: "Subscription only", melooha: "Reports + Q&A packs" } },
          { f: "Free tier depth", v: "Charts + learning", c: { astroyogi: "Horoscope + basic kundli", instaastro: "Basic daily + kundli", ganeshaspeaks: "Daily horoscope only", chani: "Daily horoscope + birth chart", melooha: "Daily horoscope only" } },
          { f: "Downloads / scale", v: "New / growing", c: { astroyogi: "30M+ users, since 2001", instaastro: "10M+ downloads", ganeshaspeaks: "50M consultations, since 2003", chani: "Large global, 2020+", melooha: "374K users, growing fast" } }
        ]
      }
    ]
  }
};

export const GROUP_LABELS = [
  { id: "all", label: "All" },
  { id: "core", label: "Core" },
  { id: "tech", label: "Technology" },
  { id: "ux", label: "Experience" },
  { id: "biz", label: "Business model" }
];

export function findCompetitor(slug) {
  return COMPETITORS.find((item) => item.slug === slug);
}
