<script setup>
import { sfx } from '../utils/audio'

const props = defineProps({
  selectedProject: {
    type: Object,
    default: null
  },
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close-detail'])

const close = () => {
  sfx.playDamage()
  emit('close-detail')
}
</script>

<template>
  <div class="flex flex-col h-full text-slate-100 font-sans">
    <!-- ÉTAT 1 : AUCUN PROJET OUVERT (EN ATTENTE DU CLIC SUR LA GAUCHE) -->
    <div
      v-if="!isOpen || !selectedProject"
      class="flex-1 bg-slate-900/80 rounded-xl border-2 border-slate-700/80 p-6 flex flex-col items-center justify-center text-center shadow-inner relative overflow-hidden"
    >
      <!-- Fond radar scanner animé -->
      <div class="absolute inset-0 bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:16px_16px] opacity-15"></div>

      <!-- Radar Pokédex clignotant -->
      <div class="relative w-24 h-24 mb-5 rounded-full border-2 border-sky-500/40 flex items-center justify-center">
        <div class="w-16 h-16 rounded-full border border-sky-400/60 animate-ping opacity-30"></div>
        <div class="w-10 h-10 rounded-full bg-sky-500/20 border border-sky-400 flex items-center justify-center text-2xl">
          📡
        </div>
      </div>

      <!-- Texte de consigne pour le recruteur -->
      <h3 class="text-sm font-bold font-pixel text-sky-300 mb-2 tracking-wide">
        SCANNER POKÉDEX EN ATTENTE
      </h3>
      <p class="text-xs text-slate-300 max-w-sm mb-4 leading-relaxed font-tech">
        Sélectionnez et <strong class="text-emerald-400">cliquez sur un projet</strong> dans la liste verticale de gauche pour analyser et afficher son descriptif détaillé.
      </p>

      <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950 border border-slate-800 text-[10px] font-pixel text-slate-400">
        <span class="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
        <span>EN ATTENTE DU SIGNAL</span>
      </div>
    </div>

    <!-- ÉTAT 2 : FICHE DESCRIPTIVE COMPLÈTE DU PROJET SÉLECTIONNÉ -->
    <div
      v-else
      class="flex-1 bg-slate-900/95 rounded-xl border-2 border-slate-700 p-4 sm:p-5 flex flex-col justify-between overflow-y-auto pokedex-scroll shadow-inner animate-in fade-in duration-300"
    >
      <div>
        <!-- En-tête : Numéro, Titre et Bouton Fermer -->
        <div class="flex items-start justify-between border-b border-slate-800 pb-3 mb-4 gap-2">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="text-xs font-pixel text-emerald-400">{{ selectedProject.number }}</span>
              <span class="px-2 py-0.5 rounded text-[9px] font-pixel bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                {{ selectedProject.type }}
              </span>
              <span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                {{ selectedProject.category }}
              </span>
            </div>
            <h3 class="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <span>{{ selectedProject.preview }}</span>
              <span>{{ selectedProject.name }}</span>
            </h3>
          </div>

          <!-- Bouton Fermer pour revenir à l'état d'attente -->
          <button
            @click="close"
            class="px-2 py-1 rounded text-[10px] font-pixel bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition cursor-pointer"
            title="Fermer la fiche"
          >
            ✖ FERMER
          </button>
        </div>

        <!-- Descriptif principal (Pokédex Entry) -->
        <div class="bg-slate-950/80 p-3.5 rounded-lg border border-slate-800 mb-4 text-sm text-slate-200 leading-relaxed font-tech">
          <p class="mb-2 text-base text-slate-100 font-medium">
            {{ selectedProject.summary }}
          </p>
          <p class="text-xs text-slate-400 italic">
            {{ selectedProject.details }}
          </p>
        </div>

        <!-- Points Clés & Réalisations techniques -->
        <div class="mb-4">
          <h4 class="text-xs font-pixel text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span class="text-emerald-400">⚡</span>
            <span>RÉALISATIONS & POINTS CLÉS :</span>
          </h4>
          <ul class="space-y-1.5 text-xs text-slate-300 font-tech">
            <li
              v-for="(point, idx) in selectedProject.highlights"
              :key="idx"
              class="flex items-start gap-2 bg-slate-950/40 p-1.5 rounded border border-slate-800/60"
            >
              <span class="text-emerald-400 font-bold">►</span>
              <span>{{ point }}</span>
            </li>
          </ul>
        </div>

        <!-- Stack technique mobilisée -->
        <div>
          <h4 class="text-xs font-pixel text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span class="text-cyan-400">🛠️</span>
            <span>TECHNOLOGIES MOBILISÉES :</span>
          </h4>
          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="tech in selectedProject.stack"
              :key="tech"
              class="px-2.5 py-1 rounded text-xs font-medium bg-slate-800/90 text-emerald-300 border border-slate-700"
            >
              #{{ tech }}
            </span>
          </div>
        </div>
      </div>

      <!-- Boutons d'action : Démo Live & Code Source -->
      <div class="mt-6 pt-4 border-t border-slate-800 flex flex-wrap gap-3">
        <a
          :href="selectedProject.demoUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="flex-1 min-w-[140px] text-center px-4 py-2.5 rounded-lg text-xs font-pixel bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition shadow-lg shadow-emerald-500/20"
        >
          🎮 LANCER LA DÉMO
        </a>
        <a
          :href="selectedProject.githubUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="flex-1 min-w-[140px] text-center px-4 py-2.5 rounded-lg text-xs font-pixel bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white border border-slate-600 transition"
        >
          📂 CODE GITHUB
        </a>
      </div>
    </div>
  </div>
</template>
