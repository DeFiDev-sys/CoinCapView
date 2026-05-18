import { useState, useEffect } from 'react';
import { ArrowLeft, ExternalLink, TrendingUp, TrendingDown, BarChart3, Activity, Globe, Search } from 'lucide-react';
import type { CoinInfo as CoinInfoType } from '../services/cryptoApi';
import { fetchCoinInfo } from '../services/cryptoApi';
import { formatCompactNumber } from '../utils/formatters';

interface CoinInfoProps {
  coinId: number;
  coinName: string;
  onBack: () => void;
}

export function CoinInfo({ coinId, coinName, onBack }: CoinInfoProps) {
  const [coinInfo, setCoinInfo] = useState<CoinInfoType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isInIframe = window.self !== window.top;

  useEffect(() => {
    async function loadCoinInfo() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchCoinInfo(coinId);
        setCoinInfo(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load coin info');
      } finally {
        setLoading(false);
      }
    }
    loadCoinInfo();
  }, [coinId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-12 h-12 border-4 border-[#00d4aa] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-[#ff6b6b] mb-4">{error}</p>
        <button
          onClick={() => { if (!isInIframe) window.location.reload(); }}
          className="px-4 py-2 bg-[#00d4aa] text-[#0f0f1a] rounded-lg font-semibold"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!coinInfo) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[#a0a0b8] hover:text-[#00d4aa] transition-colors mb-4 sm:mb-6 text-sm sm:text-base"
      >
        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="hidden xs:inline">Back to Dashboard</span>
        <span className="xs:hidden">Back</span>
      </button>

      <div className="bg-[#1a1a2e] border border-[#2a2a45] rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <img
            src={`https://cryptoicons.org/api/icon/${coinInfo.symbol.toLowerCase()}/64`}
            alt={coinInfo.name}
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect fill="%236b6b80" width="64" height="64" rx="32"/><text x="32" y="40" text-anchor="middle" fill="white" font-size="24" font-family="sans-serif">${coinInfo.symbol[0]}</text></svg>`;
            }}
          />
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">{coinInfo.name}</h1>
            <p className="text-sm sm:text-base text-[#a0a0b8]">{coinInfo.symbol} • Rank #{coinInfo.rank}</p>
          </div>
        </div>

        <div className="flex gap-2 sm:gap-4 flex-wrap mb-4 sm:mb-6">
          {coinInfo.website && (
            <a
              href={coinInfo.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#252540] rounded-lg text-[#00d4aa] hover:bg-[#2a2a45] transition-colors"
            >
              <Globe className="w-4 h-4" />
              Website
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
          {coinInfo.explorer && (
            <a
              href={coinInfo.explorer}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#252540] rounded-lg text-[#a0a0b8] hover:text-[#00d4aa] hover:bg-[#2a2a45] transition-colors"
            >
              <Search className="w-4 h-4" />
              Explorer
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>

        <div className="mb-4 sm:mb-6">
          <h2 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">Description</h2>
          <p className="text-[#a0a0b8] leading-relaxed whitespace-pre-line text-sm sm:text-base">
            {coinInfo.description}
          </p>
        </div>

        {coinInfo.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {coinInfo.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-[#252540] rounded-full text-sm text-[#a0a0b8]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4">
        <StatBox
          icon={<BarChart3 className="w-5 h-5" />}
          label="Market Cap"
          value={formatCompactNumber(coinInfo.marketCap)}
        />
        <StatBox
          icon={<Activity className="w-5 h-5" />}
          label="24h Volume"
          value={formatCompactNumber(coinInfo.volume24h)}
        />
        <StatBox
          icon={<TrendingUp className="w-5 h-5" />}
          label="24h Change"
          value={`${coinInfo.priceChange24h >= 0 ? '+' : ''}${coinInfo.priceChange24h.toFixed(2)}%`}
          positive={coinInfo.priceChange24h >= 0}
        />
        <StatBox
          icon={<TrendingDown className="w-5 h-5" />}
          label="7d Change"
          value={`${coinInfo.priceChange7d >= 0 ? '+' : ''}${coinInfo.priceChange7d.toFixed(2)}%`}
          positive={coinInfo.priceChange7d >= 0}
        />
      </div>

      <div className="bg-[#1a1a2e] border border-[#2a2a45] rounded-xl p-4 sm:p-6 mt-4 sm:mt-6">
        <h2 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Supply Information</h2>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          <SupplyInfo label="Circulating Supply" value={formatCompactNumber(coinInfo.circulatingSupply)} />
          <SupplyInfo label="Total Supply" value={formatCompactNumber(coinInfo.totalSupply)} />
          <SupplyInfo label="Max Supply" value={coinInfo.maxSupply ? formatCompactNumber(coinInfo.maxSupply) : '∞'} />
        </div>
      </div>

      <div className="text-center mt-8 text-[#6b6b80] text-sm">
        <p>{coinName} (ID: {coinId}) • coinmarketcap.com</p>
      </div>
    </div>
  );
}

function StatBox({ icon, label, value, positive }: { icon: React.ReactNode; label: string; value: string; positive?: boolean }) {
  return (
    <div className="bg-[#1a1a2e] border border-[#2a2a45] rounded-xl p-3 sm:p-4">
      <div className="flex items-center gap-1 sm:gap-2 text-[#6b6b80] mb-1 sm:mb-2">
        <span className="scale-75 sm:scale-100">{icon}</span>
        <span className="text-xs sm:text-sm">{label}</span>
      </div>
      <div className={`text-base sm:text-xl font-bold font-mono ${positive === undefined ? 'text-white' : positive ? 'text-[#00d4aa]' : 'text-[#ff6b6b]'}`}>
        {value}
      </div>
    </div>
  );
}

function SupplyInfo({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[#6b6b80] text-sm">{label}</div>
      <div className="text-white font-mono">{value}</div>
    </div>
  );
}