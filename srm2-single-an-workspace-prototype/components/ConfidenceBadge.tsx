import { ConfidenceBadgeProps } from '@/types/arrival-notice';

export const ConfidenceBadge: React.FC<ConfidenceBadgeProps> = ({
  score,
  matchStatus,
}) => {
  const getConfig = () => {
    if (score >= 95) {
      return {
        bg: 'bg-green-50',
        border: 'border-green-300',
        text: 'text-green-700',
        icon: '✓',
        label: 'Matched'
      };
    } else if (score >= 80) {
      return {
        bg: 'bg-blue-50',
        border: 'border-blue-300',
        text: 'text-blue-700',
        icon: '🤖',
        label: matchStatus === 'AI_Suggested' ? 'AI Suggested' : 'AI Match'
      };
    } else {
      return {
        bg: 'bg-amber-50',
        border: 'border-amber-300',
        text: 'text-amber-700',
        icon: '⚠️',
        label: 'Manual Review'
      };
    }
  };

  const config = getConfig();

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border font-semibold shadow-sm ${config.bg} ${config.border}`}>
      <span className="text-base">{config.icon}</span>
      <span className={`text-sm ${config.text}`}>{config.label}</span>
      <div className="h-6 w-px bg-gray-300"></div>
      <div className={`text-lg font-bold ${config.text} font-mono`}>{score}%</div>
    </div>
  );
};
