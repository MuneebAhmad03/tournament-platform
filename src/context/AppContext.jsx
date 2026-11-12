import { createContext, useContext, useState, useEffect } from 'react';
import { mockTournaments, mockRegistrations, paymentInfo } from '../data/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [tournaments] = useState(mockTournaments);
  const [registrations, setRegistrations] = useState(mockRegistrations);
  const [currentUser] = useState({
    id: 'user-1',
    name: 'Demo Player',
    email: 'demo@player.com',
    gamingHandle: 'DemoGamer'
  });

  // Theme State: 'dark' | 'light' (persisted in localStorage, default dark)
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('stag_arena_theme');
    return saved === 'light' ? 'light' : 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }
    localStorage.setItem('stag_arena_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const addRegistration = (registration) => {
    const newReg = {
      ...registration,
      id: registrations.length + 1,
      status: 'pending',
      registeredAt: new Date().toISOString().split('T')[0]
    };
    setRegistrations(prev => [...prev, newReg]);
    return newReg;
  };

  const updateRegistrationStatus = (regId, newStatus) => {
    setRegistrations(prev =>
      prev.map(r => r.id === regId ? { ...r, status: newStatus } : r)
    );
  };

  const getTournamentById = (id) => {
    return tournaments.find(t => t.id === Number(id));
  };

  const getRegistrationsByTournament = (tournamentId) => {
    return registrations.filter(r => r.tournamentId === Number(tournamentId));
  };

  const getUserRegistrations = () => {
    return registrations.map(r => ({
      ...r,
      tournament: tournaments.find(t => t.id === r.tournamentId)
    }));
  };

  const getPendingRegistrations = () => {
    return registrations
      .filter(r => r.status === 'pending')
      .map(r => ({
        ...r,
        tournament: tournaments.find(t => t.id === r.tournamentId)
      }));
  };

  return (
    <AppContext.Provider value={{
      theme,
      toggleTheme,
      tournaments,
      registrations,
      currentUser,
      paymentInfo,
      addRegistration,
      updateRegistrationStatus,
      getTournamentById,
      getRegistrationsByTournament,
      getUserRegistrations,
      getPendingRegistrations
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
