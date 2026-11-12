import { useState } from 'react';
import { useApp } from '../context/AppContext';
import StatusBadge from '../components/StatusBadge';
import { 
  Shield, CheckCircle, XCircle, Eye, Image, 
  Users, Clock, AlertTriangle, Search, Check, Ban
} from 'lucide-react';

export default function AdminDashboard() {
  const { registrations, tournaments, updateRegistrationStatus } = useApp();
  const [filter, setFilter] = useState('all');
  const [viewingImage, setViewingImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [actionNotification, setActionNotification] = useState('');

  const filteredRegistrations = registrations
    .filter(r => filter === 'all' ? true : r.status === filter)
    .filter(r => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        r.playerName.toLowerCase().includes(query) ||
        r.gamingHandle.toLowerCase().includes(query) ||
        r.email.toLowerCase().includes(query)
      );
    })
    .map(r => ({
      ...r,
      tournament: tournaments.find(t => t.id === r.tournamentId)
    }));

  const stats = {
    total: registrations.length,
    pending: registrations.filter(r => r.status === 'pending').length,
    verified: registrations.filter(r => r.status === 'verified').length,
    rejected: registrations.filter(r => r.status === 'rejected').length,
  };

  const handleAction = (regId, status, playerName) => {
    updateRegistrationStatus(regId, status);
    setActionNotification(`Marked ${playerName}'s registration as ${status.toUpperCase()}`);
    setTimeout(() => setActionNotification(''), 3000);
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Toast notification */}
      {actionNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-red-950/90 text-white border border-red-600 px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in">
          <Shield className="w-5 h-5 text-red-400" />
          <span className="text-sm font-medium">{actionNotification}</span>
        </div>
      )}

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 pt-8 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-red-950/40 via-black to-black border border-red-900/30">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shadow-[0_0_20px_rgba(188,2,2,0.4)]">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-black text-white">Admin Verification Portal</h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-600/20 text-red-400 border border-red-600/30">
                  Moderator
                </span>
              </div>
              <p className="text-gray-400 text-sm mt-0.5">
                Verify manual payments, check screenshots, and manage approvals for Sahiwal arenas.
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-500 uppercase tracking-widest block">Action Queue</span>
            <span className="text-2xl font-black text-yellow-400">{stats.pending} Pending</span>
          </div>
        </div>
      </div>

      {/* Stats / Filter Cards */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'All Registrations', value: stats.total, icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/10', filterKey: 'all' },
            { label: 'Pending Approvals', value: stats.pending, icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-500/10', filterKey: 'pending' },
            { label: 'Verified & Confirmed', value: stats.verified, icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/10', filterKey: 'verified' },
            { label: 'Rejected', value: stats.rejected, icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/10', filterKey: 'rejected' },
          ].map(({ label, value, icon: Icon, color, bg, filterKey }) => (
            <button
              key={label}
              onClick={() => setFilter(filterKey)}
              className={`bg-white/[0.03] border rounded-2xl p-5 text-left transition-all cursor-pointer
                ${filter === filterKey 
                  ? 'border-red-600 bg-red-950/20 shadow-[0_0_20px_rgba(188,2,2,0.25)] scale-[1.02]' 
                  : 'border-white/10 hover:border-white/20'}`}
            >
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-3`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <p className="text-3xl font-black text-white">{value}</p>
              <p className="text-gray-400 text-xs uppercase tracking-wider mt-1">{label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by player name, gaming handle, or email..."
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
          />
        </div>
      </div>

      {/* Pending Approvals Data Table */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-black/60 border-b border-white/10 text-xs font-bold uppercase tracking-wider text-gray-400">
            <div className="col-span-3">Player Info</div>
            <div className="col-span-3">Tournament & Sport</div>
            <div className="col-span-2">Payment Proof</div>
            <div className="col-span-2">Current Status</div>
            <div className="col-span-2 text-right">Verification Action</div>
          </div>

          {/* Table Body */}
          {filteredRegistrations.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <AlertTriangle className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-300 font-semibold text-lg">No entries found</p>
              <p className="text-gray-500 text-sm mt-1">There are no registrations matching this filter.</p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {filteredRegistrations.map(reg => (
                <div
                  key={reg.id}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-white/[0.02] transition-colors"
                >
                  {/* Player Info */}
                  <div className="col-span-3">
                    <p className="text-white font-bold text-base">{reg.playerName}</p>
                    <p className="text-red-400 text-sm font-mono">{reg.gamingHandle}</p>
                    <p className="text-gray-500 text-xs">{reg.email}</p>
                  </div>

                  {/* Tournament */}
                  <div className="col-span-3">
                    <p className="text-white text-sm font-semibold">{reg.tournament?.title || 'Unknown'}</p>
                    <p className="text-gray-400 text-xs mt-0.5">
                      Fee: PKR {reg.tournament?.entryFee?.toLocaleString()} • {reg.tournament?.game}
                    </p>
                    <p className="text-gray-600 text-xs">Registered: {reg.registeredAt}</p>
                  </div>

                  {/* Uploaded Screenshot Column */}
                  <div className="col-span-2">
                    <button
                      onClick={() => setViewingImage(reg)}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-600/10 hover:bg-red-600/20 text-red-400 hover:text-red-300 border border-red-600/30 rounded-lg text-xs font-semibold transition-all cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      View Image
                    </button>
                    <p className="text-gray-600 text-[11px] font-mono mt-1 truncate max-w-[150px]">
                      {reg.paymentScreenshot}
                    </p>
                  </div>

                  {/* Status Badge Column */}
                  <div className="col-span-2">
                    <StatusBadge status={reg.status} />
                  </div>

                  {/* Actions Column */}
                  <div className="col-span-2 flex justify-start md:justify-end gap-2">
                    {reg.status === 'pending' ? (
                      <>
                        <button
                          onClick={() => handleAction(reg.id, 'verified', reg.playerName)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-500 text-white rounded-lg text-xs font-bold transition-all shadow-[0_0_10px_rgba(34,197,94,0.3)] cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleAction(reg.id, 'rejected', reg.playerName)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-bold transition-all shadow-[0_0_10px_rgba(239,68,68,0.3)] cursor-pointer"
                        >
                          <Ban className="w-3.5 h-3.5" />
                          Reject
                        </button>
                      </>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleAction(reg.id, reg.status === 'verified' ? 'rejected' : 'verified', reg.playerName)}
                          className="text-xs text-gray-400 hover:text-white underline"
                        >
                          Switch to {reg.status === 'verified' ? 'Reject' : 'Approve'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Image Modal */}
      {viewingImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4" 
          onClick={() => setViewingImage(null)}
        >
          <div 
            className="bg-zinc-950 border border-red-900/50 rounded-2xl p-6 max-w-lg w-full shadow-[0_0_50px_rgba(188,2,2,0.3)]" 
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <div>
                <h3 className="text-lg font-bold text-white">Payment Screenshot Verification</h3>
                <p className="text-gray-400 text-xs">Submitted by {viewingImage.playerName} ({viewingImage.gamingHandle})</p>
              </div>
              <button 
                onClick={() => setViewingImage(null)} 
                className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            {/* Simulated Receipt Preview */}
            <div className="bg-gradient-to-b from-zinc-900 to-black border border-white/10 rounded-xl p-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-red-600/20 border border-red-600/40 flex items-center justify-center mx-auto">
                <Image className="w-8 h-8 text-red-400" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-green-400 font-semibold px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                  Transaction Receipt Attached
                </span>
                <p className="text-white font-mono text-sm mt-3 font-semibold">{viewingImage.paymentScreenshot}</p>
                <p className="text-gray-500 text-xs mt-1">Payment Method: EasyPaisa / JazzCash / HBL Transfer</p>
                <p className="text-red-400 font-bold text-lg mt-2">
                  Amount: PKR {viewingImage.tournament?.entryFee?.toLocaleString()}
                </p>
              </div>

              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-lg text-left text-xs text-gray-400 space-y-1">
                <div className="flex justify-between">
                  <span>Tournament:</span>
                  <span className="text-white font-medium">{viewingImage.tournament?.title}</span>
                </div>
                <div className="flex justify-between">
                  <span>Player Email:</span>
                  <span className="text-white font-mono">{viewingImage.email}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span className="text-white">{viewingImage.registeredAt}</span>
                </div>
              </div>
            </div>

            {/* Quick approval buttons inside modal */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
              <StatusBadge status={viewingImage.status} />
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    handleAction(viewingImage.id, 'rejected', viewingImage.playerName);
                    setViewingImage(prev => ({ ...prev, status: 'rejected' }));
                  }}
                  className="px-4 py-2 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white rounded-lg text-xs font-bold transition-all"
                >
                  Reject
                </button>
                <button
                  onClick={() => {
                    handleAction(viewingImage.id, 'verified', viewingImage.playerName);
                    setViewingImage(prev => ({ ...prev, status: 'verified' }));
                  }}
                  className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-xs font-bold transition-all shadow-[0_0_15px_rgba(34,197,94,0.4)]"
                >
                  Approve Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
