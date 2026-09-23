import React, { useState } from 'react';
import { Sparkles, Calendar, Users, Wallet, Compass, Sun, Sunset, Moon, Lightbulb, Check, AlertCircle, RefreshCw, BookmarkPlus } from 'lucide-react';
import { PlanTripRequest, TripItinerary } from '../types/planner';
import { generateAiItinerary } from '../services/aiPlannerService';
import { saveAiItineraryToMyTrips } from '../utils/tripAdapter';
import { useNavigate } from 'react-router-dom';

export const PlannerPage: React.FC = () => {
  const navigate = useNavigate();

  // Form state
  const [destination, setDestination] = useState('Goa');
  const [days, setDays] = useState<number | ''>(4);
  const [travellers, setTravellers] = useState<number | ''>(2);
  const [budget, setBudget] = useState<number | ''>(20000);
  const [interests, setInterests] = useState('Beaches, cafes, adventure');
  const [travelStyle, setTravelStyle] = useState('Relaxed');

  // UI state
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [itinerary, setItinerary] = useState<TripItinerary | null>(null);
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!destination.trim()) {
      errors.destination = 'Destination is required.';
    }

    if (days === '' || isNaN(Number(days)) || Number(days) <= 0) {
      errors.days = 'Number of days must be a positive number (min 1).';
    } else if (Number(days) > 30) {
      errors.days = 'Maximum itinerary length is 30 days.';
    }

    if (travellers === '' || isNaN(Number(travellers)) || Number(travellers) <= 0) {
      errors.travellers = 'Number of travellers must be at least 1.';
    }

    if (budget === '' || isNaN(Number(budget)) || Number(budget) <= 0) {
      errors.budget = 'Budget must be a valid positive number.';
    }

    if (!interests.trim()) {
      errors.interests = 'Please provide at least one interest or preference.';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    setIsSaved(false);

    if (!validateForm() || isLoading) {
      return;
    }

    setIsLoading(true);

    const requestPayload: PlanTripRequest = {
      destination: destination.trim(),
      days: Number(days),
      travellers: Number(travellers),
      budget: Number(budget),
      interests: interests.trim(),
      travelStyle,
    };

    const response = await generateAiItinerary(requestPayload);

    setIsLoading(false);

    if (response.success && response.data) {
      setItinerary(response.data);
      setActiveDayIndex(0);
    } else {
      setApiError(response.error || "Sorry, we couldn't generate your itinerary right now. Please try again.");
    }
  };

  const handleSaveToMyTrips = () => {
    if (!itinerary) return;
    saveAiItineraryToMyTrips(itinerary, Number(travellers) || 1);
    setIsSaved(true);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>AI-Powered Itinerary Generator</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-heading">
          Plan Your Trip with AI
        </h1>
        <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
          Tell us your destination, budget, and travel vibe. Wanderly AI will build a personalized, realistic day-by-day travel plan with activities and estimated costs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form Column */}
        <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 font-heading">
              <Compass className="w-5 h-5 text-emerald-400" />
              <span>Trip Details</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">Fill in your preferences to generate an itinerary.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            
            {/* Destination Input */}
            <div>
              <label htmlFor="planner-destination" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Destination <span className="text-emerald-400">*</span>
              </label>
              <input
                id="planner-destination"
                type="text"
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                  if (validationErrors.destination) {
                    setValidationErrors((prev) => ({ ...prev, destination: '' }));
                  }
                }}
                placeholder="e.g., Goa, Tokyo, Paris"
                className={`w-full px-4 py-3 bg-slate-950/80 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                  validationErrors.destination ? 'border-red-500 focus:ring-red-500' : 'border-slate-800'
                }`}
                aria-required="true"
                aria-invalid={Boolean(validationErrors.destination)}
                aria-describedby={validationErrors.destination ? 'destination-error' : undefined}
              />
              {validationErrors.destination && (
                <p id="destination-error" className="text-xs text-red-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{validationErrors.destination}</span>
                </p>
              )}
            </div>

            {/* Days & Travellers Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="planner-days" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Days <span className="text-emerald-400">*</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500 pointer-events-none" />
                  <input
                    id="planner-days"
                    type="number"
                    min={1}
                    max={30}
                    value={days}
                    onChange={(e) => {
                      const val = e.target.value === '' ? '' : parseInt(e.target.value, 10);
                      setDays(val);
                      if (validationErrors.days) {
                        setValidationErrors((prev) => ({ ...prev, days: '' }));
                      }
                    }}
                    className={`w-full pl-10 pr-4 py-3 bg-slate-950/80 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                      validationErrors.days ? 'border-red-500 focus:ring-red-500' : 'border-slate-800'
                    }`}
                    aria-required="true"
                    aria-invalid={Boolean(validationErrors.days)}
                    aria-describedby={validationErrors.days ? 'days-error' : undefined}
                  />
                </div>
                {validationErrors.days && (
                  <p id="days-error" className="text-xs text-red-400 mt-1">
                    {validationErrors.days}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="planner-travellers" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Travellers <span className="text-emerald-400">*</span>
                </label>
                <div className="relative">
                  <Users className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500 pointer-events-none" />
                  <input
                    id="planner-travellers"
                    type="number"
                    min={1}
                    max={20}
                    value={travellers}
                    onChange={(e) => {
                      const val = e.target.value === '' ? '' : parseInt(e.target.value, 10);
                      setTravellers(val);
                      if (validationErrors.travellers) {
                        setValidationErrors((prev) => ({ ...prev, travellers: '' }));
                      }
                    }}
                    className={`w-full pl-10 pr-4 py-3 bg-slate-950/80 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                      validationErrors.travellers ? 'border-red-500 focus:ring-red-500' : 'border-slate-800'
                    }`}
                    aria-required="true"
                    aria-invalid={Boolean(validationErrors.travellers)}
                    aria-describedby={validationErrors.travellers ? 'travellers-error' : undefined}
                  />
                </div>
                {validationErrors.travellers && (
                  <p id="travellers-error" className="text-xs text-red-400 mt-1">
                    {validationErrors.travellers}
                  </p>
                )}
              </div>
            </div>

            {/* Budget & Style Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="planner-budget" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Budget (Est. Total) <span className="text-emerald-400">*</span>
                </label>
                <div className="relative">
                  <Wallet className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500 pointer-events-none" />
                  <input
                    id="planner-budget"
                    type="number"
                    min={1}
                    value={budget}
                    onChange={(e) => {
                      const val = e.target.value === '' ? '' : parseFloat(e.target.value);
                      setBudget(val);
                      if (validationErrors.budget) {
                        setValidationErrors((prev) => ({ ...prev, budget: '' }));
                      }
                    }}
                    placeholder="20000"
                    className={`w-full pl-10 pr-4 py-3 bg-slate-950/80 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                      validationErrors.budget ? 'border-red-500 focus:ring-red-500' : 'border-slate-800'
                    }`}
                    aria-required="true"
                    aria-invalid={Boolean(validationErrors.budget)}
                    aria-describedby={validationErrors.budget ? 'budget-error' : undefined}
                  />
                </div>
                {validationErrors.budget && (
                  <p id="budget-error" className="text-xs text-red-400 mt-1">
                    {validationErrors.budget}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="planner-style" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Travel Style
                </label>
                <select
                  id="planner-style"
                  value={travelStyle}
                  onChange={(e) => setTravelStyle(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                >
                  <option value="Relaxed">Relaxed</option>
                  <option value="Balanced">Balanced</option>
                  <option value="Fast-Paced">Fast-Paced</option>
                  <option value="Luxury">Luxury</option>
                  <option value="Budget-Friendly">Budget-Friendly</option>
                  <option value="Cultural">Cultural & Heritage</option>
                </select>
              </div>
            </div>

            {/* Interests Input */}
            <div>
              <label htmlFor="planner-interests" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Interests & Activities <span className="text-emerald-400">*</span>
              </label>
              <textarea
                id="planner-interests"
                rows={3}
                value={interests}
                onChange={(e) => {
                  setInterests(e.target.value);
                  if (validationErrors.interests) {
                    setValidationErrors((prev) => ({ ...prev, interests: '' }));
                  }
                }}
                placeholder="e.g., Beaches, cafes, water sports, local street food"
                className={`w-full px-4 py-3 bg-slate-950/80 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                  validationErrors.interests ? 'border-red-500 focus:ring-red-500' : 'border-slate-800'
                }`}
                aria-required="true"
                aria-invalid={Boolean(validationErrors.interests)}
                aria-describedby={validationErrors.interests ? 'interests-error' : undefined}
              />
              {validationErrors.interests && (
                <p id="interests-error" className="text-xs text-red-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{validationErrors.interests}</span>
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-base shadow-lg shadow-emerald-500/25 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin text-slate-950" />
                  <span>Generating Itinerary...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-slate-950" />
                  <span>Generate Itinerary</span>
                </>
              )}
            </button>
          </form>

          {/* Disclaimer */}
          <p className="text-[11px] text-slate-500 text-center leading-relaxed">
            Note: All itineraries, costs, and recommendations are estimates generated by AI to help you plan. Please verify details before booking.
          </p>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Loading View */}
          {isLoading && (
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-12 text-center space-y-6 backdrop-blur-xl animate-pulse">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                <Sparkles className="w-8 h-8 animate-spin" />
              </div>
              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="text-xl font-bold text-white font-heading">Crafting your itinerary for {destination}...</h3>
                <p className="text-sm text-slate-400">
                  Claude is analyzing local highlights, activity timings, and budget distribution for your {days}-day trip.
                </p>
              </div>
            </div>
          )}

          {/* API Error Banner */}
          {apiError && !isLoading && (
            <div role="alert" className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-red-200 space-y-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="font-semibold text-red-400">Generation Unsuccessful</h3>
                  <p className="text-sm text-slate-300">{apiError}</p>
                </div>
              </div>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 rounded-xl text-xs font-medium text-red-300 transition-colors flex items-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Try Again</span>
              </button>
            </div>
          )}

          {/* Empty State */}
          {!itinerary && !isLoading && !apiError && (
            <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-10 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-center mx-auto text-slate-400">
                <Compass className="w-7 h-7 text-emerald-400" />
              </div>
              <div className="space-y-1 max-w-md mx-auto">
                <h3 className="text-lg font-semibold text-white font-heading">Your custom itinerary will appear here</h3>
                <p className="text-xs text-slate-400">
                  Fill out your preferences on the left and click &quot;Generate Itinerary&quot; to view your structured day-by-day plan.
                </p>
              </div>
            </div>
          )}

          {/* Generated Itinerary Display */}
          {itinerary && !isLoading && (
            <div className="space-y-6" aria-live="polite">
              
              {/* Summary Header Card */}
              <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">Generated Itinerary</span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading mt-1">
                      {itinerary.destination}
                    </h2>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleSaveToMyTrips}
                      disabled={isSaved}
                      className={`px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all duration-200 flex items-center gap-2 ${
                        isSaved
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 cursor-default'
                          : 'bg-emerald-500 text-slate-950 border-emerald-400 hover:bg-emerald-400 font-bold'
                      }`}
                    >
                      {isSaved ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span>Saved to My Trips</span>
                        </>
                      ) : (
                        <>
                          <BookmarkPlus className="w-4 h-4" />
                          <span>Save to My Trips</span>
                        </>
                      )}
                    </button>
                    {isSaved && (
                      <button
                        onClick={() => navigate('/trips')}
                        className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 transition-colors"
                      >
                        View My Trips
                      </button>
                    )}
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-4">
                  {itinerary.summary}
                </p>

                {/* Stat Pills */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                    <span className="text-[10px] uppercase font-semibold text-slate-400 block">Total Est. Cost</span>
                    <span className="text-base font-bold text-emerald-400 font-heading">
                      ₹{itinerary.totalEstimatedCost.toLocaleString()}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                    <span className="text-[10px] uppercase font-semibold text-slate-400 block">Duration</span>
                    <span className="text-base font-bold text-white font-heading">
                      {itinerary.days.length} Day(s)
                    </span>
                  </div>

                  <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 col-span-2 sm:col-span-1">
                    <span className="text-[10px] uppercase font-semibold text-slate-400 block">Travellers</span>
                    <span className="text-base font-bold text-white font-heading">
                      {travellers} Person(s)
                    </span>
                  </div>
                </div>
              </div>

              {/* Day Selector Navigation */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" role="group" aria-label="Select itinerary day">
                {itinerary.days.map((dayItem, index) => (
                  <button
                    key={dayItem.day}
                    onClick={() => setActiveDayIndex(index)}
                    aria-pressed={activeDayIndex === index}
                    className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all duration-200 ${
                      activeDayIndex === index
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20'
                        : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    Day {dayItem.day}: {dayItem.title}
                  </button>
                ))}
              </div>

              {/* Selected Day Details */}
              {itinerary.days[activeDayIndex] && (
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 backdrop-blur-xl">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                        Day {itinerary.days[activeDayIndex].day}
                      </span>
                      <h3 className="text-xl font-bold text-white font-heading mt-0.5">
                        {itinerary.days[activeDayIndex].title}
                      </h3>
                    </div>
                    <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-800 text-emerald-300 border border-slate-700">
                      Est. ₹{itinerary.days[activeDayIndex].estimatedCost.toLocaleString()}
                    </span>
                  </div>

                  {/* Activities Breakdown */}
                  <div className="space-y-4">
                    
                    {/* Morning */}
                    {itinerary.days[activeDayIndex].morning && (
                      <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
                        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                          <Sun className="w-4 h-4" />
                          <span>Morning</span>
                        </div>
                        <p className="text-sm text-slate-300 leading-relaxed">
                          {itinerary.days[activeDayIndex].morning}
                        </p>
                      </div>
                    )}

                    {/* Afternoon */}
                    {itinerary.days[activeDayIndex].afternoon && (
                      <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
                        <div className="flex items-center gap-2 text-orange-400 text-xs font-bold uppercase tracking-wider">
                          <Sunset className="w-4 h-4" />
                          <span>Afternoon</span>
                        </div>
                        <p className="text-sm text-slate-300 leading-relaxed">
                          {itinerary.days[activeDayIndex].afternoon}
                        </p>
                      </div>
                    )}

                    {/* Evening */}
                    {itinerary.days[activeDayIndex].evening && (
                      <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
                        <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                          <Moon className="w-4 h-4" />
                          <span>Evening</span>
                        </div>
                        <p className="text-sm text-slate-300 leading-relaxed">
                          {itinerary.days[activeDayIndex].evening}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tips Section */}
              {itinerary.tips && itinerary.tips.length > 0 && (
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2 font-heading">
                    <Lightbulb className="w-5 h-5 text-amber-400" />
                    <span>Travel Tips &amp; Recommendations</span>
                  </h3>
                  <ul className="space-y-3">
                    {itinerary.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-2" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
