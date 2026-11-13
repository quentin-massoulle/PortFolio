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
  <div class="min-h-screen bg-neutral-950 text-slate-100 flex flex-col justify-between py-6 px-3 sm:px-6">
    <!-- Conteneur Pokédex 4G (Sinnoh) centré -->
    <div class="max-w-6xl w-full mx-auto my-auto shadow-2xl rounded-3xl bg-red-700 border-4 border-red-950 relative overflow-hidden">
      <!-- En-tête Pokédex (Lentille bleue clignotante, 3 LEDs, Son 8-bit) -->
      <PokedexHeader
        :is-muted="isMuted"
        @toggle-audio="toggleAudio"
        @reset="resetPokedex"
      />

      <!-- Sélecteur d'écran sur mobile/tablette -->
      <div class="flex lg:hidden bg-red-800 border-b-2 border-red-900 p-2 gap-2">
        <button
          @click="mobileView = 'projects'"
          class="flex-1 py-2 px-3 rounded-lg text-xs font-pixel transition cursor-pointer"
          :class="mobileView === 'projects' || mobileView === 'both' ? 'bg-slate-900 text-emerald-400 font-bold' : 'bg-red-900/60 text-red-200'"
        >
          📋 LISTE DES PROJETS
        </button>
        <button
          @click="mobileView = 'data'"
          class="flex-1 py-2 px-3 rounded-lg text-xs font-pixel transition cursor-pointer relative"
          :class="mobileView === 'data' ? 'bg-slate-900 text-emerald-400 font-bold' : 'bg-red-900/60 text-red-200'"
        >
          <span>💻 DESCRIPTIF</span>
          <span v-if="isProjectOpen" class="w-2 h-2 rounded-full bg-emerald-400 animate-ping absolute top-2 right-3"></span>
        </button>
      </div>

      <!-- Corps du Pokédex 4G : 
           Volet Gauche (Liste verticale défilante) | Centre (Molette 4G Sinnoh) | Volet Droit (Descriptif du projet) -->
      <div class="p-3 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-0 relative items-stretch">
        
        <!-- VOLET GAUCHE : LISTE VERTICALE DES PROJETS AVEC SCROLL -->
        <div
          class="lg:col-span-5 h-full"
          :class="{
            'hidden lg:block': mobileView === 'data',
            'block': mobileView === 'projects' || mobileView === 'both'
          }"
        >
          <ProjectListScreen
            :projects="pokedexData.projects"
            :selected-project="selectedProject"
            :is-project-open="isProjectOpen"
            :trainer="pokedexData.trainer"
            @select-project="handleSelectProject"
            @dpad-up="prevProject"
            @dpad-down="nextProject"
            @action-a="onActionA"
            @action-b="onActionB"
          />
        </div>

        <!-- ÉLÉMENT AU CENTRE : CHARNIÈRE & MOLETTE POKÉDEX 4G (SINNOH) -->
        <div class="hidden lg:flex lg:col-span-2 items-center justify-center px-2 py-4">
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
          class="lg:col-span-5 h-full mt-4 lg:mt-0"
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
      <div class="px-6 py-3 bg-red-900/90 border-t-2 border-red-950 flex flex-wrap items-center justify-between text-xs text-red-200">
        <div class="flex items-center gap-3">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span class="font-pixel text-[10px]">POKÉDEX 4G CONNECTÉ</span>
        </div>
        <div class="hidden sm:flex items-center gap-4 text-[11px] font-mono text-red-300">
          <span>Navigation : Molette centrale ou ⬆️⬇️</span>
          <span>Clic / Entrée : Ouvrir</span>
          <span>Échap : Fermer</span>
        </div>
        <div class="text-[10px] font-pixel text-red-400">
          © {{ new Date().getFullYear() }} {{ pokedexData.trainer.name }}
        </div>
      </div>
    </div>

    <!-- Note d'aide pour le recruteur sous le Pokédex -->
    <div class="max-w-4xl mx-auto text-center mt-6 text-xs text-slate-400 space-y-1">
      <p>
        🔴 <strong class="text-slate-300">Style Pokédex 4G :</strong> Utilisez la molette centrale, la liste verticale ou votre clavier pour sélectionner un projet et afficher son descriptif.
      </p>
      <p class="text-slate-500">
        Développé en <strong>Vue.js 3 pur</strong> (Composition API), <strong>Tailwind CSS</strong> et <strong>Vite</strong>.
      </p>
    </div>
  </div>
</template>
