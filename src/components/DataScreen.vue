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
  },
  trainer: {
    type: Object,
    required: true
  },
  contact: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close-project'])

const handleClose = () => {
  sfx.playDamage()
  emit('close-project')
}
</script>

<template>
  <div class="flex flex-col h-full bg-red-600 p-4 sm:p-5 rounded-2xl md:rounded-l-none border-4 border-red-800 shadow-2xl">
    <!-- En-tête supérieur style Pokédex 4G (Sinnoh DS) -->
    <div class="flex items-center justify-between mb-3 px-1">
      <div class="flex items-center gap-2">
        <span class="w-2.5 h-2.5 rounded-full bg-sky-400 border border-slate-900 shadow-[0_0_6px_rgba(56,189,248,0.8)]"></span>
        <h3 class="text-xs font-pixel text-slate-100 tracking-wider">
          DESCRIPTIF DU PROJET
        </h3>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-[9px] font-pixel px-2 py-0.5 rounded bg-slate-900 text-emerald-400 border border-slate-700">
          MODE: 4G SINNOH
        </span>
      </div>
    </div>

    <!-- Écran LCD droit : Uniquement le descriptif -->
    <div class="flex-1 lcd-blue scanlines rounded-xl border-4 border-slate-950 p-3.5 sm:p-4 shadow-[inset_0_0_20px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden min-h-[440px]">
      
      <!-- ÉTAT 1 : AUCUN PROJET SÉLECTIONNÉ (EN ATTENTE DE CLIC) -->
      <div
        v-if="!isOpen || !selectedProject"
        class="flex-1 rounded-xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden"
      >
        <!-- Grille radar d'attente -->
        <div class="relative w-24 h-24 mb-4 rounded-full border-2 border-sky-500/40 flex items-center justify-center">
          <div class="w-16 h-16 rounded-full border border-sky-400/60 animate-ping opacity-25"></div>
          <div class="w-10 h-10 rounded-full bg-sky-500/20 border border-sky-400 flex items-center justify-center text-2xl">
            📡
          </div>
        </div>

        <h4 class="text-sm font-bold font-pixel text-sky-300 mb-2 tracking-wide">
          POKÉDEX 4G EN ATTENTE
        </h4>
        <p class="text-xs text-slate-300 max-w-sm mb-4 leading-relaxed font-tech text-base">
          Sélectionnez un projet dans la liste de gauche ou appuyez sur la <strong class="text-emerald-400">Pokéball centrale</strong> pour afficher son descriptif détaillé.
        </p>

        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/80 border border-slate-800 text-[10px] font-pixel text-slate-400">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>SYSTÈME DE SCAN ACTIF</span>
        </div>
      </div>

      <!-- ÉTAT 2 : FICHE DESCRIPTIVE COMPLÈTE DU PROJET SÉLECTIONNÉ -->
      <div
        v-else
        class="flex-1 flex flex-col justify-between overflow-y-auto pokedex-scroll pr-1 animate-in fade-in duration-200"
      >
        <div>
          <!-- Ligne de titre : Numéro, Titre et Bouton Fermer -->
          <div class="flex items-start justify-between border-b border-slate-800 pb-3 mb-3 gap-2">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="text-xs font-pixel text-emerald-400">{{ selectedProject.number }}</span>
                <span class="px-2 py-0.5 rounded text-[9px] font-pixel bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
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

            <!-- Bouton Fermer -->
            <button
              @click="handleClose"
              class="px-2 py-1 rounded text-[10px] font-pixel bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition cursor-pointer"
              title="Fermer le descriptif"
            >
              ✖ FERMER
            </button>
          </div>

          <!-- Encadré descriptif Pokédex -->
          <div class="bg-slate-950/85 p-3.5 rounded-lg border border-slate-800 mb-3 text-sm text-slate-200 leading-relaxed font-tech">
            <p class="mb-2 text-base text-slate-100 font-medium">
              {{ selectedProject.summary }}
            </p>
            <p class="text-xs text-slate-400 italic">
              {{ selectedProject.details }}
            </p>
          </div>

          <!-- Points Clés & Réalisations -->
          <div class="mb-3">
            <h4 class="text-xs font-pixel text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span class="text-emerald-400">⚡</span>
              <span>RÉALISATIONS TECHNIQUES :</span>
            </h4>
            <ul class="space-y-1.5 text-xs text-slate-300 font-tech">
              <li
                v-for="(point, idx) in selectedProject.highlights"
                :key="idx"
                class="flex items-start gap-2 bg-slate-950/50 p-2 rounded border border-slate-800/70"
              >
                <span class="text-emerald-400 font-bold">►</span>
                <span>{{ point }}</span>
              </li>
            </ul>
          </div>

          <!-- Stack technique -->
          <div class="mb-4">
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

        <!-- Boutons d'action : Démo, GitHub & Contact direct pour les recruteurs -->
        <div class="pt-3 border-t border-slate-800 space-y-2.5">
          <div class="flex flex-wrap gap-2.5">
            <a
              :href="selectedProject.demoUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex-1 min-w-[130px] text-center px-4 py-2.5 rounded-lg text-xs font-pixel bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition shadow-lg shadow-emerald-500/20"
            >
              🎮 LANCER LA DÉMO
            </a>
            <a
              :href="selectedProject.githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex-1 min-w-[130px] text-center px-4 py-2.5 rounded-lg text-xs font-pixel bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white border border-slate-600 transition"
            >
              📂 CODE GITHUB
            </a>
          </div>

          <!-- Liens rapides pour le recruteur -->
          <div class="flex items-center justify-between text-[11px] font-mono text-slate-400 bg-slate-950/60 px-3 py-1.5 rounded border border-slate-800">
            <span>Dresseur : {{ trainer.name }}</span>
            <div class="flex gap-3">
              <a :href="trainer.cvUrl" download class="text-sky-400 hover:underline">📄 Télécharger CV</a>
              <a :href="`mailto:${contact.email}`" class="text-emerald-400 hover:underline">✉️ Contacter</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pied de l'écran droit style console 4G -->
    <div class="mt-3 flex items-center justify-between px-1">
      <div class="flex gap-2">
        <div class="w-10 h-3 rounded bg-slate-900 border border-slate-700"></div>
        <div class="w-10 h-3 rounded bg-slate-900 border border-slate-700"></div>
      </div>
      <div class="flex gap-2">
        <div class="w-3.5 h-3.5 rounded-full bg-amber-400 border border-amber-900 shadow"></div>
        <div class="w-3.5 h-3.5 rounded-full bg-slate-900 border border-slate-700 shadow"></div>
      </div>
    </div>
  </div>
</template>
