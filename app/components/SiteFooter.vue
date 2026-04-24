<template>
  <footer id="contact" class="bg-black border-t border-white/5 py-20 px-8">
    <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-start justify-between gap-12">
      <div>
        <p class="font-display text-2xl font-bold tracking-widest text-white uppercase mb-4">Wellow</p>
        <p class="text-neutral-600 text-sm max-w-xs leading-relaxed">
          Premium performance nutrition. Crafted with science, obsessed with flavour.
        </p>
      </div>

      <div class="flex gap-16 text-sm text-neutral-500">
        <div class="flex flex-col gap-3">
          <p class="text-white font-medium mb-1 tracking-widest uppercase text-xs">Products</p>
          <a v-for="p in products" :key="p.id" :href="`#${p.id}`"
             class="hover:text-white transition-colors">{{ p.name }}</a>
        </div>
        <div class="flex flex-col gap-3">
          <p class="text-white font-medium mb-1 tracking-widest uppercase text-xs">Company</p>
          <a href="#about" class="hover:text-white transition-colors">About</a>
          <a href="#" class="hover:text-white transition-colors">Press</a>
          <a href="#" class="hover:text-white transition-colors">Careers</a>
        </div>
      </div>
    </div>

    <div class="max-w-6xl mx-auto mt-16 pt-8 border-t border-white/5 flex items-center justify-between text-xs text-neutral-700">
      <p>© {{ year }} Wellow. All rights reserved.</p>
      <p>Made with <span class="text-neon-cyan">●</span></p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { products } from '~/data/products'
const year = new Date().getFullYear()
</script>
