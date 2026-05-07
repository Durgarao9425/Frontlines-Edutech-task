import React from 'react';
import { industries, countries } from '../data/companies';

export interface FilterState {
  search: string;
  industry: string;
  country: string;
  status: string;
  sortBy: string;
}

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onClear: () => void;
  totalShowing: number;
  totalAll: number;
}

const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onClear,
  totalShowing,
  totalAll,
}) => {
  const hasActiveFilters =
    filters.search || filters.industry || filters.country || filters.status || filters.sortBy !== 'name-asc';

  return (
    <div className="bg-white border-b border-slate-100 shadow-sm sticky top-16 z-40">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col gap-4">
          {/* Top row: search + result count */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                id="search-input"
                type="text"
                placeholder="Search companies…"
                value={filters.search}
                onChange={(e) => onFilterChange('search', e.target.value)}
                className="filter-input pl-9"
              />
            </div>

            {/* Result count badge */}
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-sm text-slate-500">
                Showing{' '}
                <span className="font-semibold text-indigo-700 tabular-nums">{totalShowing}</span>{' '}
                of{' '}
                <span className="font-semibold text-slate-700 tabular-nums">{totalAll}</span>{' '}
                companies
              </span>
              {hasActiveFilters && (
                <button
                  id="clear-filters-btn"
                  onClick={onClear}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-all duration-200"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Bottom row: dropdowns */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Industry */}
            <div>
              <label htmlFor="filter-industry" className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">
                Industry
              </label>
              <select
                id="filter-industry"
                value={filters.industry}
                onChange={(e) => onFilterChange('industry', e.target.value)}
                className="filter-input"
              >
                <option value="">All Industries</option>
                {industries.map((ind) => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
            </div>

            {/* Country */}
            <div>
              <label htmlFor="filter-country" className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">
                Country
              </label>
              <select
                id="filter-country"
                value={filters.country}
                onChange={(e) => onFilterChange('country', e.target.value)}
                className="filter-input"
              >
                <option value="">All Countries</option>
                {countries.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <label htmlFor="filter-status" className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">
                Status
              </label>
              <select
                id="filter-status"
                value={filters.status}
                onChange={(e) => onFilterChange('status', e.target.value)}
                className="filter-input"
              >
                <option value="">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <label htmlFor="sort-by" className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">
                Sort By
              </label>
              <select
                id="sort-by"
                value={filters.sortBy}
                onChange={(e) => onFilterChange('sortBy', e.target.value)}
                className="filter-input"
              >
                <option value="name-asc">Name (A → Z)</option>
                <option value="name-desc">Name (Z → A)</option>
                <option value="employees-desc">Employees (High → Low)</option>
                <option value="employees-asc">Employees (Low → High)</option>
                <option value="founded-desc">Founded (Newest)</option>
                <option value="founded-asc">Founded (Oldest)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
