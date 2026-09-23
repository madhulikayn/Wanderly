import { describe, it, expect, beforeEach } from 'vitest';
import {
  getSavedDestinationIds,
  saveDestinationId,
  removeSavedDestinationId,
  isDestinationSaved,
} from '../utils/storage';

describe('Storage Utility - Saved Destinations', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return empty array when no destinations are saved', () => {
    const saved = getSavedDestinationIds();
    expect(saved).toEqual([]);
  });

  it('should save a new destination ID to localStorage', () => {
    const updated = saveDestinationId('dest_goa');
    expect(updated).toContain('dest_goa');
    expect(isDestinationSaved('dest_goa')).toBe(true);
  });

  it('should not add duplicate destination IDs', () => {
    saveDestinationId('dest_paris');
    const updated = saveDestinationId('dest_paris');
    expect(updated).toEqual(['dest_paris']);
  });

  it('should remove saved destination ID from localStorage', () => {
    saveDestinationId('dest_tokyo');
    saveDestinationId('dest_bali');

    const updated = removeSavedDestinationId('dest_tokyo');
    expect(updated).not.toContain('dest_tokyo');
    expect(updated).toContain('dest_bali');
    expect(isDestinationSaved('dest_tokyo')).toBe(false);
    expect(isDestinationSaved('dest_bali')).toBe(true);
  });
});
