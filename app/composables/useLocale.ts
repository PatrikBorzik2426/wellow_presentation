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
      pretitle: 'Vôňa, ktorá prúdi.',
      scrollHint: 'Rolovať',
      explore: 'Objaviť',
    },
    about: {
      pretitle: 'Kto sme',
      title: 'O Wellow',
      intro:
        'Wellow vznikol z jednoduchej myšlienky: priniesť vôňu tam, kde prirodzene prúdi vzduch.',
      pillar1Title: 'Prémiový Dizjan',
      pillar1Body:
        'Vytvorili sme produkt pre bytové klimatizácie, ktorý spája čistý dizajn, jednoduché používanie a príjemný zážitok z vône. Stačí pár sekúnd a klimatizácia sa zmení na nenápadný zdroj atmosféry vo vašom priestore.',
      pillar2Title: 'Slovenský Produkt',
      pillar2Body:
        'Od prvého nápadu cez vývoj až po výrobu vzniká wellow v srdci Európy ako slovenský produkt s vlastnou technológiou a patentovanou konštrukciou.',
      pillar3Title: 'Pre Váš Domov',
      pillar3Body:
        'Wellow vôňa je malý detail, ktorý mení atmosféru domova.',
    },
    products: {
      learnMore: 'Zisti viac',
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
