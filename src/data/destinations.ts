import { Destination } from '../types/destination';

export const MOCK_DESTINATIONS: Destination[] = [
  {
    id: 'santorini-greece',
    title: 'Santorini',
    tagline: 'Sun-drenched cliffs & iconic azure domes above the Aegean',
    description: 'Santorini is renowned for its dramatic views, stunning sunsets from Oia town, volcanic beaches, and distinctive white-and-blue architecture perched on volcanic cliffs.',
    location: {
      country: 'Greece',
      region: 'Cyclades Islands'
    },
    category: 'Beach & Coast',
    rating: 4.9,
    reviewsCount: 1420,
    priceLevel: '$$$',
    avgCostPerDayUSD: 280,
    bestTimeToVisit: 'May – October',
    heroImage: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true,
    trending: true,
    tags: ['Island', 'Sunsets', 'Luxury', 'Romance', 'Wine'],
    highlights: [
      'Sunset watching from Oia Castle',
      'Wine tasting in volcanic vineyards',
      'Catamaran cruise around the caldera',
      'Red Beach volcanic sands'
    ],
    activities: [
      { id: 'act-1', title: 'Sunset Catamaran Cruise with Dinner', duration: '5 hrs', category: 'Sailing' },
      { id: 'act-2', title: 'Fira to Oia Cliffside Hike', duration: '3 hrs', category: 'Trekking' },
      { id: 'act-3', title: 'Volcanic Wine Tasting Tour', duration: '4 hrs', category: 'Culinary' }
    ]
  },
  {
    id: 'kyoto-japan',
    title: 'Kyoto',
    tagline: 'Timeless serenity, ancient shrines & bamboo groves',
    description: 'Japan’s cultural heart features thousands of classical Buddhist temples, traditional wooden houses, imperial gardens, and serene bamboo forests.',
    location: {
      country: 'Japan',
      region: 'Kansai'
    },
    category: 'Cultural & Heritage',
    rating: 4.95,
    reviewsCount: 2150,
    priceLevel: '$$$',
    avgCostPerDayUSD: 230,
    bestTimeToVisit: 'March – May & Oct – Nov',
    heroImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true,
    trending: true,
    tags: ['Temples', 'Cherry Blossoms', 'Culture', 'Gastronomy'],
    highlights: [
      'Fushimi Inari-taisha Torii gates walk',
      'Arashiyama Bamboo Grove at sunrise',
      'Kinkaku-ji (Golden Pavilion) reflection',
      'Traditional Tea Ceremony experience'
    ],
    activities: [
      { id: 'act-4', title: 'Early Morning Arashiyama & Fushimi Inari Walk', duration: '4 hrs', category: 'Sightseeing' },
      { id: 'act-5', title: 'Authentic Gion Kaiseki Dining Experience', duration: '2.5 hrs', category: 'Culinary' }
    ]
  },
  {
    id: 'swiss-alps-switzerland',
    title: 'Swiss Alps',
    tagline: 'Majestic peaks, alpine meadows & crystal-clear lakes',
    description: 'Immerse yourself in world-class alpine adventures, scenic cogwheel trains, mountain reflection tarns, and pristine mountain villages like Zermatt and Lauterbrunnen.',
    location: {
      country: 'Switzerland',
      region: 'Bernese Oberland & Valais'
    },
    category: 'Mountain & Hiking',
    rating: 4.88,
    reviewsCount: 980,
    priceLevel: '$$$$',
    avgCostPerDayUSD: 360,
    bestTimeToVisit: 'June – September & Dec – March',
    heroImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true,
    trending: false,
    tags: ['Mountains', 'Hiking', 'Skiing', 'Scenic Railways'],
    highlights: [
      'Matterhorn view from Gornergrat railway',
      'Lauterbrunnen Valley 72 waterfalls hike',
      'Glacier Express panoramic ride'
    ],
    activities: [
      { id: 'act-6', title: 'Jungfraujoch Top of Europe Train Day Trip', duration: '6 hrs', category: 'Excursion' }
    ]
  },
  {
    id: 'amalfi-coast-italy',
    title: 'Amalfi Coast',
    tagline: 'Cascading pastel towns over Mediterranean waters',
    description: 'A 50-kilometer stretch of coastline featuring cliffside pastel villages, terraced lemon groves, and glamorous coastal vistas in Positano, Ravello, and Amalfi.',
    location: {
      country: 'Italy',
      region: 'Campania'
    },
    category: 'Luxury Retreat',
    rating: 4.85,
    reviewsCount: 1640,
    priceLevel: '$$$$',
    avgCostPerDayUSD: 320,
    bestTimeToVisit: 'May – September',
    heroImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: false,
    trending: true,
    tags: ['Coastline', 'Coastal Dining', 'Pastel Villages', 'Luxury'],
    highlights: [
      'Path of the Gods cliff hike',
      'Positano beachfront limoncello tasting',
      'Private speed boat trip to Capri'
    ],
    activities: [
      { id: 'act-7', title: 'Path of the Gods Guided Trek', duration: '4 hrs', category: 'Trekking' }
    ]
  },
  {
    id: 'banff-canada',
    title: 'Banff National Park',
    tagline: 'Glacial turquoise waters surrounded by the Canadian Rockies',
    description: 'Canada’s oldest national park glows with electric-blue glacial lakes like Lake Louise and Moraine Lake, rugged peaks, and wild pine forests.',
    location: {
      country: 'Canada',
      region: 'Alberta'
    },
    category: 'Adventure & Wildlife',
    rating: 4.92,
    reviewsCount: 1890,
    priceLevel: '$$$',
    avgCostPerDayUSD: 240,
    bestTimeToVisit: 'June – September',
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [],
    featured: true,
    trending: false,
    tags: ['Lakes', 'Rockies', 'Wildlife', 'Canoeing'],
    highlights: [
      'Canoeing on Lake Louise',
      'Sunrise over Moraine Lake Valley of Ten Peaks',
      'Icefields Parkway scenic road trip'
    ],
    activities: [
      { id: 'act-8', title: 'Moraine Lake Sunrise & Canoe Session', duration: '3 hrs', category: 'Kayaking' }
    ]
  }
];
