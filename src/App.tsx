import { useState, useMemo, useEffect } from "react";
import { Header } from "./components/Header";
import { StatsGrid } from "./components/StatCard";
import { CryptoTable } from "./components/CryptoTable";
import { CoinInfo } from "./components/CoinInfo";
import { LoadingState } from "./components/LoadingState";
import { ErrorState } from "./components/ErrorState";
import { useCryptoData } from "./hooks/useCryptoData";
import { formatCompactNumber } from "./utils/formatters";

const ITEMS_PER_PAGE = 10;

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCoinId, setSelectedCoinId] = useState<number | null>(null);
  const [selectedCoinName, setSelectedCoinName] = useState<string>("");
  const { assets, globalMetrics, loading, error, refetch } =
    useCryptoData(1000);

  // Handle URL routing for coin info
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith("#/coin/")) {
      const coinId = parseInt(hash.replace("#/coin/", ""));
      if (!isNaN(coinId)) {
        const coin = assets.find((c) => c.id === coinId);
        setSelectedCoinId(coinId);
        setSelectedCoinName(coin?.name || "Coin");
      }
    }
  }, [assets]);

  const isInIframe = window.self !== window.top;

  const filteredAssets = useMemo(() => {
    if (!searchQuery.trim()) return assets;
    const query = searchQuery.toLowerCase();
    return assets.filter(
      (coin) =>
        coin.name.toLowerCase().includes(query) ||
        coin.symbol.toLowerCase().includes(query),
    );
  }, [assets, searchQuery]);

  const totalPages = Math.ceil(filteredAssets.length / ITEMS_PER_PAGE);

  const paginatedAssets = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAssets.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAssets, currentPage]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleRefresh = async () => {
    setSearchQuery("");
    setCurrentPage(1);
    setSelectedCoinId(null);
    if (!isInIframe) window.location.hash = "";
    await refetch();
  };

  const handleCoinClick = (coinId: number, coinName: string) => {
    setSelectedCoinId(coinId);
    setSelectedCoinName(coinName);
    if (!isInIframe) window.location.hash = `/coin/${coinId}`;
  };

  const handleBack = () => {
    setSelectedCoinId(null);
    setSelectedCoinName("");
    if (!isInIframe) window.location.hash = "";
  };

  return (
    <div className="min-h-screen bg-[#0f0f1a]">
      <Header
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onRefresh={handleRefresh}
        loading={loading}
      />

      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8">
        {selectedCoinId ? (
          <CoinInfo
            coinId={selectedCoinId}
            coinName={selectedCoinName}
            onBack={handleBack}
          />
        ) : (
          <>
            {loading && assets.length === 0 ? (
              <LoadingState />
            ) : error && assets.length === 0 ? (
              <ErrorState message={error} onRetry={handleRefresh} />
            ) : (
              <>
                {globalMetrics && (
                  <StatsGrid
                    marketCap={formatCompactNumber(
                      globalMetrics.totalMarketCap,
                    )}
                    volume={formatCompactNumber(globalMetrics.totalVolume24h)}
                    btcDom={globalMetrics.btcDominance.toFixed(1)}
                    ethDom={globalMetrics.ethDominance.toFixed(1)}
                    marketCapChange={globalMetrics.totalMarketCapChange24h}
                    volumeChange={globalMetrics.totalVolumeChange24h}
                  />
                )}

                {searchQuery && (
                  <div className="mb-4 text-[#a0a0b8]">
                    Showing {filteredAssets.length} result
                    {filteredAssets.length !== 1 ? "s" : ""} for "{searchQuery}"
                  </div>
                )}

                <CryptoTable
                  coins={paginatedAssets}
                  onCoinClick={handleCoinClick}
                />

                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-1 mt-6 overflow-x-auto py-2">
                    <button
                      onClick={() => setCurrentPage(1)}
                      disabled={currentPage === 1}
                      className="min-w-10 h-10 flex items-center justify-center bg-[#1a1a2e] border border-[#2a2a45] rounded-lg text-[#a0a0b8] hover:border-[#00d4aa] hover:text-[#00d4aa] disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm"
                    >
                      «
                    </button>

                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="min-w-10 h-10 flex items-center justify-center bg-[#1a1a2e] border border-[#2a2a45] rounded-lg text-[#a0a0b8] hover:border-[#00d4aa] hover:text-[#00d4aa] disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm"
                    >
                      ‹
                    </button>

                    {(() => {
                      const getPageNumbers = () => {
                        const pages: (number | string)[] = [];
                        const windowSize = 5;
                        const half = Math.floor(windowSize / 2);

                        if (totalPages <= windowSize + 2) {
                          for (let i = 1; i <= totalPages; i++) pages.push(i);
                        } else {
                          let start = Math.max(1, currentPage - half);
                          let end = Math.min(totalPages, currentPage + half);

                          if (end - start < windowSize - 1) {
                            if (start === 1) {
                              end = Math.min(
                                totalPages,
                                start + windowSize - 1,
                              );
                            } else {
                              start = Math.max(1, end - windowSize + 1);
                            }
                          }

                          if (start > 1) {
                            pages.push(1);
                            if (start > 2) pages.push("...");
                          }

                          for (let i = start; i <= end; i++) {
                            pages.push(i);
                          }

                          if (end < totalPages) {
                            if (end < totalPages - 1) pages.push("...");
                            pages.push(totalPages);
                          }
                        }
                        return pages;
                      };

                      return getPageNumbers().map((page, idx) =>
                        typeof page === "number" ? (
                          <button
                            key={idx}
                            onClick={() => setCurrentPage(page)}
                            className={`min-w-10 h-10 rounded-lg transition-colors ${
                              currentPage === page
                                ? "bg-[#00d4aa] text-[#0f0f1a] font-semibold"
                                : "bg-[#1a1a2e] border border-[#2a2a45] text-[#a0a0b8] hover:border-[#00d4aa] hover:text-[#00d4aa]"
                            }`}
                          >
                            {page}
                          </button>
                        ) : (
                          <span
                            key={idx}
                            className="min-w-10 h-10 flex items-center justify-center text-[#6b6b80]"
                          >
                            {page}
                          </span>
                        ),
                      );
                    })()}

                    <button
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="min-w-10 h-10 flex items-center justify-center bg-[#1a1a2e] border border-[#2a2a45] rounded-lg text-[#a0a0b8] hover:border-[#00d4aa] hover:text-[#00d4aa] disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm"
                    >
                      ›
                    </button>

                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      disabled={currentPage === totalPages}
                      className="min-w-10 h-10 flex items-center justify-center bg-[#1a1a2e] border border-[#2a2a45] rounded-lg text-[#a0a0b8] hover:border-[#00d4aa] hover:text-[#00d4aa] disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm"
                    >
                      »
                    </button>
                  </div>
                )}

                {totalPages > 1 && (
                  <div className="text-center mt-4 text-[#6b6b80] text-sm">
                    Page {currentPage} of {totalPages} ({filteredAssets.length}{" "}
                    coins)
                  </div>
                )}
              </>
            )}
          </>
        )}
      </main>

      <footer className="border-t border-[#2a2a45] mt-12 py-8 text-center">
        <p className="text-[#6b6b80] text-sm">
          Data provided by CoinMarketCap • Auto-refreshes every 60 seconds
        </p>
      </footer>
    </div>
  );
}

export default App;
