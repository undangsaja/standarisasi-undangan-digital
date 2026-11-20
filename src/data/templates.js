/**
 * Catalog of invitation templates.
 * Active: Red Elegants + Cherry Blossom + Ivory Gold Botanical. Others coming soon.
 */
export const TEMPLATES = [
  {
    id: 'red-elegants',
    name: 'Red Elegants',
    tagline: 'Velvet · Emas · Vintage',
    status: 'active',
    description:
      'Beludru merah anggur, filigree emas, damask, mawar merah, dan gordin tassel — nuansa undangan klasik mewah dengan Mode Malam.',
    palette: ['#4A0A12', '#7C1220', '#B98A35', '#F3E6D0'],
    fonts: ['Cinzel', 'Great Vibes', 'Cormorant Garamond', 'DM Mono'],
    features: ['Velvet swag', 'Night mode', 'Damask', 'Gold tassels'],
  },
  {
    id: 'cherry-blossom',
    name: 'Cherry Blossom',
    tagline: 'Hanami · Blush · Sakura',
    status: 'active',
    description:
      'Ranting sakura bersemi di atas kertas blush, kelopak berguguran lembut, dan garis rambut mawar — romansa hanami yang segar dan lapang.',
    palette: ['#FFF8FA', '#F6D0DB', '#D06982', '#799375'],
    fonts: ['Cormorant Garamond', 'Parisienne', 'Jost'],
    features: ['Falling petals', 'Sakura branch', 'Blush paper', 'Hanami veil'],
  },
  {
    id: 'ivory-gold',
    name: 'Ivory Gold Botanical',
    tagline: 'Klasik · Emas · Bunga',
    status: 'active',
    description:
      'Bingkai lengkung emas, karangan mawar ivory, monogram medali, dan animasi kelopak — nuansa undangan kertas mewah.',
    palette: ['#F3E8D7', '#B08B4E', '#8B6729', '#8C9077'],
    fonts: ['Cormorant Garamond', 'Marcellus', 'Parisienne'],
    features: ['Opening veil', 'Falling petals', 'Arch frame', 'Scroll reveal'],
  },
  {
    id: 'monochrome',
    name: 'Minimal Monochrome',
    tagline: 'Hitam · Putih · Bersih',
    status: 'soon',
    description:
      'Kontras tegas, tipografi minimal, dan layout lapang — untuk pasangan yang suka kesederhanaan modern.',
    palette: ['#FFFFFF', '#111111', '#666666', '#E5E5E5'],
    fonts: ['Inter', 'Cormorant Garamond', 'Jost'],
    features: ['Dark mode', 'Typographic cover', 'Clean grid'],
  },
  {
    id: 'nusantara',
    name: 'Nusantara Klasik',
    tagline: 'Batik · Coklat · Adat',
    status: 'soon',
    description:
      'Motif klasik Nusantara, warna tanah, dan ornamen budaya untuk pernikahan bernuansa tradisi.',
    palette: ['#F5E6C8', '#5C3317', '#A67C52', '#2F1B12'],
    fonts: ['Cormorant Garamond', 'Playfair Display', 'Jost'],
    features: ['Batik motifs', 'Warm palette', 'Ceremonial tone'],
  },
];

export function getTemplate(id) {
  return (
    TEMPLATES.find((t) => t.id === id && t.status === 'active') ||
    TEMPLATES.find((t) => t.status === 'active') ||
    TEMPLATES[0]
  );
}

export function isRedElegants(id) {
  return (id || '').toLowerCase().includes('red');
}

export function isCherryBlossom(id) {
  const key = (id || '').toLowerCase();
  return key.includes('cherry') || key.includes('blossom');
}

export function isIvoryGold(id) {
  return (id || '').toLowerCase().includes('ivory') || (id || '').toLowerCase().includes('gold');
}

export const DEFAULT_DRAFT = {
  templateId: 'red-elegants',
  groom: {
    fullName: 'Muhammad Najah Yuga',
    short: 'Muhammad',
    parents: 'Mr. Ahmad Fauzi & Mrs. Siti Rahmawati',
  },
  bride: {
    fullName: 'Irania Dhamayanti',
    short: 'Irania',
    parents: 'Mr. Budi Santoso & Mrs. Ratna Kusuma',
  },
  date: '2026-12-23',
  dateLabel: 'Wednesday · 23 December 2026',
  day: '23',
  monthSide: 'December 2026',
  weekday: 'Wednesday',
  time: '10.00 AM — Finish',
  city: 'Surabaya',
  venue: 'Keputih, Sukolilo',
  akad: {
    title: 'Akad Nikah',
    time: '10.00 AM — 12.00 PM',
    place: 'Masjid Al-Akbar Hall',
    address: 'Jl. Keputih, Sukolilo, Surabaya',
    maps: 'https://maps.google.com/?q=Keputih+Sukolilo+Surabaya',
  },
  reception: {
    title: 'Wedding Reception',
    time: '06.00 PM — 09.00 PM',
    place: 'Grand Ballroom, Hotel Majapahit',
    address: 'Jl. Keputih, Sukolilo, Surabaya',
    maps: 'https://maps.google.com/?q=Keputih+Sukolilo+Surabaya',
  },
  story: [
    {
      year: '2019',
      title: 'When We First Met',
      text: 'A quiet campus corridor, a borrowed book, and a conversation that lasted far longer than either of us expected.',
    },
    {
      year: '2022',
      title: 'Growing Together',
      text: 'Years of shared prayers, long drives, small victories and difficult seasons taught us that love is built, patiently.',
    },
    {
      year: '2025',
      title: 'The Proposal',
      text: 'Beneath a sky washed in gold, with both families gathered, a single question turned two paths into one.',
    },
    {
      year: '2026',
      title: 'Our Wedding Day',
      text: 'We ask you to witness the day we make our promise before Allah SWT — surrounded by the people we love most.',
    },
  ],
  quote:
    'And of His signs is that He created for you from yourselves mates that you may find tranquillity in them.',
  quoteSource: 'Surah Ar-Rum — 21',
  gallery: [
    {
      src: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      cap: 'The celebration',
    },
    {
      src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80',
      cap: 'Hand in hand',
    },
    {
      src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=900&q=80',
      cap: 'The rings',
    },
    {
      src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80',
      cap: 'Details',
    },
    {
      src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1100&q=80',
      cap: 'The vow',
    },
  ],
};

const STORAGE_KEY = 'undangaja.draft.v1';

export function loadDraft() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_DRAFT };
    return { ...DEFAULT_DRAFT, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_DRAFT };
  }
}

export function saveDraft(draft) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  } catch {
    /* ignore */
  }
}

export function clearDraft() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}
