export interface CryptoAsset {
  id: number;
  rank: number;
  name: string;
  symbol: string;
  slug: string;
  logo: string;
  price: number;
  priceChange24h: number;
  priceChange7d: number;
  marketCap: number;
  volume24h: number;
  volumeChange24h: number;
  circulatingSupply: number;
  totalSupply: number;
  maxSupply: number | null;
  sparkline: number[];
}

export interface GlobalMetrics {
  totalMarketCap: number;
  totalMarketCapChange24h: number;
  totalVolume24h: number;
  totalVolumeChange24h: number;
  btcDominance: number;
  ethDominance: number;
  defiVolume24h: number;
}