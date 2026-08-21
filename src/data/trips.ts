import { Trip } from '../types/trip';
import { MOCK_DESTINATIONS } from './destinations';

export const MOCK_TRIPS: Trip[] = [
  {
    id: 'trip-1',
    destinationId: 'santorini-greece',
    destination: MOCK_DESTINATIONS[0],
    title: 'Santorini Summer Getaway',
    startDate: '2026-09-10',
    endDate: '2026-09-15',
    numberOfDays: 5,
    travelersCount: 2,
    budgetUSD: 1800,
    status: 'planned',
    createdAt: '2026-08-01',
    days: [
      {
        dayNumber: 1,
        title: 'Arrival & Oia Cliffside Exploration',
        activities: [
          { id: 'act-101', timeSlot: 'Afternoon', title: 'Check in at Cliffside Villa in Oia', notes: 'Enjoy welcome local wine' },
          { id: 'act-102', timeSlot: 'Evening', title: 'Sunset watching at Oia Castle ruins' }
        ]
      },
      {
        dayNumber: 2,
        title: 'Volcanic Catamaran & Red Beach',
        activities: [
          { id: 'act-103', timeSlot: 'Morning', title: 'Visit Akrotiri Archaeological Site' },
          { id: 'act-104', timeSlot: 'Afternoon', title: 'Sunset Catamaran Sailing Cruise', costUSD: 140 }
        ]
      }
    ]
  },
  {
    id: 'trip-2',
    destinationId: 'kyoto-japan',
    destination: MOCK_DESTINATIONS[1],
    title: 'Autumn in Kyoto',
    startDate: '2026-11-01',
    endDate: '2026-11-07',
    numberOfDays: 7,
    travelersCount: 1,
    budgetUSD: 2200,
    status: 'planned',
    createdAt: '2026-08-10',
    days: [
      {
        dayNumber: 1,
        title: 'Arashiyama Bamboo & River Walk',
        activities: [
          { id: 'act-201', timeSlot: 'Morning', title: 'Arashiyama Bamboo Grove at 7 AM' },
          { id: 'act-202', timeSlot: 'Afternoon', title: 'Tenryu-ji Temple & Garden walk' }
        ]
      }
    ]
  }
];
