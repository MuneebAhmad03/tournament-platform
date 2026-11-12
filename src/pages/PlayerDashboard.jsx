import { useApp } from '../context/AppContext';
import StatusBadge from '../components/StatusBadge';
import { Link } from 'react-router-dom';
import { 
  User, Trophy, Calendar, Gamepad2, CircleDot,
  BarChart3, Clock, CheckCircle2, XCircle, ArrowRight
} from 'lucide-react';

const categoryIcons = {
  Cricket: Trophy,
  Padel: CircleDot,
  Gaming: Gamepad2,
};

export default function PlayerDashboard() {
  const { currentUser, getUserRegistrations } = useApp();
  const registrations = getUserRegistrations();

  const stats = {
    total: registrations.length,
    verified: registrations.filter(r => r.status === 'verified').length,
    pending: registrations.filter(r => r.status === 'pending').length,
    rejected: registrations.filter(r => r.status === 'rejected').length,
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 pt-8 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-red-950/40 via-black to-black border border-red-900/30">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shadow-[0_0_20px_rgba(188,2,2,0.4)]">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-black text-white">{currentUser.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-600/20 text-red-400 border border-red-600/30">
                  Player
                </span>
              </div>
              <p className="text-gray-400 text-sm mt-0.5">
                Handle: <span className="text-white font-mono">{currentUser.gamingHandle}</span> • {currentUser.email}
              </p>
            </div>
          </div>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm rounded-xl transition-all shadow-[0_0_15px_rgba(188,2,2,0.3)]"
          >
            Join Another Tournament
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Enrolled', value: stats.total, icon: BarChart3, color: 'text-blue-400', bg: 'bg-blue-500/10' },
            { label: 'Verified', value: stats.verified, icon: CheckCircle2, color: 'text-green-400', bg: 'bg-green-500/10' },
            { label: 'Pending Verification', value: stats.pending, icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
            { label: 'Rejected', value: stats.rejected, icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/10' },
          ].map(({ label, value, icon: Icon, color, bg }) => (
            <div key={label} className="bg-white/[0.03] border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all">
              <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center mb-3`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <p className="text-3xl font-black text-white">{value}</p>
              <p className="text-gray-500 text-xs uppercase tracking-wider mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Registered Tournaments */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-red-500" />
            Registered Tournaments
          </h2>
          <span className="text-gray-500 text-sm">{registrations.length} total</span>
        </div>

        {registrations.length === 0 ? (
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-12 text-center">
            <Trophy className="w-12 h-12 text-gray-700 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No Registrations Yet</h3>
            <p className="text-gray-500 mb-6">You haven't registered for any tournaments yet in Sahiwal.</p>
            <Link to="/" className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors">
              Browse Tournaments
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {registrations.map(reg => {
              const CategoryIcon = categoryIcons[reg.tournament?.category] || Trophy;
              return (
                <div
                  key={reg.id}
                  className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 hover:border-red-900/40 transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start sm:items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-red-600/10 border border-red-600/20 flex items-center justify-center flex-shrink-0">
                        <CategoryIcon className="w-6 h-6 text-red-500" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-white font-bold text-lg">{reg.tournament?.title || 'Unknown Tournament'}</h3>
                          <span className="text-xs text-red-400 font-semibold px-2 py-0.5 rounded bg-red-950/40 border border-red-900/30">
                            {reg.tournament?.game}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                          <span className="text-gray-400 text-sm flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-gray-500" />
                            {reg.tournament?.date}
                          </span>
                          <span className="text-gray-600">•</span>
                          <span className="text-gray-400 text-sm">
                            Venue: {reg.tournament?.venue}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 pt-3 md:pt-0 border-t md:border-t-0 border-white/5">
                      <StatusBadge status={reg.status} />
                      <Link
                        to={`/tournament/${reg.tournamentId}`}
                        className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm font-medium border border-white/10 transition-colors"
                      >
                        Details
                      </Link>
                    </div>
                  </div>

                  {/* Submission details */}
                  <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
                    <div>
                      <span>Registered as: <strong className="text-gray-300">{reg.playerName}</strong> ({reg.gamingHandle})</span>
                      <span className="mx-2">•</span>
                      <span>Payment Slip: <span className="font-mono text-gray-400">{reg.paymentScreenshot}</span></span>
                    </div>
                    <span>Submitted on {reg.registeredAt}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
