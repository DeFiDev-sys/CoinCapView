import type { CryptoAsset, GlobalMetrics } from '../types';

const API_BASE = '';

export async function fetchCryptoListings(limit: number = 50): Promise<CryptoAsset[]> {
  const response = await fetch(`${API_BASE}/api/cryptocurrencies?limit=${limit}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `API error: ${response.status}`);
  }

  const data = await response.json();

  return data.data.map((item: any) => ({
    id: item.id,
    rank: item.cmc_rank,
    name: item.name,
    symbol: item.symbol,
    slug: item.slug,
    logo: `https://s2.coinmarketcap.com/static/img/coin/64x64/${item.id}.png`,
    price: item.quote.USD.price,
    priceChange24h: item.quote.USD.percent_change_24h || 0,
    priceChange7d: item.quote.USD.percent_change_7d || 0,
    marketCap: item.quote.USD.market_cap || 0,
    volume24h: item.quote.USD.volume_24h || 0,
    volumeChange24h: item.quote.USD.volume_change_24h || 0,
    circulatingSupply: item.circulating_supply || 0,
    totalSupply: item.total_supply || 0,
    maxSupply: item.max_supply || null,
    sparkline: [],
  }));
}

export async function fetchGlobalMetrics(): Promise<GlobalMetrics> {
  const response = await fetch(`${API_BASE}/api/global`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `API error: ${response.status}`);
  }

  const data = await response.json();
  const metrics = data.data;

  return {
    totalMarketCap: metrics.quote.USD.total_market_cap || 0,
    totalMarketCapChange24h: metrics.quote.USD.total_market_cap_yesterday_percentage_change_24h || 0,
    totalVolume24h: metrics.quote.USD.total_volume_24h || 0,
    totalVolumeChange24h: metrics.quote.USD.total_volume_24h_yesterday_percentage_change_24h || 0,
    btcDominance: metrics.btc_dominance || 0,
    ethDominance: metrics.eth_dominance || 0,
    defiVolume24h: metrics.defi_volume_24h || 0,
  };
}

export interface CoinInfo {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  description: string;
  logo: string;
  website: string;
  explorer: string;
  rank: number;
  price: number;
  marketCap: number;
  volume24h: number;
  priceChange24h: number;
  priceChange7d: number;
  circulatingSupply: number;
  totalSupply: number;
  maxSupply: number | null;
  tags: string[];
}

export async function fetchCoinInfo(coinId: number): Promise<CoinInfo> {
  // Fetch both info and quotes in parallel
  const [infoResponse, quotesResponse] = await Promise.all([
    fetch(`${API_BASE}/api/crypto/info?id=${coinId}`),
    fetch(`${API_BASE}/api/coin-quotes?id=${coinId}`),
  ]);

  if (!infoResponse.ok) {
    const errorData = await infoResponse.json().catch(() => ({}));
    throw new Error(errorData.error || `API error: ${infoResponse.status}`);
  }
  if (!quotesResponse.ok) {
    // Silently fail for quotes - we can still show coin info without it
  }

  const infoData = await infoResponse.json();
  const coinData = infoData.data[coinId];

  // Get quotes data if available
  let quotesData: any = {};
  if (quotesResponse.ok) {
    const quotesJson = await quotesResponse.json();
    // /v2/cryptocurrency/quotes returns data in format { data: { "1": { ... } } }
    const coinQuotes = quotesJson.data;
    if (coinQuotes && coinQuotes[coinId]) {
      const quote = coinQuotes[coinId].quote?.USD;
      quotesData = {
        rank: coinQuotes[coinId].cmc_rank || 0,
        price: quote?.price || 0,
        marketCap: quote?.market_cap || 0,
        volume24h: quote?.volume_24h || 0,
        priceChange24h: quote?.percent_change_24h || 0,
        priceChange7d: quote?.percent_change_7d || 0,
        circulatingSupply: coinQuotes[coinId].circulating_supply || 0,
        totalSupply: coinQuotes[coinId].total_supply || 0,
        maxSupply: coinQuotes[coinId].max_supply || null,
      };
    }
  }

  return {
    id: coinData.id,
    name: coinData.name,
    symbol: coinData.symbol,
    slug: coinData.slug,
    description: coinData.description || 'No description available.',
    logo: `https://s2.coinmarketcap.com/static/img/coin/64x64/${coinData.id}.png`,
    website: coinData.urls?.website?.[0] || '',
    explorer: coinData.urls?.explorer?.[0] || '',
    rank: quotesData.rank || coinData.cmc_rank || 0,
    price: quotesData.price || 0,
    marketCap: quotesData.marketCap || 0,
    volume24h: quotesData.volume24h || 0,
    priceChange24h: quotesData.priceChange24h || 0,
    priceChange7d: quotesData.priceChange7d || 0,
    circulatingSupply: quotesData.circulatingSupply || coinData.circulating_supply || 0,
    totalSupply: quotesData.totalSupply || coinData.total_supply || 0,
    maxSupply: quotesData.maxSupply ?? coinData.max_supply ?? null,
    tags: coinData.tags || [],
  };
}