import type { CryptoAsset } from '../types';
import { CryptoRow } from './CryptoRow';
import { CryptoRowTablet } from './CryptoRowTablet';

interface CryptoTableProps {
  coins: CryptoAsset[];
  onCoinClick?: (coinId: number, coinName: string) => void;
}

export function CryptoTable({ coins, onCoinClick }: CryptoTableProps) {
  if (coins.length === 0) {
    return (
      <div className="text-center py-12 text-[#a0a0b8]">
        <p>No cryptocurrencies found</p>
      </div>
    );
  }

  return (
    <div className="bg-[#1a1a2e] border border-[#2a2a45] rounded-xl overflow-hidden">
      <div className="hidden lg:grid grid-cols-[50px_1fr_100px_80px_80px_110px_100px] gap-2 lg:gap-4 p-3 lg:p-4 border-b border-[#2a2a45] bg-[#252540]/30 text-xs lg:text-sm font-medium text-[#a0a0b8]">
        <span>#</span>
        <span>Name</span>
        <span className="text-right">Price</span>
        <span className="text-right">24h %</span>
        <span className="text-right">7d %</span>
        <span className="text-right">Market Cap</span>
        <span>7d Chart</span>
      </div>

      <div className="hidden md:block lg:hidden">
        <div className="grid grid-cols-[50px_1fr_90px_80px_80px] gap-2 p-3 border-b border-[#2a2a45] bg-[#252540]/30 text-xs font-medium text-[#a0a0b8]">
          <span>#</span>
          <span>Name</span>
          <span className="text-right">Price</span>
          <span className="text-right">24h %</span>
          <span className="text-right">7d %</span>
        </div>
      </div>

      <div className="md:hidden">
        {coins.map((coin) => (
          <CryptoRowMobile key={coin.id} coin={coin} onCoinClick={onCoinClick} />
        ))}
      </div>

      <div className="hidden lg:block">
        {coins.map((coin) => (
          <CryptoRow key={coin.id} coin={coin} onCoinClick={onCoinClick} />
        ))}
      </div>

      <div className="hidden md:block lg:hidden">
        {coins.map((coin) => (
          <CryptoRowTablet key={coin.id} coin={coin} onCoinClick={onCoinClick} />
        ))}
      </div>
    </div>
  );
}

function CryptoRowMobile({ coin, onCoinClick }: { coin: CryptoAsset; onCoinClick?: (coinId: number, coinName: string) => void }) {
  const isPositive24h = coin.priceChange24h >= 0;
  const isPositive7d = coin.priceChange7d >= 0;
  const colors: Record<string, string> = {
    BTC: 'F7931A', ETH: '627EEA', USDT: '26A17B', BNB: 'F3BA2F', XRP: '23292F',
    SOL: '9945FF', ADA: '0033AD', DOGE: 'C2A633', DOT: 'E6007A', MATIC: '8247E5',
    LTC: 'BFBBBB', AVAX: 'E84142', LINK: '375BD2', ATOM: '2E3148', UNI: 'FF007A',
  };
  const placeholderColor = colors[coin.symbol] || '6b6b80';

  return (
    <div
      className="p-3 sm:p-4 border-b border-[#2a2a45] hover:bg-[#252540]/50 transition-colors cursor-pointer"
      onClick={() => onCoinClick?.(coin.id, coin.name)}
    >
      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
        <img
          src={`https://cryptoicons.org/api/icon/${coin.symbol.toLowerCase()}/40`}
          alt={coin.name}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect fill="%23${placeholderColor}" width="40" height="40" rx="20"/><text x="20" y="26" text-anchor="middle" fill="white" font-size="14" font-family="sans-serif">${coin.symbol[0]}</text></svg>`;
          }}
        />
        <div className="min-w-0 flex-1">
          <div className="font-semibold text-white text-sm sm:text-base truncate">{coin.name}</div>
          <div className="text-xs sm:text-sm text-[#6b6b80]">{coin.symbol}</div>
        </div>
        <div className="text-right">
          <div className="font-mono text-white text-sm sm:text-base">{coin.price < 1 ? `$${coin.price.toFixed(6)}` : `$${coin.price.toFixed(2)}`}</div>
          <div className={`text-xs font-mono ${isPositive24h ? 'text-[#00d4aa]' : 'text-[#ff6b6b]'}`}>
            {isPositive24h ? '+' : ''}{coin.priceChange24h.toFixed(2)}%
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
        <div>
          <div className="text-[#6b6b80]">Market Cap</div>
          <div className="font-mono text-[#a0a0b8]">${(coin.marketCap / 1e9).toFixed(2)}B</div>
        </div>
        <div>
          <div className="text-[#6b6b80]">7d Change</div>
          <div className={`font-mono ${isPositive7d ? 'text-[#00d4aa]' : 'text-[#ff6b6b]'}`}>
            {isPositive7d ? '+' : ''}{coin.priceChange7d.toFixed(2)}%
          </div>
        </div>
      </div>
    </div>
  );
}