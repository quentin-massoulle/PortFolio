<script setup>
import { sfx } from '../utils/audio'

const props = defineProps({
  projects: {
    type: Array,
    required: true
  },
  selectedProject: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['select-project'])

const select = (project) => {
  sfx.playSelect()
  emit('select-project', project)
}
</script>

<template>
  <div class="flex flex-col h-full text-slate-100 font-sans">
    <!-- Barre supérieure : Sélecteur rapide de projet -->
    <div class="flex gap-2 overflow-x-auto pb-2 mb-3 pokedex-scroll">
      <button
        v-for="project in projects"
        :key="project.id"
        @click="select(project)"
        class="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-pixel border-2 transition whitespace-nowrap cursor-pointer"
        :class="selectedProject.id === project.id
          ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-[0_0_10px_rgba(52,211,153,0.3)]'
          : 'bg-slate-900/80 border-slate-700 text-slate-400 hover:border-slate-500'"
      >
        <span>{{ project.preview }}</span>
        <span>{{ project.number }} {{ project.name }}</span>
      </button>
    </div>

    <!-- Fiche détaillée de l'entrée Pokédex sélectionnée -->
    <div class="flex-1 bg-slate-900/90 rounded-xl border-2 border-slate-700 p-4 sm:p-5 flex flex-col justify-between overflow-y-auto pokedex-scroll shadow-inner">
      <div>
        <!-- En-tête fiche projet -->
        <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3 mb-4">
          <div>
            <span class="text-xs font-pixel text-emerald-400 mr-2">{{ selectedProject.number }}</span>
            <h3 class="inline text-lg sm:text-xl font-bold text-white tracking-tight">
              {{ selectedProject.name }}
            </h3>
          </div>
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded text-[10px] font-pixel bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
              {{ selectedProject.type }}
            </span>
            <span class="px-2 py-0.5 rounded text-xs font-semibold bg-slate-800 text-slate-400 border border-slate-700">
              {{ selectedProject.category }}
            </span>
          </div>
        </div>

        <!-- Description Pokédex -->
        <div class="bg-slate-950/70 p-3.5 rounded-lg border border-slate-800 mb-4 text-sm text-slate-300 leading-relaxed font-tech text-base">
          <p class="mb-2">{{ selectedProject.summary }}</p>
          <p class="text-xs text-slate-400 italic">{{ selectedProject.details }}</p>
        </div>

        <!-- Caractéristiques techniques / Highlights -->
        <div class="mb-4">
          <h4 class="text-xs font-pixel text-slate-400 uppercase tracking-wider mb-2">
            Points Clés & Réalisations :
          </h4>
          <ul class="space-y-1.5 text-xs text-slate-300 font-tech">
            <li
              v-for="(point, idx) in selectedProject.highlights"
              :key="idx"
              class="flex items-start gap-2"
            >
              <span class="text-emerald-400 font-bold">►</span>
              <span>{{ point }}</span>
            </li>
          </ul>
        </div>

        <!-- Stack technique -->
        <div>
          <h4 class="text-xs font-pixel text-slate-400 uppercase tracking-wider mb-2">
            Technologies Mobilisées :
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

      <!-- Boutons d'action : Démo & Code Source -->
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
