<script setup>
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
    default: () => ({})
  },
  contact: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['close-project'])

const handleClose = () => {
  emit('close-project')
}
</script>

<template>
  <div class="flex flex-col h-full bg-red-600 p-2 sm:p-3 rounded-xl md:rounded-l-none border-2 sm:border-3 border-red-800 shadow-xl">
    <!-- En-tête supérieur style Pokédex 4G -->
    <div class="flex items-center justify-between mb-1 px-0.5">
      <div class="flex items-center gap-1.5">
        <span class="w-2 h-2 rounded-full bg-sky-400 border border-slate-900 shadow-[0_0_6px_rgba(56,189,248,0.8)]"></span>
        <h3 class="text-[10px] font-pixel text-slate-100 tracking-wider">
          DESCRIPTIF DU PROJET
        </h3>
      </div>
    </div>

    <!-- Écran LCD droit : Hauteur compacte et scroll interne sur le descriptif -->
    <div class="flex-1 lcd-blue scanlines rounded-md border-2 border-slate-950 p-2.5 sm:p-3 shadow-[inset_0_0_15px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden overflow-x-hidden min-h-[235px] h-[270px] max-h-[270px]">
      
      <!-- ÉTAT 1 : AUCUN PROJET SÉLECTIONNÉ (EN ATTENTE DE CLIC) -->
      <div
        v-if="!isOpen || !selectedProject"
        class="h-full rounded-lg p-3 flex flex-col items-center justify-center text-center relative overflow-hidden"
      >
        <!-- Grille radar d'attente -->
        <div class="relative w-16 h-16 mb-2 rounded-full border-2 border-sky-500/40 flex items-center justify-center">
          <div class="w-11 h-11 rounded-full border border-sky-400/60 animate-ping opacity-25"></div>
          <div class="w-8 h-8 rounded-full bg-sky-500/20 border border-sky-400 flex items-center justify-center text-xl">
            📡
          </div>
        </div>

        <h4 class="text-xs font-bold font-pixel text-sky-300 mb-1 tracking-wide">
          POKÉDEX 4G EN ATTENTE
        </h4>
        <p class="text-[11px] text-slate-300 max-w-xs mb-2 leading-snug font-tech">
          Sélectionnez un projet dans la liste de gauche ou appuyez sur la <strong class="text-emerald-400">Pokéball centrale</strong> pour afficher son descriptif détaillé.
        </p>

        <div class="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-950/80 border border-slate-800 text-[8px] font-pixel text-slate-400">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>SYSTÈME DE SCAN ACTIF</span>
        </div>
      </div>

      <!-- ÉTAT 2 : FICHE DESCRIPTIVE COMPLÈTE AVEC SCROLL INTERNE -->
      <div
        v-else
        class="h-full flex flex-col justify-between overflow-y-auto overflow-x-hidden pokedex-scroll pr-1 animate-in fade-in duration-200"
      >
        <div>
          <!-- Ligne de titre : Numéro, Titre et Bouton Fermer -->
          <div class="flex items-start justify-between border-b border-slate-800 pb-1.5 mb-1.5 gap-2">
            <div>
              <div class="flex items-center gap-1.5 mb-0.5 flex-wrap">
                <span class="text-[10px] font-pixel text-emerald-400 whitespace-nowrap">{{ selectedProject.number }}</span>
                <span class="px-1.5 py-0.5 rounded text-[8px] font-pixel bg-slate-800 text-slate-400 border border-slate-700 whitespace-nowrap">
                  {{ selectedProject.type }}
                </span>
                <span class="px-1.5 py-0.5 rounded text-[8px] font-pixel bg-slate-800 text-slate-400 border border-slate-700 whitespace-nowrap">
                  {{ selectedProject.category }}
                </span>
              </div>
              <h3 class="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-1.5">
                <span>{{ selectedProject.preview }}</span>
                <span>{{ selectedProject.name }}</span>
              </h3>
            </div>

            <!-- Bouton Fermer -->
            <button
              @click="handleClose"
              class="px-1.5 py-0.5 rounded text-[8px] font-pixel bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition cursor-pointer shrink-0"
              title="Fermer le descriptif"
            >
              ✖ FERMER
            </button>
          </div>

          <!-- Encadré descriptif Pokédex -->
          <div class="bg-slate-950/85 p-2 rounded border border-slate-800 mb-2 text-xs text-slate-200 leading-snug font-tech">
            <p class="mb-1 text-xs text-slate-100 font-medium">
              {{ selectedProject.summary }}
            </p>
            <p class="text-[10px] text-slate-400 italic">
              {{ selectedProject.details }}
            </p>
          </div>

          <!-- Points Clés & Réalisations -->
          <div class="mb-2">
            <h4 class="text-[9px] font-pixel text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
              <span class="text-emerald-400">⚡</span>
              <span>RÉALISATIONS TECHNIQUES :</span>
            </h4>
            <ul class="space-y-1 text-[11px] text-slate-300 font-tech">
              <li
                v-for="(point, idx) in selectedProject.highlights"
                :key="idx"
                class="flex items-start gap-1.5 bg-slate-950/50 p-1.5 rounded border border-slate-800/70"
              >
                <span class="text-emerald-400 font-bold shrink-0">►</span>
                <span>{{ point }}</span>
              </li>
            </ul>
          </div>

          <!-- Stack technique -->
          <div class="mb-2">
            <h4 class="text-[9px] font-pixel text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
              <span class="text-cyan-400">🛠️</span>
              <span>TECHNOLOGIES MOBILISÉES :</span>
            </h4>
            <div class="flex flex-wrap gap-1">
              <span
                v-for="tech in selectedProject.stack"
                :key="tech"
                class="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800/90 text-emerald-300 border border-slate-700"
              >
                #{{ tech }}
              </span>
            </div>
          </div>
        </div>

        <!-- Boutons d'action : Démo, GitHub -->
        <div class="pt-2 border-t border-slate-800 space-y-1.5">
          <div class="flex gap-2">
            <a
              :href="selectedProject.demoUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex-1 min-w-0 text-center px-2 py-1.5 rounded text-[9px] font-pixel bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition shadow truncate"
            >
              🎮 DÉMO
            </a>
            <a
              :href="selectedProject.githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex-1 min-w-0 text-center px-2 py-1.5 rounded text-[9px] font-pixel bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white border border-slate-600 transition truncate"
            >
              📂 GITHUB
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Pied de l'écran droit style console 4G -->
    <div class="mt-1.5 flex items-center justify-between px-0.5">
      <div class="flex gap-1.5">
        <div class="w-8 h-2 rounded bg-slate-900 border border-slate-700"></div>
        <div class="w-8 h-2 rounded bg-slate-900 border border-slate-700"></div>
      </div>
      <div class="flex gap-1.5">
        <div class="w-2.5 h-2.5 rounded-full bg-amber-400 border border-amber-900 shadow"></div>
        <div class="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700 shadow"></div>
      </div>
    </div>
  </div>
</template>
