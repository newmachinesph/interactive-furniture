export type PricingTier = '$' | '$$' | '$$$' | '$$$$';
export type RoomSize = 'small' | 'medium' | 'large' | 'xl';

export interface FurnitureItem {
  id: string;
  name: string;
  prices: Record<PricingTier, number>;
  defaultQty: number;
}

export interface RoomData {
  id: string;
  name: string;
  description: string;
  gradient: string;
  items: FurnitureItem[];
}

export const PRICING_TIERS: PricingTier[] = ['$', '$$', '$$$', '$$$$'];

export const TIER_INFO: Record<PricingTier, { label: string; color: string; bg: string; border: string }> = {
  '$':    { label: 'Budget',    color: 'text-emerald-700', bg: 'bg-emerald-50',  border: 'border-emerald-300' },
  '$$':   { label: 'Mid-Range', color: 'text-blue-700',    bg: 'bg-blue-50',     border: 'border-blue-300'    },
  '$$$':  { label: 'Premium',   color: 'text-violet-700',  bg: 'bg-violet-50',   border: 'border-violet-300'  },
  '$$$$': { label: 'Luxury',    color: 'text-amber-700',   bg: 'bg-amber-50',    border: 'border-amber-300'   },
};

export const SIZE_OPTIONS: { value: RoomSize; label: string; sqft: string }[] = [
  { value: 'small',  label: 'Small',       sqft: 'Up to 150 sq ft' },
  { value: 'medium', label: 'Medium',      sqft: '150–300 sq ft'   },
  { value: 'large',  label: 'Large',       sqft: '300–500 sq ft'   },
  { value: 'xl',     label: 'Extra Large', sqft: '500+ sq ft'      },
];

export const ROOM_ICONS: Record<string, string> = {
  living:  '🛋️',
  bedroom: '🛏️',
  dining:  '🍽️',
  office:  '💼',
  kids:    '🧸',
  outdoor: '🌿',
};

export const ROOMS: RoomData[] = [
  {
    id: 'living',
    name: 'Living Room',
    description: 'Sofa, tables, entertainment & more',
    gradient: 'from-amber-200 via-orange-100 to-yellow-50',
    items: [
      { id: 'sofa',      name: 'Sofa',                    prices: { '$': 400,  '$$': 900,  '$$$': 2000, '$$$$': 5000 }, defaultQty: 1 },
      { id: 'coffee',    name: 'Coffee Table',             prices: { '$': 150,  '$$': 350,  '$$$': 800,  '$$$$': 2000 }, defaultQty: 1 },
      { id: 'armchair',  name: 'Armchair',                 prices: { '$': 200,  '$$': 500,  '$$$': 1200, '$$$$': 3000 }, defaultQty: 2 },
      { id: 'tv_stand',  name: 'TV Stand / Media Console', prices: { '$': 200,  '$$': 400,  '$$$': 900,  '$$$$': 2200 }, defaultQty: 1 },
      { id: 'rug',       name: 'Area Rug',                 prices: { '$': 100,  '$$': 250,  '$$$': 600,  '$$$$': 1500 }, defaultQty: 1 },
      { id: 'bookshelf', name: 'Bookshelf / Shelving',     prices: { '$': 150,  '$$': 300,  '$$$': 700,  '$$$$': 1800 }, defaultQty: 1 },
    ],
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    description: 'Bed, storage, nightstands & more',
    gradient: 'from-blue-200 via-indigo-100 to-slate-50',
    items: [
      { id: 'bed_frame',  name: 'Bed Frame',               prices: { '$': 300,  '$$': 700,  '$$$': 1500, '$$$$': 4000 }, defaultQty: 1 },
      { id: 'mattress',   name: 'Mattress',                 prices: { '$': 400,  '$$': 800,  '$$$': 1800, '$$$$': 4500 }, defaultQty: 1 },
      { id: 'dresser',    name: 'Dresser',                  prices: { '$': 300,  '$$': 600,  '$$$': 1400, '$$$$': 3500 }, defaultQty: 1 },
      { id: 'nightstand', name: 'Nightstand',               prices: { '$': 100,  '$$': 200,  '$$$': 500,  '$$$$': 1200 }, defaultQty: 2 },
      { id: 'wardrobe',   name: 'Wardrobe / Armoire',       prices: { '$': 400,  '$$': 900,  '$$$': 2000, '$$$$': 5000 }, defaultQty: 1 },
      { id: 'rug',        name: 'Area Rug',                 prices: { '$': 100,  '$$': 250,  '$$$': 600,  '$$$$': 1500 }, defaultQty: 1 },
    ],
  },
  {
    id: 'dining',
    name: 'Dining Room',
    description: 'Table, chairs, storage & more',
    gradient: 'from-green-200 via-emerald-100 to-lime-50',
    items: [
      { id: 'dining_table', name: 'Dining Table',          prices: { '$': 400,  '$$': 900,  '$$$': 2000, '$$$$': 5000 }, defaultQty: 1 },
      { id: 'dining_chair', name: 'Dining Chair',          prices: { '$': 80,   '$$': 200,  '$$$': 500,  '$$$$': 1200 }, defaultQty: 4 },
      { id: 'sideboard',    name: 'Sideboard / Buffet',    prices: { '$': 350,  '$$': 750,  '$$$': 1600, '$$$$': 4000 }, defaultQty: 1 },
      { id: 'bar_cart',     name: 'Bar Cart',              prices: { '$': 150,  '$$': 350,  '$$$': 800,  '$$$$': 2000 }, defaultQty: 1 },
      { id: 'rug',          name: 'Area Rug',              prices: { '$': 100,  '$$': 250,  '$$$': 600,  '$$$$': 1500 }, defaultQty: 1 },
    ],
  },
  {
    id: 'office',
    name: 'Home Office',
    description: 'Desk, seating, storage & more',
    gradient: 'from-slate-200 via-gray-100 to-zinc-50',
    items: [
      { id: 'desk',         name: 'Desk',                  prices: { '$': 250,  '$$': 500,  '$$$': 1200, '$$$$': 3000 }, defaultQty: 1 },
      { id: 'office_chair', name: 'Office Chair',          prices: { '$': 200,  '$$': 500,  '$$$': 1200, '$$$$': 3000 }, defaultQty: 1 },
      { id: 'bookshelf',    name: 'Bookshelf',             prices: { '$': 150,  '$$': 300,  '$$$': 700,  '$$$$': 1800 }, defaultQty: 1 },
      { id: 'filing_cab',   name: 'Filing Cabinet',        prices: { '$': 100,  '$$': 250,  '$$$': 600,  '$$$$': 1500 }, defaultQty: 1 },
      { id: 'rug',          name: 'Area Rug',              prices: { '$': 100,  '$$': 250,  '$$$': 600,  '$$$$': 1500 }, defaultQty: 1 },
    ],
  },
  {
    id: 'kids',
    name: "Kids' Room",
    description: 'Bed, study, play & storage',
    gradient: 'from-pink-200 via-purple-100 to-violet-50',
    items: [
      { id: 'kids_bed',    name: 'Kids Bed Frame',         prices: { '$': 250,  '$$': 500,  '$$$': 1200, '$$$$': 3000 }, defaultQty: 1 },
      { id: 'mattress',    name: 'Mattress',               prices: { '$': 250,  '$$': 500,  '$$$': 1100, '$$$$': 2800 }, defaultQty: 1 },
      { id: 'study_desk',  name: 'Study Desk',             prices: { '$': 150,  '$$': 300,  '$$$': 700,  '$$$$': 1800 }, defaultQty: 1 },
      { id: 'dresser',     name: 'Dresser',                prices: { '$': 200,  '$$': 450,  '$$$': 1000, '$$$$': 2500 }, defaultQty: 1 },
      { id: 'toy_storage', name: 'Toy Storage Unit',       prices: { '$': 100,  '$$': 250,  '$$$': 600,  '$$$$': 1500 }, defaultQty: 1 },
      { id: 'rug',         name: 'Area Rug',               prices: { '$': 80,   '$$': 200,  '$$$': 500,  '$$$$': 1200 }, defaultQty: 1 },
    ],
  },
  {
    id: 'outdoor',
    name: 'Outdoor / Patio',
    description: 'Seating, dining, shade & more',
    gradient: 'from-teal-200 via-cyan-100 to-sky-50',
    items: [
      { id: 'outdoor_sofa',   name: 'Outdoor Sofa Set',   prices: { '$': 400,  '$$': 900,  '$$$': 2000, '$$$$': 5000 }, defaultQty: 1 },
      { id: 'outdoor_dining', name: 'Outdoor Dining Set', prices: { '$': 500,  '$$': 1200, '$$$': 2800, '$$$$': 7000 }, defaultQty: 1 },
      { id: 'lounge_chair',   name: 'Lounge Chair',       prices: { '$': 200,  '$$': 500,  '$$$': 1200, '$$$$': 3000 }, defaultQty: 2 },
      { id: 'umbrella',       name: 'Patio Umbrella',     prices: { '$': 100,  '$$': 250,  '$$$': 600,  '$$$$': 1500 }, defaultQty: 1 },
      { id: 'side_table',     name: 'Side Table',         prices: { '$': 80,   '$$': 200,  '$$$': 500,  '$$$$': 1200 }, defaultQty: 2 },
    ],
  },
];
