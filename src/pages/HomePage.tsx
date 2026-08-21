import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { TrendingSection } from '../components/home/TrendingSection';
import { CategoriesSection } from '../components/home/CategoriesSection';
import { InspirationSection } from '../components/home/InspirationSection';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-20 lg:space-y-28">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Trending Destinations Section */}
      <TrendingSection />

      {/* 3. Explore by Travel Style Categories */}
      <CategoriesSection />

      {/* 4. Inspiration Editorial Showcase */}
      <InspirationSection />
    </div>
  );
};
