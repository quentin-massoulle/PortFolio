<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { pokedexData } from './data/pokedexData'
import ProjectListScreen from './components/ProjectListScreen.vue'
import DataScreen from './components/DataScreen.vue'

// État réactif
const selectedProject = ref(pokedexData.projects[0])
const isProjectOpen = ref(true) // Premier projet ouvert par défaut au chargement
const mobileView = ref('both') // 'projects', 'data', ou 'both'

// Index du projet actuellement sélectionné
const currentProjectIndex = computed(() => {
  return pokedexData.projects.findIndex(p => p.id === selectedProject.value?.id)
})

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
    <!-- Conteneur Pokédex 4G (Sinnoh) centré, taille comme avant -->
    <div class="max-w-[820px] w-full mx-auto my-auto shadow-2xl rounded-xl sm:rounded-2xl bg-red-700 border-2 sm:border-4 border-red-950 relative overflow-hidden">
      <!-- Corps du Pokédex 4G : Volet Gauche | Volet Droit -->
      <div class="p-1.5 sm:p-2 pb-2 sm:pb-3 grid grid-cols-1 lg:grid-cols-2 gap-2 relative items-stretch">
        
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
    </div>
  </div>
</template>
