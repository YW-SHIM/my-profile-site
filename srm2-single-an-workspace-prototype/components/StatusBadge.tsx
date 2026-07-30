interface StatusBadgeProps {
  status: 'PENDING' | 'SENDING' | 'DISPATCHED' | 'ARCHIVED';
  progress?: 'Pending' | 'Sending...' | 'Dispatched';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  progress = 'Pending',
}) => {
  const statusMap: Record<typeof status, { bg: string; text: string; label: string }> = {
    PENDING: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Pending Review' },
    SENDING: { bg: 'bg-orange-100', text: 'text-orange-800', label: 'Sending...' },
    DISPATCHED: { bg: 'bg-green-100', text: 'text-green-800', label: 'Dispatched' },
    ARCHIVED: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Archived' },
  };

  const config = statusMap[status];

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${config.bg}`}>
      {status === 'SENDING' && (
        <div className="w-2 h-2 bg-orange-600 rounded-full animate-pulse" />
      )}
      <span className={`text-sm font-semibold ${config.text}`}>{config.label}</span>
    </div>
  );
};
