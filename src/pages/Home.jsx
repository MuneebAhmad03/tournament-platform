import { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import FilterButtons from '../components/FilterButtons';
import ArenaMap from '../components/ArenaMap';
import TournamentCard from '../components/TournamentCard';
import { Swords, ChevronDown, Flame, Shield, Trophy } from 'lucide-react';

export default function Home() {
  const { tournaments, theme } = useApp();
  const [activeFilter, setActiveFilter] = useState('All');
  const [highlightedId, setHighlightedId] = useState(null);
  const listRef = useRef(null);

  const isLight = theme === 'light';

  const filteredTournaments = activeFilter === 'All'
    ? tournaments
    : tournaments.filter(t => t.category === activeFilter);

  const handleMarkerClick = (tournament) => {
    setHighlightedId(tournament.id);
    listRef.current?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => setHighlightedId(null), 3000);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 px-4 text-center overflow-hidden">
        {/* Background glow and radial lighting */}
        <div className={`absolute inset-0 pointer-events-none ${
          isLight 
            ? 'bg-gradient-to-b from-red-100/40 via-transparent to-transparent' 
            : 'bg-gradient-to-b from-red-950/30 via-transparent to-transparent'
        }`} />
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-3xl pointer-events-none ${
          isLight ? 'bg-red-500/5' : 'bg-red-600/10'
        }`} />
        
        <div className="relative max-w-5xl mx-auto flex flex-col items-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Flame className="w-4 h-4 text-red-500 animate-pulse" />
            <span className="text-red-500 text-xs sm:text-sm font-black tracking-widest uppercase">
              STAG ARENA SAHIWAL • OFFICIAL TOURNAMENT PLATFORM
            </span>
            <Flame className="w-4 h-4 text-red-500 animate-pulse" />
          </div>

          {/* Slogans */}
          <h1 className={`text-4xl sm:text-6xl md:text-7xl font-black mb-4 tracking-tight leading-tight ${
            isLight ? 'text-gray-900' : 'text-white'
          }`}>
            UNLEASH THE BEAST.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-700">
              CONQUER THE ARENA.
            </span>
          </h1>

          <p className="text-red-600 font-bold text-lg sm:text-xl md:text-2xl tracking-wide uppercase mb-4">
            WHERE PASSION MEETS GLORY — SAHIWAL'S ULTIMATE BATTLEGROUND
          </p>

          <p className={`text-base md:text-lg max-w-3xl mx-auto mb-8 leading-relaxed ${
            isLight ? 'text-gray-600' : 'text-gray-400'
          }`}>
            Indoor Cricket, Padel Courts, Tekken 8, and FIFA 25. Step up, represent your squad, 
            and etch your name into Sahiwal's sporting history.
          </p>

          {/* Quick Action Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold ${
              isLight ? 'bg-white border border-gray-200 text-gray-700 shadow-sm' : 'bg-white/5 border border-white/10 text-gray-300'
            }`}>
              <Shield className="w-4 h-4 text-red-500" />
              <span>Verified Cash Prize Pools</span>
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold ${
              isLight ? 'bg-white border border-gray-200 text-gray-700 shadow-sm' : 'bg-white/5 border border-white/10 text-gray-300'
            }`}>
              <Trophy className="w-4 h-4 text-red-500" />
              <span>Professional Brackets & Arenas</span>
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold ${
              isLight ? 'bg-white border border-gray-200 text-gray-700 shadow-sm' : 'bg-white/5 border border-white/10 text-gray-300'
            }`}>
              <Swords className="w-4 h-4 text-red-500" />
              <span>Instant Verification Portal</span>
            </div>
          </div>

          <a href="#tournaments" className={`inline-flex items-center gap-2 transition-colors ${
            isLight ? 'text-gray-500 hover:text-red-600' : 'text-gray-400 hover:text-red-500'
          }`}>
            <span className="text-sm font-semibold tracking-wider uppercase">Explore Tournaments</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-red-500" />
          </a>
        </div>
      </section>

      {/* Filters */}
      <section className="px-4 mb-8">
        <div className="max-w-7xl mx-auto">
          <FilterButtons activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        </div>
      </section>

      {/* Map Section */}
      <section className="px-4 mb-12">
        <div className="max-w-7xl mx-auto">
          <ArenaMap 
            tournaments={filteredTournaments}
            onMarkerClick={handleMarkerClick}
          />
        </div>
      </section>

      {/* Tournament List */}
      <section id="tournaments" ref={listRef} className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl font-black uppercase tracking-wide ${
              isLight ? 'text-gray-900' : 'text-white'
            }`}>
              {activeFilter === 'All' ? 'All Active Tournaments' : `${activeFilter} Tournaments`}
              <span className="text-red-600 text-lg font-normal ml-3">({filteredTournaments.length})</span>
            </h2>
          </div>
          
          {filteredTournaments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTournaments.map(tournament => (
                <div
                  key={tournament.id}
                  className={`transition-all duration-500 ${
                    highlightedId === tournament.id
                      ? 'ring-2 ring-red-500 ring-offset-2 ring-offset-black rounded-2xl scale-[1.02]'
                      : ''
                  }`}
                >
                  <TournamentCard tournament={tournament} />
                </div>
              ))}
            </div>
          ) : (
            <div className={`text-center py-16 rounded-2xl border ${
              isLight ? 'bg-white border-gray-200' : 'bg-white/[0.02] border-white/5'
            }`}>
              <p className="text-gray-500 text-lg">No tournaments found for this category at the moment.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
