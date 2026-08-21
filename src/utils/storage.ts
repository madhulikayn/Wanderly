import { MOCK_TRIPS } from '../data/trips';

const SAVED_DESTINATIONS_KEY = 'wanderly_saved_destinations';
const USER_TRIPS_KEY = 'wanderly_user_trips';

export const getSavedDestinationIds = (): string[] => {
  try {
    const data = localStorage.getItem(SAVED_DESTINATIONS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Failed to read saved destinations from localStorage:', err);
    return [];
  }
};

export const saveDestinationId = (id: string): string[] => {
  try {
    const current = getSavedDestinationIds();
    if (!current.includes(id)) {
      const updated = [...current, id];
      localStorage.setItem(SAVED_DESTINATIONS_KEY, JSON.stringify(updated));
      return updated;
    }
    return current;
  } catch (err) {
    console.error('Failed to save destination:', err);
    return [];
  }
};

export const removeSavedDestinationId = (id: string): string[] => {
  try {
    const current = getSavedDestinationIds();
    const updated = current.filter(item => item !== id);
    localStorage.setItem(SAVED_DESTINATIONS_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to remove saved destination:', err);
    return [];
  }
};

export const getSavedUserTrips = <T>(): T[] => {
  try {
    const data = localStorage.getItem(USER_TRIPS_KEY);
    if (data === null) {
      localStorage.setItem(USER_TRIPS_KEY, JSON.stringify(MOCK_TRIPS));
      return MOCK_TRIPS as unknown as T[];
    }
    return JSON.parse(data);
  } catch (err) {
    console.error('Failed to read trips from localStorage:', err);
    return MOCK_TRIPS as unknown as T[];
  }
};

export const saveUserTrip = <T extends { id: string }>(trip: T): T[] => {
  try {
    const current = getSavedUserTrips<T>();
    const existingIndex = current.findIndex(t => t.id === trip.id);
    let updated: T[];
    if (existingIndex >= 0) {
      updated = [...current];
      updated[existingIndex] = trip;
    } else {
      updated = [...current, trip];
    }
    localStorage.setItem(USER_TRIPS_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to save trip:', err);
    return [];
  }
};

export const removeUserTrip = <T extends { id: string }>(id: string): T[] => {
  try {
    const current = getSavedUserTrips<T>();
    const updated = current.filter(t => t.id !== id);
    localStorage.setItem(USER_TRIPS_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to remove trip:', err);
    return [];
  }
};

export const isDestinationSaved = (id: string): boolean => {
  return getSavedDestinationIds().includes(id);
};



