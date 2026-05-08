<template>
  <section
    id="about"
    style="background: #1e1e1e;"
    class="w-full py-28 px-6 md:px-16"
  >
    <div class="max-w-6xl mx-auto">

      <!-- Section label -->
      <p class="text-[10px] tracking-[0.45em] uppercase text-stone-500 mb-4 font-sans">
        {{ t('about.pretitle') }}
      </p>
      <h2 class="font-display text-4xl md:text-6xl font-bold mb-16 leading-tight" style="color: #F5F5F3;">
        {{ t('about.title') }}
      </h2>

      <!-- Split: lifestyle image + intro text -->
      <div class="flex flex-col md:flex-row gap-12 md:gap-20 items-start mb-24">

        <!-- Lifestyle slider — left side: square sized to text-column height × 1.1 -->
        <div
          class="w-full md:w-auto shrink-0"
          :style="squareStyle"
        >
          <div class="relative w-full h-full overflow-hidden rounded-lg">
            <img
              v-for="(src, i) in sliderImages"
              :key="src"
              :src="src"
              alt="Wellow lifestyle"
              class="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
              :style="{ opacity: currentSlide === i ? 1 : 0 }"
            />
            <!-- Dots -->
            <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              <button
                v-for="(_, i) in sliderImages"
                :key="i"
                class="w-1.5 h-1.5 rounded-full transition-all duration-300"
                :class="currentSlide === i ? 'bg-white' : 'bg-white/30'"
                @click="currentSlide = i"
              />
            </div>
          </div>
        </div>

        <!-- Intro text — right side -->
        <div ref="textCol" class="flex flex-col justify-center gap-8 md:pt-4">
          <p class="text-stone-300 text-lg md:text-xl leading-relaxed font-light">
            {{ t('about.intro') }}
          </p>

          <!-- Three brand pillars -->
          <div class="flex flex-col gap-8 mt-4">
            <div v-for="(pillar, i) in pillars" :key="i" class="flex gap-5 items-start">
              <div
                class="shrink-0 w-px h-10 mt-1 rounded-full"
                :style="{ background: pillar.colour }"
              />
              <div>
                <h3
                  class="font-display text-base font-semibold mb-1 tracking-wide"
                  :style="{ color: pillar.colour }"
                >
                  {{ t(pillar.titleKey) }}
                </h3>
                <p class="text-stone-400 text-sm leading-relaxed max-w-sm">
                  {{ t(pillar.bodyKey) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useLocale } from '~/composables/useLocale'

const { t } = useLocale()
const asset = useAsset()

const textCol    = ref<HTMLElement | null>(null)
const textHeight = ref(0)

function measureText() {
  if (textCol.value) textHeight.value = textCol.value.offsetHeight
}

const squareStyle = computed(() => {
  if (textHeight.value === 0) return { aspectRatio: '1/1' }
  const size = `${Math.round(textHeight.value * 1.1)}px`
  return { width: size, height: size }
})

const sliderImages = [
  asset('/slider/IMG_0494.png'),
  asset('/slider/IMG_0568.png'),
  asset('/slider/slider1.jpg'),
  asset('/slider/IMG_0037-2.png'),
]
const currentSlide = ref(0)
let sliderTimer: ReturnType<typeof setInterval>

onMounted(() => {
  sliderTimer = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % sliderImages.length
  }, 3000)
  measureText()
  window.addEventListener('resize', measureText)
})

onBeforeUnmount(() => {
  clearInterval(sliderTimer)
  window.removeEventListener('resize', measureText)
})

const pillars = [
  {
    titleKey: 'about.pillar1Title',
    bodyKey:  'about.pillar1Body',
    colour:   '#efd35a',  // Vanilla gold — premium design
  },
  {
    titleKey: 'about.pillar2Title',
    bodyKey:  'about.pillar2Body',
    colour:   '#b8bcc3',  // Platinum neutral — Slovak product
  },
  {
    titleKey: 'about.pillar3Title',
    bodyKey:  'about.pillar3Body',
    colour:   '#89c540',  // Muted citrus green — for your home
  },
]
</script>

