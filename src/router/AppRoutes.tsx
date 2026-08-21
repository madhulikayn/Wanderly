import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '../components/common/Layout';
import { HomePage } from '../pages/HomePage';
import { ExplorePage } from '../pages/ExplorePage';
import { DestinationDetailPage } from '../pages/DestinationDetailPage';
import { SavedPage } from '../pages/SavedPage';
import { TripsPage } from '../pages/TripsPage';
import { NotFoundPage } from '../pages/NotFoundPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="explore" element={<ExplorePage />} />
        <Route path="destination/:id" element={<DestinationDetailPage />} />
        <Route path="saved" element={<SavedPage />} />
        <Route path="trips" element={<TripsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
