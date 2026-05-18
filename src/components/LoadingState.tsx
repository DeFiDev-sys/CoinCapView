function SkeletonCard() {
  return (
    <div className="bg-[#1a1a2e] border border-[#2a2a45] rounded-xl p-5 animate-pulse">
      <div className="h-4 bg-[#252540] rounded w-24 mb-3"></div>
      <div className="h-8 bg-[#252540] rounded w-40"></div>
    </div>
  );
}

function SkeletonRow() {
  return (
    <div className="flex items-center gap-2 sm:gap-4 p-3 sm:p-4 border-b border-[#2a2a45]">
      <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#252540] rounded-full"></div>
      <div className="flex-1">
        <div className="h-3 sm:h-4 bg-[#252540] rounded w-24 sm:w-32 mb-1 sm:mb-2"></div>
        <div className="h-2 sm:h-3 bg-[#252540] rounded w-12 sm:w-16"></div>
      </div>
      <div className="h-3 sm:h-4 bg-[#252540] rounded w-16 sm:w-24"></div>
      <div className="h-3 sm:h-4 bg-[#252540] rounded w-12 sm:w-20 hidden sm:block"></div>
    </div>
  );
}

export function LoadingState() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>

      <div className="bg-[#1a1a2e] border border-[#2a2a45] rounded-xl overflow-hidden">
        <div className="hidden md:block p-3 sm:p-4 border-b border-[#2a2a45] flex gap-2 sm:gap-4">
          <div className="h-3 sm:h-4 bg-[#252540] rounded w-6 sm:w-8"></div>
          <div className="h-3 sm:h-4 bg-[#252540] rounded w-20 sm:w-24"></div>
          <div className="h-3 sm:h-4 bg-[#252540] rounded w-20 sm:w-28"></div>
          <div className="h-3 sm:h-4 bg-[#252540] rounded w-12 sm:w-20"></div>
          <div className="h-3 sm:h-4 bg-[#252540] rounded w-12 sm:w-20"></div>
          <div className="h-3 sm:h-4 bg-[#252540] rounded w-16 sm:w-24 hidden sm:block"></div>
        </div>
        <div className="hidden md:block">
          {Array.from({ length: 10 }).map((_, i) => (
            <SkeletonRow key={i} />
          ))}
        </div>
        <div className="md:hidden">
          {Array.from({ length: 10 }).map((_, i) => (
            <SkeletonRow key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}