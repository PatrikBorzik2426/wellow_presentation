<template>
  <div id="products">
    <div
      v-for="(product, index) in products"
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
            class="hidden md:block font-display text-8xl font-extrabold leading-none select-none mb-5"
            :style="{ color: `rgba(${product.colourRgb.join(',')}, 0.15)` }"
          >
            {{ String(index + 1).padStart(2, '0') }}
          </p>

          <p
            class="text-[10px] tracking-[0.45em] uppercase mb-3 font-sans"
            :style="{ color: product.colour }"
          >
            {{ product.flavour }}
          </p>

          <h2 class="font-display text-3xl md:text-6xl font-extrabold text-white leading-none mb-4 md:mb-5">
            {{ product[lang].name }}
          </h2>

          <p class="text-base md:text-lg italic mb-4 md:mb-5" style="color: #8a8a86;">
            "{{ product[lang].tagline }}"
          </p>

          <p
            class="text-sm md:text-base leading-relaxed max-w-md"
            style="color: #5e5e5a;"
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

        <!-- Visual side: main scent icon + secondary floating icon -->
        <div class="flex-1 flex items-center justify-center overflow-visible">
          <div class="relative" style="width: 260px; height: 260px; overflow: visible;">

            <!-- Soft colour glow behind main icon -->
            <div
              class="absolute inset-0 rounded-full transition-all duration-1000"
              :style="{
                background: `radial-gradient(circle, rgba(${product.colourRgb.join(',')}, 0.12) 0%, transparent 65%)`,
                filter: 'blur(24px)',
                opacity: visibleIndex === index ? 1 : 0.3,
              }"
            />

            <!-- Secondary floating scent icon -->
            <img
              v-if="product.scents[1]"
              :src="product.scents[1].src"
              :alt="product.flavour"
              class="absolute pointer-events-none select-none scent-float"
              :style="{
                width:  `${product.scents[1].size * 0.7}px`,
                height: `${product.scents[1].size * 0.7}px`,
                left:   `calc(50% + ${product.scents[1].offsetX * 0.75}px - ${(product.scents[1].size * 0.7) / 2}px)`,
                top:    `calc(50% + ${product.scents[1].offsetY * 0.75}px - ${(product.scents[1].size * 0.7) / 2}px)`,
                animationDuration: `${product.scents[1].duration * 1.2}s`,
                animationDelay:    `${product.scents[1].delay}s`,
                filter: `drop-shadow(0 2px 6px rgba(${product.colourRgb.join(',')}, 0.30))`,
                opacity: visibleIndex === index ? 0.70 : 0,
                transition: 'opacity 1.2s ease',
              }"
            />

            <!-- Main scent icon — product visual stand-in, centred and prominent -->
            <img
              :src="product.scents[0].src"
              :alt="product.flavour"
              class="absolute scent-float"
              style="left: 50%; top: 50%; transform: translate(-50%, -50%);"
              :style="{
                width:  '130px',
                height: '130px',
                filter: `drop-shadow(0 4px 20px rgba(${product.colourRgb.join(',')}, 0.45))`,
                opacity: visibleIndex === index ? 1 : 0,
                transition: 'opacity 1.2s ease',
                animationDuration: '5.5s',
                animationDelay: '0s',
              }"
            />

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { products } from '~/data/products'
import { useLocale } from '~/composables/useLocale'

const { t, lang } = useLocale()

const visibleIndex = ref<number | null>(null)
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
          if (idx !== -1) visibleIndex.value = idx
        }
      }
    },
    { threshold: 0.35 },
  )
  panelRefs.value.forEach((el) => observer.observe(el))
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<style>
@keyframes scent-float {
  0%   { transform: translate(-50%, -50%) translateY(0px)   rotate(-3deg) scale(1); }
  35%  { transform: translate(-50%, -50%) translateY(-10px) rotate( 2deg) scale(1.03); }
  65%  { transform: translate(-50%, -50%) translateY(-7px)  rotate(-1deg) scale(1.02); }
  100% { transform: translate(-50%, -50%) translateY(0px)   rotate(-3deg) scale(1); }
}
</style>

<style scoped>
/* Override for non-centred floating icons */
.scent-float:not([style*="left: 50%"]) {
  animation-name: scent-float-offset;
}

@keyframes scent-float-offset {
  0%   { transform: translateY(0px)   rotate(-3deg) scale(1); }
  35%  { transform: translateY(-10px) rotate( 2deg) scale(1.03); }
  65%  { transform: translateY(-7px)  rotate(-1deg) scale(1.02); }
  100% { transform: translateY(0px)   rotate(-3deg) scale(1); }
}

.scent-float {
  animation-name: scent-float;
  animation-timing-function: cubic-bezier(0.45, 0.05, 0.55, 0.95);
  animation-iteration-count: infinite;
  animation-fill-mode: both;
}

</style>
