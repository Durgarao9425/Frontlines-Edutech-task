import React from 'react';

type ViewMode = 'grid' | 'list';

interface ContentHeaderProps {
  totalShowing: number;
  totalAll: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  onItemsPerPageChange: (size: number) => void;
  viewMode: ViewMode;
  onViewChange: (v: ViewMode) => void;
  sidebarOpen: boolean;
  onOpenSidebar: () => void;
}

const ContentHeader: React.FC<ContentHeaderProps> = ({
  totalShowing, viewMode, onViewChange, sidebarOpen, onOpenSidebar,
}) => (
  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6 bg-white p-3 sm:p-4 rounded-2xl border border-slate-100 shadow-sm">

    {/* Left — Filter Toggle & Count */}
    <div className="flex items-center justify-between sm:justify-start gap-4">
      <div className="flex items-center gap-4">
        {!sidebarOpen && (
          <button
            id="open-sidebar-btn"
            onClick={onOpenSidebar}
            className="flex items-center gap-2 px-4 py-2.5 text-[10px] font-black uppercase tracking-wider
                       text-indigo-600 bg-white border border-indigo-100 rounded-xl
                       hover:bg-indigo-50 transition-all shadow-sm group whitespace-nowrap"
          >
            <svg className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414
                   a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293
                   A1 1 0 013 6.586V4z" />
            </svg>
            Filters
          </button>
        )}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest hidden xs:block">
            Records
          </span>

          <span className="text-xs font-bold text-slate-700 whitespace-nowrap">
            {totalShowing} <span className="text-slate-400 font-medium">Found</span>
          </span>
        </div>
      </div>
    </div>

    {/* Right — Pagination & View Mode */}
    <div className="flex flex-col xs:flex-row items-center gap-4">

      <div className="flex items-center gap-1.5 bg-slate-50 rounded-xl p-1 border border-slate-100">
        <button
          id="view-grid"
          onClick={() => onViewChange('grid')}
          className={`px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-wider
            ${viewMode === 'grid'
              ? 'bg-white text-indigo-600 shadow-md ring-1 ring-slate-200'
              : 'text-slate-400 hover:text-slate-600'
            }`}
        >
          Card
        </button>
        <button
          id="view-list"
          onClick={() => onViewChange('list')}
          className={`px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-wider
            ${viewMode === 'list'
              ? 'bg-white text-indigo-600 shadow-md ring-1 ring-slate-200'
              : 'text-slate-400 hover:text-slate-600'
            }`}
        >
          List
        </button>
      </div>
    </div>
  </div>
);

export default ContentHeader;
export type { ViewMode };
