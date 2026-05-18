<template>
  <section id="gallery" style="background: #131311;" class="w-full py-10 md:py-16 px-4 md:px-12">
    <div class="max-w-6xl mx-auto">

      <!-- Section label -->
      <p class="text-[10px] tracking-[0.45em] uppercase text-stone-500 mb-10 font-sans">
        {{ t('gallery.pretitle') }}
      </p>

      <!-- Dense CSS grid gallery -->
      <div class="gallery-grid">
        <div
          v-for="(src, i) in images"
          :key="src"
          class="gallery-item overflow-hidden"
          :class="spanClass(i)"
        >
          <img
            :src="src"
            :alt="`Wellow gallery ${i + 1}`"
            class="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
            loading="lazy"
          />
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { useLocale } from '~/composables/useLocale'

const { t } = useLocale()
const asset = useAsset()

const images = [
  asset('/gallery/1.jpg'),
  asset('/gallery/2.jpg'),
  asset('/gallery/3.jpg'),
  asset('/gallery/4.jpg'),
  asset('/gallery/5.jpg'),
  asset('/gallery/6.jpg'),
]

// Alternate wide/tall spans for visual rhythm across 6 images
function spanClass(i: number): string {
  // Pattern: wide, normal, normal, wide, normal, normal
  if (i === 0 || i === 3) return 'col-span-2'
  return ''
}
</script>

<style scoped>
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 220px;
  gap: 4px;
}

.gallery-item {
  grid-column: span 1;
}

.gallery-item.col-span-2 {
  grid-column: span 2;
}

@media (max-width: 767px) {
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 180px;
    gap: 3px;
  }
  .gallery-item.col-span-2 {
    grid-column: span 2;
  }
}
</style>
