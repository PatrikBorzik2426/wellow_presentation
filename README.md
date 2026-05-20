# Wellow

Prezentačná webstránka pre **Wellow** — vonný difuzér navrhnutý pre bytové klimatizácie. Slovenský produkt s patentovanou konštrukciou a magnetickým uchytením.

**Produkčný web:** [wellow.sk](https://www.wellow.sk)

---

## Rýchly štart

```bash
npm install
npm run dev       # http://localhost:3000
```

## Build

```bash
npm run generate  # SSG výstup → .output/public/
npm run deploy    # generate + .nojekyll pre GitHub Pages
```

## Stack

Nuxt 4 · Vue 3 · Tailwind CSS · Three.js · TypeScript

## Štruktúra

| Cesta | Popis |
|---|---|
| `app/pages/index.vue` | Poradie sekcií stránky |
| `app/data/products.ts` | Dáta produktov, `ACTIVE_COUNT` |
| `app/config/head.ts` | Konfigurácia hero sekcie a loga |
| `app/composables/useLocale.ts` | i18n (SK / EN) |
| `public/pngs/` | PNG obrázky produktov a ingrediencií |
| `public/gallery/` | Galérijné fotografie (6 ks) |
| `public/slider/` | Fotografie pre About slider (5 ks) |
| `nuxt.config.ts` | SEO meta, JSON-LD, base URL |

## Dokumentácia

Kompletná technická dokumentácia sa nachádza v [`docs/TECHNICAL.md`](docs/TECHNICAL.md):

- Dátový model produktov a všetky konfigurovateľné parametre
- Popis každého komponentu
- Detailný prehľad `public/` priečinka
- Pokyny pre pridávanie produktov a galérijných fotografií
- SEO nastavenia a deploy postup
