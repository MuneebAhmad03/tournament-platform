import { Link } from 'react-router-dom';
import { MapPin, Calendar, Users, Trophy, Gamepad2, CircleDot } from 'lucide-react';
import { useApp } from '../context/AppContext';

const categoryIcons = {
  Cricket: Trophy,
  Padel: CircleDot,
  Gaming: Gamepad2,
};

const statusColors = {
  'Ongoing': 'bg-green-500/20 text-green-400 border-green-500/30',
  'Upcoming': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Registration Open': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'Completed': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
};

export default function TournamentCard({ tournament }) {
  const { theme } = useApp();
  const CategoryIcon = categoryIcons[tournament.category] || Trophy;
  const statusClass = statusColors[tournament.status] || statusColors['Upcoming'];

  const isLight = theme === 'light';

  return (
    <div className={`group border rounded-2xl p-5 transition-all duration-300 hover:border-red-600/60 hover:shadow-[0_0_30px_rgba(188,2,2,0.18)] ${
      isLight 
        ? 'bg-white border-gray-200 shadow-sm' 
        : 'bg-gradient-to-br from-white/[0.05] to-white/[0.02] border-white/10'
    }`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-600/20 flex items-center justify-center">
            <CategoryIcon className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <h3 className={`font-bold text-lg leading-tight group-hover:text-red-500 transition-colors ${
              isLight ? 'text-gray-900' : 'text-white'
            }`}>
              {tournament.title}
            </h3>
            <p className="text-gray-500 text-sm">{tournament.game}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusClass}`}>
          {tournament.status}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className={`flex items-center gap-2 text-sm ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
          <MapPin className="w-4 h-4 text-red-600 shrink-0" />
          <span className="truncate">{tournament.venue}</span>
        </div>
        <div className={`flex items-center gap-2 text-sm ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
          <Calendar className="w-4 h-4 text-red-600 shrink-0" />
          <span>{tournament.date}</span>
        </div>
        <div className={`flex items-center gap-2 text-sm ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
          <Users className="w-4 h-4 text-red-600 shrink-0" />
          <span>{tournament.registeredTeams}/{tournament.maxTeams} registered • {tournament.teamSize}</span>
        </div>
      </div>

      <div className={`flex items-center justify-between pt-3 border-t ${isLight ? 'border-gray-100' : 'border-white/5'}`}>
        <div>
          <span className="text-gray-500 text-xs">Prize Pool</span>
          <p className="text-red-600 font-black text-lg">PKR {tournament.prizePool.toLocaleString()}</p>
        </div>
        <Link
          to={`/tournament/${tournament.id}`}
          className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl transition-all duration-200 hover:shadow-[0_0_20px_rgba(188,2,2,0.4)]"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
