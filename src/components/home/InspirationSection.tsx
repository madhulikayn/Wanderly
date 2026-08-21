import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Quote, CheckCircle2 } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export const InspirationSection: React.FC = () => {
  return (
    <section className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/40 p-8 sm:p-12 lg:p-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Editorial Text Left Column */}
        <div className="lg:col-span-7 space-y-6">
          <Badge variant="emerald" className="px-3.5 py-1.5 text-xs uppercase tracking-widest font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Wanderly Editorial Spotlight</span>
          </Badge>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading leading-tight">
            The Art of Slow Travel in <span className="text-emerald-400">Kyoto’s Sacred Groves</span>.
          </h2>

          <div className="relative pl-6 border-l-2 border-emerald-500/60 py-1">
            <Quote className="w-6 h-6 text-emerald-400/40 absolute -top-3 left-2" />
            <p className="text-slate-200 text-base sm:text-lg italic font-normal leading-relaxed">
              "Beyond the crowded temple gates lies a quiet Kyoto of bamboo whispers, dawn tea ceremonies, and moss gardens untouched by time."
            </p>
            <span className="text-xs text-slate-400 font-medium block mt-2">— Elena Rostova, Senior Travel Curator</span>
          </div>

          <div className="space-y-3 pt-2">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300 font-heading">
              Why visit this season:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Early sunrise bamboo walks</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Private Gion tea ceremony</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Seasonal Kaiseki culinary tasting</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Fushimi Inari torii gate trek</span>
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center gap-4">
            <Link to="/destination/kyoto-japan">
              <Button variant="primary" size="md" className="font-semibold px-6 py-3">
                <span>Read Destination Guide</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Visual Right Column */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl h-80 sm:h-96">
            <img
              src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=85"
              alt="Kyoto Sacred Shrine"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800">
              <div className="flex items-center justify-between text-xs">
                <span className="text-emerald-400 font-semibold uppercase tracking-wider">Spotlight Destination</span>
                <span className="text-slate-400">Japan · Kansai</span>
              </div>
              <p className="text-sm font-bold text-white font-heading mt-1">Kyoto Cultural Experience</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
