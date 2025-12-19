
import { Attraction, Barangay, Event } from './types';

export const MANGATAREM_COORDINATES: [number, number] = [15.7869, 120.2922];

export const MOCK_ATTRACTIONS: Attraction[] = [
  {
    id: '1',
    name: 'Manleluag Spring National Park',
    barangay: 'Malabobo',
    description: 'A protected area known for its natural hot springs and lush forest trails.',
    category: 'Nature',
    coordinates: [15.7058, 120.2825],
    imageUrl: 'https://picsum.photos/seed/spring/800/600',
    rating: 4.8
  },
  {
    id: '2',
    name: 'Mangatarem Town Plaza',
    barangay: 'Poblacion',
    description: 'The heart of the town, featuring historical markers and the beautiful San Raymundo de Peñafort Parish Church.',
    category: 'Historical',
    coordinates: [15.7869, 120.2922],
    imageUrl: 'https://picsum.photos/seed/plaza/800/600',
    rating: 4.5
  },
  {
    id: '3',
    name: 'Pacalat Dam',
    barangay: 'Pacalat',
    description: 'A scenic irrigation dam that offers a peaceful view and cooling breeze.',
    category: 'Nature',
    coordinates: [15.8200, 120.2500],
    imageUrl: 'https://picsum.photos/seed/dam/800/600',
    rating: 4.2
  },
  {
    id: '4',
    name: 'Daang Kalikasan',
    barangay: 'Multiple',
    description: 'The famous scenic road connecting Mangatarem to Santa Cruz, Zambales, offering breathtaking mountain views.',
    category: 'Nature',
    coordinates: [15.7500, 120.2000],
    imageUrl: 'https://picsum.photos/seed/road/800/600',
    rating: 4.9
  }
];

export const MOCK_BARANGAYS: Barangay[] = [
  { id: 'b1', name: 'Poblacion', population: 5000, history: 'The administrative center established during the Spanish period.' },
  { id: 'b2', name: 'Malabobo', population: 2100, history: 'Home to the famous Manleluag springs.' },
  { id: 'b3', name: 'Pacalat', population: 1800, history: 'Known for its agriculture and the Pacalat dam.' },
  { id: 'b4', name: 'Bogtong', population: 1200, history: 'A peaceful upland barangay.' }
];

export const MOCK_EVENTS: Event[] = [
  {
    id: 'e1',
    name: 'Mangatarem Town Fiesta',
    date: '2024-01-23',
    description: 'Annual celebration honoring San Raymundo de Peñafort.',
    location: 'Town Plaza',
    type: 'Religious'
  },
  {
    id: 'e2',
    name: 'Galicayo Festival',
    date: '2024-12-08',
    description: 'A cultural extravaganza showcasing local talents and history.',
    location: 'Civic Center',
    type: 'Festival'
  }
];
