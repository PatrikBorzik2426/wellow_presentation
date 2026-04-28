<template>
  <div>
    <SiteNav />

    <!-- Language toggle — fixed top-right, all screen sizes -->
    <button
      class="fixed top-5 right-5 z-50 text-[10px] tracking-[0.3em] uppercase font-sans
             text-stone-400 hover:text-white border border-stone-700 hover:border-stone-400
             px-3 py-1.5 transition-all duration-300 bg-black/40 backdrop-blur-sm"
      @click="toggle"
    >
      {{ lang === 'sk' ? 'EN' : 'SK' }}
    </button>

    <NuxtPage />
    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import { useLocale } from '~/composables/useLocale'

const { lang, toggle } = useLocale()
</script>
