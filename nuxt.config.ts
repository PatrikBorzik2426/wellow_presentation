export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@vueuse/nuxt'],
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
  },
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: {
      htmlAttrs: { lang: 'sk' },
      title: 'Wellow – Vôňa, ktorá prúdi.',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'canonical', href: 'https://www.wellow.sk/' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Wellow prináša prémiovú vôňu tam, kde prirodzene prúdi vzduch. Slovenský produkt navrhnutý pre bytové klimatizácie.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://www.wellow.sk/' },
        { property: 'og:title', content: 'Wellow – Vôňa, ktorá prúdi.' },
        { property: 'og:description', content: 'Wellow prináša prémiovú vôňu tam, kde prirodzene prúdi vzduch. Slovenský produkt navrhnutý pre bytové klimatizácie.' },
        { property: 'og:image', content: 'https://www.wellow.sk/pngs/new_frontal_black.png' },
        { property: 'og:locale', content: 'sk_SK' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Wellow – Vôňa, ktorá prúdi.' },
        { name: 'twitter:description', content: 'Wellow prináša prémiovú vôňu tam, kde prirodzene prúdi vzduch. Slovenský produkt navrhnutý pre bytové klimatizácie.' },
        { name: 'twitter:image', content: 'https://www.wellow.sk/pngs/new_frontal_black.png' },
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Brand',
            name: 'Wellow',
            url: 'https://www.wellow.sk',
            logo: 'https://www.wellow.sk/favicon.svg',
            description: 'Prémiové vône navrhnuté pre bytové klimatizácie. Slovenský produkt.',
          }),
        },
      ],
    },
  },
  nitro: {
    preset: 'static',
  },
  ssr: true,
})
