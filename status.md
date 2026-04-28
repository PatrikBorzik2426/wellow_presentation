# Wellow Presentation — Status Tracker

_Last updated: 2026-04-28_

---

## ✅ Implemented

| Area | Detail |
|------|--------|
| SK / EN toggle | `useLocale` composable with `useState`; toggle button fixed top-right on all screens |
| Navigation | HOME / O NÁS / PRODUKTY / KONTAKT (bilingual, driven by `useLocale`) |
| Hero | Dark background with warm radial gradient + animated sweep in grey/vanilla tones; `WELL[O]W` with cycling-colour O |
| Hero — O animation | Cycles through all 6 scent colours (5 s/scent); subtitle shows active product tagline in current language |
| Products data | Renamed to real scent names: Broskyňa, Kokos, Platinum, Melón, Vanilka so žuvačkou, Verbena; natural colours from label palette |
| Colour palette | Neon → natural: Peach `#f47923`, Platinum `#b8bcc3`, Melon `#f0517b`, Vanilla `#efd35a`, Citrus `#89c540` |
| About Us | Lifestyle intro + 3 brand pillars (Clean / Premium / Home); lifestyle image placeholder |
| Products section | Softer gradients & glows; product image placeholders; bilingual names/descriptions |
| Footer | Bilingual; vanilla `●` accent instead of cyan |
| Tailwind | Replaced neon palette with `scent.*` natural colours |

---

## ⏳ Awaiting External Assets

### 1. Hero product photo
- **Who:** Lukáš
- **What:** Front detail of black product, transparent background (PNG, no shadow baked in)
- **Where to place:** `public/images/product-front.png`
- **Code:** Replace placeholder `<div>` in [HeroWaves.vue](app/components/HeroWaves.vue) with:
  ```html
  <img src="/images/product-front.png" alt="Wellow"
       class="h-[58vh] max-h-[520px] object-contain" />
  ```

### 2. About Us — lifestyle apartment photo
- **What:** Premium apartment lifestyle image; clean design, feeling of home; not elitist
- **Size:** Portrait preferred (~4:5 aspect), high resolution
- **Where to place:** `public/images/lifestyle-apartment.jpg`
- **Code:** Replace placeholder `<div>` in [AboutSection.vue](app/components/AboutSection.vue) with:
  ```html
  <img src="/images/lifestyle-apartment.jpg" alt="Wellow lifestyle"
       class="w-full aspect-[4/5] object-cover" />
  ```

### 3. Individual product photos
- **What:** Each scent photographed on white or black background (clean cutout)
- **Naming:** `public/images/products/{product-id}.png`

| File | Product |
|------|---------|
| `golden-peach.png` | Broskyňa / Golden Peach |
| `coconut-blanc.png` | Kokos / Coconut Blanc |
| `pure-platinum.png` | Platinum / Pure Platinum |
| `watermellow.png` | Melón / Watermellow |
| `vanilla-candy.png` | Vanilka so žuvačkou / Vanilla Candy |
| `citrus-garden.png` | Verbena / Citrus Garden |

- **Code:** Replace placeholder `<div>` in [ProductShowcase.vue](app/components/ProductShowcase.vue) with:
  ```html
  <img :src="`/images/products/${product.id}.png`" :alt="product[lang].name"
       class="h-64 object-contain" />
  ```

### 4. Natural ingredient / composition photos
Per the brief — natural detail photos for each product, to be placed alongside or instead of SVG scent icons:

| Product | Ingredient visual | Source |
|---------|------------------|--------|
| Broskyňa (Peach) | Peaches in natural setting | AI-generated (realistic) |
| Kokos (Coconut) | Coconut detail | Composition photo |
| Platinum | Minimal abstract / metallic texture | TBD |
| Melón (Watermelon) | Scattered watermelon slices | Composition photo |
| Vanilka (Vanilla) | Vanilla pods | Composition photo |
| Verbena (Citrus Garden) | Lemons/limes detail (can be without product) | Composition photo |

- **Where to place:** `public/images/ingredients/{product-id}-detail.jpg`
- Once available, add as background or overlay in [ProductShowcase.vue](app/components/ProductShowcase.vue)

---

## ⏳ Deferred Features (do later)

### Banner slider
- Client comment: "Toto len ako možnosť, zatiaľ nerealizovať" (optional, do not implement yet)
- Will go at the top of the HOME section
- Implement once design direction is confirmed

---

## 🖼 SVG Scent Icons — Current Mapping

Existing SVGs vs. proposed ingredient visuals (interim placeholders):

| Product | Current SVG | Final target |
|---------|-------------|-------------|
| Broskyňa | `orange-slice.svg` + `flame.svg` | Peach composition photo |
| Kokos | `ice-crystal.svg` + `water-drop.svg` | Coconut composition photo |
| Platinum | `ice-crystal.svg` + `water-drop.svg` | Minimal metallic visual |
| Melón | `raspberry.svg` + `water-drop.svg` | Watermelon composition photo |
| Vanilka | `flame.svg` + `orange-slice.svg` | Vanilla pod composition photo |
| Verbena | `lime-slice.svg` + `citrus-drop.svg` | Citrus detail photo (can be without product) |

Missing SVGs referenced in old code (now removed from products.ts):
- ~~vanilla-pod.svg~~ — replaced with `flame.svg` interim
- ~~watermelon-slice.svg~~ — replaced with `raspberry.svg` interim
- ~~star.svg~~ — removed

---

## 🌐 SK / EN Translation — Completeness

| Section | SK | EN |
|---------|----|----|
| Navigation | ✅ | ✅ |
| Hero pretitle / buttons | ✅ | ✅ |
| About Us section | ✅ | ✅ |
| Products (names, taglines, descriptions) | ✅ | ✅ |
| Footer | ✅ | ✅ |
| Product flavour labels | shared (EN proper name) | shared |

**Note:** Product `flavour` labels (e.g. "Golden Peach", "Watermellow") use the official EN product name on labels — they are intentionally the same in both languages as brand identifiers.

---

## 🎨 Colour Reference

| Scent | EN name | Colour | Hex |
|-------|---------|--------|-----|
| Broskyňa | Golden Peach | Peach orange | `#f47923` |
| Kokos | Coconut Blanc | Light silver (display) | `#c8cac8` |
| Platinum | Pure Platinum | Cool grey | `#b8bcc3` |
| Melón | Watermellow | Soft pink-red | `#f0517b` |
| Vanilka so žuvačkou | Vanilla Candy | Warm yellow | `#efd35a` |
| Verbena | Citrus Garden | Fresh green | `#89c540` |

> **Note:** Coconut label colour is `#fafbfb` (near-white). For on-screen display against dark background it is rendered as `#c8cac8` (medium grey) to remain visible. Update if the brand specifies a different on-dark colour.
