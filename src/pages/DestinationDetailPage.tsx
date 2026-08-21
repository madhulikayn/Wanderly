import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  MapPin,
  Star,
  Calendar,
  DollarSign,
  Bookmark,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Clock,
  Compass,
  Globe,
  Tag
} from 'lucide-react';
import { MOCK_DESTINATIONS } from '../data/destinations';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { formatCurrency, formatRating } from '../utils/formatters';
import { isDestinationSaved, saveDestinationId, removeSavedDestinationId } from '../utils/storage';

export const DestinationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const destination = MOCK_DESTINATIONS.find((d) => d.id === id);

  const [isSaved, setIsSaved] = useState<boolean>(false);

  useEffect(() => {
    if (destination) {
      setIsSaved(isDestinationSaved(destination.id));
    }
  }, [destination]);

  const handleBookmarkToggle = () => {
    if (!destination) return;
    if (isSaved) {
      removeSavedDestinationId(destination.id);
      setIsSaved(false);
    } else {
      saveDestinationId(destination.id);
      setIsSaved(true);
    }
  };

  // Graceful handling of invalid destination ID
  if (!destination) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center space-y-6 py-12">
        <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400 shadow-xl">
          <Compass className="w-10 h-10" />
        </div>
        <div className="space-y-2 max-w-md">
          <h1 className="text-3xl font-extrabold text-white font-heading">Destination Not Found</h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            The travel destination you are looking for does not exist or may have been moved.
          </p>
        </div>
        <Link to="/explore">
          <Button variant="primary" size="md" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Explore</span>
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Top Back Action */}
      <div className="flex items-center justify-between">
        <Link
          to="/explore"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-400 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Explore</span>
        </Link>

        <Badge variant="emerald" className="hidden sm:inline-flex px-3 py-1 text-xs uppercase tracking-wider font-semibold">
          {destination.category}
        </Badge>
      </div>

      {/* Hero Destination Image & Overlay Header */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800/80 bg-slate-950 shadow-2xl min-h-[440px] sm:min-h-[500px] flex flex-col justify-between p-6 sm:p-10">
        <img
          src={destination.heroImage}
          alt={destination.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/20" />

        {/* Hero Top Overlay */}
        <div className="relative z-10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 flex-wrap">
            <Badge variant="emerald" className="shadow-lg backdrop-blur-md bg-slate-950/80">
              {destination.category}
            </Badge>

            <div className="flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-amber-300 border border-slate-800/80 shadow-lg">
              <Star className="w-3.5 h-3.5 fill-amber-300" />
              <span>{formatRating(destination.rating)}</span>
              <span className="text-slate-400 font-normal">({destination.reviewsCount} reviews)</span>
            </div>
          </div>

          <button
            onClick={handleBookmarkToggle}
            aria-label={isSaved ? `Remove ${destination.title} from saved` : `Save ${destination.title}`}
            className={`p-3 rounded-full backdrop-blur-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
              isSaved
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/30'
                : 'bg-slate-950/70 text-slate-300 hover:text-white hover:bg-slate-900/90 border border-slate-700/60'
            }`}
          >
            <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-slate-950' : ''}`} />
          </button>
        </div>

        {/* Hero Bottom Content */}
        <div className="relative z-10 mt-auto pt-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-emerald-400 text-xs sm:text-sm font-semibold uppercase tracking-wider">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>{destination.location.region}, {destination.location.country}</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white font-heading tracking-tight drop-shadow-md">
              {destination.title}
            </h1>
            <p className="text-slate-200 text-base sm:text-lg italic font-normal leading-relaxed drop-shadow">
              &ldquo;{destination.tagline}&rdquo;
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3 shrink-0">
            <Button
              variant={isSaved ? 'secondary' : 'outline'}
              size="md"
              onClick={handleBookmarkToggle}
              className="bg-slate-950/80 backdrop-blur-md border-slate-700 hover:bg-slate-900 text-white gap-2"
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-emerald-400 text-emerald-400' : 'text-slate-400'}`} />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </Button>

            <Button
              variant="primary"
              size="md"
              onClick={() => navigate('/trips')}
              className="gap-2 shadow-xl shadow-emerald-950/50"
            >
              <Sparkles className="w-4 h-4" />
              <span>Plan a Trip</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Key Information Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-medium uppercase tracking-wider">Best Time to Visit</span>
            <strong className="text-sm font-bold text-white">{destination.bestTimeToVisit}</strong>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-medium uppercase tracking-wider">Est. Daily Budget</span>
            <strong className="text-sm font-bold text-white">{formatCurrency(destination.avgCostPerDayUSD)} / day</strong>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-medium uppercase tracking-wider">Price Level</span>
            <strong className="text-sm font-bold text-white">{destination.priceLevel}</strong>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-medium uppercase tracking-wider">Location</span>
            <strong className="text-sm font-bold text-white">{destination.location.country}</strong>
          </div>
        </div>
      </div>

      {/* Main Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10">
        {/* Left Column: Overview, Highlights & Activities */}
        <div className="lg:col-span-2 space-y-10">
          {/* Overview & Description */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              About {destination.title}
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
              {destination.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {destination.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-lg bg-slate-900 text-slate-300 border border-slate-800 font-medium"
                >
                  <Tag className="w-3 h-3 text-emerald-400" />
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white font-heading flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              Key Highlights
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {destination.highlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 text-slate-200 text-sm leading-relaxed"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="font-medium">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Activities & Experiences */}
          {destination.activities && destination.activities.length > 0 && (
            <div className="space-y-4 pt-2">
              <h3 className="text-xl sm:text-2xl font-bold text-white font-heading flex items-center gap-2">
                <Compass className="w-5 h-5 text-emerald-400" />
                Curated Activities & Experiences
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {destination.activities.map((act) => (
                  <Card key={act.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="emerald" className="text-[11px] px-2 py-0.5">
                          {act.category}
                        </Badge>
                      </div>
                      <h4 className="text-base font-bold text-white font-heading">{act.title}</h4>
                    </div>

                    <div className="flex items-center gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                        <Clock className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{act.duration}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar: Gallery & Trip Quick Box */}
        <div className="space-y-6">
          {/* Gallery Card */}
          {destination.galleryImages && destination.galleryImages.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white font-heading">Gallery Preview</h3>
              <div className="grid grid-cols-1 gap-3">
                {destination.galleryImages.map((imgUrl, i) => (
                  <div key={i} className="h-48 rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-950 group">
                    <img
                      src={imgUrl}
                      alt={`${destination.title} gallery photo ${i + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Booking/Trip Box */}
          <Card hoverEffect={false} className="p-6 space-y-5 bg-gradient-to-b from-slate-900/90 to-slate-950 border-slate-800">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-emerald-400">Plan Your Trip</span>
              <h3 className="text-xl font-bold text-white font-heading">
                Ready to experience {destination.title}?
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Add {destination.title} to your travel planner, configure trip duration, and map out daily activities.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-3">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/trips')}
                className="w-full justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Start Planning Now</span>
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Bottom CTA Banner */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-6 mt-12 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900">
        <div className="space-y-2 text-center md:text-left">
          <Badge variant="emerald" className="mb-1">
            EXPLORE & PLAN
          </Badge>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
            Build your itinerary for {destination.title}
          </h3>
          <p className="text-slate-400 text-sm max-w-xl">
            Save this destination to your bucket list or jump straight into designing your customized daily schedule.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link to="/explore">
            <Button variant="secondary" size="md">
              <span>More Destinations</span>
            </Button>
          </Link>
          <Button variant="primary" size="md" onClick={() => navigate('/trips')}>
            <span>Go to My Trips</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

