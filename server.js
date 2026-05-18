import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

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

// Cryptocurrency listings
app.get('/api/cryptocurrencies', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const data = await fetchFromCMC(`/v1/cryptocurrency/listings/latest?limit=${limit}&sort=market_cap`);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Global metrics
app.get('/api/global', async (req, res) => {
  try {
    const data = await fetchFromCMC('/v1/global-metrics/quotes/latest');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Coin info endpoint
app.get('/api/crypto/info', async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) {
      return res.status(400).json({ error: 'Coin ID is required' });
    }
    const data = await fetchFromCMC(`/v2/cryptocurrency/info?id=${id}`);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Coin quotes endpoint
app.get('/api/coin-quotes', async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) {
      return res.status(400).json({ error: 'Coin ID is required' });
    }
    const data = await fetchFromCMC(`/v2/cryptocurrency/quotes?id=${id}`);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});