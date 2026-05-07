import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  compact?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, compact }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = (): (number | '...')[] => {
    const pages: (number | '...')[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  const navBtnBase =
    'flex items-center gap-2 px-3 py-2 text-sm font-bold transition-all duration-200 border rounded-xl shadow-sm h-10';
  const navBtnActive = 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300 active:scale-95';
  const navBtnDisabled = 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed';

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`${navBtnBase} ${currentPage === 1 ? navBtnDisabled : navBtnActive}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">
          Page {currentPage} <span className="text-slate-300">/</span> {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`${navBtnBase} ${currentPage === totalPages ? navBtnDisabled : navBtnActive}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    );
  }

  return (
    <div id="pagination" className="flex items-center justify-between w-full sm:w-auto gap-4">
      {/* Page Numbers */}
      <div className="hidden sm:flex items-center gap-1 mr-4 border-r border-slate-100 pr-4">
        {getPageNumbers().map((page, idx) =>
          page === '...' ? (
            <span key={`ellipsis-${idx}`} className="w-9 h-9 flex items-center justify-center text-slate-400 text-sm">…</span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              className={`w-9 h-9 flex items-center justify-center rounded-lg text-xs font-black transition-all
                ${page === currentPage 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                  : 'text-slate-400 hover:text-slate-800 hover:bg-slate-50'}`}
            >
              {page}
            </button>
          )
        )}
      </div>

      {/* Prev/Next */}
      <div className="flex items-center gap-2 flex-1 sm:flex-none">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex-1 sm:flex-none ${navBtnBase} ${currentPage === 1 ? navBtnDisabled : navBtnActive}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
          <span className="hidden md:inline uppercase text-[10px] tracking-widest">Prev</span>
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex-1 sm:flex-none ${navBtnBase} ${currentPage === totalPages ? navBtnDisabled : navBtnActive}`}
        >
          <span className="hidden md:inline uppercase text-[10px] tracking-widest">Next</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
