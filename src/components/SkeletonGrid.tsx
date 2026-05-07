import React from 'react';

const SkeletonCard: React.FC = () => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 overflow-hidden">
    {/* Header */}
    <div className="flex items-start gap-3 mb-4">
      <div className="w-12 h-12 rounded-xl shimmer-bg flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 shimmer-bg rounded-full w-3/4" />
        <div className="h-3 shimmer-bg rounded-full w-1/2" />
      </div>
    </div>
    {/* Badge */}
    <div className="h-6 shimmer-bg rounded-full w-24 mb-4" />
    {/* Info rows */}
    <div className="space-y-2.5 mb-4">
      <div className="h-3 shimmer-bg rounded-full w-full" />
      <div className="h-3 shimmer-bg rounded-full w-5/6" />
      <div className="h-3 shimmer-bg rounded-full w-4/6" />
    </div>
    {/* Footer */}
    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
      <div className="h-3 shimmer-bg rounded-full w-1/3" />
      <div className="h-6 shimmer-bg rounded-full w-16" />
    </div>
  </div>
);

const SkeletonGrid: React.FC = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
    {Array.from({ length: 9 }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

export default SkeletonGrid;
