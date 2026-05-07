import React, { useState, useEffect } from 'react';
import type { Company } from '../data/companies';

/* ─── Logo Avatar with fallback chain ────────────────────────────────────── */
const avatarColors = [
  'bg-indigo-600', 'bg-emerald-600', 'bg-violet-600',
  'bg-rose-600', 'bg-amber-600', 'bg-sky-600',
];

export const LogoAvatar: React.FC<{
  name: string;
  id: number;
  website: string;
  logoUrl: string;
}> = ({
  name,
  id,
  website,
  logoUrl,
}) => {
  const [imgSrc, setImgSrc] = useState("");
  const [failed, setFailed] = useState(false);

  const color = avatarColors[id % avatarColors.length];

  // CLEAN DOMAIN
  const cleanDomain = website
    ?.replace("https://", "")
    ?.replace("http://", "")
    ?.replace("www.", "")
    ?.split("/")[0];

  useEffect(() => {
    if (logoUrl) {
      setImgSrc(logoUrl);
    } else {
      setImgSrc(`https://logo.clearbit.com/${cleanDomain}`);
    }

    setFailed(false);
  }, [logoUrl, cleanDomain]);

  const handleError = () => {
    // GOOGLE FAVICON FALLBACK
    if (
      imgSrc !==
      `https://www.google.com/s2/favicons?domain=${cleanDomain}&sz=256`
    ) {
      setImgSrc(
        `https://www.google.com/s2/favicons?domain=${cleanDomain}&sz=256`
      );
    } else {
      setFailed(true);
    }
  };

  return (
    <div className="w-14 h-14 rounded-2xl p-[2px] bg-gradient-to-br from-slate-200 via-white to-slate-300 shadow-md group-hover:shadow-xl transition-all duration-300">

      <div
        className={`relative w-full h-full rounded-[14px] overflow-hidden ${color} flex items-center justify-center`}
      >
        {/* FALLBACK LETTER */}
        <span className="text-xl font-black text-white select-none">
          {name.charAt(0)}
        </span>

        {/* IMAGE */}
        {!failed && (
          <div className="absolute inset-0 bg-white flex items-center justify-center">
            <img
              src={imgSrc}
              alt={name}
              loading="lazy"
              onError={handleError}
              className="w-full h-full object-contain p-2 rounded-[14px] bg-white"
            />
          </div>
        )}
      </div>
    </div>
  );
};

/* ─── Industry color mapping ─────────────────────────────────────────────── */
const industryColors: Record<string, string> = {
  FinTech: 'text-emerald-700 bg-emerald-50 border-emerald-100',
  SaaS: 'text-blue-700 bg-blue-50 border-blue-100',
  CleanTech: 'text-teal-700 bg-teal-50 border-teal-100',
  Agriculture: 'text-amber-700 bg-amber-50 border-amber-100',
  HealthTech: 'text-rose-700 bg-rose-50 border-rose-100',
  Robotics: 'text-violet-700 bg-violet-50 border-violet-100',
  'Cloud Computing': 'text-sky-700 bg-sky-50 border-sky-100',
  Blockchain: 'text-indigo-700 bg-indigo-50 border-indigo-100',
  'Artificial Intelligence': 'text-purple-700 bg-purple-50 border-purple-100',
  EdTech: 'text-orange-700 bg-orange-50 border-orange-100',
  'IT Services': 'text-cyan-700 bg-cyan-50 border-cyan-100',
  'E-Commerce': 'text-lime-700 bg-lime-50 border-lime-100',
  'Consumer Electronics': 'text-slate-700 bg-slate-50 border-slate-200',
  'Social Media': 'text-pink-700 bg-pink-50 border-pink-100',
  Transportation: 'text-yellow-700 bg-yellow-50 border-yellow-100',
  'Media & Entertainment': 'text-red-700 bg-red-50 border-red-100',
};

const getIndustryStyles = (ind: string) =>
  industryColors[ind] ?? 'text-slate-600 bg-slate-50 border-slate-100';

/* ─── Avatar Gradients ────────────────────────────────────────────────────── */
// const gradients = [...]
// const getGradient = ...

/* ─── Stat item ───────────────────────────────────────────────────────────── */
const StatItem: React.FC<{ icon: React.ReactNode; value: string; label: string }> = ({ icon, value, label }) => (
  <div className="flex flex-col items-center gap-1">
    <div className="flex items-center gap-1.5 text-slate-700">
      <span className="text-slate-400">{icon}</span>
      <span className="text-xs font-bold tabular-nums">{value}</span>
    </div>
    <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{label}</span>
  </div>
);

/* ─── Company Card ────────────────────────────────────────────────────────── */
interface Props {
  company: Company;
  animationDelay: number;
  onClick: (company: Company) => void;
}

const CompanyCard: React.FC<Props> = ({ company, animationDelay, onClick }) => {
  const { id, name, industry, location, country, employees, founded, revenue, status, description, website } = company;
  const isActive = status === 'Active';

  return (
    <article
      id={`card-${id}`}
      onClick={(e) => {
        e.preventDefault();
        onClick(company);
      }}
      className="company-card anim-card flex flex-col group h-full cursor-pointer hover:-translate-y-2 transition-all duration-500 bg-white"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {/* Top Section */}
      <div className="p-5 pb-4 flex-1">
        <div className="flex items-start justify-between mb-5">
          {/* Logo Container */}
          <LogoAvatar name={name} id={id} website={website} logoUrl={company.logo} />

          {/* Status Pill */}
          <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider
            ${isActive ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 bg-slate-50'}`}>
            {status}
          </div>
        </div>

        {/* Info */}
        <div className="mb-4">
          <h3 className="text-slate-800 font-bold text-base leading-tight truncate group-hover:text-indigo-600 transition-colors">
            {name}
          </h3>
          <div className="flex items-center gap-2 mt-1.5">
            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${getIndustryStyles(industry)}`}>
              {industry}
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-[11px] font-medium text-slate-500 truncate">{location}, {country}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2 mb-2">
          {description}
        </p>
      </div>

      {/* Stats Divider */}
      <div className="mt-auto border-t border-slate-50 bg-slate-50/40 px-5 py-4 rounded-b-2xl grid grid-cols-3 gap-2">
        <StatItem
          icon={<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
          value={employees >= 1000 ? `${(employees / 1000).toFixed(1)}K` : String(employees)}
          label="Staff"
        />
        <StatItem
          icon={<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
          value={String(founded)}
          label="Founded"
        />
        <StatItem
          icon={<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          value={revenue}
          label="Revenue"
        />
      </div>
    </article>
  );
};

export default CompanyCard;
