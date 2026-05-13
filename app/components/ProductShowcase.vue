<template>
  <div id="products">
    <div
      v-for="(product, index) in activeProducts"
      :key="product.id"
      :id="product.id"
      :ref="(el) => setRef(el, index)"
      class="product-panel w-full min-h-screen flex flex-col md:flex-row items-center justify-center relative overflow-hidden px-8 md:px-24"
    >
      <!-- Dark base -->
      <div class="absolute inset-0" style="background: #131311;" />

      <!-- Gradient layer — desktop left↔right, mobile bottom→top -->
      <div
        class="md:hidden absolute inset-0 transition-opacity duration-1000 ease-in-out"
        :style="{
          background: `linear-gradient(0deg, #1e1e1e 0%, rgba(${product.colourRgb.join(',')}, 0.04) 45%, rgba(${product.colourRgb.join(',')}, 0.10) 100%)`,
          opacity: visibleIndex === index ? 1 : 0,
        }"
      />
      <div
        class="hidden md:block absolute inset-0 transition-opacity duration-1000 ease-in-out"
        :style="{
          background: index % 2 === 0
            ? `linear-gradient(90deg, #1e1e1e 0%, rgba(${product.colourRgb.join(',')}, 0.04) 45%, rgba(${product.colourRgb.join(',')}, 0.10) 100%)`
            : `linear-gradient(270deg, #1e1e1e 0%, rgba(${product.colourRgb.join(',')}, 0.04) 45%, rgba(${product.colourRgb.join(',')}, 0.10) 100%)`,
          opacity: visibleIndex === index ? 1 : 0,
        }"
      />

      <!-- Radial bloom -->
      <div
        class="hidden md:block absolute inset-0 transition-opacity duration-1000 ease-in-out"
        :style="{
          background: index % 2 === 0
            ? `radial-gradient(ellipse 50% 65% at 84% 50%, rgba(${product.colourRgb.join(',')}, 0.07) 0%, transparent 70%)`
            : `radial-gradient(ellipse 50% 65% at 16% 50%, rgba(${product.colourRgb.join(',')}, 0.07) 0%, transparent 70%)`,
          opacity: visibleIndex === index ? 1 : 0,
        }"
      />

      <!-- Bottom accent line -->
      <div
        class="absolute inset-x-0 bottom-0 h-px transition-opacity duration-700"
        :style="{
          background: index % 2 === 0
            ? `linear-gradient(90deg, transparent 0%, ${product.colour} 55%, ${product.colour} 80%, transparent 100%)`
            : `linear-gradient(270deg, transparent 0%, ${product.colour} 55%, ${product.colour} 80%, transparent 100%)`,
          opacity: visibleIndex === index ? 0.28 : 0,
        }"
      />

      <!-- Content -->
      <div
        class="relative z-10 flex flex-col items-center gap-14 w-full max-w-6xl"
        :class="index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'"
      >
        <!-- Text side -->
        <div
          class="flex-1 text-center"
          :class="index % 2 === 0 ? 'md:text-left' : 'md:text-right'"
        >
          <p
            class="text-sm tracking-[0.45em] uppercase mb-3 font-sans"
            :style="{ color: product.colour }"
          >
            {{ product[lang].category ?? product.flavour }}
          </p>

          <h2 class="font-display text-3xl md:text-6xl font-extrabold text-white leading-none mb-4 md:mb-5">
            {{ product[lang].name }}
          </h2>

          <p class="text-lg md:text-xl italic mb-4 md:mb-5" style="color: rgba(240,240,236,0.75);">
            "{{ product[lang].tagline }}"
          </p>

          <p
            class="text-base md:text-lg leading-relaxed max-w-md"
            style="color: rgba(228,228,224,0.75);"
            :class="index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'"
          >
            {{ product[lang].description }}
          </p>

          <button
            class="mt-10 px-8 py-3 text-xs tracking-widest uppercase font-medium transition-all duration-400 border"
            :style="{
              borderColor: `rgba(${product.colourRgb.join(',')}, 0.40)`,
              color:       product.colour,
            }"
            @mouseenter="(e) => (e.currentTarget as HTMLElement).style.borderColor = product.colour"
            @mouseleave="(e) => (e.currentTarget as HTMLElement).style.borderColor = `rgba(${product.colourRgb.join(',')}, 0.40)`"
          >
            {{ t('products.learnMore') }}
          </button>
        </div>

        <!-- Visual side: main scent icon + secondary floating icons -->
        <div class="visual-side flex-1 relative flex items-center justify-center overflow-visible">

          <div class="relative" style="width: 260px; height: 260px; overflow: visible;">

            <!-- Background product image — left/right version chosen by column; persists after first reveal -->
            <img
              :src="asset(index % 2 === 0 ? '/pngs/esbee_3_4_right.png' : '/pngs/esbee_3_4_left.png')"
              :alt="product.flavour"
              class="absolute pointer-events-none select-none"
              :style="{
                zIndex: product.backgroundZIndex ?? 3,
                width:  `${product.backgroundSize ?? 420}px`,
                height: `${product.backgroundSize ?? 420}px`,
                maxWidth: 'none',
                objectFit: 'contain',
                left: index % 2 === 0
                  ? `calc(50% + ${product.backgroundOffsetX ?? 0}px)`
                  : `calc(50% - ${product.backgroundOffsetX ?? 0}px)`,
                top: `calc(50% + ${product.backgroundOffsetY ?? 0}px)`,
                transform: 'translate(-50%, -50%)',
                opacity: seenPanels[index] ? 1 : 0,
                transition: 'opacity 2s ease',
                filter: `drop-shadow(0 8px 32px rgba(${product.colourRgb.join(',')}, 0.15))`,
              }"
            />

            <!-- Soft colour glow behind main icon -->
            <div
              class="absolute inset-0 rounded-full transition-all duration-1000"
              :style="{
                zIndex: 0,
                background: `radial-gradient(circle, rgba(${product.colourRgb.join(',')}, 0.12) 0%, transparent 65%)`,
                filter: 'blur(24px)',
                opacity: visibleIndex === index ? 1 : 0.3,
              }"
            />

            <!-- Center scent image — z:1, wrapper handles offsetX/Y + mirror; img floats -->
            <div
              v-if="product.scents[0]"
              class="absolute pointer-events-none select-none"
              :style="{
                zIndex: product.scents[0].zIndex ?? 1,
                width: `${product.scents[0].size}px`,
                height: `${product.scents[0].size}px`,
                left: index % 2 === 0
                  ? `calc(50% + ${product.scents[0].offsetX}px)`
                  : `calc(50% - ${product.scents[0].offsetX}px)`,
                top:  `calc(50% + ${product.scents[0].offsetY}px)`,
                transform: index % 2 !== 0
                  ? 'translate(-50%, -50%) scaleX(-1)'
                  : 'translate(-50%, -50%)',
              }"
            >
              <img
                :src="asset(product.scents[0].src)"
                :alt="product.flavour"
                class="scent-float"
                :style="{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  filter: `saturate(${product.scents[0].saturation ?? 1}) drop-shadow(0 4px 20px rgba(${product.colourRgb.join(',')}, 0.45))`,
                  opacity: visibleIndex === index ? 1 : 0,
                  transition: 'opacity 2s ease 1s',
                  animationDuration: `${product.scents[0].duration}s`,
                  animationDelay: `${product.scents[0].delay}s`,
                  '--bounce': `${product.scents[0].bounce ?? 12}px`,
                }"
              />
            </div>

          </div>

          <!-- Floating scent icons (scents[1+]) — z:2+, positioned relative to the half-panel so
               offsetX can reach the screen edge without hitting the 260 px inner ceiling -->
          <template v-for="(scent, scentIdx) in product.scents.slice(1)" :key="scent.src">
            <div
              class="absolute pointer-events-none select-none"
              :style="{
                zIndex: scent.zIndex ?? (scentIdx + 2),
                width:  `${scent.size * 0.7}px`,
                height: `${scent.size * 0.7}px`,
                left: index % 2 === 0
                  ? `calc(50% + ${scent.offsetX}px - ${(scent.size * 0.7) / 2}px)`
                  : `calc(50% - ${scent.offsetX}px - ${(scent.size * 0.7) / 2}px)`,
                top:  `calc(50% + ${scent.offsetY}px - ${(scent.size * 0.7) / 2}px)`,
                transform: index % 2 !== 0 ? 'scaleX(-1)' : undefined,
                opacity: visibleIndex === index ? 1 : 0,
                transition: `opacity 2s ease ${1.2 + scentIdx * 0.3}s`,
              }"
            >
              <img
                :src="asset(scent.src)"
                :alt="product.flavour"
                class="scent-float"
                :style="{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  animationDuration: `${scent.duration * 1.3}s`,
                  animationDelay:    `${scent.delay}s`,
                  filter: `saturate(${scent.saturation ?? 1}) drop-shadow(0 2px 6px rgba(${product.colourRgb.join(',')}, 0.30))`,
                  '--bounce': `${scent.bounce ?? 10}px`,
                }"
              />
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { products, ACTIVE_COUNT } from '~/data/products'
import { useLocale } from '~/composables/useLocale'

const { t, lang } = useLocale()
const asset = useAsset()

const activeProducts = products.slice(0, ACTIVE_COUNT)

const visibleIndex = ref<number | null>(null)
const seenPanels   = ref<boolean[]>([])
const panelRefs    = ref<Element[]>([])

function setRef(el: unknown, index: number) {
  if (el instanceof Element) panelRefs.value[index] = el
}

let observer: IntersectionObserver

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const idx = panelRefs.value.indexOf(entry.target)
          if (idx !== -1) {
            visibleIndex.value = idx
            seenPanels.value[idx] = true
          }
        }
      }
    },
    { threshold: 0.35 },
  )
  panelRefs.value.slice(0, ACTIVE_COUNT).forEach((el) => observer.observe(el))
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<style>
/* Smooth sine-wave float for centred scent (scents[0]) */
@keyframes scent-float {
  0%   { transform: translate(-50%, -50%) translateY(0px); }
  50%  { transform: translate(-50%, -50%) translateY(calc(-1 * var(--bounce, 12px))); }
  100% { transform: translate(-50%, -50%) translateY(0px); }
}
</style>

<style scoped>
/* Smooth sine-wave float for offset scents (scents[1+]) */
@keyframes scent-float-offset {
  0%   { transform: translateY(0px); }
  50%  { transform: translateY(calc(-1 * var(--bounce, 12px))); }
  100% { transform: translateY(0px); }
}

/* Override for non-centred floating icons */
.scent-float:not([style*="left: 50%"]) {
  animation-name: scent-float-offset;
}

.scent-float {
  animation-name: scent-float;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
}

/* Scale the entire visual container down on mobile so fixed-px images fit */
@media (max-width: 767px) {
  .visual-side {
    transform: scale(0.62) translateY(195px);
    transform-origin: center top;
  }
}

</style>
