import { Search, RefreshCw } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onRefresh: () => void;
  loading: boolean;
}

export function Header({ searchQuery, onSearchChange, onRefresh, loading }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-[#0f0f1a]/90 backdrop-blur-md border-b border-[#2a2a45]">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4 flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-linear-to-br from-[#00d4aa] to-[#00a080] flex items-center justify-center">
            <span className="text-lg sm:text-xl font-bold text-[#0f0f1a]">C</span>
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-white hidden xs:block">
            CoinCap<span className="text-[#00d4aa]">View</span>
          </h1>
        </div>

        <div className="flex-1 w-full sm:max-w-md order-3 sm:order-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b6b80]" />
            <input
              type="text"
              placeholder="Search coins..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-[#1a1a2e] border border-[#2a2a45] rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-[#6b6b80] focus:outline-none focus:border-[#00d4aa] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b6b80] hover:text-white"
              >
                ×
              </button>
            )}
          </div>
        </div>

        <button
          onClick={onRefresh}
          disabled={loading}
          className="p-2 rounded-lg bg-[#1a1a2e] border border-[#2a2a45] text-[#a0a0b8] hover:text-[#00d4aa] hover:border-[#00d4aa] transition-colors disabled:opacity-50 order-2 sm:order-3"
          title="Refresh data"
        >
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>
    </header>
  );
}