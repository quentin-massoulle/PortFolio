<script setup>
import { sfx } from '../utils/audio'

const props = defineProps({
  trainer: {
    type: Object,
    required: true
  }
})

const emit = defineEmits([
  'dpad-up',
  'dpad-down',
  'dpad-left',
  'dpad-right',
  'action-a',
  'action-b'
])

const handleDpad = (direction) => {
  sfx.playBeep(320, 0.04)
  emit(`dpad-${direction}`)
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
  <div class="flex flex-col h-full bg-red-600 p-5 rounded-2xl md:rounded-r-none border-4 border-red-800 shadow-2xl">
    <!-- Cadre de l'écran principal (bords biseautés gris) -->
    <div class="relative bg-slate-200 border-4 border-slate-400 rounded-xl p-4 shadow-inner flex flex-col">
      <!-- 2 LEDs rouges au-dessus de l'écran LCD -->
      <div class="flex justify-center items-center gap-4 mb-2">
        <span class="w-2.5 h-2.5 rounded-full bg-rose-600 border border-slate-600"></span>
        <span class="w-2.5 h-2.5 rounded-full bg-rose-600 border border-slate-600"></span>
      </div>

      <!-- Écran LCD vert rétro -->
      <div class="lcd-screen scanlines rounded-lg border-2 border-slate-800 p-4 text-emerald-400 font-mono shadow-[inset_0_0_15px_rgba(0,0,0,0.8)] relative">
        <!-- Bandeau supérieur dresseur -->
        <div class="flex items-center justify-between border-b border-emerald-900/60 pb-2 mb-3">
          <div class="flex items-center gap-2">
            <span class="text-xs font-pixel text-emerald-300">ID: {{ trainer.pokedexId }}</span>
          </div>
          <div class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span class="text-[10px] font-pixel text-emerald-200 uppercase">LVL {{ trainer.level }}</span>
          </div>
        </div>

        <!-- Zone Avatar & Fiche descriptive -->
        <div class="flex flex-col sm:flex-row gap-4 items-center sm:items-start mb-3">
          <!-- Cadre Sprite / Avatar pixel -->
          <div class="relative w-24 h-24 sm:w-28 sm:h-28 rounded-lg bg-emerald-950/80 border-2 border-emerald-500/50 flex flex-col items-center justify-center shadow-inner overflow-hidden group">
            <!-- Grille pixel en arrière-plan -->
            <div class="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:8px_8px] opacity-25"></div>
            
            <!-- Icône dresseur / Avatar stylisé -->
            <div class="text-5xl group-hover:scale-110 transition-transform duration-300 select-none z-10">
              👨‍💻
            </div>
            <span class="text-[9px] font-pixel text-emerald-300 mt-1 z-10">DRESSEUR</span>
          </div>

          <!-- Infos Dresseur -->
          <div class="flex-1 text-center sm:text-left">
            <h2 class="text-xl font-bold font-pixel text-white tracking-wide mb-1">
              {{ trainer.name }}
            </h2>
            <p class="text-xs text-emerald-300 font-tech font-semibold tracking-wider uppercase mb-2">
              {{ trainer.title }}
            </p>

            <!-- Types Pokémon -->
            <div class="flex flex-wrap gap-1.5 justify-center sm:justify-start mb-2">
              <span
                v-for="type in trainer.types"
                :key="type"
                class="px-2 py-0.5 rounded text-[10px] font-pixel bg-emerald-900/90 text-emerald-200 border border-emerald-500/40"
              >
                {{ type }}
              </span>
            </div>

            <!-- Jauge HP / Énergie -->
            <div class="text-[11px] font-pixel flex items-center gap-2 text-emerald-300">
              <span class="text-[9px] text-emerald-400">HP:</span>
              <div class="flex-1 h-2.5 bg-emerald-950 rounded border border-emerald-800 overflow-hidden">
                <div class="h-full bg-emerald-400 w-full animate-pulse"></div>
              </div>
              <span class="text-[9px]">{{ trainer.hp }}</span>
            </div>
          </div>
        </div>

        <!-- Bio / Résumé de présentation -->
        <div class="bg-emerald-950/50 rounded p-2.5 border border-emerald-900/80 text-xs text-emerald-200 leading-relaxed font-tech">
          <p class="text-slate-200 text-xs">
            "{{ trainer.bio }}"
          </p>
          <div class="mt-2 pt-1 border-t border-emerald-900/50 flex justify-between text-[11px] text-emerald-400">
            <span>📍 {{ trainer.location }}</span>
            <span class="font-bold text-emerald-300">🟢 {{ trainer.status }}</span>
          </div>
        </div>
      </div>

      <!-- Bas du cadre écran : bouton sonore + fentes haut-parleur -->
      <div class="flex items-center justify-between mt-3 px-2">
        <button
          @click="handleActionA"
          class="w-6 h-6 rounded-full bg-rose-600 border-2 border-slate-700 shadow hover:bg-rose-500 cursor-pointer"
          title="Bouton Diagnostic"
        ></button>
        <!-- Grille de haut-parleur -->
        <div class="flex flex-col gap-1 w-20">
          <div class="h-1 bg-slate-600 rounded"></div>
          <div class="h-1 bg-slate-600 rounded"></div>
          <div class="h-1 bg-slate-600 rounded"></div>
        </div>
      </div>
    </div>

    <!-- Contrôles physiques inférieurs : D-Pad & Boutons A/B -->
    <div class="flex items-center justify-between mt-6 px-3">
      <!-- D-Pad croix directionnelle -->
      <div class="relative w-28 h-28">
        <!-- Bouton Haut -->
        <button
          @click="handleDpad('up')"
          class="absolute top-0 left-9 w-10 h-10 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-slate-400 rounded-t flex items-center justify-center shadow-md border border-slate-700 cursor-pointer text-xs"
          title="Précédent (Haut)"
        >
          ▲
        </button>
        <!-- Bouton Bas -->
        <button
          @click="handleDpad('down')"
          class="absolute bottom-0 left-9 w-10 h-10 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-slate-400 rounded-b flex items-center justify-center shadow-md border border-slate-700 cursor-pointer text-xs"
          title="Suivant (Bas)"
        >
          ▼
        </button>
        <!-- Bouton Gauche -->
        <button
          @click="handleDpad('left')"
          class="absolute top-9 left-0 w-10 h-10 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-slate-400 rounded-l flex items-center justify-center shadow-md border border-slate-700 cursor-pointer text-xs"
          title="Onglet précédent (Gauche)"
        >
          ◀
        </button>
        <!-- Bouton Droite -->
        <button
          @click="handleDpad('right')"
          class="absolute top-9 right-0 w-10 h-10 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-slate-400 rounded-r flex items-center justify-center shadow-md border border-slate-700 cursor-pointer text-xs"
          title="Onglet suivant (Droite)"
        >
          ▶
        </button>
        <!-- Centre fixe avec cercle gravé -->
        <div class="absolute top-9 left-9 w-10 h-10 bg-slate-900 flex items-center justify-center pointer-events-none">
          <div class="w-4 h-4 rounded-full bg-slate-950/80 border border-slate-800"></div>
        </div>
      </div>

      <!-- Boutons d'action ronds A et B -->
      <div class="flex items-center gap-4">
        <!-- Bouton B (Annuler / Son aigu) -->
        <div class="flex flex-col items-center">
          <button
            @click="handleActionB"
            class="w-11 h-11 rounded-full bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-pixel text-xs font-bold border-2 border-amber-900 shadow-lg flex items-center justify-center cursor-pointer"
            title="Bouton B"
          >
            B
          </button>
          <span class="text-[9px] font-pixel text-red-200 mt-1">CANCEL</span>
        </div>

        <!-- Bouton A (Valider / Ouvrir) -->
        <div class="flex flex-col items-center">
          <button
            @click="handleActionA"
            class="w-11 h-11 rounded-full bg-cyan-400 hover:bg-cyan-300 active:scale-95 text-slate-950 font-pixel text-xs font-bold border-2 border-cyan-800 shadow-lg flex items-center justify-center cursor-pointer"
            title="Bouton A"
          >
            A
          </button>
          <span class="text-[9px] font-pixel text-red-200 mt-1">SELECT</span>
        </div>
      </div>
    </div>
  </div>
</template>

