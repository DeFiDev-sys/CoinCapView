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
    const data = await fetchFromCMC('/v1/global-metrics/quotes/latest');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}