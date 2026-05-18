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
    <div className="flex items-center gap-4 p-4 border-b border-[#2a2a45]">
      <div className="w-8 h-8 bg-[#252540] rounded-full"></div>
      <div className="flex-1">
        <div className="h-4 bg-[#252540] rounded w-32 mb-2"></div>
        <div className="h-3 bg-[#252540] rounded w-16"></div>
      </div>
      <div className="h-4 bg-[#252540] rounded w-24"></div>
      <div className="h-4 bg-[#252540] rounded w-20"></div>
    </div>
  );
}

export function LoadingState() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>

      <div className="bg-[#1a1a2e] border border-[#2a2a45] rounded-xl overflow-hidden">
        <div className="p-4 border-b border-[#2a2a45] flex gap-4">
          <div className="h-4 bg-[#252540] rounded w-16"></div>
          <div className="h-4 bg-[#252540] rounded w-24"></div>
          <div className="h-4 bg-[#252540] rounded w-28"></div>
          <div className="h-4 bg-[#252540] rounded w-20"></div>
          <div className="h-4 bg-[#252540] rounded w-24"></div>
        </div>
        {Array.from({ length: 10 }).map((_, i) => (
          <SkeletonRow key={i} />
        ))}
      </div>
    </div>
  );
}