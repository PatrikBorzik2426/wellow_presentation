# Wellow Presentation — Status Tracker

_Last updated: 2026-04-28_

---

## ✅ Implemented

| Area | Detail |
|------|--------|
| SK / EN toggle | `useLocale` composable with `useState`; toggle button fixed top-right on all screens |
| Navigation | HOME / O NÁS / PRODUKTY / KONTAKT (bilingual, driven by `useLocale`) |
| Hero — background | **Three.js WebGL shader** restored as animated background; warm grey/organic blobs cycle through natural scent colours (5 s/scent) |
| Hero — lighter feel | Shader grey base raised (`vec3(0.26, 0.25, 0.23)`), tone-mapping softened — less dark than original gaming version |
| Hero — O animation | `WELL[O]W` — the O cycles through all 6 scent colours; subtitle shows active product tagline in current language |
| Hero — product placeholder | Slim bottle silhouette (60 × 38 vh max); sits above shader canvas, below text |
| Products data | Real scent names: Broskyňa, Kokos, Platinum, Melón, Vanilka so žuvačkou, Verbena; natural colours from label palette |
| Colour palette | Neon → natural: Peach `#f47923`, Platinum `#b8bcc3`, Melon `#f0517b`, Vanilla `#efd35a`, Citrus `#89c540` |
| Background colour | All sections use `#131311` (warm dark, lighter than old `#000000`) |
| About Us | Lifestyle intro + 3 brand pillars (Clean / Premium / Home); lifestyle image placeholder |
| Products section | Softer gradients & glows; first scent SVG used as main product visual (130 px, centred); second SVG floats around it |
| Footer | Bilingual; vanilla `●` accent |
| Tailwind | `scent.*` natural colour tokens |

---

## ⏳ Awaiting External Assets

### 1. Hero — product photo
- **Who:** Lukáš
- **What:** Front detail of product, transparent background (PNG, no baked shadow)
- **Where to place:** `public/images/product-front.png`
- **Code:** Replace placeholder `<div class="product-placeholder">` in [HeroWaves.vue](app/components/HeroWaves.vue) with:
  ```html
  <img src="/images/product-front.png" alt="Wellow"
       class="h-[50vh] max-h-[420px] object-contain" />
  ```

### 2. About Us — lifestyle apartment photo
- **What:** Premium apartment; clean design, feeling of home; not elitist
- **Aspect:** Portrait ~4:5, high resolution
- **Where to place:** `public/images/lifestyle-apartment.jpg`
- **Code:** Replace placeholder `<div class="lifestyle-placeholder">` in [AboutSection.vue](app/components/AboutSection.vue) with:
  ```html
  <img src="/images/lifestyle-apartment.jpg" alt="Wellow lifestyle"
       class="w-full aspect-[4/5] object-cover" />
  ```

### 3. Individual product photos (standalone on white or black bg)
- **Where to place:** `public/images/products/{product-id}.png`

| File | Product |
|------|---------|
| `golden-peach.png` | Broskyňa / Golden Peach |
| `coconut-blanc.png` | Kokos / Coconut Blanc |
| `pure-platinum.png` | Platinum / Pure Platinum |
| `watermellow.png` | Melón / Watermellow |
| `vanilla-candy.png` | Vanilka so žuvačkou / Vanilla Candy |
| `citrus-garden.png` | Verbena / Citrus Garden |

- **Code:** In [ProductShowcase.vue](app/components/ProductShowcase.vue) replace the main scent `<img>` with:
  ```html
  <img :src="`/images/products/${product.id}.png`" :alt="product[lang].name"
       class="absolute object-contain"
       style="width: 200px; height: 200px; left: 50%; top: 50%; transform: translate(-50%, -50%);" />
  ```

### 4. Natural ingredient / composition photos
Detail photos for each product — replace the current scent SVG icons once available:

| Product | Visual needed | Source |
|---------|--------------|--------|
| Broskyňa (Peach) | Peaches — natural setting or AI-generated | AI (realistic) |
| Kokos (Coconut) | Coconut detail / cracked coconut | Composition photo |
| Platinum | Minimal silver/metallic surface or water droplets | TBD |
| Melón (Watermelon) | Watermelon slice / scattered pieces | Composition photo |
| Vanilka (Vanilla) | Vanilla pods, warm light | Composition photo |
| Verbena (Citrus Garden) | Lemon / lime detail — can be without product | Composition photo |

- **Where to place:** `public/images/ingredients/{product-id}.jpg`
- **Code:** In [ProductShowcase.vue](app/components/ProductShowcase.vue) replace the main scent `<img>` (currently `product.scents[0].src`) with:
  ```html
  <img :src="`/images/ingredients/${product.id}.jpg`" :alt="product.flavour"
       class="absolute object-cover"
       style="width: 200px; height: 200px; border-radius: 50%; left: 50%; top: 50%; transform: translate(-50%, -50%);"
       :style="{ boxShadow: `0 0 0 1px rgba(${product.colourRgb},0.25), 0 8px 40px rgba(${product.colourRgb},0.30)` }" />
  ```

> **Note on image sourcing:** Free high-quality images are available on [Unsplash](https://unsplash.com) and [Pexels](https://pexels.com) (both free for commercial use). Ingredient images must be placed manually in the project — they are **not** auto-downloaded. Preferred format: JPG, ~1200–1400 px wide.

---

## ⏳ Deferred Features

### Banner slider
- Client: "Toto len ako možnosť, zatiaľ nerealizovať" — optional, skip for now
- Position: top of HOME section
- Implement once overall design direction is signed off

---

## 🖼 SVG Scent Icons — Current State

Scent SVGs are currently used as the **main product visual** in the Products section (interim, until ingredient photos arrive).

| Product | Main SVG (centred, 130 px) | Floating SVG |
|---------|---------------------------|--------------|
| Broskyňa | `orange-slice.svg` | `flame.svg` |
| Kokos | `ice-crystal.svg` | `water-drop.svg` |
| Platinum | `ice-crystal.svg` | `water-drop.svg` |
| Melón | `raspberry.svg` | `water-drop.svg` |
| Vanilka | `flame.svg` | `orange-slice.svg` |
| Verbena | `lime-slice.svg` | `citrus-drop.svg` |

SVGs removed from old code (no longer referenced):
- ~~`vanilla-pod.svg`~~ — replaced with `flame.svg`
- ~~`watermelon-slice.svg`~~ — replaced with `raspberry.svg`
- ~~`star.svg`~~ — removed

---

## 🌐 SK / EN Translation — Completeness

| Section | SK | EN |
|---------|----|----|
| Navigation | ✅ | ✅ |
| Hero pretitle / buttons | ✅ | ✅ |
| About Us section | ✅ | ✅ |
| Products (names, taglines, descriptions) | ✅ | ✅ |
| Footer | ✅ | ✅ |
| Product flavour labels | shared (EN brand name) | shared |

**Note:** `flavour` labels (e.g. "Golden Peach", "Watermellow") are the official brand names used on labels — identical in both languages by design.

---

## 🎨 Colour Reference

| Scent | EN name | Hex | Notes |
|-------|---------|-----|-------|
| Broskyňa | Golden Peach | `#f47923` | From label |
| Kokos | Coconut Blanc | `#c8cac8` | Label is `#fafbfb`; toned for dark-bg visibility |
| Platinum | Pure Platinum | `#b8bcc3` | From label |
| Melón | Watermellow | `#f0517b` | From label |
| Vanilka so žuvačkou | Vanilla Candy | `#efd35a` | From label |
| Verbena | Citrus Garden | `#89c540` | From label |

> Coconut label colour `#fafbfb` (near-white) is displayed as `#c8cac8` on dark backgrounds. Confirm with brand if a specific dark-mode value is preferred.
