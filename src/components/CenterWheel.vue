<script setup>
import { sfx } from '../utils/audio'

const props = defineProps({
  currentIndex: {
    type: Number,
    default: 0
  },
  totalProjects: {
    type: Number,
    default: 6
  }
})

const emit = defineEmits(['prev', 'next', 'select'])

const handleUp = () => {
  sfx.playBeep(480, 0.04)
  emit('prev')
}

const handleDown = () => {
  sfx.playBeep(420, 0.04)
  emit('next')
}

const handleCenter = () => {
  sfx.playSelect()
  emit('select')
}
</script>

<template>
  <div class="flex flex-col items-center justify-between h-full py-4 select-none">
    <!-- Charnière supérieure style DS Lite / 4G -->
    <div class="w-7 h-8 rounded-full bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 border-2 border-slate-950 shadow-inner flex items-center justify-center">
      <div class="w-3 h-3 rounded-full bg-slate-950/80 border border-slate-700"></div>
    </div>

    <!-- ÉLÉMENT CENTRAL POKÉDEX 4G (Grande molette / Pokéball sensor) -->
    <div class="flex flex-col items-center my-auto group">
      <!-- Cadran circulaire extérieur avec rainures métalliques -->
      <div class="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-b from-slate-300 via-slate-400 to-slate-600 border-4 border-slate-900 shadow-2xl p-1 flex items-center justify-center">
        
        <!-- Rainures de cadran rotatif (4G jog wheel) -->
        <div class="absolute inset-0 rounded-full border border-dashed border-slate-500/50 pointer-events-none"></div>

        <!-- Bouton flèche haut sur la molette -->
        <button
          @click="handleUp"
          class="absolute -top-1.5 left-1/2 -translate-x-1/2 w-7 h-4 bg-slate-900 hover:bg-slate-800 active:scale-95 text-emerald-400 rounded-t text-[10px] flex items-center justify-center border border-slate-700 shadow cursor-pointer transition z-10"
          title="Molette : Projet précédent"
        >
          ▲
        </button>

        <!-- Bouton flèche bas sur la molette -->
        <button
          @click="handleDown"
          class="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-7 h-4 bg-slate-900 hover:bg-slate-800 active:scale-95 text-emerald-400 rounded-b text-[10px] flex items-center justify-center border border-slate-700 shadow cursor-pointer transition z-10"
          title="Molette : Projet suivant"
        >
          ▼
        </button>

        <!-- Cœur central Pokéball tactile 4G cliquable -->
        <button
          @click="handleCenter"
          class="relative w-11 h-11 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-slate-950 shadow-[0_0_12px_rgba(0,0,0,0.8)] active:scale-95 transition-transform cursor-pointer flex flex-col group/btn"
          title="Scanner Pokédex 4G (Ouvrir le projet)"
        >
          <!-- Moitié supérieure rouge -->
          <div class="w-full h-1/2 bg-gradient-to-b from-red-500 to-red-600 group-hover/btn:brightness-110"></div>
          <!-- Ligne de séparation noire -->
          <div class="w-full h-1 bg-slate-950"></div>
          <!-- Moitié inférieure blanche -->
          <div class="w-full h-1/2 bg-gradient-to-b from-slate-100 to-slate-200 group-hover/btn:brightness-110"></div>

          <!-- Bouton blanc au centre de la Pokéball avec voyant lumineux -->
          <div class="absolute inset-0 m-auto w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white border-2 border-slate-950 flex items-center justify-center shadow">
            <div class="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.9)] animate-pulse"></div>
          </div>
        </button>
      </div>

      <!-- Indicateur de position (ex: 01 / 06) sous la molette -->
      <div class="mt-3 px-2 py-0.5 rounded-full bg-slate-950/80 border border-slate-800 text-[9px] font-pixel text-emerald-400 text-center tracking-tighter">
        {{ String(currentIndex + 1).padStart(2, '0') }}/{{ String(totalProjects).padStart(2, '0') }}
      </div>
    </div>

    <!-- Charnière inférieure style DS Lite / 4G -->
    <div class="w-7 h-8 rounded-full bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 border-2 border-slate-950 shadow-inner flex items-center justify-center">
      <div class="w-3 h-3 rounded-full bg-slate-950/80 border border-slate-700"></div>
    </div>
  </div>
</template>

