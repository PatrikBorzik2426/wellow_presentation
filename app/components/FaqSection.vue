<template>
  <section class="py-14 md:py-24 px-5 md:px-24" style="background: #131311;">
    <div class="max-w-3xl mx-auto">
      <p class="text-xs tracking-[0.45em] uppercase mb-3 font-sans" style="color: #7c7c78;">
        {{ t('faq.pretitle') }}
      </p>
      <h2 class="font-display text-3xl md:text-4xl font-bold text-white mb-14">
        {{ t('faq.title') }}
      </h2>

      <div class="flex flex-col" style="border-top: 1px solid rgba(255,255,255,0.07);">
        <div
          v-for="(item, idx) in faqItems"
          :key="idx"
          style="border-bottom: 1px solid rgba(255,255,255,0.07);"
        >
          <button
            class="w-full flex items-start justify-between text-left py-5 gap-6"
            @click="toggle(idx)"
          >
            <span class="text-white font-medium text-sm md:text-base leading-snug">{{ item.q }}</span>
            <span
              class="shrink-0 text-xl leading-none mt-0.5"
              style="color: #7c7c78; transition: transform 0.3s ease;"
              :style="{ transform: openSet.has(idx) ? 'rotate(45deg)' : 'rotate(0deg)' }"
            >+</span>
          </button>

          <Transition name="faq">
            <div v-if="openSet.has(idx)" class="pb-6 overflow-hidden">
              <p
                class="text-sm md:text-base leading-relaxed"
                style="color: rgba(228,228,224,0.75);"
                v-html="item.a"
              />
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLocale } from '~/composables/useLocale'

const { t } = useLocale()

const faqItems = computed(() => [
  { q: t('faq.q1'), a: t('faq.a1') },
  { q: t('faq.q2'), a: t('faq.a2') },
  { q: t('faq.q3'), a: t('faq.a3') },
  { q: t('faq.q4'), a: t('faq.a4') },
  { q: t('faq.q5'), a: t('faq.a5') },
  { q: t('faq.q6'), a: t('faq.a6') },
  { q: t('faq.q7'), a: t('faq.a7') },
  { q: t('faq.q8'), a: t('faq.a8') },
])

const openSet = ref<Set<number>>(new Set())

function toggle(idx: number) {
  if (openSet.value.has(idx)) {
    openSet.value.delete(idx)
  } else {
    openSet.value.add(idx)
  }
  openSet.value = new Set(openSet.value)
}
</script>

<style scoped>
.faq-enter-active,
.faq-leave-active {
  transition: max-height 0.35s ease, opacity 0.25s ease;
  max-height: 400px;
}
.faq-enter-from,
.faq-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
