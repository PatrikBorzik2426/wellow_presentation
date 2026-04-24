<template>
  <section class="w-full min-h-screen bg-black flex flex-col items-center justify-center py-24 px-6">
    <p class="text-xs tracking-[0.4em] uppercase text-neutral-500 mb-3 font-sans">Who we are</p>
    <h2 class="font-display text-4xl md:text-6xl font-bold text-white mb-16 text-center">
      About Wellow
    </h2>

    <!-- Swiper carousel -->
    <div class="w-full max-w-4xl relative">
      <Swiper
        :modules="swiperModules"
        :slides-per-view="1"
        :space-between="0"
        :pagination="{ clickable: true }"
        :navigation="true"
        :grab-cursor="true"
        :autoplay="{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }"
        loop
        class="about-swiper"
      >
        <SwiperSlide v-for="(slide, i) in slides" :key="i">
          <div class="flex flex-col md:flex-row items-center gap-10 px-4 md:px-16 py-8">
            <!-- Icon / visual side -->
            <div
              class="shrink-0 w-40 h-40 rounded-full flex items-center justify-center border border-white/10"
              :style="{ boxShadow: `0 0 40px ${slide.color}40` }"
            >
              <span class="text-6xl">{{ slide.emoji }}</span>
            </div>
            <!-- Text side -->
            <div class="text-center md:text-left">
              <h3
                class="font-display text-2xl md:text-3xl font-bold mb-4"
                :style="{ color: slide.color }"
              >
                {{ slide.title }}
              </h3>
              <p class="text-neutral-400 text-base md:text-lg leading-relaxed max-w-xl">
                {{ slide.body }}
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const swiperModules = [Navigation, Pagination, Autoplay]

const slides = [
  {
    title: 'Our Mission',
    body: 'Wellow was founded on the belief that premium performance shouldn\'t come at the cost of taste. We engineer every product to deliver real, measurable results—without compromising on flavour or transparency.',
    emoji: '🎯',
    color: '#00fff5',
  },
  {
    title: 'Clean Formulas',
    body: 'Every ingredient earns its place. We use science-backed doses, full label disclosure, and zero proprietary blends. No fillers, no shortcuts—just ingredients that work.',
    emoji: '🧪',
    color: '#b6ff00',
  },
  {
    title: 'Crafted for Athletes',
    body: 'From elite sport to daily grind, our range is trusted by athletes, entrepreneurs, and creatives who demand the best from their bodies and minds.',
    emoji: '⚡',
    color: '#ff2d78',
  },
  {
    title: 'Sustainability First',
    body: 'Our packaging is 100% recyclable, our supply chain is audited for ethics, and we offset every tonne of carbon produced during manufacturing.',
    emoji: '🌍',
    color: '#ff6a00',
  },
]
</script>

<style>
/* Hide arrows on mobile, show on md+ */
.about-swiper .swiper-button-next,
.about-swiper .swiper-button-prev {
  display: none;
  color: #00fff5;
}

@media (min-width: 768px) {
  .about-swiper .swiper-button-next,
  .about-swiper .swiper-button-prev {
    display: flex;
  }

  /* Push arrows outside the slide content area */
  .about-swiper .swiper-button-prev { left: -56px; }
  .about-swiper .swiper-button-next { right: -56px; }
}

.about-swiper .swiper-pagination-bullet {
  background: transparent !important;
  border: 2px solid #ffffff !important;
  opacity: 0.5 !important;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.about-swiper .swiper-pagination-bullet:hover {
  opacity: 1 !important;
  transform: scale(1.2);
}

.about-swiper .swiper-pagination-bullet-active {
  background: #ffffff !important;
  border-color: #ffffff !important;
  opacity: 1 !important;
}
</style>
