import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Heart, Globe, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-900 text-slate-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Compass className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="text-xl font-bold text-white font-heading">
                Wanderly<span className="text-emerald-400">.</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Discover curated luxury destinations, immersive travel guides, and effortless trip planning crafted for the modern traveler.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500 pt-2">
              <Globe className="w-4 h-4 text-emerald-500" />
              <span>Global Travel Discovery Platform</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200 font-heading">Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-emerald-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/explore" className="hover:text-emerald-400 transition-colors">Explore Destinations</Link>
              </li>
              <li>
                <Link to="/saved" className="hover:text-emerald-400 transition-colors">Saved Bucket List</Link>
              </li>
              <li>
                <Link to="/trips" className="hover:text-emerald-400 transition-colors">My Itineraries</Link>
              </li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200 font-heading">Categories</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-1 group cursor-pointer hover:text-emerald-400 transition-colors">
                <span>Beach & Coast</span>
                <ArrowUpRight className="w-3 h-3 text-slate-600 group-hover:text-emerald-400" />
              </li>
              <li className="flex items-center gap-1 group cursor-pointer hover:text-emerald-400 transition-colors">
                <span>Mountain & Hiking</span>
                <ArrowUpRight className="w-3 h-3 text-slate-600 group-hover:text-emerald-400" />
              </li>
              <li className="flex items-center gap-1 group cursor-pointer hover:text-emerald-400 transition-colors">
                <span>Cultural & Heritage</span>
                <ArrowUpRight className="w-3 h-3 text-slate-600 group-hover:text-emerald-400" />
              </li>
              <li className="flex items-center gap-1 group cursor-pointer hover:text-emerald-400 transition-colors">
                <span>Luxury Retreat</span>
                <ArrowUpRight className="w-3 h-3 text-slate-600 group-hover:text-emerald-400" />
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Wanderly Inc. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" />
            <span>for curious wanderers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
