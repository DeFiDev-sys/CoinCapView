import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-16 h-16 rounded-full bg-[#ff6b6b]/10 flex items-center justify-center mb-6">
        <AlertCircle className="w-8 h-8 text-[#ff6b6b]" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">Failed to load data</h3>
      <p className="text-[#a0a0b8] text-center max-w-md mb-6">{message}</p>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-6 py-3 bg-[#00d4aa] text-[#0f0f1a] font-semibold rounded-lg hover:bg-[#00e4ba] transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        Try Again
      </button>
    </div>
  );
}