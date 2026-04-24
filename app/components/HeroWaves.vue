<template>
  <section class="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-black">
    <canvas ref="canvasEl" class="absolute inset-0 w-full h-full" />

    <div class="relative z-10 text-center px-6 select-none">
      <p class="text-xs tracking-[0.4em] uppercase mb-4 font-sans font-medium"
         style="color:#c8dde8; text-shadow: 0 1px 12px rgba(0,0,0,0.9);">
        Premium Functional Products
      </p>
      <h1 class="font-display text-6xl md:text-8xl font-extrabold leading-none tracking-tight text-white">
        WELL<span :style="oStyle">O</span>W
      </h1>
      <div class="mt-6 h-8 flex items-center justify-center overflow-hidden">
        <Transition name="subtitle">
          <p
            :key="subtitleKey"
            class="text-lg md:text-xl max-w-md mx-auto font-light absolute"
            :style="subtitleStyle"
          >
            {{ subtitleText }}
          </p>
        </Transition>
      </div>
      <button
        class="mt-10 px-8 py-3 text-sm tracking-widest uppercase border border-white/30
               text-white hover:border-white/70 transition-all duration-300"
        style="text-shadow: 0 1px 8px rgba(0,0,0,0.8);"
        @click="scrollDown"
      >
        Explore
      </button>
    </div>

    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
         style="color:#8aabb8;">
      <span class="text-xs tracking-widest uppercase"
            style="text-shadow: 0 1px 8px rgba(0,0,0,0.9);">Scroll</span>
      <div class="w-px h-10 bg-gradient-to-b from-neutral-500 to-transparent animate-pulse" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import * as THREE from 'three'
import { products } from '~/data/products'

const canvasEl = ref<HTMLCanvasElement | null>(null)
let renderer: THREE.WebGLRenderer
let animId: number

// ── Colour-cycle timing ──────────────────────────────────────────────────────
// Each product gets an equal slice of the cycle. 5 s per product keeps the
// same cadence as the original when 4 products are configured.
const N      = products.length
const PERIOD = N * 5.0

// JS-side neon list — mirrors the GLSL weights so the "O" tracks the shader.
const NEONS = products.map((p, i) => ({
  hex: p.neon,
  r:   p.neonRgb[0],
  g:   p.neonRgb[1],
  b:   p.neonRgb[2],
  center: PERIOD * (i + 0.25) / N,
}))

// ── Subtitle cycling ─────────────────────────────────────────────────────────
const DEFAULT_SUBTITLE = 'Performance. Flavour. Elevated.'
const subtitleText  = ref(DEFAULT_SUBTITLE)
const subtitleKey   = ref('default')
const subtitleStyle = ref<Record<string, string>>({
  color: '#d4e8f0',
  textShadow: '0 1px 16px rgba(0,0,0,0.95)',
})
let lastSubtitleKey = 'default'

// ── "O" colour — mirrors the shader cycle exactly ────────────────────────────
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
    updateSubtitle('default', DEFAULT_SUBTITLE, '#d4e8f0', '0 1px 16px rgba(0,0,0,0.95)')
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
    textShadow: `0 0 18px ${col}cc, 0 0 40px ${col}66`,
    transition: 'color 0.05s linear, text-shadow 0.05s linear',
  }

  // Subtitle: switch to the dominant product's tagline
  const dominant = weights.reduce((a, b) => a.w > b.w ? a : b)
  if (dominant.w > 0.25) {
    const p = products[dominant.i]
    updateSubtitle(p.id, p.tagline, col, `0 0 12px ${col}99`)
  }
}

function updateSubtitle(key: string, text: string, color: string, shadow: string) {
  if (key === lastSubtitleKey) return
  lastSubtitleKey    = key
  subtitleText.value = text
  subtitleKey.value  = key
  subtitleStyle.value = { color, textShadow: shadow }
}

function scrollDown() {
  window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
}

// ── GLSL generation ──────────────────────────────────────────────────────────
// Blob orbit parameters — visually interesting, non-harmonic frequencies.
// Extend the arrays if you add more than 6 products.
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
    const [r, g, b] = p.neonRgb
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
      `  // ${p.name}`,
      `  vec2 b${i} = vec2(sin(t*${f(f1)})*${f(r1)} + sin(t*${f(f2)})*${f(r2)}, cos(t*${f(f3)})*${f(r3)} + cos(t*${f(f4)})*${f(r4)});`,
      `  vec2 a${i} = vec2(sin(t*${f(af1)})*${f(ar1)}, cos(t*${f(af2)})*${f(ar2)});`,
      `  float w${i} = WIN(${f(center)});`,
    ].join('\n')
  }).join('\n\n')

  const grayBlobs  = products.map((_, i) => `exp(-length(w-b${i})*1.5)`).join(' + ')
  const anyColorExpr = nestedMax(products.map((_, i) => `w${i}`))
  const colorAccum = products.map((_, i) => [
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

    // Neon colours derived from products config
${colorDefs}

    float PERIOD = ${f(PERIOD)};
    float ct = mod(uTime, PERIOD);
    #define WIN(center) (1.0 - smoothstep(0.5, 2.0, abs(mod(ct-(center)+PERIOD*0.5, PERIOD)-PERIOD*0.5)))

    // Per-product blobs and colour weights
${blobDefs}

    float anyColor = ${anyColorExpr};
    float grayBoost = 1.0 - smoothstep(0.0, 0.4, anyColor);
    vec3 gray = vec3(0.18, 0.18, 0.20);

    vec3 col = vec3(0.0);
    float grayBlobs = ${grayBlobs};
    col += gray * grayBlobs * grayBoost * 0.22;

${colorAccum}

    col = col * 0.72;
    col = col / (1.0 + col);
    col = pow(col, vec3(0.82));
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

  let lastTs = -1
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
.subtitle-enter-active,
.subtitle-leave-active {
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.subtitle-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
.subtitle-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
