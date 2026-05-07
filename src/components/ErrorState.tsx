import React from 'react';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => (
  <div className="flex flex-col items-center justify-center py-24 px-6 text-center animate-in fade-in zoom-in duration-500">
    <div className="w-20 h-20 rounded-3xl bg-rose-50 flex items-center justify-center mb-6 shadow-xl shadow-rose-100 ring-1 ring-rose-100">
      <svg className="w-10 h-10 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    </div>
    <h3 className="text-xl font-black text-slate-800 mb-2">Something went wrong</h3>
    <p className="text-slate-500 text-sm max-w-xs mx-auto mb-8 font-medium leading-relaxed">
      {message}
    </p>
    <button
      onClick={onRetry}
      className="px-8 py-3.5 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest
                 hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 active:scale-95"
    >
      Try Reconnecting
    </button>
  </div>
);

export default ErrorState;
