import React, { useState, useEffect, useRef } from 'react';
import { 
  Navigation, 
  MapPin, 
  Trophy, 
  Crosshair, 
  Layers, 
  ExternalLink, 
  Compass, 
  Flame, 
  CheckCircle2,
  Calendar,
  Users
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ArenaMap({ tournaments, onMarkerClick }) {
  // Sahiwal City Center coordinates
  const sahiwalCenter = { lat: 30.6682, lng: 73.1114 };

  const [activeVenue, setActiveVenue] = useState(tournaments[0] || null);
  const [userLocation, setUserLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState(sahiwalCenter);
  const [zoomLevel, setZoomLevel] = useState(14);
  const [mapMode, setMapMode] = useState('dark'); // 'dark' | 'satellite' | 'street'
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState(null);

  // Auto-request live location on mount (High-Accuracy GPS)
  useEffect(() => {
    handleLocateUser();
  }, []);

  const handleLocateUser = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation not supported on this browser.');
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: Math.round(pos.coords.accuracy)
        };
        setUserLocation(coords);
        setMapCenter({ lat: coords.lat, lng: coords.lng });
        setZoomLevel(15);
        setIsLocating(false);
      },
      (err) => {
        console.warn('Geolocation access issue:', err.message);
        setLocationError('Location permission denied or unavailable.');
        setIsLocating(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 12000,
        maximumAge: 0
      }
    );
  };

  const handleSelectVenue = (t) => {
    setActiveVenue(t);
    setMapCenter({ lat: t.location.lat, lng: t.location.lng });
    setZoomLevel(16);
    if (onMarkerClick) {
      onMarkerClick(t);
    }
  };

  const handleResetToSahiwal = () => {
    setMapCenter(sahiwalCenter);
    setZoomLevel(14);
  };

  // Compute live Google Maps dynamic embedded frame URL
  // Uses Google Maps embed API with zero token requirements
  const getEmbedMapUrl = () => {
    const lat = mapCenter.lat;
    const lng = mapCenter.lng;
    return `https://maps.google.com/maps?q=${lat},${lng}&z=${zoomLevel}&output=embed&hl=en`;
  };

  return (
    <div className="relative rounded-2xl overflow-hidden border border-red-950/70 bg-black shadow-[0_15px_50px_rgba(0,0,0,0.9)]">
      
      {/* Top Header Control Ribbon */}
      <div className="bg-zinc-950/95 backdrop-blur-md px-5 py-3.5 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 relative z-20">
        
        {/* Title & Live Status */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-red-600/20 border border-red-600/40 flex items-center justify-center shrink-0">
            <Navigation className="w-4 h-4 text-red-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white font-extrabold text-sm tracking-wide">
                STAG ARENA • SAHIWAL VENUE RADAR
              </span>
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            </div>
            <p className="text-[11px] text-gray-400">
              {userLocation
                ? `GPS Active: Pinpointed near ${userLocation.lat.toFixed(4)}° N, ${userLocation.lng.toFixed(4)}° E`
                : 'Sahiwal Sports Complex & Club Arenas • Punjab, Pakistan'}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          
          {/* Map Layer Mode Toggles */}
          <div className="flex items-center bg-white/5 border border-white/10 rounded-lg p-0.5">
            <button
              onClick={() => setMapMode('dark')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                mapMode === 'dark'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Velay Dark
            </button>
            <button
              onClick={() => setMapMode('satellite')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                mapMode === 'satellite'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Satellite
            </button>
            <button
              onClick={() => setMapMode('street')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                mapMode === 'street'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Normal
            </button>
          </div>

          {/* Locate Me Button */}
          <button
            onClick={handleLocateUser}
            disabled={isLocating}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
              userLocation
                ? 'bg-blue-600/20 text-blue-400 border-blue-500/40 hover:bg-blue-600/30'
                : 'bg-white/5 text-gray-300 border-white/10 hover:border-red-600/50 hover:text-white'
            }`}
          >
            <Crosshair className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin text-red-500' : 'text-blue-400'}`} />
            <span>{isLocating ? 'Locating...' : userLocation ? 'My Location' : 'Locate Me'}</span>
          </button>

          {/* Sahiwal City Center Button */}
          <button
            onClick={handleResetToSahiwal}
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-red-600/20 text-red-400 border border-red-600/30 hover:bg-red-600 hover:text-white transition-all cursor-pointer"
          >
            Sahiwal Hub
          </button>
        </div>
      </div>

      {/* Main Interactive Map Canvas */}
      <div className="relative w-full h-[480px] md:h-[540px] bg-zinc-950 overflow-hidden">
        
        {/* Dynamic Embedded Google Map Frame */}
        <iframe
          title="Sahiwal Arena Map"
          src={getEmbedMapUrl()}
          className={`w-full h-full border-0 transition-all duration-500 ${
            mapMode === 'dark'
              ? 'filter invert hue-rotate-180 contrast-[1.25] brightness-[0.75] saturate-[0.3]'
              : mapMode === 'satellite'
              ? 'filter contrast-[1.1] brightness-[0.9]'
              : ''
          }`}
          loading="lazy"
          allowFullScreen
        />

        {/* Floating Quick Venue Selector Chips (Top Left Overlay) */}
        <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2 max-w-[85%] pointer-events-auto">
          {tournaments.slice(0, 4).map((t) => {
            const isSelected = activeVenue?.id === t.id;
            return (
              <button
                key={t.id}
                onClick={() => handleSelectVenue(t)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold backdrop-blur-md transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-red-600 text-white border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.7)] scale-105'
                    : 'bg-black/80 text-gray-300 border-white/10 hover:border-red-600/40 hover:text-white'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                <span>{t.venue}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Venue Spotlight Pill (Bottom Right Corner) */}
        {activeVenue && (
          <div className="absolute bottom-4 right-4 z-10 bg-black/90 backdrop-blur-md border border-red-900/50 rounded-xl p-3.5 max-w-xs shadow-2xl">
            <div className="flex items-start justify-between gap-2 mb-1">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-red-500">
                {activeVenue.category} • {activeVenue.game}
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-green-500/20 text-green-400">
                {activeVenue.status}
              </span>
            </div>
            <h4 className="text-white font-bold text-sm leading-snug">{activeVenue.title}</h4>
            <p className="text-gray-400 text-xs mt-0.5 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-red-500 shrink-0" />
              <span className="truncate">{activeVenue.venue}</span>
            </p>
            <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/10 text-xs">
              <span className="text-red-400 font-extrabold">
                PKR {activeVenue.prizePool.toLocaleString()}
              </span>
              <Link
                to={`/tournament/${activeVenue.id}`}
                className="text-white hover:text-red-400 font-bold flex items-center gap-1 transition-colors"
              >
                View Rules & Register →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
