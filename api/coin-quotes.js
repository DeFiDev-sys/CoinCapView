const API_KEY = process.env.VITE_COINMARKETCAP_API_KEY;
const BASE_URL = 'https://pro-api.coinmarketcap.com';

async function fetchFromCMC(endpoint) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'X-CMC_PRO_API_KEY': API_KEY,
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.status?.error_message || `API error: ${response.status}`);
  }

  return response.json();
}

export default async function handler(req, res) {
  try {
    const id = req.query.id;
    if (!id) {
      return res.status(400).json({ error: 'Coin ID is required' });
    }

    // Fetch category data which includes coin market data
    const data = await fetchFromCMC('/v1/cryptocurrency/category?id=605e2ce9d41eae1066535f7c');

    // Find the specific coin in the first category's coins array
    const coins = data?.data ? Object.values(data.data)[0]?.coins : [];
    const coin = coins?.find((c) => c.id === parseInt(id));

    if (!coin) {
      // Fallback: try quotes endpoint if not found in category
      const quotesData = await fetchFromCMC(`/v2/cryptocurrency/quotes/latest?id=${id}`);
      const quoteCoin = quotesData.data[id];
      if (quoteCoin) {
        return res.json({
          rank: quoteCoin.cmc_rank,
          marketCap: quoteCoin.quote?.USD?.market_cap || 0,
          volume24h: quoteCoin.quote?.USD?.volume_24h || 0,
          priceChange24h: quoteCoin.quote?.USD?.percent_change_24h || 0,
          priceChange7d: quoteCoin.quote?.USD?.percent_change_7d || 0,
          circulatingSupply: quoteCoin.circulating_supply || 0,
          totalSupply: quoteCoin.total_supply || 0,
          maxSupply: quoteCoin.max_supply || null,
        });
      }
      return res.status(404).json({ error: 'Coin not found' });
    }

    const data =res.json({
      rank: coin.cmc_rank,
      marketCap: coin.quote?.USD?.market_cap || 0,
      volume24h: coin.quote?.USD?.volume_24h || 0,
      priceChange24h: coin.quote?.USD?.percent_change_24h || 0,
      priceChange7d: coin.quote?.USD?.percent_change_7d || 0,
      circulatingSupply: coin.circulating_supply || 0,
      totalSupply: coin.total_supply || 0,
      maxSupply: coin.max_supply || null,
    });
    console.log(data)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}