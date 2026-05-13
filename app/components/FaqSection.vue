<template>
  <section class="py-24 px-8 md:px-24" style="background: #131311;">
    <div class="max-w-3xl mx-auto">
      <p class="text-xs tracking-[0.45em] uppercase mb-3 font-sans" style="color: #7c7c78;">
        FAQ
      </p>
      <h2 class="font-display text-3xl md:text-4xl font-bold text-white mb-14">
        Časté otázky
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
              :style="{ transform: openIdx === idx ? 'rotate(45deg)' : 'rotate(0deg)' }"
            >+</span>
          </button>

          <Transition name="faq">
            <div v-if="openIdx === idx" class="pb-6 overflow-hidden">
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
import { ref } from 'vue'

interface FaqItem {
  q: string
  a: string
}

const faqItems: FaqItem[] = [
  {
    q: 'Ako dlho vydrží vôňa?',
    a: 'Pri bežnom používaní klimatizácie vydrží vôňa približne 30 dní.*<br><br><span style="color:#7c7c78; font-size:0.75rem;">* Závisí od intenzity používania klimatizácie a prietoku vzduchu.</span>',
  },
  {
    q: 'Zmestí sa Wellow do klimatizácie?',
    a: 'Áno. Wellow je navrhnutý pre nástenné klimatizácie a zároveň je kompatibilný aj s väčšinou iných typov klimatizácií. V prípade, že neviete ako produkt umiestniť do klimatizácie, kontaktujte nás.',
  },
  {
    q: 'Ovplyvní Wellow výkon klimatizácie?',
    a: 'Nie. Produkt je navrhnutý tak, aby neobmedzoval prúdenie vzduchu ani funkčnosť klimatizácie.',
  },
  {
    q: 'Čo ak chcem priestor prevoňať bez chladenia alebo kúrenia?',
    a: 'Stačí zapnúť klimatizáciu v režime ventilácie. Prúd vzduchu prirodzene rozptýli vôňu do priestoru bez potreby chladenia alebo vykurovania — práve prevoňanie priestoru je jedna z najväčších výhod systému Wellow.',
  },
  {
    q: 'Čo ak už nechcem, aby klimatizácia ďalej rozptyľovala vôňu?',
    a: 'Wellow je uchytený pomocou magnetu, takže ho môžete jednoducho vybrať alebo odložiť na čas, keď nechcete vôňu používať. Opätovné nasadenie trvá len pár sekúnd.',
  },
  {
    q: 'Sú vône bezpečné?',
    a: 'Áno. Použité vonné zložky sú registrované v Európskej chemickej agentúre (ECHA) a spĺňajú požiadavky pre bezpečné používanie v interiéri.',
  },
  {
    q: 'Dá sa kazeta znovu naplniť?',
    a: 'Aktuálna verzia nie je rozoberateľná. Pracujeme však na budúcej verzii s možnosťou výmeny náplne.',
  },
  {
    q: 'Čo ak mám problém s produktom?',
    a: 'Ak máte akýkoľvek problém s produktom alebo otázky k používaniu, neváhajte nás kontaktovať. Radi vám pomôžeme.',
  },
]

const openIdx = ref<number | null>(null)

function toggle(idx: number) {
  openIdx.value = openIdx.value === idx ? null : idx
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
