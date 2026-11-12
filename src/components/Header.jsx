import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useApp } from '../context/AppContext';
import logoImg from '../assets/stag-arena-logo.jpg';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useApp();

  const navLinks = [
    { to: '/', label: 'Browse Tournaments' },
    { to: '/dashboard', label: 'Player Dashboard' },
    { to: '/admin', label: 'Admin Portal' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-black/95 dark:bg-black/95 backdrop-blur-md border-b border-red-900/60 shadow-[0_4px_25px_rgba(188,2,2,0.15)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Org Name */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-red-600 to-red-900 opacity-60 blur-sm group-hover:opacity-100 transition duration-300" />
              <img
                src={logoImg}
                alt="STAG ARENA Logo"
                className="relative w-12 h-12 rounded-xl object-cover border border-red-500/50 shadow-md group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-wider leading-none">
                <span className="text-white">STAG</span>
                <span className="text-red-600 ml-1.5">ARENA</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-gray-400 mt-1">
                Sahiwal • Sports & Esports Hub
              </span>
            </div>
          </Link>

          {/* Desktop Nav & Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            <nav className="flex items-center gap-2">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200
                    ${isActive(link.to)
                      ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(188,2,2,0.5)] scale-105'
                      : 'text-gray-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-red-900/40'
                    }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Dark / Light Mode Switcher Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Dark/Light Mode"
              className="p-2.5 rounded-xl border border-white/10 hover:border-red-600/50 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all cursor-pointer shadow-sm flex items-center gap-1.5"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-yellow-400 animate-spin-slow" />
                  <span className="text-xs font-semibold hidden lg:inline">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-semibold hidden lg:inline">Dark</span>
                </>
              )}
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle Dark/Light Mode"
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-blue-400" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-white/5"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-t border-red-900/40 bg-zinc-950/98 backdrop-blur-md">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-bold transition-all
                  ${isActive(link.to)
                    ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(188,2,2,0.4)]'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
