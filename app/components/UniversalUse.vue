<template>
  <section class="py-14 md:py-24 px-5 md:px-24" style="background: #0e0e0c;">
    <div class="max-w-6xl mx-auto">

      <!-- Header -->
      <p class="text-xs tracking-[0.45em] uppercase mb-3 font-sans" style="color: #7c7c78;">
        {{ t('use.pretitle') }}
      </p>
      <h2 class="font-display text-3xl md:text-5xl font-bold text-white mb-6">
        {{ t('use.title') }}
      </h2>
      <p class="text-base md:text-lg leading-relaxed max-w-2xl mb-12 md:mb-20" style="color: rgba(228,228,224,0.75);">
        {{ t('use.intro') }}
      </p>

      <!-- Three columns -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">

        <!-- Installation steps -->
        <div>
          <p class="text-xs tracking-[0.45em] uppercase mb-6 font-sans" style="color: #7c7c78;">
            {{ t('use.installTitle') }}
          </p>
          <ol class="flex flex-col gap-5">
            <li
              v-for="(step, i) in installSteps"
              :key="i"
              class="flex items-start gap-4"
            >
              <span
                class="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-medium mt-0.5"
                style="background: rgba(255,255,255,0.06); color: #9a9a96;"
              >{{ i + 1 }}</span>
              <p class="text-sm md:text-base leading-snug" style="color: rgba(240,240,236,0.75);">{{ step }}</p>
            </li>
          </ol>
        </div>

        <!-- Technical info -->
        <div>
          <p class="text-xs tracking-[0.45em] uppercase mb-6 font-sans" style="color: #7c7c78;">
            {{ t('use.techTitle') }}
          </p>
          <dl class="flex flex-col gap-4">
            <div
              v-for="spec in specs"
              :key="spec.label"
              class="flex flex-col gap-0.5"
              style="border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 12px;"
            >
              <dt class="text-[10px] tracking-[0.3em] uppercase" style="color: #7c7c78;">{{ spec.label }}</dt>
              <dd class="text-sm md:text-base" style="color: rgba(240,240,236,0.75);">{{ spec.value }}</dd>
            </div>
          </dl>
          <p class="text-xs mt-4 leading-snug" style="color: rgba(192,192,188,0.75);">
            {{ t('use.specFootnote') }}
          </p>
        </div>

        <!-- Safety -->
        <div>
          <p class="text-xs tracking-[0.45em] uppercase mb-6 font-sans" style="color: #7c7c78;">
            {{ t('use.safetyTitle') }}
          </p>
          <p class="text-sm md:text-base leading-relaxed" style="color: rgba(240,240,236,0.75);">
            {{ t('use.safetyText') }}
          </p>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useLocale } from '~/composables/useLocale'

const { t } = useLocale()

const installSteps = computed(() => [
  t('use.installStep1'),
  t('use.installStep2'),
  t('use.installStep3'),
])

const specs = computed(() => [
  { label: t('use.specDimensionsLabel'), value: t('use.specDimensionsValue') },
  { label: t('use.specMountLabel'),      value: t('use.specMountValue') },
  { label: t('use.specColourLabel'),     value: t('use.specColourValue') },
  { label: t('use.specLifeLabel'),       value: t('use.specLifeValue') },
])
</script>
