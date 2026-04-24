<template>
  <!-- Side nav — center-left, vertical -->
  <nav
    class="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 z-50 flex-col gap-5"
  >
    <a
      v-for="item in navItems"
      :key="item.id"
      :href="item.href"
      class="group flex items-center gap-3 cursor-pointer"
      @click.prevent="scrollTo(item.href)"
    >
      <!-- Indicator circle -->
      <span
        class="block w-3 h-3 rounded-full border-2 border-white transition-all duration-300"
        :class="activeSection === item.id
          ? 'bg-white opacity-100 scale-100'
          : 'bg-transparent opacity-50 group-hover:opacity-100 group-hover:scale-125'"
      />
      <!-- Label -->
      <span
        class="text-xs tracking-widest uppercase font-sans transition-all duration-300 whitespace-nowrap"
        :class="activeSection === item.id ? 'opacity-100' : 'opacity-20'"
        :style="activeSection === item.id ? { color: '#ffffff' } : {}"
      >
        {{ item.label }}
      </span>
    </a>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const activeSection = ref('hero')

const navItems = [
  { id: 'hero',     label: 'Home',     href: '#hero',     color: '#00fff5' },
  { id: 'about',    label: 'About',    href: '#about',    color: '#00fff5' },
  { id: 'products', label: 'Products', href: '#products', color: '#00fff5' },
  { id: 'contact',  label: 'Contact',  href: '#contact',  color: '#00fff5' },
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
  const sections = ['hero', 'about', 'products', 'contact']

  // rootMargin clips the detection zone to a band around the vertical center,
  // so even very tall sections register as active when they occupy the middle.
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id || 'hero'
        }
      }
    },
    { threshold: 0, rootMargin: '-45% 0px -45% 0px' }
  )

  for (const id of sections) {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  }
})

onBeforeUnmount(() => observer?.disconnect())
</script>
