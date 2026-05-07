import React from 'react';

const EmptyState: React.FC<{ onClear: () => void }> = ({ onClear }) => (
  <div
    id="empty-state"
    className="flex flex-col items-center justify-center py-24 px-6 text-center animate-fade-in"
  >
    {/* Illustration */}
    <div className="relative mb-6">
      <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center shadow-inner">
        <svg
          className="w-14 h-14 text-indigo-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      {/* Decorative dots */}
      <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-indigo-200 opacity-70" />
      <span className="absolute -bottom-2 -left-2 w-6 h-6 rounded-full bg-purple-100" />
    </div>

    <h2 className="text-xl font-bold text-slate-700 mb-2">No companies found</h2>
    <p className="text-slate-400 text-sm max-w-sm mb-6">
      We couldn't find any companies matching your current filters. Try adjusting your search
      criteria or clearing all filters.
    </p>

    <button
      id="empty-state-clear-btn"
      onClick={onClear}
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700
                 text-white text-sm font-semibold shadow-md shadow-indigo-200 transition-all duration-200
                 hover:shadow-lg hover:-translate-y-0.5"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
      Clear All Filters
    </button>
  </div>
);

export default EmptyState;
