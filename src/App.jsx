import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import MotivationalSlider from './components/MotivationalSlider';
import Header from './components/Header';
import Home from './pages/Home';
import TournamentDetails from './pages/TournamentDetails';
import Registration from './pages/Registration';
import PlayerDashboard from './pages/PlayerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import logoImg from './assets/stag-arena-logo.jpg';

function AppLayout() {
  const { theme } = useApp();

  return (
    <div className={`min-h-screen flex flex-col selection:bg-red-600 selection:text-white transition-colors duration-300 ${
      theme === 'light' ? 'bg-[#f8f9fa] text-gray-900' : 'bg-black text-white'
    }`}>
      {/* Motivational Marquee Slider */}
      <MotivationalSlider />

      {/* Header with Theme Toggle */}
      <Header />

      {/* Main Content Pages */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tournament/:id" element={<TournamentDetails />} />
          <Route path="/register/:id" element={<Registration />} />
          <Route path="/dashboard" element={<PlayerDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className={`border-t py-10 px-4 mt-auto transition-colors duration-300 ${
        theme === 'light'
          ? 'bg-white border-gray-200 text-gray-700'
          : 'bg-black/95 border-red-950/60 text-gray-400'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img
              src={logoImg}
              alt="STAG ARENA"
              className="w-10 h-10 rounded-lg object-cover border border-red-500/40 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600 inline-block animate-pulse"></span>
                <span className={`font-black tracking-wider text-sm ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  STAG ARENA SAHIWAL
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">Sahiwal, Punjab, Pakistan • The Arena of Champions</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center">
            Indoor Cricket • Padel Courts • Tekken 8 • FIFA 25
          </p>
          <p className="text-xs text-gray-500 text-center md:text-right">
            © {new Date().getFullYear()} STAG ARENA. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Router>
        <AppLayout />
      </Router>
    </AppProvider>
  );
}
