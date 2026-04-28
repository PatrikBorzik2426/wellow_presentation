<template>
  <!-- Side nav — center-left, vertical, desktop only -->
  <nav class="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 z-50 flex-col gap-5">
    <a
      v-for="item in navItems"
      :key="item.id"
      :href="item.href"
      class="group flex items-center gap-3 cursor-pointer"
      @click.prevent="scrollTo(item.href)"
    >
      <!-- Indicator dot -->
      <span
        class="block w-2.5 h-2.5 rounded-full border border-white/40 transition-all duration-300"
        :class="activeSection === item.id
          ? 'bg-white border-white opacity-100'
          : 'bg-transparent opacity-40 group-hover:opacity-80 group-hover:scale-110'"
      />
      <!-- Label -->
      <span
        class="text-[10px] tracking-widest uppercase font-sans transition-all duration-300 whitespace-nowrap"
        :class="activeSection === item.id ? 'text-white opacity-100' : 'text-stone-500 opacity-60 group-hover:opacity-100'"
      >
        {{ t(`nav.${item.id === 'hero' ? 'home' : item.id}`) }}
      </span>
    </a>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useLocale } from '~/composables/useLocale'

const { t } = useLocale()

const activeSection = ref('hero')

const navItems = [
  { id: 'hero',     href: '#hero'     },
  { id: 'about',   href: '#about'    },
  { id: 'products', href: '#products' },
  { id: 'contact',  href: '#contact'  },
]

function scrollTo(href: string) {
  const id = href.replace('#', '')
  if (id === 'hero') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }
}

let observer: IntersectionObserver

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id || 'hero'
        }
      }
    },
    { threshold: 0, rootMargin: '-45% 0px -45% 0px' },
  )

  for (const item of navItems) {
    const el = document.getElementById(item.id === 'hero' ? 'hero' : item.id)
    if (el) observer.observe(el)
  }
})

onBeforeUnmount(() => observer?.disconnect())
</script>
