import { useState, useEffect, useMemo, useCallback } from 'react';
import { fetchCompanies } from './services/api';
import type { Company } from './data/companies';
import Navbar from './components/Navbar';
import FilterSidebar from './components/FilterSidebar';
import type { FilterState } from './components/FilterSidebar';
import ContentHeader from './components/ContentHeader';
import type { ViewMode } from './components/ContentHeader';
import CompanyCard from './components/CompanyCard';
import CompanyListRow from './components/CompanyListRow';
import SkeletonGrid from './components/SkeletonGrid';
import Pagination from './components/Pagination';
import EmptyState from './components/EmptyState';
import CompanyDetailDrawer from './components/CompanyDetailDrawer';
import './index.css';

const DEFAULT_ITEMS_PER_PAGE = 10;
const PAGE_SIZE_ALL = 9999;
const DEBOUNCE_MS = 300;

const DEFAULT_FILTERS: FilterState = {
  search: '', industry: '', country: '', status: '', sortBy: 'name-asc',
};

function useDebounce<T>(value: T, delay: number): T {
  const [deb, setDeb] = useState<T>(value);
  useEffect(() => {
    const t = setTimeout(() => setDeb(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return deb;
}

/* ── Compact Hero ── */
function HeroBanner({ totalCompanies }: { totalCompanies: number }) {
  return (
    <div className="relative overflow-hidden bg-white px-4 py-6 sm:px-6 sm:py-10 border-b border-indigo-50/50">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-50 rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-50 rounded-full blur-[80px] opacity-15 translate-y-1/2 -translate-x-1/4" />

      <div className="relative z-10 max-w-screen-xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 mb-4 animate-bounce-subtle">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Live Directory</span>
        </div>

        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Explore the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Companies Directory</span>
        </h1>
        <p className="text-slate-400 text-[10px] sm:text-xs mt-3 font-black uppercase tracking-[0.3em] max-w-md mx-auto leading-relaxed">
          {totalCompanies} Verified Strategic Partners Globally
        </p>
      </div>
    </div>
  );
}

/* ── Master Search Bar ── */
function MasterSearch({
  value,
  onChange,
  isLoading
}: {
  value: string;
  onChange: (v: string) => void;
  isLoading: boolean;
}) {
  return (
    <div className="relative max-w-3xl mx-auto -mt-5 mb-6 px-4 z-30">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl shadow-indigo-200/40 p-1.5 sm:p-2 flex items-center gap-2 transition-all duration-300 hover:border-indigo-300 hover:shadow-indigo-300/30">

        <div className="flex-1 relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center">
            {isLoading ? (
              <svg className="animate-spin h-4 w-4 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            )}
          </div>

          <input
            type="text"
            placeholder="Search Companies..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full pl-11 pr-4 py-3 sm:py-4 text-sm bg-transparent border-none outline-none ring-0 focus:ring-0 text-slate-700 placeholder:text-slate-400 font-bold"
          />
        </div>
      </div>
    </div>
  );
}

/* ── Table Header (Design from reference, data from cards) ── */
function TableHeader() {
  const headers = ['Company Name', 'Industry', 'Location', 'Employees', 'Revenue', 'Status'];
  return (
    <div className="bg-[#eef2ff] border-y border-indigo-100 px-6 py-3.5 rounded-t-xl">
      <div className="grid grid-cols-6 gap-4">
        {headers.map((h, i) => (
          <span key={h} className={`text-[10px] font-black text-indigo-600 uppercase tracking-widest ${i === 5 ? 'text-right' : ''}`}>
            {h}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Proper Full-Width Page Footer ── */
function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 mt-6 w-full">
      <div className="max-w-screen-2xl mx-auto px-10 py-16 grid grid-cols-1 md:grid-cols-4 gap-16 text-left">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
            </div>
            <span className="font-black text-slate-800 text-xl tracking-tight">Companies Directory</span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed font-medium">
            Technical Assessment for Frontlines Edutech. A production-grade frontend implementation featuring advanced filtering, sorting, and responsive design.
          </p>
          <div className="pt-2">
            <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">
              Developed By Durgarao Goriparthi
            </p>
            <p className="text-[9px] text-slate-400 font-bold">Frontlines Edutech Assessment</p>
          </div>
        </div>
        <div>
          <h4 className="font-black text-slate-800 text-[11px] uppercase tracking-widest mb-6">Directory</h4>
          <ul className="space-y-4 text-xs font-bold text-slate-500">
            <li className="hover:text-indigo-600 cursor-pointer transition-colors">Browse All</li>
            <li className="hover:text-indigo-600 cursor-pointer transition-colors">By Industry</li>
            <li className="hover:text-indigo-600 cursor-pointer transition-colors">Global Maps</li>
          </ul>
        </div>
        <div>
          <h4 className="font-black text-slate-800 text-[11px] uppercase tracking-widest mb-6">Resources</h4>
          <ul className="space-y-4 text-xs font-bold text-slate-500">
            <li className="hover:text-indigo-600 cursor-pointer transition-colors">API Access</li>
            <li className="hover:text-indigo-600 cursor-pointer transition-colors">Integrations</li>
            <li className="hover:text-indigo-600 cursor-pointer transition-colors">Documentation</li>
          </ul>
        </div>
        <div>
          <h4 className="font-black text-slate-800 text-[11px] uppercase tracking-widest mb-6">Contact</h4>
          <ul className="space-y-4 text-xs font-bold text-slate-500">
            <li className="hover:text-indigo-600 cursor-pointer transition-colors underline decoration-indigo-200">durgarao@frontlines.io</li>
            <li className="text-slate-400 font-medium leading-relaxed">
              Madhapur, Hyderabad - 500081
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-50 py-10 text-center">
        <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.4em]">
          © 2026 CompanyHub Global · Built for Strategic Excellence by Durgarao Goriparthi
        </p>
      </div>
    </footer>
  );
}

/* ── App ──────────────────────────────────────────────────────────────────── */
export default function App() {
  const [allCompanies, setAllCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const debouncedSearch = useDebounce(filters.search, DEBOUNCE_MS);

  // Initial Fetch
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchCompanies();
        setAllCompanies(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load companies');
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Handle Loading Simulation for Filters
  const [isFiltering, setIsFiltering] = useState(false);
  useEffect(() => {
    if (isLoading) return;
    setIsFiltering(true);
    const t = setTimeout(() => setIsFiltering(false), 400);
    return () => clearTimeout(t);
  }, [debouncedSearch, filters.industry, filters.country, filters.status, filters.sortBy, itemsPerPage, isLoading]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, filters.industry, filters.country, filters.status, filters.sortBy, itemsPerPage]);

  const filteredAndSorted = useMemo<Company[]>(() => {
    const q = debouncedSearch.toLowerCase();
    let result = allCompanies.filter((c) => {
      const matchSearch = !q || c.name.toLowerCase().includes(q) || c.industry.toLowerCase().includes(q) || c.location.toLowerCase().includes(q);
      const matchIndustry = !filters.industry || c.industry === filters.industry;
      const matchCountry = !filters.country || c.country === filters.country;
      const matchStatus = !filters.status || c.status === filters.status;
      return matchSearch && matchIndustry && matchCountry && matchStatus;
    });
    switch (filters.sortBy) {
      case 'name-asc': result = [...result].sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'name-desc': result = [...result].sort((a, b) => b.name.localeCompare(a.name)); break;
      case 'employees-desc': result = [...result].sort((a, b) => b.employees - a.employees); break;
      case 'employees-asc': result = [...result].sort((a, b) => a.employees - b.employees); break;
      case 'founded-desc': result = [...result].sort((a, b) => b.founded - a.founded); break;
      case 'founded-asc': result = [...result].sort((a, b) => a.founded - b.founded); break;
    }
    return result;
  }, [allCompanies, debouncedSearch, filters.industry, filters.country, filters.status, filters.sortBy]);

  const isShowAll = itemsPerPage === PAGE_SIZE_ALL;
  const totalPages = isShowAll ? 1 : Math.max(1, Math.ceil(filteredAndSorted.length / itemsPerPage));
  const paginated = useMemo<Company[]>(() => {
    if (isShowAll) return filteredAndSorted;
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAndSorted.slice(start, start + itemsPerPage);
  }, [filteredAndSorted, currentPage, itemsPerPage, isShowAll]);

  const handleFilterChange = useCallback((key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleClear = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setCurrentPage(1);
  }, []);

  const handlePage = useCallback((p: number) => {
    setCurrentPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="h-screen flex flex-col bg-[#fdfdff]">

      <Navbar
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((o) => !o)}
      />

      <div className="flex flex-1 overflow-hidden relative">
        <FilterSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          filters={filters}
          onFilterChange={handleFilterChange}
          onClear={handleClear}
          totalShowing={filteredAndSorted.length}
          totalAll={allCompanies.length}
        />

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 overflow-y-auto scrollbar-thin flex flex-col">

          <div className="flex-1">
            <HeroBanner totalCompanies={filteredAndSorted.length} />

            <MasterSearch
              value={filters.search}
              onChange={(v) => handleFilterChange('search', v)}
              isLoading={isLoading || isFiltering}
            />

            <div className="px-6 pb-20 sm:px-10 max-w-[1600px] mx-auto min-h-[200px]">
              <ContentHeader
                totalShowing={filteredAndSorted.length}
                totalAll={allCompanies.length}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePage}
                itemsPerPage={itemsPerPage}
                onItemsPerPageChange={setItemsPerPage}
                viewMode={viewMode}
                onViewChange={setViewMode}
                sidebarOpen={sidebarOpen}
                onOpenSidebar={() => setSidebarOpen(true)}
              />

              {isLoading ? (
                <SkeletonGrid />
              ) : error ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-rose-100 shadow-sm px-6 text-center">
                  <h3 className="text-xl font-black text-slate-800 mb-2">Something went wrong</h3>
                  <p className="text-slate-500 text-sm max-w-xs mx-auto mb-8 font-medium">{error}</p>
                  <button onClick={() => window.location.reload()} className="px-8 py-3 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase hover:bg-indigo-700 transition-all shadow-lg">
                    Retry Connection
                  </button>
                </div>
              ) : filteredAndSorted.length === 0 ? (
                <EmptyState onClear={handleClear} />
              ) : viewMode === 'grid' ? (
                <div id="companies-grid" className={`grid gap-6 transition-all duration-300
                  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
                  ${sidebarOpen ? '' : 'xl:grid-cols-4'}`}>
                  {paginated.map((company, idx) => (
                    <CompanyCard
                      key={company.id}
                      company={company}
                      animationDelay={idx * 15}
                      onClick={setSelectedCompany}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-slate-100 overflow-hidden shadow-sm">
                  <TableHeader />
                  <div id="companies-list" className="flex flex-col">
                    {paginated.map((company, idx) => (
                      <CompanyListRow
                        key={company.id}
                        company={company}
                        animationDelay={idx * 10}
                        onClick={setSelectedCompany}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* PAGINATION — Using central component */}
              {!isLoading && filteredAndSorted.length > 0 && (
                <div className="mt-10 py-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl border border-slate-200 shadow-sm">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Show</span>
                      <select
                        value={itemsPerPage}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setItemsPerPage(val);
                          setCurrentPage(1);
                        }}
                        className="bg-transparent text-xs font-bold text-slate-700 outline-none cursor-pointer"
                      >
                        {[10, 25, 50, 100].map((size) => (
                          <option key={size} value={size}>{size} per page</option>
                        ))}
                        <option value={PAGE_SIZE_ALL}>Show All</option>
                      </select>
                    </div>
                    <span className="text-xs font-medium text-slate-400">
                      {isShowAll
                        ? `All ${filteredAndSorted.length} records`
                        : `${Math.min((currentPage - 1) * itemsPerPage + 1, filteredAndSorted.length)}–${Math.min(currentPage * itemsPerPage, filteredAndSorted.length)} of ${filteredAndSorted.length}`}
                    </span>
                  </div>

                  {!isShowAll && (
                    <Pagination 
                      currentPage={currentPage} 
                      totalPages={totalPages} 
                      onPageChange={handlePage} 
                    />
                  )}
                </div>
              )}



            </div>
          </div>

          <Footer />
        </main>
      </div>

      <CompanyDetailDrawer
        company={selectedCompany}
        onClose={() => setSelectedCompany(null)}
      />
    </div>
  );
}
