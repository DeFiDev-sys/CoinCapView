import type { CryptoAsset } from '../types';
import { formatCurrency, formatPercentage, formatCompactNumber } from '../utils/formatters';
import { Sparkline } from './Sparkline';

interface CryptoRowProps {
  coin: CryptoAsset;
  onCoinClick?: (coinId: number, coinName: string) => void;
}

function getPlaceholderColor(symbol: string): string {
  const colors: Record<string, string> = {
    BTC: 'F7931A', ETH: '627EEA', USDT: '26A17B', BNB: 'F3BA2F', XRP: '23292F',
    SOL: '9945FF', ADA: '0033AD', DOGE: 'C2A633', DOT: 'E6007A', MATIC: '8247E5',
    LTC: 'BFBBBB', AVAX: 'E84142', LINK: '375BD2', ATOM: '2E3148', UNI: 'FF007A',
  };
  return colors[symbol] || '6b6b80';
}

export function CryptoRow({ coin, onCoinClick }: CryptoRowProps) {
  const isPositive24h = coin.priceChange24h >= 0;
  const isPositive7d = coin.priceChange7d >= 0;
  const placeholderColor = getPlaceholderColor(coin.symbol);

  return (
    <div
      className="flex items-center gap-4 p-4 border-b border-[#2a2a45] hover:bg-[#252540]/50 transition-colors group cursor-pointer"
      onClick={() => onCoinClick?.(coin.id, coin.name)}
    >
      <span className="w-8 text-center text-[#6b6b80] font-mono text-sm">{coin.rank}</span>

      <div className="flex items-center gap-3 flex-1 min-w-0">
        <img
          src={`https://cryptoicons.org/api/icon/${coin.symbol.toLowerCase()}/32`}
          alt={coin.name}
          className="w-8 h-8 rounded-full"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect fill="%23${placeholderColor}" width="32" height="32" rx="16"/><text x="16" y="20" text-anchor="middle" fill="white" font-size="10" font-family="sans-serif">${coin.symbol[0]}</text></svg>`;
          }}
        />
        <div className="min-w-0">
          <div className="font-semibold text-white truncate">{coin.name}</div>
          <div className="text-sm text-[#6b6b80]">{coin.symbol}</div>
        </div>
      </div>

      <div className="font-mono text-white w-28 text-right">{formatCurrency(coin.price)}</div>

      <div className={`font-mono text-sm w-20 text-right ${isPositive24h ? 'text-[#00d4aa]' : 'text-[#ff6b6b]'}`}>
        {formatPercentage(coin.priceChange24h)}
      </div>

      <div className={`font-mono text-sm w-20 text-right ${isPositive7d ? 'text-[#00d4aa]' : 'text-[#ff6b6b]'}`}>
        {formatPercentage(coin.priceChange7d)}
      </div>

      <div className="font-mono text-sm text-[#a0a0b8] w-28 text-right hidden sm:block">
        {formatCompactNumber(coin.marketCap)}
      </div>

      <div className="w-24 h-8 hidden md:block">
        <Sparkline priceChange7d={coin.priceChange7d} price={coin.price} />
      </div>
    </div>
  );
}