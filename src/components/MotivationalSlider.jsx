import { Flame, Trophy, Swords, Zap, Shield, Sparkle, Target } from 'lucide-react';

const quotes = [
  { text: "Champions are made in the arena", icon: Trophy },
  { text: "Hard work beats talent when talent fails to work hard", icon: Flame },
  { text: "One round, one match, one chance at glory", icon: Swords },
  { text: "Leave doubt at the entrance. Bring fire to the court", icon: Zap },
  { text: "Prove your worth, claim your trophy", icon: Shield },
  { text: "Victory belongs to the most persevering", icon: Sparkle },
  { text: "Pain is temporary. Pride is forever", icon: Target },
];

export default function MotivationalSlider() {
  return (
    <div className="w-full overflow-hidden bg-black/95 border-b border-red-950/70 py-2.5 whitespace-nowrap relative z-10 shadow-[0_2px_15px_rgba(188,2,2,0.15)] group">
      {/* Subtle crimson ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,0,0,0.06),transparent_80%)] pointer-events-none" />

      {/* Ticker Track with Pause on Hover */}
      <div className="flex w-max animate-[scroll-marquee_35s_linear_infinite] group-hover:[animation-play-state:paused]">
        {/* Set 1 */}
        <div className="flex items-center gap-6 pr-6">
          {quotes.map((item, idx) => {
            const Icon = item.icon;
            return (
              <span key={`q1-${idx}`} className="inline-flex items-center gap-6">
                <span className="inline-flex items-center gap-2 text-xs md:text-sm font-light text-gray-300 tracking-wider">
                  <Icon className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  <span>{item.text}</span>
                </span>
                <span className="text-red-700/60 text-sm select-none">&bull;</span>
              </span>
            );
          })}
        </div>

        {/* Set 2 (Duplicate for seamless continuous loop) */}
        <div className="flex items-center gap-6 pr-6" aria-hidden="true">
          {quotes.map((item, idx) => {
            const Icon = item.icon;
            return (
              <span key={`q2-${idx}`} className="inline-flex items-center gap-6">
                <span className="inline-flex items-center gap-2 text-xs md:text-sm font-light text-gray-300 tracking-wider">
                  <Icon className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  <span>{item.text}</span>
                </span>
                <span className="text-red-700/60 text-sm select-none">&bull;</span>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
