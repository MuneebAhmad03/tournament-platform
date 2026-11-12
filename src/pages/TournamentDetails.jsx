import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  MapPin, Calendar, Users, Trophy, DollarSign, 
  Shield, Clock, ArrowLeft, Gamepad2, CircleDot,
  ChevronRight, Star
} from 'lucide-react';

const categoryIcons = {
  Cricket: Trophy,
  Padel: CircleDot,
  Gaming: Gamepad2,
};

export default function TournamentDetails() {
  const { id } = useParams();
  const { getTournamentById } = useApp();
  const tournament = getTournamentById(id);

  if (!tournament) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Tournament Not Found</h2>
          <p className="text-gray-500 mb-6">The tournament you're looking for doesn't exist.</p>
          <Link to="/" className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const CategoryIcon = categoryIcons[tournament.category] || Trophy;
  const spotsLeft = tournament.maxTeams - tournament.registeredTeams;

  return (
    <div className="min-h-screen pb-20">
      {/* Back Navigation */}
      <div className="max-w-5xl mx-auto px-4 pt-6">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" />
          Back to Tournaments
        </Link>
      </div>

      {/* Hero Banner */}
      <div className="max-w-5xl mx-auto px-4 mt-6">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-red-950/40 via-black to-black border border-red-900/30 p-8 md:p-12">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-red-800/10 rounded-full blur-3xl" />
          
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-red-600/20 flex items-center justify-center">
                <CategoryIcon className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <span className="text-red-500 text-sm font-semibold">{tournament.game}</span>
                <span className="text-gray-600 mx-2">•</span>
                <span className="text-yellow-500 text-sm font-semibold">{tournament.status}</span>
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
              {tournament.title}
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl">{tournament.description}</p>
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="max-w-5xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Calendar, label: 'Date', value: tournament.date },
            { icon: MapPin, label: 'Venue', value: tournament.venue },
            { icon: Users, label: 'Team Size', value: tournament.teamSize },
            { icon: Shield, label: 'Format', value: tournament.format },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
              <Icon className="w-5 h-5 text-red-500 mb-2" />
              <p className="text-gray-500 text-xs mb-1">{label}</p>
              <p className="text-white font-semibold text-sm">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Prize & Registration */}
      <div className="max-w-5xl mx-auto px-4 mt-8">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Prize Pool */}
          <div className="bg-gradient-to-br from-red-950/30 to-black border border-red-900/30 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-bold text-white">Prize Pool</h3>
            </div>
            <p className="text-4xl font-black text-red-500 mb-1">
              PKR {tournament.prizePool.toLocaleString()}
            </p>
            <p className="text-gray-500 text-sm">Entry Fee: PKR {tournament.entryFee.toLocaleString()} per {tournament.teamSize.toLowerCase().includes('solo') ? 'player' : 'team'}</p>
          </div>

          {/* Registration Status */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-red-500" />
              <h3 className="text-lg font-bold text-white">Registration</h3>
            </div>
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">{tournament.registeredTeams} of {tournament.maxTeams} spots filled</span>
                <span className="text-red-500 font-semibold">{spotsLeft} left</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-red-700 to-red-500 h-2 rounded-full transition-all"
                  style={{ width: `${(tournament.registeredTeams / tournament.maxTeams) * 100}%` }}
                />
              </div>
            </div>
            <Link
              to={`/register/${tournament.id}`}
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all duration-200 hover:shadow-[0_0_25px_rgba(188,2,2,0.4)] active:scale-[0.98]"
            >
              Register Now
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Schedule */}
      <div className="max-w-5xl mx-auto px-4 mt-8">
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="w-5 h-5 text-red-500" />
            <h3 className="text-lg font-bold text-white">Tournament Schedule</h3>
          </div>
          <div className="space-y-4">
            {tournament.schedule.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-red-600 border-2 border-red-400 shadow-[0_0_8px_rgba(255,0,0,0.5)]" />
                  {index < tournament.schedule.length - 1 && (
                    <div className="w-0.5 h-12 bg-red-900/30" />
                  )}
                </div>
                <div className="pb-4">
                  <h4 className="text-white font-semibold">{item.round}</h4>
                  <p className="text-red-500 text-sm">{item.date}</p>
                  <p className="text-gray-500 text-sm">{item.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Rules */}
      <div className="max-w-5xl mx-auto px-4 mt-8">
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="w-5 h-5 text-red-500" />
            <h3 className="text-lg font-bold text-white">Rules & Regulations</h3>
          </div>
          <ul className="space-y-3">
            {tournament.rules.map((rule, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-red-600/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-red-500 text-xs font-bold">{index + 1}</span>
                </span>
                <span className="text-gray-300">{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
