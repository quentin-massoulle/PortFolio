<script setup>
import { ref, computed } from 'vue'
import { sfx } from '../utils/audio'

const props = defineProps({
  projects: {
    type: Array,
    required: true
  },
  selectedProject: {
    type: Object,
    default: null
  },
  isProjectOpen: {
    type: Boolean,
    default: false
  },
  trainer: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits([
  'select-project',
  'dpad-up',
  'dpad-down',
  'action-a',
  'action-b'
])

// Dimensions fixes pour le positionnement au centre
const ITEM_HEIGHT = 38 // Hauteur de la carte
const GAP = 5 // Espace entre les cartes
const STEP = ITEM_HEIGHT + GAP // 43px par pas
const VIEWPORT_HEIGHT = 175 // Hauteur de la fenêtre visible

// Index du projet sélectionné
const selectedIndex = computed(() => {
  const idx = props.projects.findIndex(p => p.id === props.selectedProject?.id)
  return idx >= 0 ? idx : 0
})

// Décalage vertical calculé pour que l'élément sélectionné soit TOUJOURS au milieu
const offsetY = computed(() => {
  const centerViewport = VIEWPORT_HEIGHT / 2
  const centerItem = ITEM_HEIGHT / 2
  return centerViewport - (selectedIndex.value * STEP) - centerItem
})

// Classes de taille et perspective progressives : plus l'élément est loin du centre, plus il est petit
const getItemClasses = (idx) => {
  const dist = Math.abs(idx - selectedIndex.value)

  if (dist === 0) {
    // Élément sélectionné (au centre) : taille maximale
    return 'w-full bg-slate-900 border-emerald-400 text-white shadow-[0_0_12px_rgba(52,211,153,0.5)] z-10 scale-100 opacity-100'
  } else if (dist === 1) {
    // Voisins directs (+/- 1) : légèrement rétrécis
    return 'w-[90%] bg-emerald-950/90 border-emerald-900/80 hover:border-emerald-600 text-emerald-200 scale-[0.95] opacity-90 hover:opacity-100'
  } else if (dist === 2) {
    // Distance 2 (+/- 2) : encore plus étroits et plus petits
    return 'w-[80%] bg-emerald-950/80 border-emerald-950 text-emerald-300/80 scale-[0.88] opacity-75 hover:opacity-95'
  } else {
    // Distance 3 ou plus : les plus petits
    return 'w-[70%] bg-emerald-950/70 border-emerald-950/60 text-emerald-400/70 scale-[0.80] opacity-60 hover:opacity-85'
  }
}

// Clic sur un projet : sélectionne et centre
const onSelect = (project) => {
  sfx.playSelect()
  emit('select-project', project)
}

// Molette de la souris : défilement cran par cran
let lastWheelTime = 0
const handleWheel = (e) => {
  const now = Date.now()
  if (now - lastWheelTime < 140) return
  lastWheelTime = now

  if (e.deltaY > 0) {
    emit('dpad-down')
  } else if (e.deltaY < 0) {
    emit('dpad-up')
  }
}

const handleDpad = (dir) => {
  sfx.playBeep(320, 0.04)
  emit(`dpad-${dir}`)
}

const handleActionA = () => {
  sfx.playSelect()
  emit('action-a')
}

const handleActionB = () => {
  sfx.playDamage()
  emit('action-b')
}
</script>

<template>
  <div class="flex flex-col h-full bg-red-600 p-2 sm:p-3 rounded-xl md:rounded-r-none border-2 sm:border-3 border-red-800 shadow-xl">
    <!-- Cadre de l'écran principal (bords biseautés gris) -->
    <div class="relative bg-slate-200 border-2 sm:border-3 border-slate-400 rounded-lg p-2 sm:p-2.5 shadow-inner flex flex-col flex-1">
      <!-- 2 LEDs rouges + titre de l'écran -->
      <div class="flex justify-between items-center mb-1 px-0.5">
        <div class="flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-rose-600 border border-slate-600"></span>
          <span class="w-2 h-2 rounded-full bg-rose-600 border border-slate-600"></span>
          <span class="text-[9px] font-pixel text-slate-700 ml-0.5">INDEX CENTRAL</span>
        </div>
        <span class="text-[8px] font-pixel text-slate-500">POKÉDEX 4G</span>
      </div>

      <!-- Écran LCD Rétro Vert/Noir (100% réservé aux projets) -->
      <div class="lcd-screen scanlines rounded-md border-2 border-slate-800 p-2 text-emerald-400 font-mono shadow-[inset_0_0_12px_rgba(0,0,0,0.8)] relative flex-1 flex flex-col justify-between overflow-hidden min-h-[235px]">
        <!-- Bandeau supérieur -->
        <div class="flex items-center justify-between border-b border-emerald-900/70 pb-0.5 mb-1 text-[10px]">
          <span class="font-pixel text-emerald-300 text-[9px]">
            LISTE DES ENTRÉES ({{ projects.length }})
          </span>
          <span class="text-[8px] font-pixel text-emerald-400/80 animate-pulse">
            ROULETTE 4G ↕
          </span>
        </div>

        <!-- FENÊTRE DU CARROUSEL VERTICAL CENTRÉ (VIEWPORT 175px) -->
        <div
          @wheel.prevent="handleWheel"
          class="relative w-full h-[175px] overflow-hidden rounded my-auto select-none"
        >
          <!-- RECTANGLE REPÈRE DU MILIEU (POUR GUIDER LA SÉLECTION) -->
          <div
            class="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-[42px] border-2 border-dashed border-emerald-500/40 rounded pointer-events-none z-0 bg-emerald-500/5"
          ></div>

          <!-- PISTE DÉFILANTE QUI GLISSE VERS LE HAUT OU LE BAS -->
          <div
            class="transition-transform duration-350 ease-out will-change-transform py-0.5"
            :style="{ transform: `translateY(${offsetY}px)` }"
          >
            <div
              v-for="(project, idx) in projects"
              :key="project.id"
              @click="onSelect(project)"
              class="h-[38px] mb-[5px] px-2 rounded-md border flex items-center justify-between transition-all duration-300 cursor-pointer select-none mx-auto origin-center"
              :class="getItemClasses(idx)"
            >
              <!-- Côté gauche : Curseur, Numéro et Titre -->
              <div class="flex items-center gap-1.5 min-w-0">
                <!-- Curseur vert rétro ► -->
                <span
                  class="font-pixel text-[9px] transition-transform"
                  :class="idx === selectedIndex ? 'text-emerald-400 animate-pulse' : 'text-transparent'"
                >
                  ►
                </span>

                <!-- Émoji / Icône -->
                <span class="text-xs shrink-0">{{ project.preview }}</span>

                <!-- Numéro d'entrée -->
                <span
                  class="font-pixel text-[9px] font-bold shrink-0"
                  :class="idx === selectedIndex ? 'text-emerald-300' : 'text-emerald-400'"
                >
                  {{ project.number }}
                </span>

                <!-- Nom du projet -->
                <span class="text-[11px] font-bold truncate tracking-wide">
                  {{ project.name }}
                </span>
              </div>

              <!-- Côté droit : Badge de type -->
              <div class="shrink-0 ml-1">
                <span
                  class="px-1 py-0.2 rounded text-[7px] font-pixel border"
                  :class="idx === selectedIndex
                    ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-300 shadow'
                    : 'bg-emerald-900/90 text-emerald-200 border-emerald-700'"
                >
                  {{ project.type }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Pied de l'écran avec aide navigation -->
        <div class="border-t border-emerald-900/70 pt-0.5 flex justify-between items-center text-[7px] font-pixel text-emerald-400/80">
          <span>MOLETTE / ⬆️⬇️</span>
          <span>ÉLÉMENT SÉLECTIONNÉ AU CENTRE</span>
        </div>
      </div>

      <!-- Bas du cadre écran : haut-parleur et bouton rouge -->
      <div class="flex items-center justify-between mt-1.5 px-0.5">
        <button
          @click="handleActionA"
          class="w-4 h-4 rounded-full bg-rose-600 border border-slate-700 shadow hover:bg-rose-500 cursor-pointer"
          title="Bouton Diagnostic"
        ></button>
        <!-- Grille de haut-parleur -->
        <div class="flex flex-col gap-0.5 w-14">
          <div class="h-0.5 bg-slate-600 rounded"></div>
          <div class="h-0.5 bg-slate-600 rounded"></div>
          <div class="h-0.5 bg-slate-600 rounded"></div>
        </div>
      </div>
    </div>

    <!-- Contrôles physiques inférieurs : D-Pad & Boutons A/B -->
    <div class="flex items-center justify-between mt-2 px-1">
      <!-- D-Pad croix directionnelle -->
      <div class="relative w-16 h-16">
        <!-- Bouton Haut -->
        <button
          @click="handleDpad('up')"
          class="absolute top-0 left-5.5 w-5.5 h-5.5 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-slate-400 rounded-t flex items-center justify-center shadow border border-slate-700 cursor-pointer text-[8px]"
          title="Faire monter l'élément"
        >
          ▲
        </button>
        <!-- Bouton Bas -->
        <button
          @click="handleDpad('down')"
          class="absolute bottom-0 left-5.5 w-5.5 h-5.5 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-slate-400 rounded-b flex items-center justify-center shadow border border-slate-700 cursor-pointer text-[8px]"
          title="Faire descendre l'élément"
        >
          ▼
        </button>
        <div class="absolute top-5.5 left-0 w-5.5 h-5.5 bg-slate-900 text-slate-600 rounded-l flex items-center justify-center border border-slate-700 pointer-events-none text-[8px]">
          ◀
        </div>
        <div class="absolute top-5.5 right-0 w-5.5 h-5.5 bg-slate-900 text-slate-600 rounded-r flex items-center justify-center border border-slate-700 pointer-events-none text-[8px]">
          ▶
        </div>
        <!-- Centre fixe -->
        <div class="absolute top-5.5 left-5.5 w-5.5 h-5.5 bg-slate-900 flex items-center justify-center pointer-events-none">
          <div class="w-2 h-2 rounded-full bg-slate-950/80 border border-slate-800"></div>
        </div>
      </div>

      <!-- Boutons d'action ronds A et B -->
      <div class="flex items-center gap-2.5">
        <!-- Bouton B (Fermer descriptif) -->
        <div class="flex flex-col items-center">
          <button
            @click="handleActionB"
            class="w-7.5 h-7.5 rounded-full bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-pixel text-[10px] font-bold border-2 border-amber-900 shadow-md flex items-center justify-center cursor-pointer"
            title="Bouton B : Fermer le descriptif"
          >
            B
          </button>
          <span class="text-[7px] font-pixel text-red-200 mt-0.5">FERMER</span>
        </div>

        <!-- Bouton A (Ouvrir / Valider sélection) -->
        <div class="flex flex-col items-center">
          <button
            @click="handleActionA"
            class="w-7.5 h-7.5 rounded-full bg-cyan-400 hover:bg-cyan-300 active:scale-95 text-slate-950 font-pixel text-[10px] font-bold border-2 border-cyan-800 shadow-md flex items-center justify-center cursor-pointer"
            title="Bouton A : Ouvrir la fiche"
          >
            A
          </button>
          <span class="text-[7px] font-pixel text-red-200 mt-0.5">OUVRIR</span>
        </div>
      </div>
    </div>
  </div>
</template>
