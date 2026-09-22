# ✦ WordLight — Project Game Plan & Dossier

---

## 📌 Project Overview & Metadata

- **Team Name:** *(Insert Team Name / Atharva)*
- **Project Name:** WordLight
- **Project Title:** WordLight — A Mindful 4-Stage Progressive Word Deduction Journey
- **Project Description:** WordLight is a web-based, distraction-free word deduction game designed as an intentional mental pause. Across four curated, progressively challenging levels (60 seconds and 6 attempts each), players deduce 5-letter hidden words using color-coded feedback, optional reflective hints, and real-time validation. Upon completing the journey, players unlock a personalized, uplifting reflection gift and an actionable performance breakdown that can be shared instantly.
- **Problem Statement:** Modern digital games and social platforms rely on aggressive dopamine loops, intrusive advertisements, and infinite scrolling, leading to cognitive fatigue and fragmented attention spans. Word games frequently lack atmospheric immersion, penalize pauses, or compromise privacy by demanding account creation and tracking users.
- **Your Solution:** WordLight provides a tranquil, self-contained, 4-minute mindful cognitive workout. It blends classic Mastermind/Wordle deduction mechanics with an editorial, dark-luxe aesthetic, gentle countdowns, daily streak preservation via client-side storage, and a heartwarming takeaway message at the finish line—requiring zero logins, zero ads, and zero server tracking.
- **Uniqueness & Innovation:**
  1. **Narrative & Mindful Pacing:** Unlike endless puzzle grinders, WordLight is organized into a cohesive, finite 4-word journey (`LIGHT` → `DREAM` → `FOCUS` → `SHINE`) tailored for focus and intellectual clarity.
  2. **Staggered Reward & Gift Experience:** Transitioning beyond simple win/loss screens, completion unlocks a celebratory, staggered gift card reveal with reflective messages.
  3. **Seamless Session Continuity:** Automatic local persistence with auto-save and daily session reset detection, allowing uninterrupted resuming without authentication barriers.
  4. **Multi-Factor Dynamic Scoring:** Balanced algorithm incorporating attempt efficiency, remaining time multipliers, and hint penalty considerations.
  5. **Native Accessibility & Keyboard Integration:** Fluid virtual and physical on-screen/hardware keyboard support with instant error feedback, smooth CSS transforms, and high-contrast color states.
- **Technology Stack:**
  - **Core Framework:** React 19 (Hooks, Context API, useReducer for state machine)
  - **Build Tool & Bundler:** Vite 8 (Ultra-fast Hot Module Replacement)
  - **Linter & Code Quality:** Oxlint
  - **Styling & Layout:** Vanilla CSS3 (Custom Design System, CSS Variables, Keyframe Animations, Responsive Flexbox & Grid)
  - **Storage & State:** Web Storage API (`localStorage`) for offline-first state & streak persistence
  - **Web APIs:** Web Share API (`navigator.share`) & Clipboard API
- **GitHub & Source Code Link:** `https://github.com/<your-username>/wordlight` *(Update with your repository URL)*
- **Deployment Link:** `https://wordlight.vercel.app` *(Update with your deployment URL)*
- **Project PPT:** *(Link to Presentation Slides / Google Slides / Canva)*
- **Video Overview:** *(Link to YouTube / Loom Demo Video)*

---

## 🏗️ System Architecture & Mechanics

### 1. Game State Machine (`GameContext.jsx`)
The application is orchestrated by a finite state machine covering four primary phases:
```
[ LANDING SCREEN ]  --->  [ PLAYING SCREEN (Levels 1-4) ]  --->  [ GIFT SCREEN ]  --->  [ RESULTS SCREEN ]
        ^                                                                                     |
        |_________________________________ (Play Again) ______________________________________|
```

- **`LANDING`**: Name prompt modal, hero editorial copy, specifications, and "How it works" guide.
- **`PLAYING`**: Active 5x6 guess grid, 60-second countdown timer, hint reveal drawer, level progress indicator, and interactive keyboard.
- **`GIFT`**: Staggered sparkle animation, interactive unboxing, and randomized motivational message.
- **`RESULTS`**: Detailed score summary, total time, accuracy rate, streak updates, and 1-click clipboard/native sharing.

### 2. Level Progression & Difficulty Curve
| Level | Target Word | Difficulty | Hint Provided | Micro-Reward |
| :--- | :--- | :--- | :--- | :--- |
| **01** | `LIGHT` | Level 1 (Gentle) | *"It chases away the darkness and helps you see."* | *"Good start."* |
| **02** | `DREAM` | Level 2 (Easy–Medium) | *"It visits you when your eyes are closed at night."* | *"You're warming up."* |
| **03** | `FOCUS` | Level 3 (Medium) | *"The ability to concentrate on what matters most."* | *"Sharp thinking."* |
| **04** | `SHINE` | Level 4 (Medium–Hard) | *"To glow brightly, like something precious."* | *"Journey complete."* |

### 3. Scoring Formula
$$\text{Level Score} = \max\Big(0,\; 100 + (6 - \text{Attempts}) \times 15 + \lfloor\text{Time Remaining} \times 1.5\rfloor - (\text{Hint Used} ? 10 : 0)\Big)$$

---

## ⚡ Quick Showcase & Run Commands (Present to Anyone)

Whenever you need to run, test, or demonstrate this project to judges, mentors, or colleagues, use the simple commands below:

### 🚀 1. Run Locally in Development Mode (Recommended for Demos)

Open your terminal in the project root directory and run:

```bash
# 1. Install dependencies (only needed the first time)
npm install

# 2. Start the local development server with instant HMR
npm run dev
```

> 🌐 **Access the demo:** Open your browser and navigate to the printed local URL (typically **`http://localhost:5173`**).

---

### 📦 2. Build and Test Production Preview

To test how the project performs in a compiled, minified production environment:

```bash
# 1. Create optimized production build
npm run build

# 2. Preview the production build locally
npm run preview
```

---

### 🔍 3. Lint & Validate Codebase

To verify code quality and check for lint errors:

```bash
npm run lint
```

---

## 🎯 1-Minute Presentation Pitch Script

> *"WordLight is an intentional, mindful word deduction game built with React 19 and Vite. Instead of endless distracting ads and noisy dopamine loops, WordLight offers a quiet four-stage mental sanctuary. A player enters their name, tackles four curated five-letter challenges under a gentle 60-second timer, and receives a personalized reflection gift and statistical breakdown at the end. It is fully client-side, zero-tracking, offline-friendly, and completely mobile-responsive."*
