import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
        <Compass className="w-10 h-10 animate-pulse" />
      </div>
      <h1 className="text-4xl font-extrabold text-white font-heading">404 — Page Not Found</h1>
      <p className="text-slate-400 max-w-md text-sm leading-relaxed">
        It looks like you've wandered off the beaten path. The destination you are searching for does not exist or has moved.
      </p>
      <div className="pt-2">
        <Link to="/">
          <Button variant="primary" size="md">
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};
