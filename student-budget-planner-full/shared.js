/* ═══════════════════════════════════════
   STUDENT BUDGET PLANNER — SHARED JS
═══════════════════════════════════════ */

/* ── DATA LAYER ── */
const DB = {
  get: (k, def=[]) => { try { return JSON.parse(localStorage.getItem('sbp_'+k) || JSON.stringify(def)); } catch(e) { return def; } },
  set: (k, v) => localStorage.setItem('sbp_'+k, JSON.stringify(v)),
  income:   () => DB.get('income'),
  expenses: () => DB.get('expenses'),
  goals:    () => DB.get('goals'),
  profile:  () => DB.get('profile', {name:'Student',college:'',currency:'₹',theme:'light',avatar:'',points:0,badges:[]}),
  rewards:  () => DB.get('rewards', {points:0,completed:[],challenges:[]}),
  setIncome:   d => DB.set('income', d),
  setExpenses: d => DB.set('expenses', d),
  setGoals:    d => DB.set('goals', d),
  setProfile:  d => DB.set('profile', d),
  setRewards:  d => DB.set('rewards', d),
};

/* ── UTILS ── */
const now = new Date();
const CY = now.getFullYear(), CM = now.getMonth();
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const FULL_MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2,6);
const esc = s => String(s||'').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const fmtDate = d => new Date(d).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'});
const thisMonth = d => { const dt=new Date(d); return dt.getFullYear()===CY && dt.getMonth()===CM; };
const fmt = (n, sym='₹') => sym + Math.round(n||0).toLocaleString('en-IN');
const pct = (a,b) => b>0 ? Math.min(Math.round((a/b)*100),100) : 0;

const CAT_COLOR = {
  Food:'#F97316', Travel:'#3B82F6', Shopping:'#EC4899', Education:'#8B5CF6',
  Entertainment:'#06B6D4', Health:'#10B981', Utilities:'#64748B',
  Stationery:'#F59E0B', Other:'#94A3B8',
  'Pocket Money':'#00D68F', 'Part-time Job':'#3B82F6', Scholarship:'#8B5CF6',
  Freelance:'#F59E0B', Gift:'#EC4899', Other:'#94A3B8'
};
const CAT_BG = {
  Food:'rgba(249,115,22,.1)', Travel:'rgba(59,130,246,.1)', Shopping:'rgba(236,72,153,.1)',
  Education:'rgba(139,92,246,.1)', Entertainment:'rgba(6,182,212,.1)', Health:'rgba(16,185,129,.1)',
  Utilities:'rgba(100,116,139,.1)', Stationery:'rgba(245,158,11,.1)', Other:'rgba(148,163,184,.1)',
  'Pocket Money':'rgba(0,214,143,.1)', 'Part-time Job':'rgba(59,130,246,.1)',
  Scholarship:'rgba(139,92,246,.1)', Freelance:'rgba(245,158,11,.1)', Gift:'rgba(236,72,153,.1)'
};
const CAT_EMOJI = {
  Food:'🍜', Travel:'🚌', Shopping:'🛍️', Education:'📚', Entertainment:'🎮',
  Health:'💊', Utilities:'💡', Stationery:'✏️', Other:'📦',
  'Pocket Money':'💵', 'Part-time Job':'💼', Scholarship:'🎓', Freelance:'💻', Gift:'🎁'
};
const GOAL_GRADS = [
  'linear-gradient(135deg,#00D68F,#00B87A)',
  'linear-gradient(135deg,#3B82F6,#06B6D4)',
  'linear-gradient(135deg,#8B5CF6,#EC4899)',
  'linear-gradient(135deg,#F59E0B,#EF4444)',
  'linear-gradient(135deg,#10B981,#3B82F6)',
  'linear-gradient(135deg,#EC4899,#8B5CF6)',
];

/* ── THEME ── */
let isDark = localStorage.getItem('sbp_theme') === 'dark';
function applyTheme() {
  document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
  const ti = document.getElementById('themeIcon');
  const tl = document.getElementById('themeLabel');
  if (ti) ti.className = isDark ? 'ti ti-sun' : 'ti ti-moon';
  if (tl) tl.textContent = isDark ? 'Light mode' : 'Dark mode';
  const ts = document.getElementById('themeToggleSetting');
  if (ts) ts.checked = isDark;
}
function toggleTheme() {
  isDark = !isDark;
  localStorage.setItem('sbp_theme', isDark ? 'dark' : 'light');
  applyTheme();
  if (typeof rerenderCharts === 'function') rerenderCharts();
}
applyTheme();

/* ── TOAST ── */
function toast(msg, type='success') {
  let wrap = document.getElementById('toastWrap');
  if (!wrap) { wrap = document.createElement('div'); wrap.id='toastWrap'; wrap.className='toast-wrap'; document.body.appendChild(wrap); }
  const el = document.createElement('div');
  const icons = {success:'ti-check-circle', error:'ti-alert-circle', info:'ti-info-circle'};
  el.className = 'toast t-' + type;
  el.innerHTML = `<i class="ti ${icons[type]||'ti-check-circle'}"></i>${msg}`;
  wrap.appendChild(el);
  setTimeout(() => el.remove(), 3000);
}

/* ── MODAL ── */
const openModal = id => {
  const m = document.getElementById(id); if (!m) return;
  m.classList.add('open');
  ['incomeDate','expDate'].forEach(fid => {
    const f = document.getElementById(fid);
    if (f && !f.value) f.value = new Date().toISOString().split('T')[0];
  });
};
const closeModal = id => { const m=document.getElementById(id); if(m) m.classList.remove('open'); };
document.addEventListener('click', e => {
  if (e.target.classList.contains('mo')) e.target.classList.remove('open');
});

/* ── SIDEBAR ── */
function openSidebar() {
  document.getElementById('sidebar')?.classList.add('open');
  document.getElementById('sidebarOverlay')?.classList.add('open');
}
function closeSidebar() {
  document.getElementById('sidebar')?.classList.remove('open');
  document.getElementById('sidebarOverlay')?.classList.remove('open');
}

/* ── NAVIGATION ── */
const PAGE_TITLES = {
  dashboard:'Dashboard', income:'Income', expenses:'Expenses', goals:'Savings Goals',
  reports:'Reports & Analytics', profile:'My Profile', settings:'Settings',
  tips:'Financial Tips', ai:'AI Budget Assistant', rewards:'Rewards & Challenges'
};
let activeCharts = {};

function showPage(id, navEl) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.sb-item').forEach(n => n.classList.remove('active'));
  const page = document.getElementById('page-' + id);
  if (page) page.classList.add('active');
  if (navEl) navEl.classList.add('active');
  const tt = document.getElementById('pageTitle');
  if (tt) tt.textContent = PAGE_TITLES[id] || id;
  closeSidebar();
  const renders = {
    dashboard: renderDashboard, income: renderIncome, expenses: renderExpenses,
    goals: renderGoals, reports: renderReports, profile: renderProfile,
    settings: renderSettings, tips: renderTips, ai: renderAI, rewards: renderRewards
  };
  if (renders[id]) renders[id]();
}

/* ── PROFILE ── */
function getSym() { return DB.profile().currency || '₹'; }
function getUserName() { return DB.profile().name || 'Student'; }

/* ── EMPTY STATE ── */
const emptyState = (t, d, icon) => `
<div class="empty">
  <div class="empty-orb"><i class="ti ${icon}"></i></div>
  <div class="empty-t">${t}</div>
  <div class="empty-d">${d}</div>
</div>`;

/* ── CHART COLORS ── */
function chartColors() {
  return {
    grid: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
    tick: isDark ? '#3E7A5A' : '#5A8C72',
  };
}
function destroyChart(id) {
  if (activeCharts[id]) { activeCharts[id].destroy(); delete activeCharts[id]; }
}
function rerenderCharts() {
  const ap = document.querySelector('.page.active');
  if (!ap) return;
  const id = ap.id.replace('page-', '');
  const renders = { reports: renderReports, ai: renderAI, dashboard: renderDashboard };
  if (renders[id]) renders[id]();
}
