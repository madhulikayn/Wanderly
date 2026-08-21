import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Compass, Sparkles, MapPin } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const HeroSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/explore');
    }
  };

  const handleQuickPillClick = (query: string) => {
    navigate(`/explore?q=${encodeURIComponent(query)}`);
  };

  return (
    <section className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl min-h-[540px] flex items-center justify-center p-6 sm:p-12 lg:p-16">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2000&q=85"
          alt="Cinematic Travel Landscape"
          className="w-full h-full object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/50" />
        <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]" />
      </div>

      {/* Hero Content Wrapper */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">

        <div className="inline-flex items-center justify-center">
          <Badge variant="emerald" className="px-4 py-1.5 text-xs uppercase tracking-widest font-semibold shadow-xl backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Luxury & Adventure Travel</span>
          </Badge>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight font-heading leading-tight">
            Find places worth <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300">
              getting lost in.
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed font-normal">
            Explore handpicked coastal sanctuaries, alpine summits, and cultural capitals tailored for unforgettable journeys.
          </p>
        </div>

        {/* Interactive Search Bar Form */}
        <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto">
          <div className="glass-panel p-2 rounded-2xl sm:rounded-full border border-slate-700/80 shadow-2xl flex flex-col sm:flex-row items-center gap-2 focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-500/30 transition-all duration-300">
            <div className="flex items-center gap-3 pl-4 pr-2 py-2 w-full">
              <Search className="w-5 h-5 text-emerald-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Where to next? Try 'Santorini', 'Japan', 'Mountains'..."
                className="w-full bg-transparent text-white placeholder-slate-400 text-sm focus:outline-none"
                aria-label="Search destinations"
              />
            </div>

            <Button type="submit" variant="primary" size="md" className="w-full sm:w-auto shrink-0 font-semibold px-6 py-3">
              <Compass className="w-4 h-4" />
              <span>Explore Now</span>
            </Button>
          </div>
        </form>

        {/* Quick Search Tag Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400 pt-2">
          <span className="flex items-center gap-1 text-slate-400 font-medium">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Popular searches:
          </span>
          {['Santorini', 'Kyoto', 'Swiss Alps', 'Amalfi Coast', 'Banff'].map((item) => (
            <button
              key={item}
              onClick={() => handleQuickPillClick(item)}
              className="px-3 py-1 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-emerald-400 border border-slate-800 transition-colors focus:outline-none focus:ring-1 focus:ring-emerald-400"
            >
              {item}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
