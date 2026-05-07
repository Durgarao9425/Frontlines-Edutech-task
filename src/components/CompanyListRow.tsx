import React from 'react';
import type { Company } from '../data/companies';
import { LogoAvatar } from './CompanyCard';

/* ─── Company List Row (Simplified Table Design) ─────────────────────────── */
interface Props {
  company: Company;
  animationDelay: number;
  onClick: (company: Company) => void;
}

const CompanyListRow: React.FC<Props> = ({ company, animationDelay, onClick }) => {
  const { name, industry, location, country, employees, revenue, status, logo } = company;

  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        onClick(company);
      }}
      className="anim-card group border-b border-slate-50 hover:bg-indigo-50/50 transition-all cursor-pointer"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div className="grid grid-cols-6 items-center px-6 py-3 gap-4">
        
        {/* NAME WITH LOGO */}
        <div className="flex items-center gap-3 min-w-0">
          <LogoAvatar name={name} id={company.id} website={company.website} logoUrl={company.logo} />
          <span className="text-sm font-bold text-slate-800 truncate group-hover:text-indigo-600 transition-colors tracking-tight">{name}</span>
        </div>

        {/* INDUSTRY */}
        <div className="text-xs font-medium text-slate-500 truncate">
          {industry}
        </div>

        {/* LOCATION */}
        <div className="text-xs font-medium text-slate-500 truncate">
          {location}, {country}
        </div>

        {/* EMPLOYEES (NORMALIZED FONT WEIGHT) */}
        <div className="text-sm font-semibold text-slate-800">
          {employees >= 1000 ? `${(employees / 1000).toFixed(1)}k+` : employees}
        </div>

        {/* REVENUE (NORMALIZED FONT WEIGHT) */}
        <div className="text-sm font-semibold text-slate-800">
          {revenue}
        </div>

        {/* STATUS */}
        <div className="flex justify-end">
          <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border
            ${status === 'Active' 
              ? 'text-emerald-600 bg-emerald-50 border-emerald-100' 
              : 'text-slate-400 bg-slate-50 border-slate-100'}`}>
            {status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CompanyListRow;
