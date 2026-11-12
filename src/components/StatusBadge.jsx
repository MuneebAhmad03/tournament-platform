const statusConfig = {
  pending: {
    label: 'Pending Verification',
    className: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    dot: 'bg-yellow-400'
  },
  verified: {
    label: 'Verified',
    className: 'bg-green-500/20 text-green-400 border-green-500/30',
    dot: 'bg-green-400'
  },
  rejected: {
    label: 'Rejected',
    className: 'bg-red-500/20 text-red-400 border-red-500/30',
    dot: 'bg-red-400'
  }
};

export default function StatusBadge({ status }) {
  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${config.className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}
