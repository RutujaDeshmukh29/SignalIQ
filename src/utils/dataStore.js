// ─── SignalIQ Mock Data Store ───────────────────────────────────────────────
// All data lives in localStorage. This file seeds initial data and exports
// helper functions used by every page. Swap the fetch* functions for real
// API calls when you connect live data sources.

const STORAGE_KEYS = {
  PROFILE:   'siq_profile',
  SIGNALS:   'siq_signals',
  FEEDBACK:  'siq_feedback',
  DIGEST:    'siq_digest',
  COMP_FEED: 'siq_comp_feed',
  WEIGHTS:   'siq_weights',
}

// ─── Seed Signals by Industry ────────────────────────────────────────────────
const SIGNAL_SEEDS = {
  'AI/ML Services': [
    { id:'s1', title:'OpenAI Agents SDK gaining rapid adoption across dev ecosystem', summary:'The newly released Agents SDK from OpenAI has been covered by 18 major tech outlets in 72 hours, with tutorial content exploding on YouTube and Reddit.', source:'Hacker News', sourceType:'community', keyword:'AI agents', recency:28, velocity:30, relevanceBase:38, badge:'hot', url:'#' },
    { id:'s2', title:'RAG pipelines now standard requirement in 64% of AI job postings', summary:'A survey of 1,200 AI-related job listings across India and Southeast Asia found RAG architecture mentioned in nearly two-thirds of requirements.', source:'Analytics India Magazine', sourceType:'news', keyword:'RAG pipelines', recency:24, velocity:22, relevanceBase:36, badge:'hot', url:'#' },
    { id:'s3', title:'n8n workflow automation crosses 50k GitHub stars — surges on r/selfhosted', summary:'The open-source automation tool n8n hit a GitHub milestone this week and is trending across multiple subreddits as businesses seek no-code AI integrations.', source:'Reddit', sourceType:'community', keyword:'n8n automation', recency:20, velocity:26, relevanceBase:32, badge:'rising', url:'#' },
    { id:'s4', title:'D2C brands in India increasing spend on AI-powered customer support', summary:'According to a new NASSCOM report, Indian D2C brands doubled their AI tooling budget in Q3, with customer support automation as the top use case.', source:'NASSCOM', sourceType:'news', keyword:'AI automation', recency:18, velocity:18, relevanceBase:30, badge:'rising', url:'#' },
    { id:'s5', title:'LangGraph multi-agent frameworks trending on HackerNews front page', summary:'A detailed writeup on stateful multi-agent systems using LangGraph spent 14 hours on the HN front page, generating 300+ comments about production use cases.', source:'Hacker News', sourceType:'community', keyword:'LangGraph', recency:16, velocity:20, relevanceBase:28, badge:'rising', url:'#' },
    { id:'s6', title:'FastAPI becoming default backend choice for Indian AI startups', summary:'A developer survey by GitHub India shows FastAPI overtaking Flask and Django for new AI/ML API projects among early-stage startups.', source:'GitHub Blog', sourceType:'news', keyword:'FastAPI', recency:12, velocity:14, relevanceBase:25, badge:'watch', url:'#' },
    { id:'s7', title:'Claude API usage growing 3x quarter-over-quarter in Asia-Pacific', summary:'Anthropic reported significant APAC growth, with Indian developers forming the second-largest non-US developer cohort using the Claude API.', source:'TechCrunch', sourceType:'news', keyword:'Claude API', recency:10, velocity:16, relevanceBase:22, badge:'watch', url:'#' },
    { id:'s8', title:'Fiverr Pro launches dedicated AI services category for Indian freelancers', summary:'Fiverr expanded its Pro tier to include a dedicated AI/ML services vertical, and is actively recruiting Indian developers to fill the gap.', source:'Fiverr Blog', sourceType:'news', keyword:'AI freelancing', recency:8, velocity:12, relevanceBase:35, badge:'watch', url:'#' },
  ],
  'D2C Brand': [
    { id:'d1', title:'Quick commerce platforms pushing D2C brands to reduce SKU count', summary:'Blinkit and Zepto are pressuring D2C brands to keep top-10 SKUs only, forcing brands to use data to identify which products drive retention.', source:'Inc42', sourceType:'news', keyword:'D2C strategy', recency:26, velocity:24, relevanceBase:38, badge:'hot', url:'#' },
    { id:'d2', title:'WhatsApp Commerce API now free for SMBs — D2C brands seeing 40% lift', summary:'Meta opened the WhatsApp Business API to SMBs at zero cost; early D2C adopters report 40% increase in repeat purchase rates.', source:'Economic Times', sourceType:'news', keyword:'WhatsApp commerce', recency:22, velocity:28, relevanceBase:36, badge:'hot', url:'#' },
    { id:'d3', title:'Instagram Shops expanding checkout to tier-2 India cities', summary:'Instagram is rolling out in-app checkout to 50 new Indian cities, representing a 200M+ consumer opportunity for D2C brands currently on the platform.', source:'Reuters', sourceType:'news', keyword:'Instagram commerce', recency:18, velocity:20, relevanceBase:30, badge:'rising', url:'#' },
    { id:'d4', title:'AI-generated product descriptions increasing conversion by 22% on Shopify India', summary:'A/B test data from 800 Indian Shopify stores shows AI-written descriptions outperforming human-written ones for mobile shoppers.', source:'Shopify Blog', sourceType:'news', keyword:'AI product copy', recency:14, velocity:16, relevanceBase:28, badge:'watch', url:'#' },
  ],
  'Content Creator': [
    { id:'c1', title:'Short-form finance content exploding on YouTube India — 8x growth in 90 days', summary:'YouTube analytics show finance-adjacent short-form content growing faster than any other vertical in India, with creators under 100k subs driving most of the gain.', source:'YouTube Blog', sourceType:'news', keyword:'finance content', recency:27, velocity:29, relevanceBase:38, badge:'hot', url:'#' },
    { id:'c2', title:'Podcast clip sharing on LinkedIn reaches all-time high — B2B creators benefiting', summary:'LinkedIn video native uploads of podcast clips are getting 4–6x more reach than link posts, with tech and business niches outperforming.', source:'LinkedIn Insights', sourceType:'news', keyword:'LinkedIn content', recency:23, velocity:25, relevanceBase:35, badge:'hot', url:'#' },
    { id:'c3', title:'Substack growing 180% year-over-year among Indian tech writers', summary:'Substack India reached 2.4M paid subscribers across all newsletters, with AI and startup newsletters showing the fastest growth curves.', source:'Substack Blog', sourceType:'news', keyword:'newsletter growth', recency:19, velocity:20, relevanceBase:30, badge:'rising', url:'#' },
    { id:'c4', title:'AI-generated thumbnails A/B tested — human-designed still wins by 18%', summary:'A study of 10,000 YouTube videos found human-designed thumbnails outperform AI-generated ones in CTR, but AI-assisted thumbnails match human performance.', source:'Hacker News', sourceType:'community', keyword:'AI content tools', recency:12, velocity:15, relevanceBase:22, badge:'watch', url:'#' },
  ],
  'Finance': [
    { id:'f1', title:'SEBI mandates AI-based fraud detection for all brokers by Q2 2026', summary:'SEBI circular requires all SEBI-registered brokers to implement AI-based anomaly detection in trading systems, creating a massive compliance market.', source:'Business Standard', sourceType:'news', keyword:'SEBI compliance', recency:28, velocity:30, relevanceBase:38, badge:'hot', url:'#' },
    { id:'f2', title:'UPI transaction volume crosses 15 billion in a single month', summary:'NPCI data shows UPI hitting a new all-time high, with merchant payments and P2M transactions driving the growth over P2P transfers.', source:'NPCI', sourceType:'news', keyword:'UPI fintech', recency:24, velocity:26, relevanceBase:34, badge:'hot', url:'#' },
    { id:'f3', title:'Neo-banks targeting gig workers growing 5x in India', summary:'Jupiter, Fi, and newer entrants are rolling out products specifically for freelancers and gig workers, with instant credit and income-smoothing features.', source:'Inc42', sourceType:'news', keyword:'neobank India', recency:18, velocity:18, relevanceBase:28, badge:'rising', url:'#' },
  ],
  'Manufacturing': [
    { id:'m1', title:'PLI scheme disbursements accelerating — manufacturers urged to digitize now', summary:'Ministry of Commerce data shows faster PLI scheme payouts for manufacturers with digital operations tracking, pushing smaller units to adopt ERP.', source:'Financial Express', sourceType:'news', keyword:'PLI scheme', recency:25, velocity:22, relevanceBase:36, badge:'hot', url:'#' },
    { id:'m2', title:'Industrial IoT adoption in Indian SME manufacturing up 120% in 2025', summary:'A CII survey of 3,000 SMEs shows IoT sensor adoption nearly tripled, driven by energy cost reduction and predictive maintenance ROI.', source:'CII Report', sourceType:'news', keyword:'IIoT manufacturing', recency:20, velocity:18, relevanceBase:30, badge:'rising', url:'#' },
    { id:'m3', title:'Just-in-time inventory model under stress — SMEs building buffer stocks again', summary:'Supply chain disruptions have reversed lean inventory practices; Indian manufacturers increasing safety stock levels for critical components.', source:'Economic Times', sourceType:'news', keyword:'inventory management', recency:14, velocity:14, relevanceBase:24, badge:'watch', url:'#' },
  ],
}

const ACTION_MAP = {
  hot: [
    'Add this skill/topic to your profile and first paragraph of outreach messages this week',
    'Create content around this topic immediately — high engagement window is now',
    'Pitch this trend specifically to 5 decision-makers today while it\'s still rising',
    'Update your service listing to mention this trend directly',
  ],
  rising: [
    'Start building expertise here now — you have a 2-week head start on most competitors',
    'Write a LinkedIn post on this today — low competition, rising interest',
    'Reach out to 3 potential clients in this specific niche while demand is building',
    'Add this to your keyword targeting on job platforms',
  ],
  watch: [
    'Monitor this weekly — if it continues rising, move it to active strategy next week',
    'Save this for content planning — it may be your next strong topic',
    'Check if competitors are already moving here; if not, you have a positioning gap',
    'Low urgency now, but worth a 15-min deep dive this weekend',
  ],
}

function getAction(badge) {
  const arr = ACTION_MAP[badge]
  return arr[Math.floor(Math.random() * arr.length)]
}

// ─── Competitor Feeds ─────────────────────────────────────────────────────────
function generateCompFeed(competitors) {
  const topics = ['AI automation', 'new pricing', 'partnership announcement', 'product launch', 'hiring spree', 'blog post published', 'case study released', 'awards recognition']
  const sources = ['TechCrunch', 'YourStory', 'Inc42', 'Economic Times', 'LinkedIn', 'Product Hunt', 'Twitter/X']
  const feed = []
  competitors.forEach((comp, ci) => {
    const count = 2 + Math.floor(Math.random() * 3)
    for (let i = 0; i < count; i++) {
      const hoursAgo = (ci * 12) + (i * 18) + Math.floor(Math.random() * 6)
      feed.push({
        id: `cm_${comp}_${i}`,
        competitorName: comp,
        headline: `${comp} — ${topics[Math.floor(Math.random() * topics.length)]}`,
        source: sources[Math.floor(Math.random() * sources.length)],
        hoursAgo,
        topic: topics[Math.floor(Math.random() * topics.length)],
        url: '#',
      })
    }
  })
  return feed.sort((a, b) => a.hoursAgo - b.hoursAgo)
}

// ─── Public API ──────────────────────────────────────────────────────────────

export function saveProfile(profile) {
  localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile))
  seedSignalsForProfile(profile)
  seedCompFeed(profile.competitors)
  seedDigest(profile)
  initWeights(profile.keywords)
}

export function loadProfile() {
  const raw = localStorage.getItem(STORAGE_KEYS.PROFILE)
  return raw ? JSON.parse(raw) : null
}

function seedSignalsForProfile(profile) {
  const industry = profile.industry
  const base = SIGNAL_SEEDS[industry] || SIGNAL_SEEDS['AI/ML Services']
  const weights = loadWeights()
  const signals = base.map(s => {
    const wt = weights[s.keyword] ?? 1.0
    const final = Math.min(100, Math.round(s.recency + s.velocity + s.relevanceBase * wt))
    return { ...s, finalScore: final, action: getAction(s.badge) }
  })
  signals.sort((a, b) => b.finalScore - a.finalScore)
  localStorage.setItem(STORAGE_KEYS.SIGNALS, JSON.stringify(signals))
}

export function loadSignals() {
  const raw = localStorage.getItem(STORAGE_KEYS.SIGNALS)
  if (!raw) return []
  return JSON.parse(raw)
}

function seedCompFeed(competitors) {
  if (!competitors || competitors.length === 0) return
  const feed = generateCompFeed(competitors)
  localStorage.setItem(STORAGE_KEYS.COMP_FEED, JSON.stringify(feed))
}

export function loadCompFeed() {
  const raw = localStorage.getItem(STORAGE_KEYS.COMP_FEED)
  return raw ? JSON.parse(raw) : []
}

function seedDigest(profile) {
  const industry = profile.industry
  const digests = {
    'AI/ML Services': 'AI agent frameworks are seeing a 3× spike in client demand this week across freelance platforms and startup job boards. Two market-leading service providers repositioned toward "done-for-you" RAG pipelines, signaling a shift from consulting to productized delivery. Your biggest content and pitch gap right now: no one is combining finance domain knowledge with AI automation — a niche that is wide open.',
    'D2C Brand': 'Quick commerce platforms are forcing D2C brands to rationalize their SKU count, making data-driven product decisions non-negotiable. WhatsApp Commerce is emerging as the highest-ROI channel for repeat purchases, with early movers reporting 40% lifts. The clearest opportunity gap: brands that can combine community building with WhatsApp native checkout are outperforming everyone else.',
    'Content Creator': 'Finance and tech content is growing faster than any other vertical on Indian YouTube, and LinkedIn native video is massively outperforming link posts for podcast clip distribution. Substack newsletters in the AI and startup space are growing at 180% year-over-year. The gap: very few Indian creators are building in public about building their creator business — meta-content about content strategy.',
    'Finance': 'SEBI\'s AI fraud detection mandate is creating a compliance-driven budget cycle at every registered broker — this is a procurement event, not a discretionary spend. UPI volumes are at all-time highs, and neo-banks specifically targeting gig workers are gaining ground fast. The opportunity gap is in financial literacy content tied to regulatory changes — almost no one is translating SEBI circulars for retail audiences.',
    'Manufacturing': 'PLI scheme payout acceleration is creating urgency around digital operations tracking — manufacturers that cannot demonstrate digital records are seeing slower disbursements. Industrial IoT adoption nearly tripled in 2025 among SMEs. The gap: very few solution providers are offering IoT + PLI compliance as a bundled narrative — the two trends are not yet connected in the market.',
  }
  const text = digests[industry] || digests['AI/ML Services']
  localStorage.setItem(STORAGE_KEYS.DIGEST, JSON.stringify({ text, generatedAt: new Date().toISOString() }))
}

export function loadDigest() {
  const raw = localStorage.getItem(STORAGE_KEYS.DIGEST)
  return raw ? JSON.parse(raw) : null
}

export function initWeights(keywords) {
  const existing = loadWeights()
  const updated = { ...existing }
  keywords.forEach(kw => { if (!updated[kw]) updated[kw] = 1.0 })
  localStorage.setItem(STORAGE_KEYS.WEIGHTS, JSON.stringify(updated))
}

export function loadWeights() {
  const raw = localStorage.getItem(STORAGE_KEYS.WEIGHTS)
  return raw ? JSON.parse(raw) : {}
}

export function recordFeedback(signalId, keyword, isUseful) {
  const weights = loadWeights()
  const current = weights[keyword] ?? 1.0
  weights[keyword] = isUseful
    ? Math.min(2.0, parseFloat((current + 0.1).toFixed(1)))
    : Math.max(0.2, parseFloat((current - 0.1).toFixed(1)))
  localStorage.setItem(STORAGE_KEYS.WEIGHTS, JSON.stringify(weights))

  const existing = JSON.parse(localStorage.getItem(STORAGE_KEYS.FEEDBACK) || '[]')
  existing.push({ signalId, keyword, isUseful, at: Date.now() })
  localStorage.setItem(STORAGE_KEYS.FEEDBACK, JSON.stringify(existing))

  // Re-score signals with new weights
  const profile = loadProfile()
  if (profile) seedSignalsForProfile(profile)
}

export function weightToLabel(w) {
  if (w >= 1.5) return 'High'
  if (w >= 0.8) return 'Medium'
  return 'Low'
}

export function clearAll() {
  Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k))
}

export function timeAgo(hoursAgo) {
  if (hoursAgo < 1) return 'Just now'
  if (hoursAgo < 24) return `${Math.round(hoursAgo)} hrs ago`
  if (hoursAgo < 48) return '1 day ago'
  return `${Math.round(hoursAgo / 24)} days ago`
}
