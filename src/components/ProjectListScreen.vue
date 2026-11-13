<script setup>
import { ref } from 'vue'
import { sfx } from '../utils/audio'

const props = defineProps({
  projects: {
    type: Array,
    required: true
  },
  selectedProject: {
    type: Object,
    default: null
  },
  isProjectOpen: {
    type: Boolean,
    default: false
  },
  trainer: {
    type: Object,
    required: true
  }
})

const emit = defineEmits([
  'select-project',
  'dpad-up',
  'dpad-down',
  'dpad-left',
  'dpad-right',
  'action-a',
  'action-b'
])

// Vue de l'écran de gauche : 'list' (liste des projets) ou 'trainer' (profil dresseur)
const currentView = ref('list')

const onSelect = (project) => {
  sfx.playSelect()
  emit('select-project', project)
}

const handleDpad = (dir) => {
  sfx.playBeep(320, 0.04)
  emit(`dpad-${dir}`)
}

const handleActionA = () => {
  sfx.playSelect()
  emit('action-a')
}

const handleActionB = () => {
  sfx.playDamage()
  emit('action-b')
}
</script>

<template>
  <div class="flex flex-col h-full bg-red-600 p-5 rounded-2xl md:rounded-r-none border-4 border-red-800 shadow-2xl">
    <!-- Cadre de l'écran principal (bords biseautés gris) -->
    <div class="relative bg-slate-200 border-4 border-slate-400 rounded-xl p-3 sm:p-4 shadow-inner flex flex-col flex-1">
      <!-- 2 LEDs rouges + bascule de vue -->
      <div class="flex justify-between items-center mb-2 px-1">
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-rose-600 border border-slate-600"></span>
          <span class="w-2.5 h-2.5 rounded-full bg-rose-600 border border-slate-600"></span>
          <span class="text-[10px] font-pixel text-slate-700 ml-1">INDEX CENTRAL</span>
        </div>

        <!-- Bascule Liste Projets / Profil Dresseur -->
        <button
          @click="currentView = currentView === 'list' ? 'trainer' : 'list'; sfx.playSelect()"
          class="px-2 py-0.5 rounded text-[9px] font-pixel bg-slate-800 text-emerald-400 border border-slate-700 hover:bg-slate-700 transition cursor-pointer"
        >
          {{ currentView === 'list' ? '👤 DRESSEUR' : '📋 PROJETS' }}
        </button>
      </div>

      <!-- Écran LCD Rétro Vert/Noir -->
      <div class="lcd-screen scanlines rounded-lg border-2 border-slate-800 p-3 sm:p-3.5 text-emerald-400 font-mono shadow-[inset_0_0_15px_rgba(0,0,0,0.8)] relative flex-1 flex flex-col overflow-hidden min-h-[380px]">
        
        <!-- VUE 1 : LISTE DES PROJETS AVEC DÉFILEMENT VERTICAL -->
        <div v-if="currentView === 'list'" class="flex flex-col h-full">
          <!-- Bandeau titre de l'index -->
          <div class="flex items-center justify-between border-b border-emerald-900/70 pb-2 mb-2 text-xs">
            <span class="font-pixel text-emerald-300 text-[10px]">
              LISTE DES ENTRÉES ({{ projects.length }})
            </span>
            <span class="text-[9px] font-pixel text-emerald-400/80 animate-pulse">
              DÉFILEMENT ↕
            </span>
          </div>

          <!-- Indication pour le recruteur -->
          <div class="bg-emerald-950/40 rounded px-2 py-1 mb-2 border border-emerald-900/40 text-[10px] font-tech text-emerald-200">
            👉 Cliquez sur une ligne pour afficher sa fiche descriptive à droite.
          </div>

          <!-- LISTE VERTICALE DES PROJETS (LIGNES DÉFILANTES) -->
          <div class="flex-1 overflow-y-auto pokedex-scroll space-y-1.5 pr-1 max-h-[290px]">
            <div
              v-for="project in projects"
              :key="project.id"
              @click="onSelect(project)"
              class="group relative flex items-center justify-between p-2.5 rounded-md border transition cursor-pointer select-none"
              :class="selectedProject?.id === project.id && isProjectOpen
                ? 'bg-emerald-500/25 border-emerald-400 text-white shadow-[0_0_12px_rgba(52,211,153,0.35)]'
                : 'bg-emerald-950/50 border-emerald-900/60 text-emerald-300 hover:bg-emerald-900/50 hover:border-emerald-500/50'"
            >
              <!-- Côté gauche : Curseur, Numéro et Nom -->
              <div class="flex items-center gap-2 min-w-0">
                <!-- Curseur animé si sélectionné -->
                <span
                  class="font-pixel text-xs transition-transform"
                  :class="selectedProject?.id === project.id && isProjectOpen
                    ? 'text-emerald-300 translate-x-0.5 animate-pulse'
                    : 'text-transparent group-hover:text-emerald-500/60'"
                >
                  ►
                </span>

                <!-- Icône / Émoji Pokéball -->
                <span class="text-sm shrink-0">{{ project.preview }}</span>

                <!-- Numéro d'entrée -->
                <span class="font-pixel text-[10px] text-emerald-400 shrink-0">
                  {{ project.number }}
                </span>

                <!-- Titre du projet en ligne -->
                <span class="font-bold text-xs truncate group-hover:text-white transition">
                  {{ project.name }}
                </span>
              </div>

              <!-- Côté droit : Badge de type / statut -->
              <div class="flex items-center gap-1.5 shrink-0 ml-2">
                <span class="px-1.5 py-0.5 rounded text-[9px] font-pixel bg-emerald-900/80 text-emerald-200 border border-emerald-600/40">
                  {{ project.type }}
                </span>
                <span
                  v-if="selectedProject?.id === project.id && isProjectOpen"
                  class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"
                  title="Fiche ouverte"
                ></span>
              </div>
            </div>
          </div>

          <!-- Pied de l'écran avec aide navigation -->
          <div class="border-t border-emerald-900/70 pt-2 mt-2 flex justify-between items-center text-[9px] font-pixel text-emerald-400/80">
            <span>CLAVIER : ⬆️ / ⬇️</span>
            <span>CLIQUEZ POUR OUVRIR</span>
          </div>
        </div>

        <!-- VUE 2 : PROFIL DRESSEUR (ACCESSIBLE VIA LE BOUTON DRESSEUR) -->
        <div v-else class="flex flex-col h-full justify-between">
          <div>
            <div class="flex items-center justify-between border-b border-emerald-900/60 pb-2 mb-2">
              <span class="text-xs font-pixel text-emerald-300">ID: {{ trainer.pokedexId }}</span>
              <span class="text-[10px] font-pixel text-emerald-200">LVL {{ trainer.level }}</span>
            </div>

            <div class="flex gap-3 items-center mb-3">
              <div class="w-16 h-16 rounded-lg bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-3xl">
                👨‍💻
              </div>
              <div>
                <h3 class="text-base font-bold font-pixel text-white">{{ trainer.name }}</h3>
                <p class="text-xs text-emerald-300 font-tech uppercase">{{ trainer.title }}</p>
                <div class="flex gap-1 mt-1">
                  <span
                    v-for="type in trainer.types"
                    :key="type"
                    class="px-1.5 py-0.5 rounded text-[9px] font-pixel bg-emerald-900/90 text-emerald-200 border border-emerald-500/40"
                  >
                    {{ type }}
                  </span>
                </div>
              </div>
            </div>

            <div class="bg-emerald-950/60 rounded p-2.5 border border-emerald-900/80 text-xs text-emerald-200 leading-relaxed font-tech">
              <p>"{{ trainer.bio }}"</p>
              <div class="mt-2 pt-1 border-t border-emerald-900/50 flex justify-between text-[11px] text-emerald-400">
                <span>📍 {{ trainer.location }}</span>
                <span class="font-bold text-emerald-300">🟢 {{ trainer.status }}</span>
              </div>
            </div>
          </div>

          <button
            @click="currentView = 'list'; sfx.playSelect()"
            class="w-full mt-2 py-1.5 rounded bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 border border-emerald-700 text-xs font-pixel transition cursor-pointer"
          >
            ◄ RETOUR À LA LISTE DES PROJETS
          </button>
        </div>
      </div>

      <!-- Bas du cadre écran : haut-parleur et bouton rouge -->
      <div class="flex items-center justify-between mt-3 px-2">
        <button
          @click="handleActionA"
          class="w-6 h-6 rounded-full bg-rose-600 border-2 border-slate-700 shadow hover:bg-rose-500 cursor-pointer"
          title="Bouton Diagnostic"
        ></button>
        <!-- Grille de haut-parleur -->
        <div class="flex flex-col gap-1 w-20">
          <div class="h-1 bg-slate-600 rounded"></div>
          <div class="h-1 bg-slate-600 rounded"></div>
          <div class="h-1 bg-slate-600 rounded"></div>
        </div>
      </div>
    </div>

    <!-- Contrôles physiques inférieurs : D-Pad & Boutons A/B -->
    <div class="flex items-center justify-between mt-5 px-3">
      <!-- D-Pad croix directionnelle -->
      <div class="relative w-28 h-28">
        <!-- Bouton Haut (Projet précédent) -->
        <button
          @click="handleDpad('up')"
          class="absolute top-0 left-9 w-10 h-10 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-slate-400 rounded-t flex items-center justify-center shadow-md border border-slate-700 cursor-pointer text-xs"
          title="Projet précédent (Haut)"
        >
          ▲
        </button>
        <!-- Bouton Bas (Projet suivant) -->
        <button
          @click="handleDpad('down')"
          class="absolute bottom-0 left-9 w-10 h-10 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-slate-400 rounded-b flex items-center justify-center shadow-md border border-slate-700 cursor-pointer text-xs"
          title="Projet suivant (Bas)"
        >
          ▼
        </button>
        <!-- Bouton Gauche (Onglet précédent) -->
        <button
          @click="handleDpad('left')"
          class="absolute top-9 left-0 w-10 h-10 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-slate-400 rounded-l flex items-center justify-center shadow-md border border-slate-700 cursor-pointer text-xs"
          title="Onglet précédent (Gauche)"
        >
          ◀
        </button>
        <!-- Bouton Droite (Onglet suivant) -->
        <button
          @click="handleDpad('right')"
          class="absolute top-9 right-0 w-10 h-10 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-slate-400 rounded-r flex items-center justify-center shadow-md border border-slate-700 cursor-pointer text-xs"
          title="Onglet suivant (Droite)"
        >
          ▶
        </button>
        <!-- Centre fixe -->
        <div class="absolute top-9 left-9 w-10 h-10 bg-slate-900 flex items-center justify-center pointer-events-none">
          <div class="w-4 h-4 rounded-full bg-slate-950/80 border border-slate-800"></div>
        </div>
      </div>

      <!-- Boutons d'action ronds A et B -->
      <div class="flex items-center gap-4">
        <!-- Bouton B (Fermer descriptif / Annuler) -->
        <div class="flex flex-col items-center">
          <button
            @click="handleActionB"
            class="w-11 h-11 rounded-full bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-pixel text-xs font-bold border-2 border-amber-900 shadow-lg flex items-center justify-center cursor-pointer"
            title="Bouton B : Fermer le descriptif"
          >
            B
          </button>
          <span class="text-[9px] font-pixel text-red-200 mt-1">FERMER</span>
        </div>

        <!-- Bouton A (Ouvrir / Valider sélection) -->
        <div class="flex flex-col items-center">
          <button
            @click="handleActionA"
            class="w-11 h-11 rounded-full bg-cyan-400 hover:bg-cyan-300 active:scale-95 text-slate-950 font-pixel text-xs font-bold border-2 border-cyan-800 shadow-lg flex items-center justify-center cursor-pointer"
            title="Bouton A : Ouvrir la fiche"
          >
            A
          </button>
          <span class="text-[9px] font-pixel text-red-200 mt-1">OUVRIR</span>
        </div>
      </div>
    </div>
  </div>
</template>

