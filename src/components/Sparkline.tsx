interface SparklineProps {
  priceChange7d: number;
  price: number;
}

export function Sparkline({ priceChange7d, price }: SparklineProps) {
  // Generate a simple sparkline based on 7d change
  const isPositive = priceChange7d >= 0;
  const strokeColor = isPositive ? '#00d4aa' : '#ff6b6b';

  // Generate 12 points to simulate price movement
  const points: number[] = [];
  const startPrice = price / (1 + priceChange7d / 100);
  const volatility = Math.abs(priceChange7d) / 100 * 0.5;

  for (let i = 0; i < 12; i++) {
    const randomFactor = (Math.random() - 0.5) * volatility;
    const trendFactor = (priceChange7d / 100) * (i / 11);
    points.push(startPrice * (1 + trendFactor + randomFactor));
  }

  // Normalize points to fit in 80x24 viewBox
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;

  const svgPoints = points.map((p, i) => {
    const x = (i / 11) * 80;
    const y = 24 - ((p - min) / range) * 20 - 2;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width="80" height="24" viewBox="0 0 80 24" className="opacity-80">
      <polyline
        points={svgPoints}
        fill="none"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}