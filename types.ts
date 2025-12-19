// Add missing import for React to resolve namespace issues
import React from 'react';

export type Category = 'Nature' | 'Historical' | 'Food' | 'Culture' | 'Religious';

export interface Attraction {
  id: string;
  name: string;
  barangay: string;
  description: string;
  category: Category;
  coordinates: [number, number];
  imageUrl: string;
  rating: number;
}

export interface Barangay {
  id: string;
  name: string;
  history: string;
  population: number;
  featuredAttraction?: string;
}

export interface Event {
  id: string;
  name: string;
  date: string;
  description: string;
  location: string;
  type: 'Festival' | 'Community' | 'Religious';
}

export interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}