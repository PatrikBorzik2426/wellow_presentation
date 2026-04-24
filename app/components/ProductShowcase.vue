<template>
  <div>
    <div
      v-for="(product, index) in products"
      :key="product.id"
      :id="product.id"
      :ref="(el) => setRef(el, index)"
      class="product-panel w-full min-h-screen flex flex-col md:flex-row items-center justify-center relative overflow-hidden px-8 md:px-24"
    >
      <!-- Background: pure black base -->
      <div class="absolute inset-0 bg-black" />

      <!-- Gradient layer: mobile = bottom→top, desktop = left↔right mirrored -->
      <div
        class="md:hidden absolute inset-0 transition-opacity duration-1000 ease-in-out"
        :style="{
          background: `linear-gradient(0deg, #000000 0%, rgba(${product.neonRgb.join(',')}, 0.04) 30%, rgba(${product.neonRgb.join(',')}, 0.14) 65%, rgba(${product.neonRgb.join(',')}, 0.28) 100%)`,
          opacity: visibleIndex === index ? 1 : 0,
        }"
      />
      <div
        class="hidden md:block absolute inset-0 transition-opacity duration-1000 ease-in-out"
        :style="{
          background: index % 2 === 0
            ? `linear-gradient(90deg, #000000 0%, rgba(${product.neonRgb.join(',')}, 0.04) 30%, rgba(${product.neonRgb.join(',')}, 0.14) 65%, rgba(${product.neonRgb.join(',')}, 0.28) 100%)`
            : `linear-gradient(270deg, #000000 0%, rgba(${product.neonRgb.join(',')}, 0.04) 30%, rgba(${product.neonRgb.join(',')}, 0.14) 65%, rgba(${product.neonRgb.join(',')}, 0.28) 100%)`,
          opacity: visibleIndex === index ? 1 : 0,
        }"
      />

      <!-- Radial bloom: mobile = bottom center, desktop = left/right mirrored -->
      <div
        class="md:hidden absolute inset-0 transition-opacity duration-1000 ease-in-out"
        :style="{
          background: `radial-gradient(ellipse 80% 60% at 50% 85%, rgba(${product.neonRgb.join(',')}, 0.12) 0%, transparent 70%)`,
          opacity: visibleIndex === index ? 1 : 0,
        }"
      />
      <div
        class="hidden md:block absolute inset-0 transition-opacity duration-1000 ease-in-out"
        :style="{
          background: index % 2 === 0
            ? `radial-gradient(ellipse 60% 80% at 85% 50%, rgba(${product.neonRgb.join(',')}, 0.12) 0%, transparent 70%)`
            : `radial-gradient(ellipse 60% 80% at 15% 50%, rgba(${product.neonRgb.join(',')}, 0.12) 0%, transparent 70%)`,
          opacity: visibleIndex === index ? 1 : 0,
        }"
      />

      <!-- Bottom neon line -->
      <div
        class="absolute inset-x-0 bottom-0 h-px transition-opacity duration-700"
        :style="{
          background: index % 2 === 0
            ? `linear-gradient(90deg, transparent 0%, ${product.neon} 60%, ${product.neon} 80%, transparent 100%)`
            : `linear-gradient(270deg, transparent 0%, ${product.neon} 60%, ${product.neon} 80%, transparent 100%)`,
          opacity: visibleIndex === index ? 0.6 : 0,
          boxShadow: `0 0 12px ${product.neon}`,
        }"
      />

      <!-- Content -->
      <div
        class="relative z-10 flex flex-col items-center gap-16 w-full max-w-6xl"
        :class="index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'"
      >
        <!-- Text side -->
        <div
          class="flex-1 text-center"
          :class="index % 2 === 0 ? 'md:text-left' : 'md:text-right'"
        >
          <p
            class="hidden md:block font-display text-8xl font-extrabold leading-none select-none mb-6"
            :style="{ color: `rgba(${product.neonRgb.join(',')}, 0.40)` }"
          >
            {{ String(index + 1).padStart(2, '0') }}
          </p>

          <p class="text-xs tracking-[0.4em] uppercase mb-3"
             :style="{ color: product.neon }">
            {{ product.flavour }}
          </p>

          <h2 class="font-display text-3xl md:text-7xl font-extrabold text-white leading-none mb-4 md:mb-6">
            {{ product.name }}
          </h2>

          <p class="text-base md:text-xl text-neutral-300 italic mb-4 md:mb-6">
            "{{ product.tagline }}"
          </p>

          <p
            class="text-neutral-500 text-sm md:text-base leading-relaxed max-w-md"
            :class="index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'"
          >
            {{ product.description }}
          </p>

          <button
            class="mt-10 px-8 py-3 text-sm tracking-widest uppercase font-medium transition-all duration-300 border"
            :style="{
              borderColor: product.neon,
              color: product.neon,
              boxShadow: `0 0 20px ${product.neon}30`,
            }"
          >
            Learn More
          </button>
        </div>

        <!-- Right: product visual + floating scents -->
        <div class="flex-1 flex items-center justify-center overflow-visible">
          <div class="relative" style="width: 320px; height: 320px; overflow: visible;">

            <!-- Floating scent images — positioned relative to the product orb -->
            <img
              v-for="(scent, si) in product.scents"
              :key="si"
              :src="scent.src"
              :alt="`${product.flavour} scent`"
              class="absolute pointer-events-none select-none scent-float"
              :style="{
                width:  `${scent.size}px`,
                height: `${scent.size}px`,
                left:   `calc(50% + ${scent.offsetX}px - ${scent.size / 2}px)`,
                top:    `calc(50% + ${scent.offsetY}px - ${scent.size / 2}px)`,
                animationDuration: `${scent.duration}s`,
                animationDelay:    `${scent.delay}s`,
                filter: `drop-shadow(0 0 6px ${product.neon}80)`,
                opacity: visibleIndex === index ? 1 : 0,
                transition: 'opacity 1.2s ease',
              }"
            />

            <!-- Product orb -->
            <div
              class="absolute inset-0 rounded-full flex items-center justify-center transition-all duration-1000"
              :style="{
                background: `radial-gradient(circle, rgba(${product.neonRgb.join(',')}, 0.15) 0%, transparent 70%)`,
                boxShadow: visibleIndex === index
                  ? `0 0 80px rgba(${product.neonRgb.join(',')}, 0.35)`
                  : `0 0 20px rgba(${product.neonRgb.join(',')}, 0.1)`,
              }"
            >
              <div
                class="w-56 h-56 rounded-full border flex items-center justify-center"
                :style="{ borderColor: `rgba(${product.neonRgb.join(',')}, 0.35)` }"
              >
                <div
                  class="w-36 h-36 rounded-full border-2 flex items-center justify-center text-5xl"
                  :style="{ borderColor: product.neon }"
                >
                  🧃
                </div>
              </div>
            </div>

            <!-- 3D badge -->
            <span
              v-if="product.has3D"
              class="absolute bottom-6 right-6 text-xs px-2 py-1 rounded font-mono tracking-wider z-10"
              :style="{
                background: `rgba(${product.neonRgb.join(',')}, 0.15)`,
                color: product.neon,
                border: `1px solid rgba(${product.neonRgb.join(',')}, 0.3)`,
              }"
            >3D</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { products } from '~/data/products'

const visibleIndex = ref<number | null>(null)
const panelRefs = ref<Element[]>([])

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
    { threshold: 0.35 }
  )
  panelRefs.value.forEach((el) => observer.observe(el))
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<style>
@keyframes scent-float {
  0%   { transform: translateY(0px)   rotate(-4deg) scale(1); }
  35%  { transform: translateY(-14px) rotate( 2deg) scale(1.04); }
  65%  { transform: translateY(-10px) rotate(-1deg) scale(1.02); }
  100% { transform: translateY(0px)   rotate(-4deg) scale(1); }
}

.scent-float {
  animation-name: scent-float;
  animation-timing-function: cubic-bezier(0.45, 0.05, 0.55, 0.95);
  animation-iteration-count: infinite;
  animation-fill-mode: both;
}
</style>
