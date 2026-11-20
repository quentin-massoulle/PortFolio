<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { pokedexData } from './data/pokedexData'
import { sfx } from './utils/audio'
import PokedexHeader from './components/PokedexHeader.vue'
import ProjectListScreen from './components/ProjectListScreen.vue'
import CenterWheel from './components/CenterWheel.vue'
import DataScreen from './components/DataScreen.vue'

// État réactif
const isMuted = ref(sfx.muted)
const selectedProject = ref(pokedexData.projects[0])
const isProjectOpen = ref(false) // Le descriptif à droite apparaît uniquement au clic !
const mobileView = ref('both') // 'projects', 'data', ou 'both'

// Index du projet actuellement sélectionné
const currentProjectIndex = computed(() => {
  return pokedexData.projects.findIndex(p => p.id === selectedProject.value?.id)
})

// Bascule du son 8-bit
const toggleAudio = () => {
  isMuted.value = sfx.toggleMute()
}

// Clic sur un projet dans la liste de gauche
const handleSelectProject = (project) => {
  selectedProject.value = project
  isProjectOpen.value = true

  // Sur mobile, basculer sur l'écran descriptif
  if (typeof window !== 'undefined' && window.innerWidth < 1024) {
    mobileView.value = 'data'
  }
}

// Fermer le descriptif de projet
const handleCloseProject = () => {
  isProjectOpen.value = false
}

// Navigation entre projets via D-Pad, Clavier ou Molette 4G
const nextProject = () => {
  const currentIndex = pokedexData.projects.findIndex(p => p.id === selectedProject.value.id)
  const nextIndex = (currentIndex + 1) % pokedexData.projects.length
  selectedProject.value = pokedexData.projects[nextIndex]
}

const prevProject = () => {
  const currentIndex = pokedexData.projects.findIndex(p => p.id === selectedProject.value.id)
  const prevIndex = (currentIndex - 1 + pokedexData.projects.length) % pokedexData.projects.length
  selectedProject.value = pokedexData.projects[prevIndex]
}

// Bouton A / Centre de la molette (Ouvrir ou lancer démo)
const onActionA = () => {
  if (!isProjectOpen.value) {
    isProjectOpen.value = true
  } else if (selectedProject.value?.demoUrl) {
    window.open(selectedProject.value.demoUrl, '_blank')
  }
}

// Bouton B (Fermer le descriptif)
const onActionB = () => {
  if (isProjectOpen.value) {
    isProjectOpen.value = false
  }
}

// Réinitialiser la vue (clic sur la grande lentille bleue)
const resetPokedex = () => {
  isProjectOpen.value = false
  selectedProject.value = pokedexData.projects[0]
}

// Prise en charge des touches du clavier pour une immersion rétro 4G
const handleKeyDown = (e) => {
  if (e.key === 'ArrowUp') {
    e.preventDefault()
    prevProject()
  } else if (e.key === 'ArrowDown') {
    e.preventDefault()
    nextProject()
  } else if (e.key === 'Escape') {
    handleCloseProject()
  } else if (e.key === 'Enter') {
    onActionA()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <div class="min-h-screen bg-neutral-950 text-slate-100 flex flex-col justify-center items-center py-1.5 sm:py-3 px-2 sm:px-4">
    <!-- Conteneur Pokédex 4G (Sinnoh) centré, compact et resserré -->
    <div class="max-w-[720px] w-full mx-auto my-auto shadow-2xl rounded-xl sm:rounded-2xl bg-red-700 border-2 sm:border-4 border-red-950 relative overflow-hidden">
      <!-- En-tête Pokédex (Lentille bleue clignotante, 3 LEDs, Son 8-bit) -->
      <PokedexHeader
        :is-muted="isMuted"
        @toggle-audio="toggleAudio"
        @reset="resetPokedex"
      />

      <!-- Sélecteur d'écran sur mobile/tablette -->
      <div class="flex lg:hidden bg-red-800 border-b-2 border-red-900 p-1.5 gap-1.5">
        <button
          @click="mobileView = 'projects'"
          class="flex-1 py-1 px-2.5 rounded text-[10px] font-pixel transition cursor-pointer"
          :class="mobileView === 'projects' || mobileView === 'both' ? 'bg-slate-900 text-emerald-400 font-bold' : 'bg-red-900/60 text-red-200'"
        >
          📋 LISTE DES PROJETS
        </button>
        <button
          @click="mobileView = 'data'"
          class="flex-1 py-1 px-2.5 rounded text-[10px] font-pixel transition cursor-pointer relative"
          :class="mobileView === 'data' ? 'bg-slate-900 text-emerald-400 font-bold' : 'bg-red-900/60 text-red-200'"
        >
          <span>💻 DESCRIPTIF</span>
          <span v-if="isProjectOpen" class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping absolute top-1.5 right-2.5"></span>
        </button>
      </div>

      <!-- Corps du Pokédex 4G : 
           Volet Gauche (1fr) | Charnière étroite (auto) | Volet Droit (1fr) -->
      <div class="p-1.5 sm:p-2 grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-0 relative items-stretch">
        
        <!-- VOLET GAUCHE : LISTE VERTICALE DES PROJETS AVEC SCROLL -->
        <div
          class="h-full min-w-0"
          :class="{
            'hidden lg:block': mobileView === 'data',
            'block': mobileView === 'projects' || mobileView === 'both'
          }"
        >
          <ProjectListScreen
            :projects="pokedexData.projects"
            :selected-project="selectedProject"
            :is-project-open="isProjectOpen"
            @select-project="handleSelectProject"
            @dpad-up="prevProject"
            @dpad-down="nextProject"
            @action-a="onActionA"
            @action-b="onActionB"
          />
        </div>

        <!-- ÉLÉMENT AU CENTRE : CHARNIÈRE & MOLETTE POKÉDEX 4G RESSERRÉE -->
        <div class="hidden lg:flex w-13 shrink-0 items-center justify-center px-0 py-1">
          <CenterWheel
            :current-index="currentProjectIndex"
            :total-projects="pokedexData.projects.length"
            @prev="prevProject"
            @next="nextProject"
            @select="onActionA"
          />
        </div>

        <!-- VOLET DROIT : UNIQUEMENT LE DESCRIPTIF DU PROJET (RÉVÉLÉ AU CLIC) -->
        <div
          class="h-full min-w-0 mt-2 lg:mt-0"
          :class="{
            'hidden lg:block': mobileView === 'projects',
            'block': mobileView === 'data' || mobileView === 'both'
          }"
        >
          <DataScreen
            :selected-project="selectedProject"
            :is-open="isProjectOpen"
            :trainer="pokedexData.trainer"
            :contact="pokedexData.contact"
            @close-project="handleCloseProject"
          />
        </div>
      </div>

      <!-- Barre inférieure Pokédex 4G -->
      <div class="px-3 sm:px-4 py-1.5 bg-red-900/90 border-t-2 border-red-950 flex flex-wrap items-center justify-between text-[8px] sm:text-[9px] text-red-200">
        <div class="flex items-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span class="font-pixel text-[8px] sm:text-[9px]">POKÉDEX 4G CONNECTÉ</span>
        </div>
        <div class="hidden sm:flex items-center gap-3 font-mono text-red-300 text-[9px] sm:text-[10px]">
          <span>Navigation : Molette ou ⬆️⬇️</span>
          <span>Clic / Entrée : Ouvrir</span>
          <span>Échap : Fermer</span>
        </div>
        <div class="text-[8px] sm:text-[9px] font-pixel text-red-400">
          © {{ new Date().getFullYear() }} {{ pokedexData.trainer.name }}
        </div>
      </div>
    </div>

    <!-- Note d'aide pour le recruteur sous le Pokédex -->
    <div class="max-w-xl mx-auto text-center mt-1.5 sm:mt-2 text-[10px] sm:text-[11px] text-slate-400 space-y-0.5">
      <p>
        🔴 <strong class="text-slate-300">Style Pokédex 4G :</strong> Utilisez la molette centrale, la liste verticale ou votre clavier pour sélectionner un projet et afficher son descriptif.
      </p>
      <p class="text-slate-500">
        Développé en <strong>Vue.js 3 pur</strong> (Composition API), <strong>Tailwind CSS</strong> et <strong>Vite</strong>.
      </p>
    </div>
  </div>
</template>
