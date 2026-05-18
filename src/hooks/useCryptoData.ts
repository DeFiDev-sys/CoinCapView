import { useState, useEffect, useCallback } from 'react';
import type { CryptoAsset, GlobalMetrics } from '../types';
import { fetchCryptoListings, fetchGlobalMetrics } from '../services/cryptoApi';

interface UseCryptoDataResult {
  assets: CryptoAsset[];
  globalMetrics: GlobalMetrics | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useCryptoData(limit: number = 50): UseCryptoDataResult {
  const [assets, setAssets] = useState<CryptoAsset[]>([]);
  const [globalMetrics, setGlobalMetrics] = useState<GlobalMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [listings, metrics] = await Promise.all([
        fetchCryptoListings(limit),
        fetchGlobalMetrics(),
      ]);

      setAssets(listings);
      setGlobalMetrics(metrics);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData().catch(console.error);
    }, 60000);

    return () => clearInterval(interval);
  }, [fetchData]);

  return { assets, globalMetrics, loading, error, refetch: fetchData };
}