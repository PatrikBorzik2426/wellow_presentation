<template>
  <section
    id="hero"
    class="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center"
    style="background: #131311;"
  >
    <!-- Layer 0: Three.js animated background -->
    <canvas ref="canvasEl" class="absolute inset-0 w-full h-full z-0" />

    <!-- Layer 1: Product image — above canvas, below text -->
    <div class="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
         style="padding-bottom: 16vh;">
      <!--
        ⚠ ČAKÁ NA FOTO od Lukáša — detail spredu, bez pozadia (transparentný PNG)
        Nahraďte placeholder za:
        <img src="/images/product-front.png" alt="Wellow"
             class="h-[50vh] max-h-[420px] object-contain" />
      -->
      <div class="product-placeholder" />
    </div>

    <!-- Layer 2: Text — pretitle + WELL[O]W + subtitle + button -->
    <div
      class="relative z-30 text-center px-6 select-none flex flex-col items-center"
      style="margin-top: 28vh;"
    >
      <p class="text-[10px] md:text-xs tracking-[0.45em] uppercase mb-4 font-sans font-medium"
         style="color: #9a9a96;">
        {{ t('hero.pretitle') }}
      </p>
      <h1 class="font-display text-6xl md:text-8xl font-extrabold leading-none tracking-tight text-white">
        WELL<span :style="oStyle">O</span>W
      </h1>
      <div class="mt-5 h-7 flex items-center justify-center overflow-hidden relative w-full">
        <Transition name="subtitle">
          <p
            :key="subtitleKey"
            class="text-sm md:text-base font-light absolute"
            :style="subtitleStyle"
          >
            {{ subtitleText }}
          </p>
        </Transition>
      </div>
      <button
        class="mt-8 px-8 py-3 text-xs tracking-widest uppercase border border-white/20 text-white/70
               hover:border-white/50 hover:text-white transition-all duration-500"
        @click="scrollDown"
      >
        {{ t('hero.explore') }}
      </button>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30"
         style="color: #6b6b67;">
      <span class="text-[9px] tracking-widest uppercase">{{ t('hero.scrollHint') }}</span>
      <div class="w-px h-8 bg-gradient-to-b from-stone-600 to-transparent animate-pulse" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { products } from '~/data/products'
import { useLocale } from '~/composables/useLocale'

const { t, lang } = useLocale()
const canvasEl = ref<HTMLCanvasElement | null>(null)

let renderer: THREE.WebGLRenderer
let animId: number

// ── Colour-cycle timing ───────────────────────────────────────────────────────
const N      = products.length
const PERIOD = N * 5.0

const NEONS = products.map((p, i) => ({
  hex: p.colour,
  r:   p.colourRgb[0],
  g:   p.colourRgb[1],
  b:   p.colourRgb[2],
  center: PERIOD * (i + 0.25) / N,
}))

// ── Subtitle cycling ──────────────────────────────────────────────────────────
const subtitleText  = ref('')
const subtitleKey   = ref('default')
const subtitleStyle = ref<Record<string, string>>({ color: '#9a9a96' })
let lastSubtitleKey = 'default'

// ── "O" colour ────────────────────────────────────────────────────────────────
const oStyle = ref<Record<string, string>>({ color: '#ffffff' })

function ss(e0: number, e1: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)))
  return t * t * (3 - 2 * t)
}

function win(ct: number, center: number) {
  const d = Math.abs(((ct - center + PERIOD * 0.5) % PERIOD) - PERIOD * 0.5)
  return 1 - ss(0.5, 2.0, d)
}

function updateOColor(elapsed: number) {
  const ct      = elapsed % PERIOD
  const weights = NEONS.map((n, i) => ({ ...n, i, w: win(ct, n.center) }))
  const total   = weights.reduce((s, n) => s + n.w, 0)
  const any     = Math.max(...weights.map(n => n.w))

  if (any < 0.02) {
    oStyle.value = { color: '#ffffff' }
    updateSubtitle('default', '', '#9a9a96', 'none')
    return
  }

  let r = 0, g = 0, b = 0
  for (const n of weights) { r += n.r * n.w; g += n.g * n.w; b += n.b * n.w }
  r /= total; g /= total; b /= total

  const ri  = Math.round(255 + (r - 255) * any)
  const gi  = Math.round(255 + (g - 255) * any)
  const bi  = Math.round(255 + (b - 255) * any)
  const col = `rgb(${ri},${gi},${bi})`

  oStyle.value = {
    color:      col,
    textShadow: `0 0 18px ${col}aa, 0 0 36px ${col}44`,
    transition: 'color 0.05s linear, text-shadow 0.05s linear',
  }

  const dominant = weights.reduce((a, b) => a.w > b.w ? a : b)
  if (dominant.w > 0.25) {
    const p = products[dominant.i]
    updateSubtitle(p.id, p[lang.value].tagline, col, `0 0 10px ${col}80`)
  }
}

function updateSubtitle(key: string, text: string, color: string, shadow: string) {
  if (key === lastSubtitleKey) return
  lastSubtitleKey     = key
  subtitleText.value  = text
  subtitleKey.value   = key
  subtitleStyle.value = { color, textShadow: shadow }
}

function scrollDown() {
  window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
}

// ── GLSL generation ───────────────────────────────────────────────────────────
const BLOB_FREQS = [
  [0.97, 0.41, 0.73, 0.53],
  [0.61, 0.83, 1.19, 0.29],
  [0.79, 1.11, 1.27, 0.63],
  [1.07, 0.43, 0.89, 0.71],
  [0.83, 0.67, 1.03, 0.37],
  [1.13, 0.53, 0.77, 0.91],
]
const BLOB_RADII = [
  [1.30, 0.30, 0.90, 0.20],
  [1.15, 0.25, 0.85, 0.20],
  [1.00, 0.20, 1.00, 0.25],
  [1.20, 0.30, 0.75, 0.20],
  [1.10, 0.25, 0.80, 0.20],
  [0.95, 0.30, 0.95, 0.25],
]
const ACCENT_FREQS = [
  [1.73, 1.41],
  [1.57, 1.89],
  [1.97, 1.63],
  [1.49, 1.81],
  [1.67, 1.53],
  [1.87, 1.71],
]
const ACCENT_RADII = [
  [0.70, 0.55],
  [0.65, 0.60],
  [0.55, 0.70],
  [0.75, 0.50],
  [0.60, 0.65],
  [0.70, 0.60],
]

function nestedMax(vars: string[]): string {
  if (vars.length === 1) return vars[0]
  return `max(${nestedMax(vars.slice(0, -1))}, ${vars[vars.length - 1]})`
}

function f(n: number) { return n.toFixed(4) }

function buildFragmentShader(): string {
  const colorDefs = products.map((p, i) => {
    const [r, g, b] = p.colourRgb
    return `  vec3 nc${i} = vec3(${f(r / 255)}, ${f(g / 255)}, ${f(b / 255)});`
  }).join('\n')

  const blobDefs = products.map((p, i) => {
    const fi = i % BLOB_FREQS.length
    const [f1, f2, f3, f4] = BLOB_FREQS[fi]
    const [r1, r2, r3, r4] = BLOB_RADII[fi]
    const [af1, af2]       = ACCENT_FREQS[fi]
    const [ar1, ar2]       = ACCENT_RADII[fi]
    const center           = PERIOD * (i + 0.25) / N
    return [
      `  // ${p.sk.name}`,
      `  vec2 b${i} = vec2(sin(t*${f(f1)})*${f(r1)} + sin(t*${f(f2)})*${f(r2)}, cos(t*${f(f3)})*${f(r3)} + cos(t*${f(f4)})*${f(r4)});`,
      `  vec2 a${i} = vec2(sin(t*${f(af1)})*${f(ar1)}, cos(t*${f(af2)})*${f(ar2)});`,
      `  float w${i} = WIN(${f(center)});`,
    ].join('\n')
  }).join('\n\n')

  const grayBlobs    = products.map((_, i) => `exp(-length(w-b${i})*1.5)`).join(' + ')
  const anyColorExpr = nestedMax(products.map((_, i) => `w${i}`))
  const colorAccum   = products.map((_, i) => [
    `  col += nc${i} * exp(-length(w-b${i})*1.5) * w${i};`,
    `  col += nc${i} * exp(-length(w-a${i})*3.0) * 1.8 * w${i};`,
  ].join('\n')).join('\n')

  return /* glsl */`
  uniform float uTime;
  uniform vec2  uRes;

  void main() {
    vec2 uv = (gl_FragCoord.xy / uRes) * 2.0 - 1.0;
    uv.x *= uRes.x / uRes.y;

    float t = uTime * 0.75;

    vec2 q = vec2(
      sin(uv.y*1.6 + t*1.10) + sin(uv.x*2.1 + t*0.90),
      cos(uv.x*1.6 + t*1.00) + cos(uv.y*2.1 + t*1.20)
    ) * 0.22;
    vec2 r = vec2(
      sin(uv.y*2.8 + q.x*3.5 + t*0.75),
      cos(uv.x*2.8 + q.y*3.5 + t*0.68)
    ) * 0.18;
    vec2 s = vec2(
      sin((uv.x+q.y)*3.8 + r.x*4.0 + t*0.55),
      cos((uv.y+q.x)*3.8 + r.y*4.0 + t*0.60)
    ) * 0.10;
    vec2 w = uv + q + r + s;

${colorDefs}

    float PERIOD = ${f(PERIOD)};
    float ct = mod(uTime, PERIOD);
    #define WIN(center) (1.0 - smoothstep(0.5, 2.0, abs(mod(ct-(center)+PERIOD*0.5, PERIOD)-PERIOD*0.5)))

${blobDefs}

    float anyColor = ${anyColorExpr};
    // Lighter base grey — warm off-white dark
    float grayBoost = 1.0 - smoothstep(0.0, 0.4, anyColor);
    vec3 gray = vec3(0.26, 0.25, 0.23);

    vec3 col = vec3(0.0);
    float grayBlobs = ${grayBlobs};
    col += gray * grayBlobs * grayBoost * 0.30;

${colorAccum}

    // Softer tone mapping for a lighter, less saturated feel
    col = col * 0.82;
    col = col / (1.0 + col);
    col = pow(col, vec3(0.76));
    gl_FragColor = vec4(col, 1.0);
  }
`
}

const fragmentShader = buildFragmentShader()

const vertexShader = /* glsl */`
  void main() {
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

onMounted(() => {
  if (!canvasEl.value) return
  const canvas = canvasEl.value

  renderer = new THREE.WebGLRenderer({ canvas, antialias: false })
  renderer.setPixelRatio(1)
  renderer.setSize(canvas.clientWidth, canvas.clientHeight)

  const scene  = new THREE.Scene()
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

  const uniforms = {
    uTime: { value: 0 },
    uRes:  { value: new THREE.Vector2(canvas.clientWidth, canvas.clientHeight) },
  }

  const geo = new THREE.PlaneGeometry(2, 2)
  const mat = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms })
  scene.add(new THREE.Mesh(geo, mat))

  let lastTs  = -1
  let elapsed = 0

  function animate(ts: number) {
    animId = requestAnimationFrame(animate)
    if (lastTs < 0) lastTs = ts
    const delta = Math.min((ts - lastTs) / 1000, 0.05)
    elapsed += delta
    lastTs = ts
    uniforms.uTime.value = elapsed % 9000
    updateOColor(elapsed)
    renderer.render(scene, camera)
  }
  requestAnimationFrame(animate)

  function onResize() {
    const w = canvas.clientWidth, h = canvas.clientHeight
    renderer.setSize(w, h)
    uniforms.uRes.value.set(w, h)
  }
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animId)
  renderer?.dispose()
})
</script>

<style scoped>
/* Slim bottle silhouette placeholder — small and unobtrusive */
.product-placeholder {
  width: 60px;
  height: 38vh;
  max-height: 320px;
  border-radius: 30px 30px 12px 12px;
  border: 1px solid rgba(255, 255, 255, 0.10);
  background: linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%);
}

.subtitle-enter-active,
.subtitle-leave-active {
  transition: opacity 0.6s ease, transform 0.6s ease;
  position: absolute;
}
.subtitle-enter-from { opacity: 0; transform: translateY(6px); }
.subtitle-leave-to   { opacity: 0; transform: translateY(-6px); }
</style>
