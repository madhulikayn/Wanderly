import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Compass, Bookmark, MapPin, Sparkles, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Explore', path: '/explore', icon: Compass },
    { label: 'Saved', path: '/saved', icon: Bookmark },
    { label: 'My Trips', path: '/trips', icon: MapPin },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 glass-panel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 flex items-center justify-center shadow-lg shadow-emerald-950/50 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Compass className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white font-heading">
                Wanderly<span className="text-emerald-400">.</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-medium">
                Travel Discovery
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/60">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950 font-semibold shadow-md shadow-emerald-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`
              }
            >
              Home
            </NavLink>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-emerald-500 text-slate-950 font-semibold shadow-md shadow-emerald-500/20'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Quick CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white text-sm font-medium border border-slate-700/60 transition-all duration-200"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Plan a Trip</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3">
          <NavLink
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-xl text-base font-medium ${
                isActive ? 'bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20' : 'text-slate-300'
              }`
            }
          >
            Home
          </NavLink>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium ${
                    isActive ? 'bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20' : 'text-slate-300'
                  }`
                }
              >
                <Icon className="w-5 h-5 text-emerald-400" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      )}
    </header>
  );
};
