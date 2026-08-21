import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, Mountain, Sun, Trees, Landmark, Sparkles, UtensilsCrossed } from 'lucide-react';
import { Badge } from '../ui/Badge';

interface CategoryItem {
  id: string;
  name: string;
  categoryFilter: string;
  description: string;
  icon: React.ElementType;
  image: string;
}

const TRAVEL_CATEGORIES: CategoryItem[] = [
  {
    id: 'cat-adventure',
    name: 'Adventure',
    categoryFilter: 'Adventure & Wildlife',
    description: 'Rugged trails & glacier peaks',
    icon: Mountain,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cat-beach',
    name: 'Beach & Coast',
    categoryFilter: 'Beach & Coast',
    description: 'Azure waters & volcanic sands',
    icon: Sun,
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cat-nature',
    name: 'Nature & Wildlife',
    categoryFilter: 'Mountain & Hiking',
    description: 'Pristine alpine forest reserves',
    icon: Trees,
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cat-culture',
    name: 'Culture & Heritage',
    categoryFilter: 'Cultural & Heritage',
    description: 'Ancient shrines & classical arts',
    icon: Landmark,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cat-luxury',
    name: 'Luxury Retreats',
    categoryFilter: 'Luxury Retreat',
    description: 'Cliffside villas & wellness havens',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cat-food',
    name: 'Food & Wine',
    categoryFilter: 'Cultural & Heritage',
    description: 'Vineyard tastings & Michelin dining',
    icon: UtensilsCrossed,
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80'
  }
];

export const CategoriesSection: React.FC = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryFilter: string) => {
    navigate(`/explore?category=${encodeURIComponent(categoryFilter)}`);
  };

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <Badge variant="emerald" className="px-3 py-1 text-xs uppercase tracking-wider font-semibold">
          <Compass className="w-3.5 h-3.5" />
          <span>Curated Travel Styles</span>
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
          Explore by Travel Style
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl">
          Whether you crave high-altitude adrenaline, serene ocean breezes, or deep cultural immersion.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {TRAVEL_CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.categoryFilter)}
              className="group relative h-48 rounded-2xl overflow-hidden border border-slate-800 text-left focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-300 hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-950/30"
            >
              {/* Image Background */}
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/20 group-hover:via-slate-950/60 transition-colors" />

              {/* Icon & Details */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                <div className="w-10 h-10 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-700/60 flex items-center justify-center text-emerald-400 group-hover:scale-105 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white font-heading group-hover:text-emerald-300 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-300 font-normal">
                    {cat.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
