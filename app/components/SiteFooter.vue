<template>
  <footer id="contact" class="border-t border-white/5 py-20 px-8" style="background: #131311;">
    <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-start justify-between gap-12">
      <!-- Brand -->
      <div>
        <p class="font-display text-2xl font-bold tracking-widest text-white uppercase mb-4">Wellow</p>
        <p class="text-stone-600 text-sm max-w-xs leading-relaxed">
          {{ t('footer.tagline') }}
        </p>
      </div>

      <!-- Links -->
      <div class="flex gap-16 text-sm text-stone-500">
        <div class="flex flex-col gap-3">
          <p class="text-stone-300 font-medium mb-1 tracking-widest uppercase text-[10px]">
            {{ t('footer.products') }}
          </p>
          <a
            v-for="p in products"
            :key="p.id"
            :href="`#${p.id}`"
            class="hover:text-white transition-colors duration-300"
          >
            {{ p[lang].name }}
          </a>
        </div>
        <div class="flex flex-col gap-3">
          <p class="text-stone-300 font-medium mb-1 tracking-widest uppercase text-[10px]">
            {{ t('footer.company') }}
          </p>
          <a href="#about"  class="hover:text-white transition-colors duration-300">{{ t('footer.about') }}</a>
          <a href="#"       class="hover:text-white transition-colors duration-300">{{ t('footer.press') }}</a>
          <a href="#"       class="hover:text-white transition-colors duration-300">{{ t('footer.careers') }}</a>
        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="max-w-6xl mx-auto mt-16 pt-8 border-t border-white/5 flex items-center justify-between text-xs text-stone-700">
      <p>© {{ year }} Wellow. {{ t('footer.rights') }}</p>
      <p>{{ t('footer.madeWith') }} <span :style="{ color: '#efd35a' }">●</span></p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { products } from '~/data/products'
import { useLocale } from '~/composables/useLocale'

const { t, lang } = useLocale()
const year = new Date().getFullYear()
</script>
