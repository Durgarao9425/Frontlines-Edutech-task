import React, { useState, useMemo } from 'react';
import { industries, countries } from '../data/companies';

export interface FilterState {
  search: string;
  industry: string;
  country: string;
  status: string;
  sortBy: string;
}

interface FilterSidebarProps {
  open: boolean;
  onClose: () => void;
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onClear: () => void;
  totalShowing: number;
  totalAll: number;
}

/* ─── Searchable dropdown with Clear (X) ─────────────────────────────────── */
interface SearchableSelectProps {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  options: string[];
  onChange: (v: string) => void;
  icon?: React.ReactNode;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({
  id, label, value, placeholder, options, onChange, icon
}) => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  const filtered = useMemo(
    () => options.filter((o) => o.toLowerCase().includes(query.toLowerCase())),
    [options, query]
  );

  const handleSelect = (v: string) => {
    onChange(v);
    setOpen(false);
    setQuery('');
  };

  return (
    <div className="filter-group relative">
      <label htmlFor={id}>{label}</label>
      <div className="flex items-center gap-1">
        <button
          id={id}
          type="button"
          onClick={() => setOpen(!open)}
          className="flex-1 f-input text-left flex items-center justify-between gap-2 border-slate-100 h-11"
        >
          <div className="flex items-center gap-2 min-w-0">
            {icon && <span className="text-slate-400 flex-shrink-0">{icon}</span>}
            <span className={`truncate text-[11px] ${value ? 'text-indigo-600 font-black' : 'text-slate-400 font-bold'}`}>
              {value || placeholder}
            </span>
          </div>
          <svg className={`w-3.5 h-3.5 text-slate-300 flex-shrink-0 transition-transform ${open ? 'rotate-180 text-indigo-50' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {/* CLEAR (X) Button for individual filter */}
        {value && (
          <button
            onClick={() => handleSelect('')}
            className="w-10 h-11 flex items-center justify-center bg-slate-50 border border-slate-100 rounded-xl text-slate-400 hover:text-rose-500 transition-all shadow-sm"
            title="Clear Selection"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        )}
      </div>

      {open && (
        <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-2xl shadow-2xl shadow-indigo-200/30 z-[110] overflow-hidden anim-scale">
          <div className="p-2 border-b border-slate-100 bg-slate-50">
            <div className="relative">
              <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                autoFocus
                type="text"
                placeholder={`Search…`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-[10px] bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>
          </div>

          <div className="max-h-48 overflow-y-auto scrollbar-thin">
            {filtered.map((opt) => (
              <button
                key={opt}
                onClick={() => handleSelect(opt)}
                className={`w-full text-left px-4 py-2.5 text-[10px] font-bold transition-all
                  ${value === opt ? 'text-indigo-600 bg-indigo-50' : 'text-slate-500 hover:bg-indigo-50/50'}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/* ─── Filter Sidebar ─────────────────────────────────────────────────────── */
const FilterSidebar: React.FC<FilterSidebarProps> = ({
  open, onClose, filters, onFilterChange, onClear, totalShowing, totalAll
}) => {
  const hasActive = filters.industry || filters.country || filters.status || filters.sortBy !== 'name-asc';

  return (
    <>
      {/* Mobile Backdrop */}
      {open && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        id="filter-sidebar"
        className={`
          fixed inset-y-0 left-0 z-[101] bg-white border-r border-indigo-50 flex flex-col transition-all duration-300 ease-in-out h-full
          md:relative md:z-auto
          ${open ? 'translate-x-0 w-72 opacity-100' : '-translate-x-full md:translate-x-0 md:w-0 opacity-0 pointer-events-none'}
        `}
      >
        <div className="w-72 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-indigo-50 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
            </div>
            <span className="font-black text-slate-800 text-[11px] uppercase tracking-widest">Filters</span>
          </div>
          <button onClick={onClose} className="text-slate-300 hover:text-indigo-600 transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" /></svg>
          </button>
        </div>

        {/* Filters Body */}
        <div className="flex-1 overflow-y-auto scrollbar-thin px-6 py-8 space-y-8">
          
          <SearchableSelect
            id="filter-industry"
            label="Industry"
            value={filters.industry}
            placeholder="Select Category"
            options={industries}
            onChange={(v) => onFilterChange('industry', v)}
            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1" /></svg>}
          />

          <SearchableSelect
            id="filter-country"
            label="Location"
            value={filters.country}
            placeholder="Select Country"
            options={countries}
            onChange={(v) => onFilterChange('country', v)}
            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>}
          />

          <div className="filter-group">
            <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block">Status</label>
            <div className="flex p-1 bg-slate-100 rounded-xl gap-1">
              {['', 'Active', 'Inactive'].map((s) => (
                <button
                  key={s || 'all'}
                  onClick={() => onFilterChange('status', s)}
                  className={`flex-1 py-1.5 text-[10px] font-black uppercase rounded-lg transition-all
                    ${filters.status === s ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-indigo-600'}`}
                >
                  {s || 'All'}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block">Sort By</label>
            <div className="space-y-1.5">
              {[
                { v: 'name-asc', l: 'Name A-Z' },
                { v: 'name-desc', l: 'Name Z-A' },
                { v: 'employees-desc', l: 'Size (High)' },
                { v: 'employees-asc', l: 'Size (Low)' },
                { v: 'founded-desc', l: 'Newest' },
                { v: 'founded-asc', l: 'Oldest' }
              ].map((o) => (
                <button
                  key={o.v}
                  onClick={() => onFilterChange('sortBy', o.v)}
                  className={`w-full text-left px-3 py-2 text-[10px] font-bold rounded-lg border transition-all
                    ${filters.sortBy === o.v ? 'bg-indigo-50 border-indigo-100 text-indigo-600' : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200'}`}
                >
                  {o.l}
                </button>
              ))}
            </div>
          </div>

          {hasActive && (
            <button
              onClick={onClear}
              className="w-full py-3 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-indigo-600 transition-all shadow-lg"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Dynamic Summary */}
        <div className="p-6 border-t border-indigo-50 bg-indigo-50/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] text-slate-400 font-bold uppercase">Results</span>
            <span className="text-xs font-black text-indigo-600">{totalShowing}</span>
          </div>
          <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-600" style={{ width: `${(totalShowing / totalAll) * 100}%` }} />
          </div>
        </div>
      </div>
    </aside>
  </>
);
};

export default FilterSidebar;
