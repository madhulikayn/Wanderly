import React, { useState } from 'react';
import { AccessibleModal } from './AccessibleModal';
import { AccessibleTabs, TabItem } from './AccessibleTabs';
import { AccessibleDisclosure } from './AccessibleDisclosure';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

/**
 * Playground Component
 *
 * Demo environment for testing W3C WAI-ARIA accessible components:
 * 1. AccessibleModal Dialog
 * 2. AccessibleTabs Interface
 * 3. AccessibleDisclosure Component
 */
export const Playground: React.FC = () => {
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [lastAction, setLastAction] = useState<string>('None');

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setLastAction('Modal Opened from trigger button');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setLastAction('Modal Closed - Focus returned to trigger button');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLastAction(
      `Form Submitted: ${formData.name || 'Anonymous'} (${formData.email || 'No email'})`
    );
    setIsModalOpen(false);
  };

  // Sample tab items for the AccessibleTabs demo
  const sampleTabs: TabItem[] = [
    {
      id: 'overview',
      label: 'Overview',
      content: (
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-slate-100">Kyoto, Japan — Cultural Capital</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Kyoto is renowned for its thousands of classical Buddhist temples, gardens, imperial
            palaces, Shinto shrines, and traditional wooden houses. It represents the heart of
            traditional Japanese culture.
          </p>
          <div className="flex items-center gap-2 pt-2">
            <span className="px-2.5 py-1 text-xs rounded-md bg-emerald-950/80 text-emerald-400 border border-emerald-800/50 font-medium">
              Best Time: March – May & October – November
            </span>
          </div>
        </div>
      ),
    },
    {
      id: 'itinerary',
      label: 'Itinerary',
      content: (
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-slate-100">Suggested 3-Day Travel Plan</h3>
          <ol className="space-y-2 text-sm text-slate-300 list-decimal list-inside">
            <li>
              <strong className="text-slate-100">Day 1:</strong> Fushimi Inari Shrine & Southern Higashiyama Temple Walk
            </li>
            <li>
              <strong className="text-slate-100">Day 2:</strong> Arashiyama Bamboo Grove & Kinkaku-ji (Golden Pavilion)
            </li>
            <li>
              <strong className="text-slate-100">Day 3:</strong> Gion Historic District & Nishiki Market Food Tour
            </li>
          </ol>
        </div>
      ),
    },
    {
      id: 'tips',
      label: 'Travel Tips',
      content: (
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-slate-100">Essential Kyoto Travel Advice</h3>
          <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">
            <li>Get a Kansai One Pass or IC Card (Suica/Pasmo) for seamless train and bus travel.</li>
            <li>Visit popular shrines early in the morning (around 7:00 AM) to avoid large crowds.</li>
            <li>Respect local etiquette in Gion when encountering Geiko and Maiko.</li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 flex flex-col items-center font-sans">
      <div className="max-w-3xl w-full space-y-8">
        {/* Header */}
        <header className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-8 shadow-xl">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2.5 py-1 rounded-full mb-2">
            Accessibility Playground
          </span>
          <h1 className="text-3xl font-extrabold text-slate-50 tracking-tight">
            Accessible Components
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Interactive demonstration of W3C WAI-ARIA compliant accessible UI components.
          </p>
        </header>

        {/* Demo 1: Accessible Modal Dialog */}
        <section className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-8 shadow-xl space-y-6">
          <div>
            <span className="text-xs font-mono uppercase text-emerald-400 tracking-wider">
              Component 01
            </span>
            <h2 className="text-2xl font-bold text-slate-50 mt-1">Accessible Modal Dialog</h2>
            <p className="text-xs text-slate-400 mt-1">
              Supports focus trapping, Escape key closing, and focus restoration to the trigger.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={handleOpenModal}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium shadow-lg shadow-emerald-950/40 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200"
            >
              Open Modal
            </button>

            <button
              type="button"
              onClick={() => setLastAction('Outside button 1 clicked')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium focus:outline-none focus:ring-2 focus:ring-slate-500 transition-colors text-sm"
            >
              Outside Control 1
            </button>

            <button
              type="button"
              onClick={() => setLastAction('Outside button 2 clicked')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium focus:outline-none focus:ring-2 focus:ring-slate-500 transition-colors text-sm"
            >
              Outside Control 2
            </button>
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Last Modal Action:</span>
            <span className="font-mono text-emerald-400 bg-slate-950 px-3 py-1 rounded-md border border-slate-800">
              {lastAction}
            </span>
          </div>
        </section>

        {/* Demo 2: Accessible Tabs Interface */}
        <section className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-8 shadow-xl space-y-6">
          <div>
            <span className="text-xs font-mono uppercase text-emerald-400 tracking-wider">
              Component 02
            </span>
            <h2 className="text-2xl font-bold text-slate-50 mt-1">Accessible Tabs</h2>
            <p className="text-xs text-slate-400 mt-1 mb-4">
              Use <kbd className="bg-slate-800 text-slate-200 px-1 rounded border border-slate-700 font-mono">ArrowLeft</kbd> and <kbd className="bg-slate-800 text-slate-200 px-1 rounded border border-slate-700 font-mono">ArrowRight</kbd> to navigate tabs with automatic activation and roving tabIndex.
            </p>

            {/* AccessibleTabs Implementation */}
            <AccessibleTabs items={sampleTabs} label="Destination Information" />
          </div>
        </section>

        {/* Demo 3: Accessible Disclosure Component */}
        <section className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-8 shadow-xl space-y-6">
          <div>
            <span className="text-xs font-mono uppercase text-emerald-400 tracking-wider">
              Component 03
            </span>
            <h2 className="text-2xl font-bold text-slate-50 mt-1">Accessible Disclosure</h2>
            <p className="text-xs text-slate-400 mt-1 mb-4">
              Expandable and collapsible sections using semantic buttons, <code className="text-emerald-400 font-mono bg-slate-950 px-1 py-0.5 rounded border border-slate-800">aria-expanded</code>, and <code className="text-emerald-400 font-mono bg-slate-950 px-1 py-0.5 rounded border border-slate-800">aria-controls</code> attributes.
            </p>

            <div className="space-y-4">
              {/* Disclosure 1: Packing Tips */}
              <AccessibleDisclosure title="Packing Tips" defaultExpanded={true}>
                <ul className="space-y-2 list-disc list-inside text-slate-300">
                  <li>Pack lightweight, layerable clothing suitable for variable microclimates.</li>
                  <li>Carry a universal power adapter and portable power bank for long transit days.</li>
                  <li>Keep essential medications and important travel documents in your personal carry-on bag.</li>
                  <li>Include a compact waterproof jacket and comfortable walking shoes for city tours.</li>
                </ul>
              </AccessibleDisclosure>

              {/* Disclosure 2: Best Time to Visit */}
              <AccessibleDisclosure title="Best Time to Visit">
                <p className="mb-2">
                  The ideal times for travel depend heavily on your preferred seasonal experiences:
                </p>
                <ul className="space-y-2 list-disc list-inside text-slate-300">
                  <li>
                    <strong className="text-slate-100">Spring (March to May):</strong> Mild temperatures, blooming flowers, and bustling outdoor festivals.
                  </li>
                  <li>
                    <strong className="text-slate-100">Autumn (September to November):</strong> Crisp clear skies, comfortable hiking weather, and vibrant foliage.
                  </li>
                </ul>
              </AccessibleDisclosure>

              {/* Disclosure 3: Safety Tips */}
              <AccessibleDisclosure title="Safety Tips">
                <ul className="space-y-2 list-disc list-inside text-slate-300">
                  <li>Maintain digital and physical copies of your passport, travel insurance, and visas.</li>
                  <li>Register your trip details with your national embassy or consulate program.</li>
                  <li>Use secure hotel safes for high-value items and avoid displaying expensive electronics in crowded areas.</li>
                  <li>Keep emergency contact numbers saved offline on your phone.</li>
                </ul>
              </AccessibleDisclosure>
            </div>
          </div>
        </section>

        {/* Section: shadcn/ui Examples */}
        <section className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-8 shadow-xl space-y-6">
          <div>
            <span className="text-xs font-mono uppercase text-sky-400 tracking-wider">
              Library Components
            </span>
            <h2 className="text-2xl font-bold text-slate-50 mt-1">shadcn/ui Examples</h2>
            <p className="text-xs text-slate-400 mt-1 mb-6">
              Demonstration of standard shadcn/ui Dialog and Tabs components built on Radix UI primitives.
            </p>

            <div className="space-y-8">
              {/* shadcn Dialog Demo */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-200">shadcn/ui Dialog</h3>
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-colors"
                    >
                      Open shadcn Dialog
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>shadcn/ui Dialog Example</DialogTitle>
                      <DialogDescription>
                        This dialog is rendered using shadcn/ui and Radix UI Dialog primitives.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-2 text-sm text-slate-300">
                      <p>
                        Radix UI automatically handles focus trapping, scroll locking, Escape key closing, and focus restoration to the trigger element when closed.
                      </p>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <button
                          type="button"
                          className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-500"
                        >
                          Close
                        </button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              {/* shadcn Tabs Demo */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-200">shadcn/ui Tabs</h3>
                <Tabs defaultValue="account" className="w-full">
                  <TabsList>
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="preferences">Preferences</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  </TabsList>
                  <TabsContent value="account">
                    <p className="text-sm text-slate-300">
                      Manage your travel account preferences, security settings, and profile details.
                    </p>
                  </TabsContent>
                  <TabsContent value="preferences">
                    <p className="text-sm text-slate-300">
                      Customize destination recommendations, language, currency, and travel alerts.
                    </p>
                  </TabsContent>
                  <TabsContent value="notifications">
                    <p className="text-sm text-slate-300">
                      Configure email updates, trip status alerts, and price change notifications.
                    </p>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* AccessibleModal Instance */}
      <AccessibleModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Edit Traveler Profile"
        description="Update your personal details below. Press Tab to cycle through focusable elements."
      >
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div>
            <label htmlFor="full-name" className="block text-xs font-semibold text-slate-300 mb-1">
              Full Name
            </label>
            <input
              id="full-name"
              type="text"
              placeholder="e.g., Alex Johnson"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-slate-500"
            />
          </div>

          <div>
            <label htmlFor="email-address" className="block text-xs font-semibold text-slate-300 mb-1">
              Email Address
            </label>
            <input
              id="email-address"
              type="email"
              placeholder="alex@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-slate-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-colors"
            >
              Save Profile
            </button>
          </div>
        </form>
      </AccessibleModal>
    </div>
  );
};

export default Playground;
