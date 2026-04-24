export interface ScentImage {
  src: string
  size: number       // px
  offsetX: number    // px from center, positive = right
  offsetY: number    // px from center, positive = down
  delay: number      // animation delay in seconds
  duration: number   // float cycle duration in seconds
}

export interface Product {
  id: string
  name: string
  tagline: string
  description: string
  flavour: string
  /** Hex colour for text, borders, glows */
  neon: string
  /** RGB tuple used for rgba() calls and shader injection */
  neonRgb: [number, number, number]
  gradient: string
  has3D: boolean
  scents: ScentImage[]
}

export const products: Product[] = [
  {
    id: 'arctic-rush',
    name: 'Arctic Rush',
    tagline: 'Ice-cold focus. Zero limits.',
    description:
      'A crisp mint-menthol blend engineered to sharpen cognition and cool you down. Each stick delivers a precise dose of L-theanine and caffeine for a smooth, jitter-free lift.',
    flavour: 'mint',
    neon: '#00fff5',
    neonRgb: [0, 255, 245],
    gradient: 'linear-gradient(180deg, #000000 0%, #001a1a 50%, #003333 100%)',
    has3D: false,
    scents: [
      { src: '/scents/mint-leaf.svg',   size: 96,  offsetX: -175, offsetY: -40, delay: 0,   duration: 3.8 },
      { src: '/scents/ice-crystal.svg', size: 72,  offsetX:  165, offsetY:  50, delay: 1.4, duration: 4.4 },
    ],
  },
  {
    id: 'volt-lime',
    name: 'Volt Lime',
    tagline: 'Sharp. Sour. Unstoppable.',
    description:
      'Zesty lime-citrus with a punchy sour kick. Supercharged with vitamin C and electrolytes, Volt Lime rehydrates and energises in one hit.',
    flavour: 'lime',
    neon: '#b6ff00',
    neonRgb: [182, 255, 0],
    gradient: 'linear-gradient(180deg, #000000 0%, #0d1a00 50%, #1a3300 100%)',
    has3D: false,
    scents: [
      { src: '/scents/lime-slice.svg',  size: 100, offsetX: -170, offsetY:  35, delay: 0.3, duration: 4.1 },
      { src: '/scents/citrus-drop.svg', size: 68,  offsetX:  168, offsetY: -45, delay: 1.8, duration: 3.5 },
    ],
  },
  {
    id: 'scarlet-wave',
    name: 'Scarlet Wave',
    tagline: 'Ride the wave. Feel alive.',
    description:
      'Juicy watermelon-raspberry fusion. Antioxidant-rich and lightly sparkling, Scarlet Wave is the go-to for recovery and replenishment after intense sessions.',
    flavour: 'berry',
    neon: '#ff2d78',
    neonRgb: [255, 45, 120],
    gradient: 'linear-gradient(180deg, #000000 0%, #1a0010 50%, #330020 100%)',
    has3D: false,
    scents: [
      { src: '/scents/raspberry.svg',  size: 92,  offsetX: -172, offsetY: -35, delay: 0,   duration: 4.6 },
      { src: '/scents/water-drop.svg', size: 62,  offsetX:  162, offsetY:  55, delay: 2.0, duration: 3.2 },
    ],
  },
  {
    id: 'ember-orange',
    name: 'Ember Orange',
    tagline: 'Burn bright. Stay sharp.',
    description:
      'Bold blood-orange with a warm spice finish. A blend with cayenne and B-vitamins that ignites your metabolism and sustains peak performance throughout the day.',
    flavour: 'orange',
    neon: '#ff6a00',
    neonRgb: [255, 106, 0],
    gradient: 'linear-gradient(180deg, #000000 0%, #1a0a00 50%, #331500 100%)',
    has3D: false,
    scents: [
      { src: '/scents/orange-slice.svg', size: 98, offsetX: -173, offsetY:  42, delay: 0.6, duration: 4.0 },
      { src: '/scents/flame.svg',        size: 70, offsetX:  160, offsetY: -50, delay: 1.2, duration: 3.7 },
    ],
  },
  {
    id: 'velvet-vanilla',
    name: 'Velvet Vanilla',
    tagline: 'Smooth power. Zero noise.',
    description:
      'Rich Madagascan vanilla with a creamy finish. Packed with magnesium and adaptogens, Velvet Vanilla calms the mind, supports recovery, and makes every wind-down ritual feel like a reward.',
    flavour: 'vanilla',
    neon: '#f5d78e',
    neonRgb: [245, 215, 142],
    gradient: 'linear-gradient(180deg, #000000 0%, #1a1400 50%, #332800 100%)',
    has3D: false,
    scents: [
      { src: '/scents/vanilla-pod.svg', size: 94, offsetX: -174, offsetY: -38, delay: 0.2, duration: 4.3 },
      { src: '/scents/star.svg',        size: 66, offsetX:  164, offsetY:  48, delay: 1.6, duration: 3.9 },
    ],
  },
  {
    id: 'melon-surge',
    name: 'Melon Surge',
    tagline: 'Fresh hit. Full send.',
    description:
      'Crisp watermelon with a cooling finish. Loaded with electrolytes and coconut water extract, Melon Surge keeps you hydrated and dialled-in from the first sip to the last drop.',
    flavour: 'watermelon',
    neon: '#ff4fa3',
    neonRgb: [255, 79, 163],
    gradient: 'linear-gradient(180deg, #000000 0%, #1a0015 50%, #33002b 100%)',
    has3D: false,
    scents: [
      { src: '/scents/watermelon-slice.svg', size: 102, offsetX: -176, offsetY:  36, delay: 0.4, duration: 4.5 },
      { src: '/scents/water-drop.svg',       size: 64,  offsetX:  166, offsetY: -48, delay: 1.9, duration: 3.4 },
    ],
  },
]
