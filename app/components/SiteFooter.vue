<template>
  <footer id="contact" class="border-t border-white/5 py-12 md:py-20 px-5 md:px-8" style="background: #131311;">
    <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-start justify-between gap-10 md:gap-12">
      <!-- Brand -->
      <div>
        <p class="text-stone-600 text-sm max-w-xs leading-relaxed">
          {{ t('footer.tagline') }}
        </p>
      </div>

      <!-- Links -->
      <div class="flex flex-wrap gap-8 md:gap-16 text-sm text-stone-500">
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
        <!-- Contact column -->
        <div v-if="heroContact.visible" class="flex flex-col gap-3">
          <p class="text-stone-300 font-medium mb-1 tracking-widest uppercase text-[10px]">
            {{ t('footer.contact') }}
          </p>
          <a v-if="heroContact.email" :href="`mailto:${heroContact.email}`"
             class="hover:text-white transition-colors duration-300">
            {{ heroContact.email }}
          </a>
          <a v-if="heroContact.phone" :href="`tel:${heroContact.phone.replace(/\s/g,'')}`"
             class="hover:text-white transition-colors duration-300">
            {{ heroContact.phone }}
          </a>
          <!-- Social icons -->
          <div class="flex items-center gap-4 mt-1">
            <a v-if="heroContact.instagram" :href="heroContact.instagram" target="_blank" rel="noopener"
               class="hover:text-white transition-colors duration-300" :title="t('footer.instagram')">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            <a v-if="heroContact.facebook" :href="heroContact.facebook" target="_blank" rel="noopener"
               class="hover:text-white transition-colors duration-300" :title="t('footer.facebook')">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="max-w-6xl mx-auto mt-10 md:mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-stone-600">
      <div class="flex flex-col gap-1.5">
        <p>© {{ year }} wellow. {{ t('footer.rights') }}</p>
        <p>{{ t('footer.aiNote') }}</p>
      </div>
      <p>
        {{ t('footer.madeWith') }}
        <a
          href="https://www.patrikborzik.sk"
          target="_blank"
          rel="noopener noreferrer"
          class="text-stone-400 hover:text-white transition-colors duration-300"
        >Patrikom Boržíkom</a>
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { products } from '~/data/products'
import { useLocale } from '~/composables/useLocale'
import { heroContact } from '~/config/head'

const { t, lang } = useLocale()
const year = new Date().getFullYear()
</script>
