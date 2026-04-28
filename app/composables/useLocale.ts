export type Lang = 'sk' | 'en'

export const ui = {
  sk: {
    nav: {
      home: 'Domov',
      about: 'O nás',
      products: 'Produkty',
      contact: 'Kontakt',
    },
    hero: {
      pretitle: 'Prémiové vône pre váš domov',
      scrollHint: 'Rolovať',
      explore: 'Objaviť',
    },
    about: {
      pretitle: 'Kto sme',
      title: 'O Wellow',
      intro:
        'Wellow vznikol z presvedčenia, že prémiové zážitky patria do každodenného života. Každý produkt navrhujeme s dôrazom na čistotu, vôňu a dizajn, ktorý premení váš domov na miesto pohody.',
      pillar1Title: 'Čisté zložky',
      pillar1Body:
        'Každá ingrediencia má svoje miesto. Žiadne plniče, žiadne kompromisy — iba to, čo skutočne funguje.',
      pillar2Title: 'Prémiový dizajn',
      pillar2Body:
        'Produkt, na ktorý môžete byť hrdí. Estetika a funkčnosť v dokonalej harmónii.',
      pillar3Title: 'Pre váš domov',
      pillar3Body:
        'Navrhnuté pre každodenné momenty — ráno, večer a všetko medzi tým.',
    },
    products: {
      learnMore: 'Zistiť viac',
      sectionPretitle: 'Naše vône',
    },
    footer: {
      tagline: 'Prémiové vône. Navrhnuté pre váš domov.',
      products: 'Produkty',
      company: 'Spoločnosť',
      about: 'O nás',
      press: 'Tlač',
      careers: 'Kariéra',
      rights: 'Všetky práva vyhradené.',
      madeWith: 'Vytvorené s',
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About Us',
      products: 'Products',
      contact: 'Contact',
    },
    hero: {
      pretitle: 'Premium Home Fragrances',
      scrollHint: 'Scroll',
      explore: 'Explore',
    },
    about: {
      pretitle: 'Who we are',
      title: 'About Wellow',
      intro:
        'Wellow was born from the belief that premium experiences belong in everyday life. Every product is designed with a focus on purity, fragrance, and design that transforms your home into a place of comfort.',
      pillar1Title: 'Clean Formulas',
      pillar1Body:
        'Every ingredient earns its place. No fillers, no shortcuts — only what truly works.',
      pillar2Title: 'Premium Design',
      pillar2Body:
        'A product you can be proud of. Aesthetics and function in perfect harmony.',
      pillar3Title: 'Made for Home',
      pillar3Body:
        'Designed for everyday moments — morning, evening, and everything in between.',
    },
    products: {
      learnMore: 'Learn More',
      sectionPretitle: 'Our Fragrances',
    },
    footer: {
      tagline: 'Premium fragrances. Designed for your home.',
      products: 'Products',
      company: 'Company',
      about: 'About',
      press: 'Press',
      careers: 'Careers',
      rights: 'All rights reserved.',
      madeWith: 'Made with',
    },
  },
} as const

export function useLocale() {
  const lang = useState<Lang>('locale', () => 'sk')

  function t(path: string): string {
    const keys = path.split('.')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let obj: any = ui[lang.value]
    for (const k of keys) obj = obj?.[k]
    return typeof obj === 'string' ? obj : path
  }

  function toggle() {
    lang.value = lang.value === 'sk' ? 'en' : 'sk'
  }

  return { lang, t, toggle }
}
