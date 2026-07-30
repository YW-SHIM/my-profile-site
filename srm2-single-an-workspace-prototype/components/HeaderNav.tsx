import { Search, ExternalLink } from 'lucide-react';
import { ArrivalNoticeRecord } from '@/types/arrival-notice';
import { StatusBadge } from './StatusBadge';
import { useArrivalNoticeStore } from '@/store/arrival-notice-store';

interface HeaderNavProps {
  selectedRecord: ArrivalNoticeRecord | null;
  onSearch: (blNo: string) => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ selectedRecord, onSearch }) => {
  const { openOpusScreen } = useArrivalNoticeStore();

  const handleViewInOpus = () => {
    if (selectedRecord) {
      openOpusScreen(selectedRecord.blNo);
      // Simulate opening OPUS in a modal/window
      alert(
        `Opening OPUS Screen (ESM_BKG_1054) with B/L: ${selectedRecord.blNo}\n\nIn a real app, this would open the legacy OPUS system pre-loaded with this B/L.`
      );
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left: Search Input */}
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by B/L No..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onSearch((e.target as HTMLInputElement).value);
              }
            }}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Center: Status Badge */}
        {selectedRecord && (
          <div className="flex-1 flex justify-center">
            <StatusBadge status={selectedRecord.status} />
          </div>
        )}

        {/* Right: View in OPUS Button */}
        {selectedRecord && (
          <button
            onClick={handleViewInOpus}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            View in OPUS
          </button>
        )}
      </div>
    </div>
  );
};
