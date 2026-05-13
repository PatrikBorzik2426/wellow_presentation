<template>
  <section class="py-24 px-8 md:px-24" style="background: #0e0e0c;">
    <div class="max-w-6xl mx-auto">

      <!-- Header -->
      <p class="text-xs tracking-[0.45em] uppercase mb-3 font-sans" style="color: #7c7c78;">
        Kompatibilita
      </p>
      <h2 class="font-display text-3xl md:text-5xl font-bold text-white mb-6">
        Univerzálne použitie
      </h2>
      <p class="text-base md:text-lg leading-relaxed max-w-2xl mb-20" style="color: rgba(228,228,224,0.75);">
        Wellow je navrhnutý pre nástenné klimatizácie a zároveň je kompatibilný aj s väčšinou iných typov klimatizácií.
        Vďaka kompaktným rozmerom a magnetickému uchyteniu sa jednoducho umiestni bez zásahu do zariadenia.
      </p>

      <!-- Three columns -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">

        <!-- Installation steps -->
        <div>
          <p class="text-xs tracking-[0.45em] uppercase mb-6 font-sans" style="color: #7c7c78;">
            Jednoduchá inštalácia
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
            Technické informácie
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
            * Závisí od intenzity používania klimatizácie a prietoku vzduchu.
          </p>
        </div>

        <!-- Safety -->
        <div>
          <p class="text-xs tracking-[0.45em] uppercase mb-6 font-sans" style="color: #7c7c78;">
            Bezpečnosť a kvalita
          </p>
          <p class="text-sm md:text-base leading-relaxed" style="color: rgba(240,240,236,0.75);">
            Použité vonné zložky sú registrované v Európskej chemickej agentúre (ECHA) a spĺňajú požiadavky pre
            bezpečné používanie v interiéri.
          </p>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const installSteps = [
  'Otvoríte lamely klimatizácie.',
  'Umiestnite magnetický pliešok.',
  'Wellow krabičku jednoducho prichytíte magnetom a inštalácia je hotová.',
]

const specs = [
  { label: 'Rozmer',       value: '62 × 46 × 11 mm' },
  { label: 'Uchytenie',    value: 'Magnetické' },
  { label: 'Farba kazety', value: 'Čierna / biela' },
  { label: 'Výdrž vône',   value: 'Približne 30 dní*' },
]
</script>
