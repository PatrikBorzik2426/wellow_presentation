export interface ScentImage {
  src: string
  size: number       // px
  offsetX: number    // px from center, positive = right
  offsetY: number    // px from center, positive = down
  delay: number      // animation delay in seconds
  duration: number   // float cycle duration in seconds
  bounce?: number    // max vertical travel in px (default 18)
}

export interface ProductLocale {
  name: string
  tagline: string
  description: string
}

export interface Product {
  id: string
  sk: ProductLocale
  en: ProductLocale
  /** Short flavour/category label — same across locales (proper product name) */
  flavour: string
  /** Natural colour from the label palette */
  colour: string
  /** RGB tuple used for rgba() calls */
  colourRgb: [number, number, number]
  gradient: string
  /** Optional large background product image — rendered behind scents, persists after first reveal */
  background?: string
  /** px size of the background image square (default 210) */
  backgroundSize?: number
  /** px offset from center, positive = right (default 0) */
  backgroundOffsetX?: number
  /** px offset from center, positive = down (default 0) */
  backgroundOffsetY?: number
  scents: ScentImage[]
}

export const products: Product[] = [
  {
    id: 'golden-peach',
    sk: {
      name: 'Broskyňa',
      tagline: 'Slnkom zrelá. Nekonečne jemná.',
      description:
        'Teplá zlatistá vôňa zrelej broskyne s hodvábnym zakončením. Jemne perlivá a prirodzene sladená — ideálna pre pokojné chvíle doma.',
    },
    en: {
      name: 'Golden Peach',
      tagline: 'Sun-ripened. Endlessly smooth.',
      description:
        'A warm golden peach with a velvety finish. Lightly sparkling and naturally sweetened — perfect for unhurried moments at home.',
    },
    flavour: 'Golden Peach',
    colour: '#f47923',
    colourRgb: [244, 121, 35],
    gradient: 'linear-gradient(180deg, #1e1e1e 0%, #1a0d00 50%, #2a1500 100%)',
    background: '/pngs/esbee_3_4.png',
    backgroundSize: 420,
    backgroundOffsetX: 0,
    backgroundOffsetY: 0,
    scents: [
      { src: '/pngs/peach_leaf.png',   size: 420, offsetX: 150,  offsetY: -150, delay: 0.3, duration: 5.5 },
      { src: '/pngs/peach_inside.png', size: 320, offsetX: -200, offsetY:  150, delay: 1.4, duration: 4.4 },
    ],
  },
  {
    id: 'coconut-blanc',
    sk: {
      name: 'Kokos',
      tagline: 'Čistý. Ľahký. Osviežujúci.',
      description:
        'Jemná kokosová sviežosť s nádychom tropickej čistoty. Osviežuje a upokojuje zároveň — ako vánok z prázdninového rána.',
    },
    en: {
      name: 'Coconut Blanc',
      tagline: 'Clean. Light. Refreshing.',
      description:
        'Gentle coconut freshness with a touch of tropical clarity. Refreshing and calming at once — like a breeze on a holiday morning.',
    },
    flavour: 'Coconut Blanc',
    colour: '#c8cac8',
    colourRgb: [200, 202, 200],
    gradient: 'linear-gradient(180deg, #1e1e1e 0%, #0d1010 50%, #121a18 100%)',
    background: '/pngs/esbee_3_4.png',
    backgroundSize: 420,
    backgroundOffsetX: 0,
    backgroundOffsetY: 0,
    scents: [
      { src: '/pngs/coconut_front.png', size: 220,  offsetX: -215,   offsetY: -140,  delay: 0.2, duration: 4.2 },
      { src: '/pngs/palm.png',  size: 1100,  offsetX: 200, offsetY: -150, delay: 1.6, duration: 3.6, bounce: 0 },
      { src: '/pngs/coconut_two_halfs.png',  size: 520,  offsetX: 256, offsetY: 180, delay: 1.6, duration: 3.6 },
    ],
  },
  {
    id: 'watermellow',
    sk: {
      name: 'Melón',
      tagline: 'Šťavnatý. Živý. Neodolateľný.',
      description:
        'Svieža šťava z vodného meloňa s jemnou ružovou hravosťou. Plná energie a radosti — ako letný deň v záhrade.',
    },
    en: {
      name: 'Watermellow',
      tagline: 'Juicy. Vivid. Irresistible.',
      description:
        'Fresh watermelon with a soft pink playfulness. Full of energy and joy — like a summer day in the garden.',
    },
    flavour: 'Watermellow',
    colour: '#f0517b',
    colourRgb: [240, 81, 123],
    gradient: 'linear-gradient(180deg, #1e1e1e 0%, #1a0010 50%, #260018 100%)',
    scents: [
      { src: '/scents/raspberry.svg',  size: 92,  offsetX: 0,   offsetY: 0,  delay: 0,   duration: 4.6 },
      { src: '/scents/water-drop.svg', size: 62,  offsetX:  162, offsetY:  55, delay: 2.0, duration: 3.2 },
    ],
  },
  {
    id: 'pure-platinum',
    sk: {
      name: 'Platinum',
      tagline: 'Čistota. Sila. Elegancia.',
      description:
        'Strieborná čistota s minerálnou hĺbkou. Neutrálny, sofistikovaný charakter, ktorý sa hodí do každého priestoru.',
    },
    en: {
      name: 'Pure Platinum',
      tagline: 'Clarity. Strength. Elegance.',
      description:
        'Silver clarity with a mineral depth. A neutral, sophisticated character that complements any space without compromise.',
    },
    flavour: 'Pure Platinum',
    colour: '#b8bcc3',
    colourRgb: [184, 188, 195],
    gradient: 'linear-gradient(180deg, #1e1e1e 0%, #111214 50%, #161820 100%)',
    scents: [
      { src: '/scents/ice-crystal.svg', size: 94,  offsetX: 0,   offsetY: 0,  delay: 0,   duration: 4.0 },
      { src: '/scents/water-drop.svg',  size: 62,  offsetX:  165, offsetY:  48, delay: 1.8, duration: 3.4 },
    ],
  },
  {
    id: 'vanilla-candy',
    sk: {
      name: 'Vanilka so žuvačkou',
      tagline: 'Hrejivá. Sladká. Príjemná.',
      description:
        'Bohatá madagaskarská vanilka s nádychom sladkej žuvačky. Hrejivá vôňa, ktorá premení každý domov na miesto pohody.',
    },
    en: {
      name: 'Vanilla Candy',
      tagline: 'Warm. Sweet. Comforting.',
      description:
        'Rich Madagascan vanilla with a touch of sweet bubblegum. A warming fragrance that turns any home into a sanctuary.',
    },
    flavour: 'Vanilla Candy',
    colour: '#efd35a',
    colourRgb: [239, 211, 90],
    gradient: 'linear-gradient(180deg, #1e1e1e 0%, #1a1400 50%, #261e00 100%)',
    scents: [
      { src: '/scents/flame.svg',        size: 88,  offsetX: 0,   offsetY: 0,  delay: 0.2, duration: 4.3 },
      { src: '/scents/orange-slice.svg', size: 66,  offsetX:  164, offsetY:  48, delay: 1.6, duration: 3.9 },
    ],
  },
  {
    id: 'citrus-garden',
    sk: {
      name: 'Verbena',
      tagline: 'Živá. Zelená. Inšpiratívna.',
      description:
        'Čerstvá zelená verbena s citrusovou záhradou. Energizujúca vôňa prírody, ktorá prebudí vaše zmysly a naplní miestnosť životom.',
    },
    en: {
      name: 'Citrus Garden',
      tagline: 'Vivid. Green. Inspiring.',
      description:
        'Fresh green verbena with a citrus garden backdrop. An energising fragrance of nature that awakens the senses and fills the room with life.',
    },
    flavour: 'Citrus Garden',
    colour: '#89c540',
    colourRgb: [137, 197, 64],
    gradient: 'linear-gradient(180deg, #1e1e1e 0%, #0d1500 50%, #121e00 100%)',
    scents: [
      { src: '/scents/lime-slice.svg',  size: 100, offsetX: 0,   offsetY: 0,  delay: 0.3, duration: 4.1 },
      { src: '/scents/citrus-drop.svg', size: 68,  offsetX:  168, offsetY: -45, delay: 1.8, duration: 3.5 },
    ],
  },
]
