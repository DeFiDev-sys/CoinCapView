import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatPercentage } from '../utils/formatters';

interface StatCardProps {
  label: string;
  value: string;
  change?: number;
  icon?: React.ReactNode;
}

export function StatCard({ label, value, change, icon }: StatCardProps) {
  const isPositive = change !== undefined && change >= 0;

  return (
    <div className="bg-[#1a1a2e] border border-[#2a2a45] rounded-xl p-5 hover:border-[#00d4aa]/30 transition-all group">
      <div className="flex items-start justify-between mb-3">
        <span className="text-sm text-[#a0a0b8]">{label}</span>
        {icon && (
          <div className="text-[#00d4aa] opacity-60 group-hover:opacity-100 transition-opacity">
            {icon}
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-white font-mono">{value}</div>
      {change !== undefined && (
        <div className={`flex items-center gap-1 mt-2 text-sm ${isPositive ? 'text-[#00d4aa]' : 'text-[#ff6b6b]'}`}>
          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span className="font-mono">{formatPercentage(change)}</span>
          <span className="text-[#6b6b80] text-xs">24h</span>
        </div>
      )}
    </div>
  );
}

interface StatsGridProps {
  marketCap?: string;
  volume?: string;
  btcDom?: string;
  ethDom?: string;
  marketCapChange?: number;
  volumeChange?: number;
}

export function StatsGrid({ marketCap, volume, btcDom, ethDom, marketCapChange, volumeChange }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8">
      <StatCard label="Market Cap" value={marketCap || '—'} change={marketCapChange} />
      <StatCard label="24h Volume" value={volume || '—'} change={volumeChange} />
      <StatCard label="BTC Dominance" value={btcDom ? `${btcDom}%` : '—'} />
      <StatCard label="ETH Dominance" value={ethDom ? `${ethDom}%` : '—'} />
    </div>
  );
}