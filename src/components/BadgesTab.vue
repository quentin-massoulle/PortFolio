<script setup>
import { sfx } from '../utils/audio'

defineProps({
  badges: {
    type: Array,
    required: true
  }
})

const onBadgeClick = (badge) => {
  sfx.playSelect()
}
</script>

<template>
  <div class="flex flex-col h-full text-slate-100 font-sans overflow-y-auto pokedex-scroll">
    <div class="bg-slate-900/90 rounded-xl border-2 border-slate-700 p-4 sm:p-5 shadow-inner flex-1 flex flex-col">
      <div class="flex items-center justify-between border-b border-slate-800 pb-2 mb-4">
        <div>
          <h3 class="text-xs font-pixel text-amber-400">BOÎTE À BADGES D'ARÈNE</h3>
          <p class="text-xs text-slate-400 mt-0.5">Parcours, diplômes et compétences validées</p>
        </div>
        <span class="text-[10px] font-pixel text-slate-400">BADGES: {{ badges.length }}/8</span>
      </div>

      <!-- Grille des badges façon écrin de Ligue Pokémon -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
        <div
          v-for="badge in badges"
          :key="badge.id"
          @click="onBadgeClick(badge)"
          class="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-amber-400/50 hover:bg-slate-950 transition flex items-start gap-3.5 cursor-pointer group"
        >
          <!-- Écrin du badge -->
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 via-slate-900 to-slate-950 border-2 border-amber-500/40 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:border-amber-400 transition shadow-lg shrink-0">
            {{ badge.icon }}
          </div>

          <!-- Informations badge -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between gap-1">
              <h4 class="text-sm font-bold text-white group-hover:text-amber-300 transition truncate">
                {{ badge.name }}
              </h4>
              <span class="text-[10px] font-pixel text-amber-400/80 shrink-0">
                {{ badge.year }}
              </span>
            </div>
            <p class="text-xs text-emerald-400 font-mono mt-0.5 mb-1">
              {{ badge.gym }}
            </p>
            <p class="text-xs text-slate-400 font-tech leading-relaxed">
              {{ badge.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Note pour le recruteur -->
      <div class="mt-4 pt-3 border-t border-slate-800 text-center text-xs text-slate-400 font-tech">
        💡 <span class="text-slate-300">Astuce :</span> Chaque badge représente une étape clé de formation ou une compétence validée en situation réelle.
      </div>
    </div>
  </div>
</template>

