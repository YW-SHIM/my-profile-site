interface StatusBadgeProps {
  status: 'PENDING' | 'SENDING' | 'DISPATCHED' | 'ARCHIVED';
  progress?: 'Pending' | 'Sending...' | 'Dispatched';
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  progress = 'Pending',
  size = 'md',
}) => {
  const statusMap: Record<typeof status, { bg: string; text: string; border: string; icon: string; label: string }> = {
    PENDING: {
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'border-blue-300',
      icon: '⏳',
      label: 'Pending Review'
    },
    SENDING: {
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      border: 'border-amber-300',
      icon: '📤',
      label: 'Sending...'
    },
    DISPATCHED: {
      bg: 'bg-green-50',
      text: 'text-green-700',
      border: 'border-green-300',
      icon: '✓',
      label: 'Dispatched'
    },
    ARCHIVED: {
      bg: 'bg-gray-100',
      text: 'text-gray-700',
      border: 'border-gray-300',
      icon: '📁',
      label: 'Archived'
    },
  };

  const sizeMap = {
    sm: 'px-2 py-1 text-xs gap-1',
    md: 'px-3 py-1.5 text-sm gap-2',
    lg: 'px-4 py-2 text-base gap-2',
  };

  const config = statusMap[status];

  return (
    <div className={`inline-flex items-center rounded-full border ${config.bg} ${config.border} ${sizeMap[size]}`}>
      <span className="font-bold">{config.icon}</span>
      {status === 'SENDING' && (
        <div className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-pulse" />
      )}
      <span className={`font-semibold whitespace-nowrap ${config.text}`}>{config.label}</span>
    </div>
  );
};
