import { ConfidenceBadgeProps } from '@/types/arrival-notice';

export const ConfidenceBadge: React.FC<ConfidenceBadgeProps> = ({
  score,
  matchStatus,
}) => {
  const isHighConfidence = score > 95;
  const bgColor = isHighConfidence ? 'bg-green-100' : 'bg-yellow-100';
  const textColor = isHighConfidence ? 'text-green-800' : 'text-yellow-800';
  const borderColor = isHighConfidence ? 'border-green-300' : 'border-yellow-300';

  const iconColor = isHighConfidence ? '✓' : '!';

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${bgColor} ${borderColor}`}
    >
      <span className={`text-sm font-semibold ${textColor}`}>{iconColor}</span>
      <div className={`text-sm font-medium ${textColor}`}>
        {matchStatus === 'AI_Suggested' ? 'AI Suggested' : matchStatus}
      </div>
      <div className={`text-xs font-semibold ${textColor}`}>{score}%</div>
    </div>
  );
};
