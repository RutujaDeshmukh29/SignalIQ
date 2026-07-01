<div align="center">

<img src="https://img.shields.io/badge/SignalIQ-v1.0.0-F97316?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iNCIgZmlsbD0id2hpdGUiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSI5IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjEuNSIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==" alt="SignalIQ"/>

# 📡 SignalIQ

### *Know what's moving before your competition does.*

A market & competitive intelligence dashboard that collects trending signals from public sources,
scores them by velocity and relevance, and surfaces ranked insight cards with AI-generated
action suggestions — personalized to your industry, business, and feedback over time.

[![Built With React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![Recharts](https://img.shields.io/badge/Recharts-2.9-FF6B6B?style=flat-square)](https://recharts.org)
[![License MIT](https://img.shields.io/badge/License-MIT-22C55E?style=flat-square)](LICENSE)
[![Contest](https://img.shields.io/badge/Raj%20Shamani%20×%20Emergent-Builder's%20Challenge-F97316?style=flat-square)](https://emergent.sh)

[Live Demo](#) 
</div>

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [The Problem it Solves](#-the-problem-it-solves)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [How the Data Layer Works](#-how-the-data-layer-works)
- [The Recommendation Engine](#-the-recommendation-engine)
- [Deployment Guide](#-deployment-guide)
- [Upgrading to a Real Database](#-upgrading-to-a-real-database)
- [Connecting Live APIs](#-connecting-live-apis)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [About the Builder](#-about-the-builder)
- [License](#-license)

---

## 🎯 About the Project

SignalIQ was built as an entry for the **Raj Shamani × Emergent One Crore Builder's Challenge** — a 14-day nationwide contest challenging Indian business owners to build AI-powered software that solves a real operational problem.

**The core insight:** Every business owner today loses 1–3 hours daily scattered across news sites, competitor websites, and social feeds trying to understand what is trending in their market. There is no centralized tool that takes a specific business profile, fetches real signals from public sources, scores and clusters them by trend velocity, and gives you a ranked list of insights with one actionable next step per card.

SignalIQ is that tool. It is **not a chatbot**. It is a decision dashboard — something you open for 2 minutes every morning and walk away knowing exactly what to act on.

---

## 🔥 The Problem it Solves

| Pain Point | What SignalIQ Does |
|---|---|
| Scattered news reading with no ranking | Scores every signal by recency + velocity + relevance |
| Generic news feeds not relevant to your niche | Personalized to your industry, keywords, and competitors |
| No actionable output — just information | Every insight card carries a one-line suggested action |
| Time wasted on low-signal content | Weighted recommendation engine learns from your feedback |
| No visibility into competitor activity | Competitor radar tracks public mentions by brand name |
| Data overload with no synthesis | AI daily digest summarizes the top signals in 3 sentences |

---

## ✨ Key Features

### 🧠 Personalized Intelligence Feed
- 4-step onboarding captures your industry, keywords, competitors, and goal
- Every signal is scored on a 100-point scale: recency (30) + velocity (30) + relevance (40)
- Feed re-ranks every time you give feedback — the more you use it, the smarter it gets

### 📊 Trend Velocity Charts
- Line chart showing trend score over 7 days for each of your tracked keywords
- Filter by source type (News / Community) and sort by score or recency
- Visual grid of all collected signals with badge labels (Hot / Rising / Watch)

### 🎯 Competitor Radar
- Timeline feed of public news mentions for every competitor you track
- Bar chart showing weekly mention count per competitor (who is most active?)
- Active/Quiet status indicator updated in real time

### ✨ AI Weekly Digest
- One 3-sentence synthesis of your top signals, generated fresh on demand
- Reads the top 10 scored signals and produces a human-readable summary
- Designed to be your first 30 seconds every morning

### 💡 Action-First Insight Cards
- Every card carries a one-line suggested action tied to the signal and your stated goal
- Score bar shows trend strength visually
- Useful / Not relevant feedback buttons retune your feed on the spot

### 🔁 Recommendation Engine
- Keyword preference weights stored per user (range: 0.2 → 2.0)
- Each "Useful" click increases that keyword's weight by +0.1
- Each "Skip" click decreases it by −0.1
- Final score = `(recency + velocity + relevanceBase) × keywordWeight`
- No ML required — pure weighted scoring, fully transparent

---

## 🛠 Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| **React** | 18.2 | Component-based UI, hooks, state management |
| **React Router DOM** | 6.20 | Client-side routing (SPA navigation) |
| **Recharts** | 2.9 | Line charts and bar charts for trend visualization |
| **Vite** | 5.0 | Development server and production bundler |
| **CSS Variables** | Native | Full design token system, dark-mode ready |
| **CSS Keyframes** | Native | 8 animation types (fadeUp, countUp, shimmer, pulse, etc.) |

### Data & State
| Technology | Purpose |
|---|---|
| **localStorage** | Client-side persistent storage (no backend required for MVP) |
| **dataStore.js** | Custom data layer — seeding, scoring, recommendation engine, all CRUD |
| **JSON** | All data serialized as JSON strings in localStorage |

### Fonts
| Font | Usage |
|---|---|
| **Inter** | Body text, UI elements, all weights 400–700 |
| **Plus Jakarta Sans** | Display headings, logo, large numbers |

### Dev Tools
| Tool | Purpose |
|---|---|
| **npm** | Package management |
| **Vite** | HMR dev server, Rollup production build |
| **ESLint** | Code quality (add as needed) |

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Browser (Client)                     │
│                                                         │
│  ┌──────────────────────────────────────────────────┐   │
│  │                  React SPA                       │   │
│  │                                                  │   │
│  │   App.jsx (Router)                               │   │
│  │      │                                           │   │
│  │      ├── /setup        → Onboarding.jsx          │   │
│  │      ├── /dashboard    → Dashboard.jsx           │   │
│  │      ├── /trends       → Trends.jsx              │   │
│  │      ├── /competitors  → Competitors.jsx         │   │
│  │      └── /settings     → Settings.jsx            │   │
│  │                                                  │   │
│  │   Components                                     │   │
│  │      NavBar · InsightCard · StatCard             │   │
│  │      DigestBox · (TrendChart via Recharts)       │   │
│  │                                                  │   │
│  └──────────────────────────────────────────────────┘   │
│                         │                               │
│                         ▼                               │
│  ┌──────────────────────────────────────────────────┐   │
│  │              dataStore.js (Data Layer)           │   │
│  │                                                  │   │
│  │  saveProfile() · loadProfile()                   │   │
│  │  loadSignals() · seedSignalsForProfile()         │   │
│  │  recordFeedback() · loadWeights()                │   │
│  │  loadDigest() · loadCompFeed()                   │   │
│  │  Scoring engine · Recommendation engine          │   │
│  └──────────────────────────────────────────────────┘   │
│                         │                               │
│                         ▼                               │
│  ┌──────────────────────────────────────────────────┐   │
│  │           localStorage (Browser Storage)         │   │
│  │                                                  │   │
│  │  siq_profile    → user profile + keywords        │   │
│  │  siq_signals    → scored signal array            │   │
│  │  siq_weights    → keyword preference weights     │   │
│  │  siq_digest     → cached AI digest text          │   │
│  │  siq_comp_feed  → competitor mention timeline    │   │
│  │  siq_feedback   → raw feedback log               │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

> **Note:** The current architecture is intentionally client-side only for MVP speed and contest deployment. See [Upgrading to a Real Database](#-upgrading-to-a-real-database) for the production path.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher
- A terminal (Command Prompt / PowerShell / Terminal / VS Code integrated terminal)

Check your versions:
```bash
node --version   # should say v18.x.x or higher
npm --version    # should say 9.x.x or higher
```

### Installation

**Step 1 — Clone the repository**
```bash
git clone https://github.com/RutujaDeshmukh29/SignalIQ-.git
cd signalIO
```

**Step 2 — Install dependencies**
```bash
npm install
```
This installs React, Vite, Recharts, React Router DOM, and all other packages listed in `package.json`. Takes about 30–60 seconds.

**Step 3 — Start the development server**
```bash
npm run dev
```
Open your browser and go to `http://localhost:3000`

You will see the SignalIQ onboarding screen. Complete the 4-step setup (takes under 2 minutes), and your personalized intelligence dashboard will load immediately.

### Build for Production

```bash
npm run build
```
This creates a `/dist` folder containing optimized, minified HTML + CSS + JS files ready to deploy anywhere.

---

## 📁 Project Structure

```
signaliq/
│
├── index.html                    # HTML entry point (single file)
├── vite.config.js                # Vite configuration
├── package.json                  # Dependencies and scripts
├── .gitignore                    # Git ignore rules
├── README.md                     # This file
│
└── src/
    │
    ├── main.jsx                  # React root — mounts App into #root
    ├── App.jsx                   # Router setup — 5 routes, auth guard
    │
    ├── styles/
    │   └── globals.css           # Complete design system
    │                             #   • CSS custom properties (tokens)
    │                             #   • 8 keyframe animations
    │                             #   • Base resets
    │                             #   • Utility classes (.card, .btn-primary, .badge)
    │
    ├── utils/
    │   └── dataStore.js          # ★ Core data layer (most important file)
    │                             #   • SIGNAL_SEEDS: industry-specific mock data
    │                             #   • saveProfile() / loadProfile()
    │                             #   • seedSignalsForProfile() → scoring engine
    │                             #   • recordFeedback() → recommendation engine
    │                             #   • generateCompFeed() → competitor mock data
    │                             #   • loadWeights() / initWeights()
    │                             #   • timeAgo() / weightToLabel() helpers
    │
    ├── components/
    │   ├── NavBar.jsx            # Sticky header, scroll-blur effect, active nav
    │   ├── InsightCard.jsx       # Signal card: score bar, action box, feedback
    │   ├── StatCard.jsx          # Animated stat tile with count-up number
    │   └── DigestBox.jsx         # AI digest section with shimmer loading state
    │
    └── pages/
        ├── Onboarding.jsx        # 4-step setup: name → keywords → competitors → goal
        │                         # Split-panel design (orange left, form right)
        │
        ├── Dashboard.jsx         # Home page
        │                         # → 3 stat cards (signals, score, active comps)
        │                         # → AI digest box
        │                         # → Ranked insight cards feed
        │                         # → Competitor radar sidebar
        │                         # → Signal tuning (weight history) sidebar
        │
        ├── Trends.jsx            # Trends Explorer
        │                         # → Recharts line chart (7-day velocity)
        │                         # → Filter bar (source type, sort)
        │                         # → Filterable signal grid
        │
        ├── Competitors.jsx       # Competitor Radar
        │                         # → Most Active card + Recharts bar chart
        │                         # → Competitor filter pills
        │                         # → Chronological timeline feed
        │
        └── Settings.jsx          # Profile editor
                                  # → Edit name, industry, goal
                                  # → Edit keywords (tag input)
                                  # → Edit competitors (tag input)
                                  # → Danger zone: reset all data
```

---

## 🗄 How the Data Layer Works

### Why localStorage?

SignalIQ deliberately uses `localStorage` (browser storage) rather than a remote database for the MVP. Here is why that is the right call at this stage:

| Factor | localStorage Approach | Remote Database Approach |
|---|---|---|
| **Setup time** | Zero — built into every browser | Hours — need backend, DB, auth, hosting |
| **Works offline** | ✅ Yes | ❌ No |
| **Deployment** | Any static host (Vercel, Netlify, GitHub Pages) | Needs a server (Railway, Render, etc.) |
| **Sufficient for contest** | ✅ Completely | Overkill for demo |
| **Data persists** | Per browser — yes | Cross-device — yes |
| **Multi-user** | ❌ No | ✅ Yes |

### Storage Schema

All data is stored as JSON under these keys:

```javascript
// Key → What it stores → Example value
'siq_profile'    // User setup data
// { name, industry, keywords[], competitors[], goal, createdAt }

'siq_signals'    // Scored and ranked signals
// [{ id, title, source, keyword, badge, finalScore, action, ... }]

'siq_weights'    // Keyword preference weights (recommendation engine)
// { "AI agents": 1.4, "RAG pipelines": 0.9, "n8n": 1.0 }

'siq_digest'     // Cached AI digest text
// { text: "...", generatedAt: "2025-07-01T..." }

'siq_comp_feed'  // Competitor timeline entries
// [{ id, competitorName, headline, source, hoursAgo, topic }]

'siq_feedback'   // Raw feedback log
// [{ signalId, keyword, isUseful, at: timestamp }]
```

### Data Flow (step by step)

```
User completes onboarding
         │
         ▼
  saveProfile(form)
         │
         ├──→ localStorage.setItem('siq_profile', JSON.stringify(form))
         ├──→ seedSignalsForProfile(profile)    ← picks industry seeds, scores them
         ├──→ seedCompFeed(competitors)          ← generates competitor timeline
         ├──→ seedDigest(profile)                ← picks industry digest text
         └──→ initWeights(keywords)              ← sets all weights to 1.0

User opens Dashboard
         │
         ▼
  loadSignals() → JSON.parse(localStorage.getItem('siq_signals'))
         │
         └──→ Already sorted by finalScore descending
              Ready to render, zero API calls needed

User clicks "Useful ✓" on a card
         │
         ▼
  recordFeedback(signalId, keyword, isUseful=true)
         │
         ├──→ weights[keyword] = Math.min(2.0, weights[keyword] + 0.1)
         ├──→ localStorage.setItem('siq_weights', JSON.stringify(weights))
         └──→ seedSignalsForProfile(profile)    ← re-scores with new weights
                                                   Dashboard updates automatically
```

---

## 🧠 The Recommendation Engine

The recommendation engine is the core intelligence layer of SignalIQ. It is deliberately simple — no ML, no neural networks, no external APIs — just transparent weighted scoring that any developer can read and understand.

### Scoring Formula

```
finalScore = min(100, recency + velocity + relevanceBase × keywordWeight)
```

**Component breakdown:**

| Component | Max Points | What it measures |
|---|---|---|
| `recency` | 30 | Hours since published — newer = higher |
| `velocity` | 30 | Number of unique sources covering the same topic cluster |
| `relevanceBase` | 40 | Keyword match strength to the user's tracked keywords |
| `keywordWeight` | Multiplier (0.2 → 2.0) | Learned from user feedback over time |

### Weight Update Rules

```javascript
// User clicks "Useful ✓"
weights[keyword] = Math.min(2.0, weights[keyword] + 0.1)

// User clicks "Skip ✗"  
weights[keyword] = Math.max(0.2, weights[keyword] - 0.1)
```

**Weight display labels:**
- `≥ 1.5` → **High** (green) — you consistently find this useful
- `0.8 – 1.4` → **Medium** (orange) — neutral baseline
- `< 0.8` → **Low** (gray) — you keep skipping this topic

### Why no ML?
For a single-user preference system with at most 50 weekly interactions, a simple multiplier is better than ML because:
1. It is instant — no training delay
2. It is explainable — you can see exactly why a signal ranked where it did
3. It requires zero backend infrastructure
4. It works with cold-start data (no training data needed)
5. It is easier to debug and demo to judges

---

## 🌐 Deployment Guide

### Option A — Vercel (Recommended, 3 minutes)

Vercel is the fastest way to get SignalIQ live with a public URL.

**Step 1 — Push to GitHub**
```bash
cd signaliq

git init
git add .
git commit -m "feat: SignalIQ v1 — market intelligence dashboard"

# Create a new repo on github.com first, then:
git remote add origin https://github.com/RutujaDeshmukh29/SignalIQ-.git
git branch -M main
git push -u origin main
```

**Step 2 — Deploy on Vercel**
1. Go to [vercel.com](https://vercel.com) and sign up with your GitHub account
2. Click **"Add New Project"**
3. Select your `signaliq` repository
4. Vercel auto-detects Vite — leave all settings as default
5. Click **"Deploy"**

Done. Your app is live at `https://signaliq.vercel.app` (or a similar URL) in under 60 seconds.

**Every future `git push` auto-redeploys.** No manual steps needed.

---

### Option B — Netlify (Also free, also excellent)

**Step 1 — Build locally**
```bash
npm run build
```

**Step 2 — Deploy the /dist folder**
1. Go to [netlify.com](https://netlify.com) and sign up
2. Drag and drop your `/dist` folder onto the Netlify dashboard
3. Your app is live immediately at a `*.netlify.app` URL

**Or connect via GitHub** (same as Vercel) — go to **"New site from Git"** → pick your repo → set Build Command to `npm run build` and Publish Directory to `dist`.

---

### Option C — GitHub Pages

**Step 1 — Update vite.config.js**
Add a `base` option matching your repo name:
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/signaliq/',   // ← add this line
})
```

**Step 2 — Install the GitHub Pages deploy plugin**
```bash
npm install --save-dev gh-pages
```

**Step 3 — Add deploy script to package.json**
```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "deploy": "npm run build && gh-pages -d dist"
}
```

**Step 4 — Deploy**
```bash
npm run deploy
```

Your app will be live at `https://RutujaDeshmukh29.github.io/signaliq/`

---

### Option D — Firebase Hosting (Google)

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login and initialize
firebase login
firebase init hosting

# Build and deploy
npm run build
firebase deploy
```

---

## 🔌 Connecting Live APIs

The current version uses curated seed data for each industry. To connect real live data sources, open `src/utils/dataStore.js` and replace the seed functions with real API calls.

### Free APIs you can use (no payment required)

**News:**
```javascript
// GNews API — 100 requests/day free
const res = await fetch(
  `https://gnews.io/api/v4/search?q=${keyword}&token=YOUR_API_KEY&lang=en&max=10`
)
const { articles } = await res.json()
```

**Hacker News (completely free, no API key):**
```javascript
const res = await fetch(
  `https://hn.algolia.com/api/v1/search?query=${keyword}&hitsPerPage=10`
)
const { hits } = await res.json()
```

**Reddit public JSON (no API key for read-only):**
```javascript
const res = await fetch(
  `https://www.reddit.com/search.json?q=${keyword}&sort=hot&limit=10`,
  { headers: { 'User-Agent': 'SignalIQ/1.0' } }
)
const { data } = await res.json()
```

**Google Trends (via SerpAPI or pytrends):**
```bash
pip install pytrends
```
```python
from pytrends.request import TrendReq
pytrends = TrendReq()
pytrends.build_payload(['AI agents', 'RAG pipelines'])
data = pytrends.interest_over_time()
```

### AI Digest Generation

Replace the static digest text with a live LLM call:
```javascript
const response = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.VITE_ANTHROPIC_KEY,
    'anthropic-version': '2023-06-01'
  },
  body: JSON.stringify({
    model: 'claude-haiku-4-5-20251001',    // cheapest, fastest model
    max_tokens: 300,
    messages: [{
      role: 'user',
      content: `Here are today's top market signals for a ${profile.industry} professional:
      ${topSignals.map(s => `• ${s.title}`).join('\n')}
      
      Write a 3-sentence intelligence digest highlighting the most important trend,
      one competitor insight, and one content/pitch opportunity. Be specific and direct.`
    }]
  })
})
const data = await response.json()
const digestText = data.content[0].text
```

---

## 🔗 Upgrading to a Real Database

When you're ready to make SignalIQ multi-user and cross-device, here is the upgrade path.

### Option A — Supabase (Recommended)

Supabase gives you PostgreSQL + Auth + REST API for free.

**Step 1 — Create tables in Supabase dashboard**
```sql
-- Users handled by Supabase Auth automatically

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  name TEXT,
  industry TEXT,
  keywords TEXT[],
  competitors TEXT[],
  goal TEXT,
  preference_weights JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE signals (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  title TEXT NOT NULL,
  source TEXT,
  source_type TEXT,
  keyword_matched TEXT,
  badge TEXT,
  final_score INTEGER,
  action TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE competitor_mentions (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  competitor_name TEXT,
  headline TEXT,
  source TEXT,
  hours_ago INTEGER,
  topic TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Step 2 — Replace dataStore.js functions**
```javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

// Replace saveProfile()
export async function saveProfile(profile) {
  const { data: { user } } = await supabase.auth.getUser()
  await supabase.from('profiles').upsert({ id: user.id, ...profile })
}

// Replace loadProfile()
export async function loadProfile() {
  const { data: { user } } = await supabase.auth.getUser()
  const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  return data
}
```

**Step 3 — Add Auth UI**
```bash
npm install @supabase/auth-ui-react @supabase/auth-ui-shared
```
```javascript
import { Auth } from '@supabase/auth-ui-react'
// Drop <Auth supabaseClient={supabase} /> into a login page
```

### Option B — Firebase Firestore

```bash
npm install firebase
```
```javascript
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'

const db = getFirestore(app)

export async function saveProfile(profile) {
  const userId = auth.currentUser.uid
  await setDoc(doc(db, 'profiles', userId), profile)
}
```

---

## 🗺 Roadmap

### v1.0 — Contest MVP (current)
- [x] 4-step personalized onboarding
- [x] Scored intelligence feed with 5 industries of seed data
- [x] Competitor radar with timeline and bar chart
- [x] Recharts trend velocity visualization
- [x] Weighted recommendation engine
- [x] AI digest box with shimmer loading state
- [x] Settings page with profile editing
- [x] Warm saffron/teal design system with 8 CSS animations

### v1.1 — Live Data
- [ ] Connect GNews API for real news signals
- [ ] Connect Hacker News Algolia API
- [ ] Connect Reddit public JSON API
- [ ] Live AI digest via Claude Haiku API
- [ ] Auto-refresh on a schedule (every 12h / daily)

### v2.0 — Multi-User
- [ ] Supabase authentication (email + Google login)
- [ ] Real PostgreSQL database (signals, profiles, feedback)
- [ ] Weekly email digest (Resend API)
- [ ] Shareable intelligence reports (PDF export)

### v2.1 — Intelligence Upgrade
- [ ] Semantic clustering of signals (embeddings via Voyage AI)
- [ ] Keyword trend velocity calculated from live data
- [ ] Competitor SEO movement tracking
- [ ] Industry-specific data source presets

### v3.0 — Platform
- [ ] Team workspaces (share feed with co-founders/team)
- [ ] Integrations (Slack digest, WhatsApp alerts)
- [ ] Android app companion (alerts only)
- [ ] API access for power users

---

## 🤝 Contributing

Contributions are welcome. Here's how to get started:

```bash
# Fork the repo on GitHub, then:
git clone https://github.com/RutujaDeshmukh29/SignalIQ-.git
cd signaliq
npm install
git checkout -b feature/RutujaDeshmukh29
# make your changes
git commit -m "feat: describe your feature"
git push origin feature/your-feature-name
# Open a Pull Request on GitHub
```

**Good first contributions:**
- Add a new industry seed data set in `SIGNAL_SEEDS` inside `dataStore.js`
- Add a new action suggestion variant to `ACTION_MAP`
- Improve mobile responsiveness of any page
- Add a new badge type with its own scoring tier

---

## 👩‍💻 About the Builder

Built by **Rutuja Deshmukh** — AI/ML engineer, freelancer, and diploma topper (91.65%) from K.K. Wagh Polytechnic, Nashik. Currently pursuing lateral entry into a BE program while freelancing on Upwork, Fiverr, and Internshala, and building AI-native products.

- 🔗 **GitHub:** [github.com/RutujaDeshmukh29](https://github.com/RutujaDeshmukh29)
- 💼 **LinkedIn:** [linkedin.com/in/rutuja-deshmukh29](https://linkedin.com/in/rutuja-deshmukh29)
- 🧠 **Stack:** LangChain · LangGraph · FastAPI · RAG · ChromaDB · Groq · Next.js

---

<div align="center">

Made with 🧡 by Rutuja in Nashik, India · Built for the Raj Shamani × Emergent One Crore Builder's Challenge

⭐ If SignalIQ helped you, please star this repo!

</div>
