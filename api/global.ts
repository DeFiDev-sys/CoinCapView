import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const API_KEY = process.env.VITE_COINMARKETCAP_API_KEY;
  const BASE_URL = 'https://pro-api.coinmarketcap.com';

  try {
    const res = await fetch(`${BASE_URL}/v1/global-metrics/quotes/latest`, {
      headers: {
        'X-CMC_PRO_API_KEY': API_KEY || '',
        'Accept': 'application/json',
      },
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      return response.status(500).json({ error: error.status?.error_message || 'API error' });
    }

    const data = await res.json();
    return response.json(data);
  } catch (error) {
    return response.status(500).json({ error: (error as Error).message });
  }
}