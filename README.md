# CoinCapView - Real-Time Cryptocurrency Dashboard

A modern, responsive web application for tracking cryptocurrency prices, market cap, volume, and trends in real-time using the CoinMarketCap API.

![CoinCapView Dashboard](https://via.placeholder.com/800x400/0f0f1a/00d4aa?text=CoinCapView)

## Features

- **Real-Time Data** - Live cryptocurrency prices updated every 60 seconds
- **Global Market Stats** - Total market cap, 24h volume, BTC/ETH dominance
- **Top 50 Cryptos** - Track Bitcoin, Ethereum, and 49 other top coins
- **Price Changes** - 24h and 7d percentage changes with color indicators
- **Search & Filter** - Find any coin by name or symbol instantly
- **Pagination** - Browse through coins with 10 per page
- **Sparkline Charts** - 7-day price trend visualization for each coin
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Dark Theme** - Beautiful modern UI with teal accents

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Data Source**: CoinMarketCap API

## Prerequisites

- Node.js 18+
- npm or yarn
- CoinMarketCap API key (Basic plan or higher)

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/coincapview.git
cd coincapview

# Install dependencies
npm install

# Configure your API key
# Edit .env file and add your CoinMarketCap API key:
# VITE_COINMARKETCAP_API_KEY=your_api_key_here

# Start the development server
npm run dev
```

## Running the Application

You need to run both the proxy server and the frontend:

```bash
# Terminal 1 - Start the proxy server (handles CORS)
node server.js

# Terminal 2 - Start the frontend
npm run dev
```

The application will be available at `http://localhost:5173`

## Building for Production

```bash
# Build the frontend
npm run build

# The production files will be in the dist/ folder
```

## Project Structure

```
coincapview/
├── src/
│   ├── components/        # React components
│   │   ├── Header.tsx      # App header with search
│   │   ├── StatCard.tsx    # Market stats cards
│   │   ├── CryptoTable.tsx # Main cryptocurrency table
│   │   ├── CryptoRow.tsx  # Individual coin row
│   │   ├── Sparkline.tsx  # Mini chart component
│   │   ├── LoadingState.tsx
│   │   └── ErrorState.tsx
│   ├── hooks/
│   │   └── useCryptoData.ts  # Data fetching hook
│   ├── services/
│   │   └── api.ts         # API client
│   ├── types/
│   │   └── index.ts       # TypeScript types
│   ├── utils/
│   │   └── formatters.ts  # Number formatting utilities
│   ├── App.tsx            # Main application
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── server.js              # Proxy server for CORS
├── .env                   # Environment variables
├── index.html             # HTML template with SEO
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## API Endpoints Used

- `GET /v1/cryptocurrency/listings/latest` - Top cryptocurrencies
- `GET /v1/global-metrics/quotes/latest` - Global market data

## Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_COINMARKETCAP_API_KEY=your_coinmarketcap_api_key
```

Get your free API key from [CoinMarketCap](https://coinmarketcap.com/api/).

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

Built with React, Vite, and Tailwind CSS