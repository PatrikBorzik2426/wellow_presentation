export interface ScentImage {
  src: string
  size: number       // px
  offsetX: number    // px from center, positive = right
  offsetY: number    // px from center, positive = down
  delay: number      // animation delay in seconds
  duration: number   // float cycle duration in seconds
  bounce?: number    // max vertical travel in px (default 18)
  zIndex?: number    // explicit z-index override (default: auto-stacked)
  saturation?: number // CSS saturate() value: 1 = normal, 0 = greyscale, 0.5 = half
}

export interface ProductLocale {
  name: string
  /** Small coloured category label shown above the product name; falls back to product.flavour if omitted */
  category?: string
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
  /** z-index for the background image (default 0) */
  backgroundZIndex?: number
  scents: ScentImage[]
}

/**
 * FRUIT / SCENT IMAGE RULESET
 * ─────────────────────────────────────────────────────────────────────────────
 * 1. Hierarchy   — Product is always the dominant element. Fruit/scent images
 *                  sit in the background or beside it, never as the focal point.
 *                  Fruit zIndex must be lower than backgroundZIndex.
 *
 * 2. Display     — Avoid food-photo framing. Use details, slices, or textures
 *                  rather than whole fruits. No large halves as dominant items.
 *                  For coconut: no palm (looks like a holiday ad).
 *
 * 3. Movement    — Slow, gentle, peaceful sine-wave float.
 *                  duration ≥ 6 s   |   bounce ≤ 12 px   |   timing: ease-in-out
 *                  Stagger delay between scents (e.g. 0 s → 2.5 s).
 *
 * 4. Reveal      — Product fades in first (opacity 2 s, no delay).
 *                  scents[0] fades in with 1 s delay; scents[1+] stagger further.
 *                  Fruit should never appear before the product is visible.
 *
 * 5. Colour      — Use saturation (0–1) to soften vivid fruit colours.
 *                  Default 1 (unchanged). Recommended range: 0.6–0.85 for
 *                  naturally colourful fruits; ~1 for neutral/pale subjects.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** First ACTIVE_COUNT products are shown in the ProductShowcase. */
export const ACTIVE_COUNT = 6

export const products: Product[] = [
  {
    id: 'golden-peach',
    sk: {
      name: 'Golden Peach',
      category: 'Broskyňa',
      tagline: 'Ako dotyk slnečných lúčov.',
      description:
        'Zrelá broskyňa zaliata slnkom, jemná a prirodzene hrejivá. V ovocnej sladkosti skrýva zamatový podtón šupky ovocia.',
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
    scents: [
      { src: '/pngs/peach_leaf.png',   size: 330, offsetX: 150,  offsetY: -150, delay: 0.0, duration: 7.0, bounce: 10, zIndex: 1, saturation: 0.45 },
      { src: '/pngs/peach_inside.png', size: 260, offsetX: -200, offsetY:  150, delay: 2.5, duration: 6.5, bounce:  8, zIndex: 2, saturation: 0.65 },
    ],
  },
  {
    id: 'coconut-blanc',
    sk: {
      name: 'Coconut Blanc',
      category: 'Kokos',
      tagline: 'Uvoľňujúca hebkosť',
      description:
        'Ľahká vôňa s jemným dotykom kokosu. Zmes sladkých, krémových a orechových tónov navodí pocity exotiky a relaxu.',
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
    backgroundZIndex: 4,
    scents: [
      { src: '/pngs/coconut_front.png',     size: 220, offsetX: -215, offsetY: -140, delay: 0.0, duration: 6.5, bounce: 10, zIndex: 1, saturation: 0.6 },
      { src: '/pngs/coconut_two_halfs.png', size: 320, offsetX:  160, offsetY:  150, delay: 2.5, duration: 5.5, bounce:  8, zIndex: 2, saturation: 0.5   },
    ],
  },
  {
    id: 'citrus-garden',
    sk: {
      name: 'Citrus Garden',
      category: 'Citrón',
      tagline: 'Svieža ako ráno. Zelená ako záhrada.',
      description:
        'Svieža vôňa, ktorá prečistí priestor a dodá mu ľahkosť. Prepája citrón spolu s povzbudzujúcim bylinným nádychom.',
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
      { src: '/pngs/slice_lemon.png', size: 220, offsetX: 180, offsetY: 155, delay: 0.0, duration: 7.0, bounce: 10, zIndex: 2, saturation: 0.70 },
      { src: '/pngs/lemon_whole.png', size: 300, offsetX:  -200, offsetY:  -200, delay: 2.5, duration: 6.0, bounce:  8, zIndex: 1, saturation: 0.65 },
    ],
  },
  {
    id: 'watermellow',
    sk: {
      name: 'Watermellow',
      category: 'Melón',
      tagline: 'Šťavnatý vánok.',
      description:
        'Svieža melónová ľahkosť v prúde vzduchu. Rozprúdi emócie radosti pri každom zapnutí.',
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
      { src: '/pngs/water_malone_slice_big.png',   size: 320, offsetX:   -165, offsetY: 110, delay: 0.0, duration: 7.0, bounce: 10, zIndex: 1, saturation: 0.75 },
      { src: '/pngs/water_malone_slice_small.png',  size: 350, offsetX: 190, offsetY:  -160, delay: 2.5, duration: 6.0, bounce:  8, zIndex: 2, saturation: 0.70 },
    ],
  },
  {
    id: 'pure-platinum',
    sk: {
      name: 'Pure Platinum',
      tagline: 'Tichý luxus.',
      description:
        'Elegantná, osobitá vôňa, ktorá nechá priestor dýchať. Spája drevité, korenisté arómy s kožou a prináša do okolia prepych.',
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
      { src: '/pngs/platinum_piece.png', size: 280, offsetX:  210, offsetY: -140, delay: 0.0, duration: 7.5, bounce:  8, zIndex: 1, saturation: 0.55 },
      { src: '/pngs/bark_piece.png',     size: 410, offsetX: -210, offsetY:  105, delay: 2.5, duration: 6.5, bounce: 10, zIndex: 2, saturation: 0.50 },
    ],
  },
  {
    id: 'vanilla-candy',
    sk: {
      name: 'Candy Vanilla',
      category: 'Sladká Vanilka',
      tagline: 'Sladká závislosť.',
      description:
        'Vanilka s hravým nádychom sladkosti, ku ktorej sa chceš stále vracať. Premení jednoduchosť na zábavu.',
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
      { src: '/pngs/vanilla_flower.png', size: 300, offsetX:  210, offsetY: -135, delay: 0.0, duration: 7.0, bounce: 10, zIndex: 1, saturation: 0.70 },
      { src: '/pngs/vanilla_sticks.png', size: 320, offsetX: -225, offsetY:  140, delay: 2.5, duration: 6.5, bounce:  8, zIndex: 2, saturation: 0.65 },
    ],
  },
]
