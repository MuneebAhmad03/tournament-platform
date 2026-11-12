import { Gamepad2, Trophy, CircleDot, Layers } from 'lucide-react';
import { useApp } from '../context/AppContext';

const filters = [
  { key: 'All', label: 'All', icon: Layers },
  { key: 'Cricket', label: 'Cricket', icon: Trophy },
  { key: 'Padel', label: 'Padel', icon: CircleDot },
  { key: 'Gaming', label: 'Gaming', icon: Gamepad2 },
];

export default function FilterButtons({ activeFilter, onFilterChange }) {
  const { theme } = useApp();
  const isLight = theme === 'light';

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {filters.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          onClick={() => onFilterChange(key)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer
            ${activeFilter === key
              ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(188,2,2,0.5)] scale-105'
              : isLight
              ? 'bg-white text-gray-700 border border-gray-300 hover:border-red-600 hover:text-red-600 shadow-sm'
              : 'bg-white/5 text-gray-400 border border-white/10 hover:border-red-600/50 hover:text-white hover:bg-white/10'
            }`}
        >
          <Icon className="w-4 h-4" />
          {label}
        </button>
      ))}
    </div>
  );
}
