# 🎓 Student Budget Planner — Complete Web App

A full-featured, beautifully designed student budget management platform. **100% client-side — no server, no installation, just open and use.**

## 📁 File Structure

```
student-budget-planner-full/
├── index.html      → Landing page (home / marketing)
├── auth.html       → Login & Registration
├── app.html        → Full app (all 10 pages inside)
├── shared.css      → Shared design system & styles
├── shared.js       → Shared data layer & utilities
└── README.md       → This file
```

## 🚀 How to Use

1. Open `index.html` in any modern browser
2. Click **"Get Started Free"** → goes to auth.html
3. Register or login → goes to app.html
4. All data is saved in your browser's localStorage

> **Tip:** You can also go directly to `app.html` to skip login.

---

## 📄 Pages Overview

### 1. Landing Page (`index.html`)
- Hero section with animated gradient background
- Feature cards with hover effects
- How it works — 4-step process
- Student testimonials
- CTA to register / login
- Fully responsive mobile nav

### 2. Login & Registration (`auth.html`)
- Split-screen layout (branding left, form right)
- Tab switcher: Login ↔ Register
- Password strength indicator
- Forgot password flow
- Google sign-in button (UI only — connects on integration)
- Form validation with error toasts

### 3. Dashboard (`app.html` → Dashboard)
- Welcome banner (hidden once data is added)
- 4 metric cards: Income / Expenses / Savings / Goals
- Spending by Category — animated bar chart
- Budget Health — animated SVG donut ring
- Recent Transactions list

### 4. Income Management
- 3 summary metrics
- Add income modal (description, amount, date, category, note)
- Full income history with delete
- Categories: Pocket Money, Part-time Job, Scholarship, Freelance, Gift

### 5. Expense Management
- Search bar + category filter
- Sortable table with edit & delete per row
- Inline edit modal
- Category color coding with emoji icons

### 6. Savings Goals
- Create goals with emoji, target, deadline, description
- Animated shimmer progress bars
- Days remaining countdown
- "Add Savings" modal per goal
- Completion badge + celebration toast

### 7. Reports & Analytics
- 4 all-time metrics
- Bar chart: Income vs Expenses (last 6 months)
- Donut chart: Category split (all time)
- Summary statistics table
- PDF export button (shows toast — connect jsPDF for real export)

### 8. AI Budget Assistant
- Chat interface with typing indicator
- Pre-loaded quick-question chips
- AI responses based on real user data:
  - Spending analysis
  - Savings suggestions
  - Expense predictions
  - Budget planning (50/30/20 rule)
  - Waste identification
- Insight cards below chat

### 9. Rewards & Challenges
- Points system (earn points for actions)
- 6 weekly challenges to complete
- 9 achievement badges (auto-unlocked based on activity)
- Leaderboard with simulated peers
- Level system (level up every 100 points)

### 10. Financial Tips
- 12 expert money-management tips
- Categories: Budgeting, Savings, Food, Tech, Goals, etc.
- Hover lift effect

### 11. My Profile
- Upload profile photo
- Edit name, college, course, year
- Stats overview
- Earned badges display

### 12. Settings
- Dark / Light mode toggle
- Currency selector (₹, $, €, £)
- Notification toggles
- Monthly budget limit
- Export data (JSON backup)
- Import data (restore backup)
- Clear all data

---

## 🎨 Design System

| Property | Value |
|----------|-------|
| Primary color | `#00D68F` (Emerald Green) |
| Accent | `#00D4C8` (Teal) |
| Highlight | `#A8E63C` (Lime) |
| Font (body) | Plus Jakarta Sans |
| Font (headings/numbers) | Fraunces Serif |
| Border radius | 16px cards, 10px inputs |
| Animation | CSS transitions + Chart.js |

### Color Themes
- ✅ Full **Dark Mode** — toggle in sidebar or Settings
- ✅ All charts re-render with correct colors on theme switch

---

## 💾 Data Storage

All data is stored in **browser localStorage** under these keys:

| Key | Contents |
|-----|----------|
| `sbp_income` | Income entries array |
| `sbp_expenses` | Expense entries array |
| `sbp_goals` | Savings goals array |
| `sbp_profile` | User profile object |
| `sbp_rewards` | Points & badges |
| `sbp_theme` | `'light'` or `'dark'` |

---

## 🔧 Customization

**Change currency globally:** Settings → Currency Selection

**Add a new expense category:** Edit the `<select>` in the expense modal in `app.html` and add to `CAT_COLOR`, `CAT_BG`, `CAT_EMOJI` objects in the `<script>` section.

**Connect real backend:** Replace the `DB.get/set` functions in `shared.js` with `fetch()` API calls to your backend.

**Connect Google Auth:** Add Firebase SDK and replace `googleLogin()` in `auth.html`.

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout |
|------------|--------|
| > 1024px | Full sidebar + 4-column grids |
| 900px–1024px | Sidebar collapsible + 2-col grids |
| 600px–900px | Hamburger menu + stacked layout |
| < 600px | Mobile-first single column |

---

## 🌟 Features Summary

- [x] 12 fully working pages
- [x] Dark/Light mode
- [x] LocalStorage data persistence  
- [x] Live Chart.js charts (bar + donut)
- [x] AI chat with data-driven responses
- [x] Gamified rewards & badges
- [x] Goal progress with animations
- [x] Expense search & filter
- [x] Profile photo upload
- [x] Data export/import (JSON)
- [x] Fully responsive (mobile to desktop)
- [x] Zero dependencies except Chart.js & Tabler Icons (CDN)

---

*Built with 💚 for students everywhere · Student Budget Planner 2026*
