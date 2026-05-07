import React, { useState, useRef, useEffect } from 'react';

/* ─── Mega-menu data ─────────────────────────────────────────────────────── */
const NAV_MENUS = [
  {
    label: 'Directory',
    id: 'directory',
    sections: [
      {
        title: 'Browse',
        items: [
          { icon: '🏢', label: 'All Companies', desc: 'Explore the full company database' },
          { icon: '✅', label: 'Active Companies', desc: 'Currently operating businesses' },
          { icon: '🌍', label: 'Global Directory', desc: 'Companies across 15+ countries' },
        ],
      },
      {
        title: 'Filter By',
        items: [
          { icon: '🏭', label: 'By Industry', desc: 'FinTech, SaaS, AI, HealthTech…' },
          { icon: '📍', label: 'By Location', desc: 'Country & city-level filtering' },
          { icon: '💼', label: 'By Size', desc: 'Employee count & revenue ranges' },
        ],
      },
    ],
    footer: { label: '🆕 32 companies listed', link: 'View all →' },
  },
  {
    label: 'Industries',
    id: 'industries',
    sections: [
      {
        title: 'Technology',
        items: [
          { icon: '🤖', label: 'Artificial Intelligence', desc: 'ML & deep learning companies' },
          { icon: '☁️', label: 'Cloud Computing', desc: 'Infrastructure & SaaS platforms' },
          { icon: '🔐', label: 'Cybersecurity', desc: 'Security-focused organizations' },
        ],
      },
      {
        title: 'Finance & Commerce',
        items: [
          { icon: '💳', label: 'FinTech', desc: 'Payments & financial services' },
          { icon: '🛒', label: 'E-commerce', desc: 'Online retail & marketplaces' },
          { icon: '⛓️', label: 'Blockchain', desc: 'Web3 & decentralized tech' },
        ],
      },
    ],
    footer: { label: '20+ industries covered', link: 'See all →' },
  },
  {
    label: 'Analytics',
    id: 'analytics',
    sections: [
      {
        title: 'Insights',
        items: [
          { icon: '📊', label: 'Company Growth', desc: 'Employee & revenue trends' },
          { icon: '🌐', label: 'Geographic View', desc: 'Global distribution map' },
          { icon: '📈', label: 'Revenue Insights', desc: 'Revenue range breakdown' },
        ],
      },
      {
        title: 'Reports',
        items: [
          { icon: '📋', label: 'Export Data', desc: 'CSV, JSON & PDF exports' },
          { icon: '🔖', label: 'Saved Searches', desc: 'Reuse your filter presets' },
          { icon: '📅', label: 'Founded Timeline', desc: 'Companies by founding year' },
        ],
      },
    ],
    footer: { label: 'Real-time data', link: 'Open dashboard →' },
  },
];

/* ─── Profile menu ───────────────────────────────────────────────────────── */
const PROFILE_ITEMS = [
  { icon: '👤', label: 'My Profile', desc: 'View & edit your account' },
  { icon: '⚙️', label: 'Settings', desc: 'Preferences & configuration' },
  { icon: '🔔', label: 'Notifications', desc: '3 unread notifications' },
];

/* ─── Mega-menu panel ────────────────────────────────────────────────────── */
interface MegaMenuPanelProps {
  menu: (typeof NAV_MENUS)[number];
  visible: boolean;
}

const MegaMenuPanel: React.FC<MegaMenuPanelProps> = ({ menu, visible }) => (
  <div
    className={`w-[520px] bg-white border border-indigo-100
                rounded-2xl shadow-2xl shadow-indigo-200/50 overflow-hidden z-50 transition-all duration-200 origin-top
                ${visible ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}
  >
    <div className="grid grid-cols-2 gap-2 p-5">
      {menu.sections.map((section) => (
        <div key={section.title} className="space-y-1">
          <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-3 px-2">{section.title}</p>
          {section.items.map((item) => (
            <button
              key={item.label}
              className="w-full text-left flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-indigo-50 group transition-all duration-150"
            >
              <span className="text-base flex-shrink-0">{item.icon}</span>
              <div>
                <p className="text-sm font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">{item.label}</p>
                <p className="text-[11px] text-slate-400 group-hover:text-slate-500 leading-tight mt-0.5">{item.desc}</p>
              </div>
            </button>
          ))}
        </div>
      ))}
    </div>
    <div className="border-t border-indigo-50 bg-indigo-50/30 px-5 py-3 flex items-center justify-between">
      <span className="text-[11px] text-indigo-600 font-bold uppercase tracking-wider">{menu.footer.label}</span>
      <button className="text-[11px] text-indigo-500 hover:text-indigo-700 font-bold underline underline-offset-4">
        {menu.footer.link}
      </button>
    </div>
  </div>
);

/* ─── Profile dropdown ───────────────────────────────────────────────────── */
interface ProfileDropdownProps { visible: boolean; onSignOut: () => void; }

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ visible, onSignOut }) => (
  <div
    onClick={(e) => e.stopPropagation()}
    className={`w-64 bg-white border border-indigo-100
                rounded-2xl shadow-2xl shadow-indigo-200/50 overflow-hidden z-50 transition-all duration-200 origin-top-right
                ${visible ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}
  >
    <div className="px-4 py-4 border-b border-indigo-50 bg-indigo-50/20 flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-bold shadow-md">DR</div>
      <div>
        <p className="text-sm font-bold text-slate-800">Durgarao</p>
        <p className="text-[10px] text-slate-500 font-bold mb-1">6303359435</p>
        <p className="text-[11px] text-indigo-500 font-medium tracking-wide uppercase leading-none">Administrator</p>
      </div>
    </div>
    <div className="p-2">
      {PROFILE_ITEMS.map((item) => (
        <button key={item.label} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-indigo-50 group text-left transition-all">
          <span className="text-base">{item.icon}</span>
          <div>
            <p className="text-sm font-bold text-slate-700 group-hover:text-indigo-600">{item.label}</p>
            <p className="text-[11px] text-slate-400 leading-none mt-1">{item.desc}</p>
          </div>
        </button>
      ))}
    </div>
    <div className="border-t border-indigo-50 p-2">
      <button onClick={onSignOut} className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-rose-50 text-rose-500 font-bold text-sm transition-all">
        Sign Out
      </button>
    </div>
  </div>
);

/* ─── Navbar ─────────────────────────────────────────────────────────────── */
interface NavbarProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  totalCompanies: number;
}

const Navbar: React.FC<NavbarProps> = ({ sidebarOpen, onToggleSidebar, totalCompanies }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header ref={navRef} className="sticky top-0 z-50 bg-indigo-700 border-b border-indigo-800 shadow-xl shadow-indigo-900/10">
      <div className="max-w-screen-2xl mx-auto px-4 flex items-center h-16 gap-4">

        {/* Toggle */}
        <button onClick={onToggleSidebar} className="w-10 h-10 flex items-center justify-center rounded-xl bg-indigo-600/50 hover:bg-white/20 text-white transition-all">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {sidebarOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 19l-7-7 7-7" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>

        {/* Logo */}
        <div className="flex items-center gap-3 mr-4">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-lg">
            <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-black text-lg leading-none tracking-tight hidden sm:block">Companies Directory</span>
            <span className="text-indigo-200 text-[9px] font-bold uppercase tracking-widest hidden sm:block mt-0.5">Frontlines Edutech Task</span>
          </div>
        </div>

        {/* Items - Hidden on mobile */}
        <nav className="hidden md:flex items-center gap-1 flex-1">
          {NAV_MENUS.map((menu) => (
            <div key={menu.id} className="relative group" onMouseEnter={() => setActiveMenu(menu.id)} onMouseLeave={() => setActiveMenu(null)}>
              <button className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all
                ${activeMenu === menu.id ? 'bg-white text-indigo-700' : 'text-indigo-100 hover:bg-white/10 hover:text-white'}`}>
                {menu.label}
                <svg className={`w-3.5 h-3.5 opacity-60 transition-transform ${activeMenu === menu.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
              </button>
              <div className="absolute top-full left-0 pt-2 pointer-events-none group-hover:pointer-events-auto">
                <MegaMenuPanel menu={menu} visible={activeMenu === menu.id} />
              </div>
            </div>
          ))}
        </nav>

        {/* Spacer for mobile */}
        <div className="flex-1 md:hidden" />

        {/* User - NO BADGE HERE (only in hero/sidebar) */}
        <div className="flex items-center gap-4">
          <div className="relative group" onMouseEnter={() => setProfileOpen(true)} onMouseLeave={() => setProfileOpen(false)}>
            <button
              className={`flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-2xl transition-all ${profileOpen ? 'bg-white/20' : 'hover:bg-white/10'}`}
            >
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-indigo-600 font-black text-xs shadow-inner">DR</div>
              <div className="hidden lg:block text-left">
                <p className="text-white text-xs font-black leading-none">Durgarao</p>
                <p className="text-indigo-200 text-[10px] font-bold uppercase tracking-wider mt-1">Administrator</p>
              </div>
            </button>
            <div className="absolute top-full right-0 pt-2 w-64 pointer-events-none group-hover:pointer-events-auto">
              <ProfileDropdown visible={profileOpen} onSignOut={() => alert('Exit System')} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
