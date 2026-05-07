import React, { useEffect, useState } from "react";
import type { Company } from "../data/companies";

const avatarColors = [
  "bg-indigo-600",
  "bg-emerald-600",
  "bg-violet-600",
  "bg-rose-600",
  "bg-amber-600",
  "bg-sky-600",
];

const DrawerLogo: React.FC<{ company: Company }> = ({ company }) => {
  const [imgSrc, setImgSrc] = useState("");
  const [failed, setFailed] = useState(false);

  // CLEAN DOMAIN
  const cleanDomain = company.website
    ?.replace("https://", "")
    ?.replace("http://", "")
    ?.replace("www.", "")
    ?.split("/")[0];

  useEffect(() => {
    if (company.logo) {
      setImgSrc(company.logo);
    } else {
      setImgSrc(`https://logo.clearbit.com/${cleanDomain}`);
    }
    setFailed(false);
  }, [company.id, company.logo, cleanDomain]);

  const handleError = () => {
    // GOOGLE FAVICON FALLBACK
    const faviconUrl = `https://www.google.com/s2/favicons?domain=${cleanDomain}&sz=256`;
    if (imgSrc !== faviconUrl) {
      setImgSrc(faviconUrl);
    } else {
      setFailed(true);
    }
  };

  const color = avatarColors[company.id % avatarColors.length];

  return (
    <div className="relative w-20 h-20 rounded-3xl overflow-hidden shadow-xl bg-white/10 backdrop-blur-md border border-white/10">
      {/* Fallback Background with Letter */}
      <div className={`absolute inset-0 ${color} flex items-center justify-center`}>
        <span className="text-3xl font-black text-white select-none">
          {company.name.charAt(0)}
        </span>
      </div>

      {/* Company Logo */}
      {!failed && (
        <div className="absolute inset-0 bg-white flex items-center justify-center">
          <img
            src={imgSrc}
            alt={company.name}
            onError={handleError}
            className="w-full h-full object-contain p-3 bg-white"
          />
        </div>
      )}
    </div>
  );
};


interface CompanyDetailDrawerProps {
  company: Company | null;
  onClose: () => void;
}

const CompanyDetailDrawer: React.FC<CompanyDetailDrawerProps> = ({
  company,
  onClose,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (company) {
      document.body.style.overflow = "hidden";

      setTimeout(() => {
        setVisible(true);
      }, 20);
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [company]);

  const handleClose = () => {
    setVisible(false);

    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!company) return null;

  return (
    <>
      {/* BACKDROP */}
      <div
        onClick={handleClose}
        className={`fixed inset-0 z-[300] bg-slate-900/60 backdrop-blur-sm transition-all duration-300 ${visible ? "opacity-100" : "opacity-0"
          }`}
      />

      {/* DRAWER */}
      <div
        className={`fixed z-[301] bg-[#f8fafc] shadow-2xl transition-all duration-500 ease-out flex flex-col overflow-hidden
          /* MOBILE: Bottom Sheet */
          bottom-0 left-0 right-0 h-[85vh] rounded-t-3xl 
          ${visible ? "translate-y-0" : "translate-y-full"}
          
          /* WEB & TAB: Right Side Drawer */
          sm:top-0 sm:right-0 sm:left-auto sm:h-screen sm:w-full sm:max-w-2xl sm:rounded-l-3xl sm:rounded-t-none
          sm:translate-y-0
          sm:${visible ? "translate-x-0" : "translate-x-full"}
        `}
      >

        {/* HEADER */}
        <div className="relative min-h-[160px] bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-900 overflow-hidden">

          {/* Glow Effects */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-violet-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl" />

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 w-12 h-12 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 text-white flex items-center justify-center z-[100]"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>


          {/* Header Content */}
          <div className="relative z-10 h-full flex items-center gap-6 px-6 pt-6 pb-6">
            <DrawerLogo company={company} />

            <div className="min-w-0">
              <div className="flex items-center gap-4 flex-wrap mb-3">
                <h2 className="text-2xl font-black text-white tracking-tight">
                  {company.name}
                </h2>

                <span
                  className={`px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider border
                  ${company.status === "Active"
                      ? "bg-emerald-500/10 text-emerald-300 border-emerald-400/20"
                      : "bg-rose-500/10 text-rose-300 border-rose-400/20"
                    }`}
                >
                  {company.status}
                </span>
              </div>

              <p className="text-indigo-200 uppercase tracking-[0.3em] text-xs font-bold">
                {company.industry} Sector
              </p>
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8">

          {/* WEBSITE + FOUNDED */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <a
              href={`https://${company.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-5 py-3 rounded-2xl border border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50 transition-all shadow-sm"
            >
              <span className="text-sm font-bold text-indigo-600">
                {company.website}
              </span>

              <svg
                className="w-4 h-4 text-indigo-400 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M14 3h7m0 0v7m0-7L10 14"
                />
              </svg>
            </a>

            <div className="text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                Established
              </p>

              <p className="text-sm font-bold text-slate-700">
                Since {company.founded}
              </p>
            </div>
          </div>

          {/* METRICS */}
          <div className="grid grid-cols-2 gap-5">

            {/* Employees */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center mb-4 text-indigo-600">
                👥
              </div>

              <p className="text-[10px] uppercase tracking-widest font-black text-slate-400 mb-1">
                Employees
              </p>

              <h3 className="text-2xl font-black text-slate-800">
                {company.employees.toLocaleString()}
              </h3>
            </div>

            {/* Revenue */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center mb-4 text-emerald-600">
                💰
              </div>

              <p className="text-[10px] uppercase tracking-widest font-black text-slate-400 mb-1">
                Revenue
              </p>

              <h3 className="text-2xl font-black text-slate-800">
                {company.revenue}
              </h3>
            </div>

            {/* Location */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center mb-4 text-amber-600">
                📍
              </div>

              <p className="text-[10px] uppercase tracking-widest font-black text-slate-400 mb-1">
                Headquarters
              </p>

              <h3 className="text-lg font-black text-slate-800 leading-tight">
                {company.location}, {company.country}
              </h3>
            </div>

            {/* Type */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all">
              <div className="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center mb-4 text-purple-600">
                🏢
              </div>

              <p className="text-[10px] uppercase tracking-widest font-black text-slate-400 mb-1">
                Entity Type
              </p>

              <h3 className="text-lg font-black text-slate-800">
                Global Enterprise
              </h3>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-px bg-indigo-300"></div>

              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-indigo-600">
                Corporate Overview
              </h3>
            </div>

            <p className="text-slate-600 leading-relaxed text-[15px] font-medium">
              {company.description}
            </p>
          </div>

          {/* ADDITIONAL */}
          <div className="border-t border-slate-200 pt-8">
            <h3 className="text-[10px] uppercase tracking-widest font-black text-slate-400 mb-5">
              Global Reach & Influence
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-4">
                <div className="w-2 h-10 rounded-full bg-indigo-500"></div>

                <div>
                  <p className="text-[10px] uppercase tracking-wider font-black text-slate-400">
                    Growth
                  </p>

                  <p className="text-sm font-bold text-slate-700">
                    Rapid Expansion
                  </p>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-4">
                <div className="w-2 h-10 rounded-full bg-emerald-500"></div>

                <div>
                  <p className="text-[10px] uppercase tracking-wider font-black text-slate-400">
                    Market Presence
                  </p>

                  <p className="text-sm font-bold text-slate-700">
                    Tier 1 Strategic Leader
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* CLOSE BUTTON FOOTER */}
        <div className="shrink-0 px-6 py-4 border-t border-slate-200 bg-white">
          <button
            onClick={handleClose}
            className="w-full py-3 rounded-2xl border-2 border-indigo-400 text-indigo-600 font-bold text-sm tracking-wide hover:bg-indigo-50 transition-all duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default CompanyDetailDrawer;