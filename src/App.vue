<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { pokedexData } from './data/pokedexData'
import { sfx } from './utils/audio'
import PokedexHeader from './components/PokedexHeader.vue'
import ProjectListScreen from './components/ProjectListScreen.vue'
import DataScreen from './components/DataScreen.vue'

// État réactif
const isMuted = ref(sfx.muted)
const activeTab = ref('projects')
const selectedProject = ref(pokedexData.projects[0])
const isProjectOpen = ref(false) // Le descriptif à droite apparaît uniquement au clic !
const mobileView = ref('both') // 'projects', 'data', ou 'both'

// Bascule du son 8-bit
const toggleAudio = () => {
  isMuted.value = sfx.toggleMute()
}

// Clic sur un projet dans la liste de gauche
const handleSelectProject = (project) => {
  selectedProject.value = project
  isProjectOpen.value = true
  activeTab.value = 'projects'

  // Sur mobile, basculer automatiquement sur l'écran de droite pour lire le descriptif
  if (typeof window !== 'undefined' && window.innerWidth < 1024) {
    mobileView.value = 'data'
  }
}

// Fermer le descriptif de projet
const handleCloseProject = () => {
  isProjectOpen.value = false
}

// Navigation entre projets (Suivant / Précédent via D-Pad ou Clavier)
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

// Navigation entre onglets (Gauche / Droite)
const tabs = ['projects', 'stats', 'badges', 'contact']
const nextTab = () => {
  const currentIndex = tabs.indexOf(activeTab.value)
  activeTab.value = tabs[(currentIndex + 1) % tabs.length]
}

const prevTab = () => {
  const currentIndex = tabs.indexOf(activeTab.value)
  activeTab.value = tabs[(currentIndex - 1 + tabs.length) % tabs.length]
}

// Bouton A (Ouvrir le descriptif ou lancer la démo)
const onActionA = () => {
  if (!isProjectOpen.value) {
    isProjectOpen.value = true
    activeTab.value = 'projects'
  } else if (activeTab.value === 'projects' && selectedProject.value?.demoUrl) {
    window.open(selectedProject.value.demoUrl, '_blank')
  } else if (activeTab.value === 'contact') {
    activeTab.value = 'projects'
  }
}

// Bouton B (Fermer le descriptif)
const onActionB = () => {
  if (isProjectOpen.value) {
    isProjectOpen.value = false
  } else {
    activeTab.value = 'projects'
  }
}

// Réinitialiser la vue (clic sur la grande lentille bleue)
const resetPokedex = () => {
  activeTab.value = 'projects'
  isProjectOpen.value = false
  selectedProject.value = pokedexData.projects[0]
}

// Prise en charge des touches du clavier pour une immersion rétro totale
const handleKeyDown = (e) => {
  if (e.key === 'ArrowUp') {
    e.preventDefault()
    prevProject()
  } else if (e.key === 'ArrowDown') {
    e.preventDefault()
    nextProject()
  } else if (e.key === 'ArrowRight') {
    e.preventDefault()
    nextTab()
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault()
    prevTab()
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
    <!-- Conteneur Pokédex centré -->
    <div class="max-w-6xl w-full mx-auto my-auto shadow-2xl rounded-3xl bg-red-700 border-4 border-red-950 relative overflow-hidden">
      <!-- En-tête Pokédex (Lentille bleue clignotante, 3 LEDs, Son) -->
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

      <!-- Corps du Pokédex : Double Écran avec charnière centrale -->
      <div class="p-3 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-0 relative">
        <!-- Volet Gauche : Écran avec liste verticale des projets & scroll -->
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
            @dpad-left="prevTab"
            @dpad-right="nextTab"
            @action-a="onActionA"
            @action-b="onActionB"
          />
        </div>

        <!-- Charnière centrale du Pokédex (visible sur grand écran) -->
        <div class="hidden lg:flex lg:col-span-1 items-center justify-center relative">
          <div class="w-8 h-[92%] bg-gradient-to-r from-red-900 via-red-800 to-red-950 rounded-lg border-2 border-red-950 shadow-2xl flex flex-col justify-around py-8">
            <div class="w-full h-4 bg-red-950/60 border-y border-red-700"></div>
            <div class="w-full h-4 bg-red-950/60 border-y border-red-700"></div>
            <div class="w-full h-4 bg-red-950/60 border-y border-red-700"></div>
          </div>
        </div>

        <!-- Volet Droit : Écran de Descriptif (s'ouvre au clic) & Onglets -->
        <div
          class="lg:col-span-6 h-full mt-4 lg:mt-0"
          :class="{
            'hidden lg:block': mobileView === 'projects',
            'block': mobileView === 'data' || mobileView === 'both'
          }"
        >
          <DataScreen
            v-model:active-tab="activeTab"
            :projects="pokedexData.projects"
            :selected-project="selectedProject"
            :is-project-open="isProjectOpen"
            :stats="pokedexData.stats"
            :special-moves="pokedexData.specialMoves"
            :badges="pokedexData.badges"
            :contact="pokedexData.contact"
            :trainer="pokedexData.trainer"
            @close-project="handleCloseProject"
          />
        </div>
      </div>

      <!-- Barre inférieure Pokédex -->
      <div class="px-6 py-3 bg-red-900/90 border-t-2 border-red-950 flex flex-wrap items-center justify-between text-xs text-red-200">
        <div class="flex items-center gap-3">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span class="font-pixel text-[10px]">POKÉDEX VUE 3 CONNECTÉ</span>
        </div>
        <div class="hidden sm:flex items-center gap-4 text-[11px] font-mono text-red-300">
          <span>Navigation : ⬆️⬇️ Projets</span>
          <span>Entrée / Clic : Ouvrir</span>
          <span>Échap / B : Fermer</span>
        </div>
        <div class="text-[10px] font-pixel text-red-400">
          © {{ new Date().getFullYear() }} {{ pokedexData.trainer.name }}
        </div>
      </div>
    </div>

    <!-- Instructions d'accessibilité / Note pour le recruteur sous le Pokédex -->
    <div class="max-w-4xl mx-auto text-center mt-6 text-xs text-slate-400 space-y-1">
      <p>
        🎮 <strong class="text-slate-300">Mode d'emploi :</strong> Cliquez sur un projet dans la liste verticale de gauche pour afficher son descriptif détaillé sur l'écran de droite.
      </p>
      <p class="text-slate-500">
        Développé en <strong>Vue.js 3 pur</strong> (Composition API), <strong>Tailwind CSS</strong> et <strong>Vite</strong>.
      </p>
    </div>
  </div>
</template>
