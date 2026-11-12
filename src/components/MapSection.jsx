import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Navigation, LocateFixed, Compass, Crosshair, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

// Custom glowing red pin marker for tournament venues
const createCustomMarker = (category, isSelected) => {
  return L.divIcon({
    className: 'custom-venue-pin',
    html: `
      <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 36px; height: 36px;">
        <div style="
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background: rgba(220, 38, 38, 0.35);
          animation: ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;
        "></div>
        <div style="
          position: relative;
          width: 30px;
          height: 30px;
          border-radius: 9999px;
          background: ${isSelected ? '#ff0000' : '#dc2626'};
          border: 2px solid #ffffff;
          box-shadow: 0 0 ${isSelected ? '25px' : '12px'} rgba(255, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-size: 13px;
          transition: transform 0.2s ease;
          transform: ${isSelected ? 'scale(1.15)' : 'scale(1)'};
        ">
          ${category === 'Cricket' ? '🏏' : category === 'Padel' ? '🎾' : '🎮'}
        </div>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18]
  });
};

// Glowing Google-style blue pulse pin for exact user location
const createUserMarker = () => {
  return L.divIcon({
    className: 'custom-user-pin',
    html: `
      <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 36px; height: 36px;">
        <div style="
          position: absolute;
          inset: -4px;
          border-radius: 9999px;
          background: rgba(59, 130, 246, 0.4);
          animation: ping 1.6s cubic-bezier(0, 0, 0.2, 1) infinite;
        "></div>
        <div style="
          position: relative;
          width: 18px;
          height: 18px;
          border-radius: 9999px;
          background: #2563eb;
          border: 3px solid #ffffff;
          box-shadow: 0 0 16px rgba(37, 99, 235, 1);
        "></div>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18]
  });
};

// Map Recenter handler that zooms in closely for accurate street-level view
function MapRecenter({ target, zoom = 14 }) {
  const map = useMap();
  useEffect(() => {
    if (target) {
      map.flyTo(target, zoom, { duration: 1.4, easeLinearity: 0.25 });
    }
  }, [target, zoom, map]);
  return null;
}

export default function MapSection({ tournaments, onMarkerClick }) {
  // Sahiwal City Center coordinates
  const sahiwalCenter = [30.6682, 73.1114];
  const [activeVenue, setActiveVenue] = useState(tournaments[0] || null);
  const [userLocation, setUserLocation] = useState(null);
  const [accuracyRadius, setAccuracyRadius] = useState(null);
  const [mapTarget, setMapTarget] = useState({ coords: sahiwalCenter, zoom: 14 });
  const [locatingStatus, setLocatingStatus] = useState('prompt'); // 'prompt' | 'locating' | 'granted' | 'denied'

  // Request browser geolocation immediately on mount
  useEffect(() => {
    requestUserLocation();
  }, []);

  const requestUserLocation = () => {
    if (!navigator.geolocation) {
      setLocatingStatus('denied');
      return;
    }

    setLocatingStatus('locating');

    // High accuracy request to match Google Maps precision
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const accuracy = pos.coords.accuracy; // accuracy radius in meters
        const coords = [lat, lng];

        setUserLocation(coords);
        setAccuracyRadius(accuracy > 500 ? 500 : accuracy);
        // Fly directly to exact location with street-level zoom (16)
        setMapTarget({ coords, zoom: 16 });
        setLocatingStatus('granted');
      },
      (err) => {
        console.warn('Geolocation error / permission denied:', err.message);
        setLocatingStatus('denied');
      },
      {
        enableHighAccuracy: true, // Forces device GPS / Wi-Fi triangulation
        timeout: 15000,
        maximumAge: 0 // No cached outdated location
      }
    );
  };

  const handleSelectVenue = (t) => {
    setActiveVenue(t);
    setMapTarget({ coords: [t.location.lat, t.location.lng], zoom: 15 });
    if (onMarkerClick) {
      onMarkerClick(t);
    }
  };

  return (
    <div className="relative rounded-2xl overflow-hidden border border-red-950/60 bg-zinc-950 shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
      {/* Top Header Bar inside Map (Velay style Header) */}
      <div className="bg-black/90 backdrop-blur-md px-5 py-3 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 z-10 relative">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-600/40 flex items-center justify-center">
            <Navigation className="w-4 h-4 text-red-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-sm">Sahiwal Venues & Live Map</span>
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            </div>
            <p className="text-[11px] text-gray-400">
              {userLocation
                ? `Located at ${userLocation[0].toFixed(4)}° N, ${userLocation[1].toFixed(4)}° E (GPS Verified)`
                : 'Sahiwal, Punjab • 30.6682° N, 73.1114° E'}
            </p>
          </div>
        </div>

        {/* Location & Controls */}
        <div className="flex items-center gap-2">
          {userLocation ? (
            <button
              onClick={() => setMapTarget({ coords: userLocation, zoom: 16 })}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/40 hover:bg-blue-600/30 transition-all cursor-pointer"
            >
              <Crosshair className="w-3.5 h-3.5 text-blue-400 animate-spin" />
              <span>Exact Location</span>
            </button>
          ) : (
            <button
              onClick={requestUserLocation}
              disabled={locatingStatus === 'locating'}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-white/5 text-gray-300 border border-white/10 hover:border-red-500/50 hover:text-white transition-all cursor-pointer"
            >
              <Compass className={`w-3.5 h-3.5 ${locatingStatus === 'locating' ? 'animate-spin text-red-500' : 'text-gray-400'}`} />
              <span>{locatingStatus === 'locating' ? 'Finding GPS...' : 'Locate Me'}</span>
            </button>
          )}

          <button
            onClick={() => setMapTarget({ coords: sahiwalCenter, zoom: 14 })}
            className="text-xs font-semibold px-3 py-1.5 rounded-full bg-red-600/20 text-red-400 border border-red-600/30 hover:bg-red-600 hover:text-white transition-all cursor-pointer"
          >
            Sahiwal Center
          </button>
        </div>
      </div>

      {/* Clean Full Map (No bottom overlays/dock) */}
      <div className="relative w-full h-[450px] md:h-[550px]">
        <MapContainer
          center={sahiwalCenter}
          zoom={14}
          scrollWheelZoom={false}
          className="w-full h-full z-0"
        >
          {/* Smooth recenter helper */}
          <MapRecenter target={mapTarget.coords} zoom={mapTarget.zoom} />

          {/* Standard OpenStreetMap tiles with custom sleek Velay dark filter */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            className="velay-dark-tiles"
          />

          {/* User's Exact Location Marker & Accuracy Blue Ring */}
          {userLocation && (
            <>
              {accuracyRadius && (
                <Circle
                  center={userLocation}
                  radius={accuracyRadius}
                  pathOptions={{
                    color: '#3b82f6',
                    fillColor: '#3b82f6',
                    fillOpacity: 0.12,
                    weight: 1
                  }}
                />
              )}
              <Marker position={userLocation} icon={createUserMarker()}>
                <Popup className="custom-popup">
                  <div className="p-1 min-w-[170px] text-center">
                    <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider block mb-1">
                      You Are Here
                    </span>
                    <p className="text-gray-300 text-xs">
                      Live GPS coordinate pinpointed.
                    </p>
                  </div>
                </Popup>
              </Marker>
            </>
          )}

          {/* Tournament Arena Markers */}
          {tournaments.map((tournament) => {
            const isSelected = activeVenue?.id === tournament.id;
            return (
              <Marker
                key={tournament.id}
                position={[tournament.location.lat, tournament.location.lng]}
                icon={createCustomMarker(tournament.category, isSelected)}
                eventHandlers={{
                  click: () => handleSelectVenue(tournament)
                }}
              >
                <Popup className="custom-popup">
                  <div className="p-1 min-w-[210px]">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-red-400">
                        {tournament.game}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-green-500/20 text-green-400">
                        {tournament.status}
                      </span>
                    </div>
                    <h4 className="text-white font-bold text-sm leading-snug mb-1">
                      {tournament.title}
                    </h4>
                    <p className="text-gray-400 text-xs mb-2">
                      📍 {tournament.venue}
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
                      <span className="text-red-400 font-extrabold">
                        PKR {tournament.prizePool.toLocaleString()}
                      </span>
                      <Link
                        to={`/tournament/${tournament.id}`}
                        className="text-white hover:text-red-400 font-semibold flex items-center gap-1"
                      >
                        Book / Join →
                      </Link>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}
