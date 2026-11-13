<script setup>
import { sfx } from '../utils/audio'

defineProps({
  stats: {
    type: Array,
    required: true
  },
  specialMoves: {
    type: Array,
    required: true
  }
})

const onMoveClick = (move) => {
  sfx.playSelect()
}
</script>

<template>
  <div class="flex flex-col h-full text-slate-100 font-sans overflow-y-auto pokedex-scroll">
    <!-- Section 1 : Statistiques de Base façon Pokémon -->
    <div class="bg-slate-900/90 rounded-xl border-2 border-slate-700 p-4 mb-4 shadow-inner">
      <div class="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
        <h3 class="text-xs font-pixel text-emerald-400">STATISTIQUES DE BASE</h3>
        <span class="text-[10px] font-pixel text-slate-400">TOTAL: 529 PTS</span>
      </div>

      <div class="space-y-2.5">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="flex items-center gap-3 text-xs"
        >
          <!-- Nom et abréviation type Pokémon (HP, ATK, DEF, etc.) -->
          <div class="w-32 flex items-center justify-between font-mono">
            <span class="font-bold text-slate-300">{{ stat.label }}</span>
            <span class="text-[10px] font-pixel text-slate-500 mr-2">{{ stat.statType }}</span>
          </div>

          <!-- Valeur numérique -->
          <span class="w-8 text-right font-pixel text-xs text-white">{{ stat.value }}</span>

          <!-- Jauge de progression -->
          <div class="flex-1 h-3 bg-slate-950 rounded-full border border-slate-800 overflow-hidden relative">
            <div
              :class="['h-full rounded-full transition-all duration-700', stat.color]"
              :style="{ width: `${(stat.value / stat.max) * 100}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Section 2 : Attaques & Capacités Spéciales -->
    <div class="bg-slate-900/90 rounded-xl border-2 border-slate-700 p-4 shadow-inner flex-1">
      <div class="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
        <h3 class="text-xs font-pixel text-cyan-400">CAPACITÉS & ATTAQUES DU DÉVELOPPEUR</h3>
        <span class="text-[10px] font-pixel text-slate-400">SLOTS: 4/4</span>
      </div>

      <div class="grid sm:grid-cols-2 gap-2.5">
        <div
          v-for="move in specialMoves"
          :key="move.name"
          @click="onMoveClick(move)"
          class="p-3 rounded-lg bg-slate-950/80 border border-slate-800 hover:border-emerald-500/50 transition cursor-pointer group"
        >
          <div class="flex items-center justify-between mb-1.5">
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-white group-hover:text-emerald-300 transition">
                {{ move.name }}
              </span>
            </div>
            <span :class="['px-1.5 py-0.5 rounded text-[9px] font-pixel text-white', move.typeColor]">
              {{ move.type }}
            </span>
          </div>
          <p class="text-xs text-slate-400 font-tech leading-relaxed mb-2">
            {{ move.description }}
          </p>
          <div class="text-[10px] font-pixel text-slate-500 text-right">
            PP {{ move.pp }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

