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
      <h2 class="font-display text-4xl md:text-6xl font-bold text-white mb-16 leading-tight">
        {{ t('about.title') }}
      </h2>

      <!-- Split: lifestyle image + intro text -->
      <div class="flex flex-col md:flex-row gap-12 md:gap-20 items-start mb-24">

        <!-- Lifestyle image — left side -->
        <div class="w-full md:w-1/2 shrink-0">
          <!--
            ⚠ ČAKÁ NA FOTO — lifestyle obrázok z prémiového bytu (čistý dizajn, pocit domova)
            Keď bude foto k dispozícii, nahraďte placeholder div za:
            <img src="/images/lifestyle-apartment.jpg" alt="Wellow lifestyle"
                 class="w-full aspect-[4/5] object-cover" />
          -->
          <div class="lifestyle-placeholder">
            <div class="lifestyle-placeholder__inner">
              <span class="lifestyle-placeholder__label">lifestyle foto</span>
              <p class="lifestyle-placeholder__hint">prémiový byt · čistý dizajn · pocit domova</p>
            </div>
          </div>
        </div>

        <!-- Intro text — right side -->
        <div class="flex flex-col justify-center gap-8 md:pt-4">
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
import { useLocale } from '~/composables/useLocale'

const { t } = useLocale()

const pillars = [
  {
    titleKey: 'about.pillar1Title',
    bodyKey:  'about.pillar1Body',
    colour:   '#b8bcc3',  // Platinum — clean/pure
  },
  {
    titleKey: 'about.pillar2Title',
    bodyKey:  'about.pillar2Body',
    colour:   '#efd35a',  // Vanilla — warm/premium
  },
  {
    titleKey: 'about.pillar3Title',
    bodyKey:  'about.pillar3Body',
    colour:   '#89c540',  // Citrus Garden — living/home
  },
]
</script>

<style scoped>
.lifestyle-placeholder {
  width: 100%;
  aspect-ratio: 4 / 5;
  border: 1px solid rgba(255, 255, 255, 0.07);
  background: linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.lifestyle-placeholder__inner {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.lifestyle-placeholder__label {
  font-size: 10px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.22);
}

.lifestyle-placeholder__hint {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.1);
  letter-spacing: 0.05em;
}
</style>
