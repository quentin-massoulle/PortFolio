<script setup>
import { ref } from 'vue'
import { sfx } from '../utils/audio'
import ProjectsTab from './ProjectsTab.vue'
import StatsTab from './StatsTab.vue'
import BadgesTab from './BadgesTab.vue'
import ContactTab from './ContactTab.vue'

const props = defineProps({
  activeTab: {
    type: String,
    default: 'projects'
  },
  projects: {
    type: Array,
    required: true
  },
  selectedProject: {
    type: Object,
    required: true
  },
  stats: {
    type: Array,
    required: true
  },
  specialMoves: {
    type: Array,
    required: true
  },
  badges: {
    type: Array,
    required: true
  },
  contact: {
    type: Object,
    required: true
  },
  trainer: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:active-tab', 'select-project'])

const tabs = [
  { id: 'projects', label: 'PROJETS', icon: '🎒' },
  { id: 'stats', label: 'STATS', icon: '📊' },
  { id: 'badges', label: 'BADGES', icon: '🏅' },
  { id: 'contact', label: 'CONTACT', icon: '✉️' }
]

const changeTab = (tabId) => {
  sfx.playSelect()
  emit('update:active-tab', tabId)
}
</script>

<template>
  <div class="flex flex-col h-full bg-red-600 p-5 rounded-2xl md:rounded-l-none border-4 border-red-800 shadow-2xl">
    <!-- Onglets du Pokédex (Boutons style cartouche) -->
    <div class="grid grid-cols-4 gap-1.5 sm:gap-2 mb-3">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="changeTab(tab.id)"
        class="py-2 px-1 sm:px-2 rounded-t-lg text-[10px] sm:text-xs font-pixel transition-all border-b-2 cursor-pointer flex items-center justify-center gap-1 sm:gap-1.5 truncate"
        :class="activeTab === tab.id
          ? 'bg-slate-900 text-emerald-400 border-emerald-400 font-bold shadow-md -translate-y-0.5'
          : 'bg-red-800 hover:bg-red-700 text-red-200 border-red-950'"
      >
        <span>{{ tab.icon }}</span>
        <span class="hidden xs:inline">{{ tab.label }}</span>
      </button>
    </div>

    <!-- Écran secondaire (LCD foncé) -->
    <div class="flex-1 lcd-blue scanlines rounded-xl border-4 border-slate-950 p-3 sm:p-4 shadow-[inset_0_0_20px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden min-h-[460px]">
      <ProjectsTab
        v-if="activeTab === 'projects'"
        :projects="projects"
        :selected-project="selectedProject"
        @select-project="(p) => emit('select-project', p)"
      />

      <StatsTab
        v-else-if="activeTab === 'stats'"
        :stats="stats"
        :special-moves="specialMoves"
      />

      <BadgesTab
        v-else-if="activeTab === 'badges'"
        :badges="badges"
      />

      <ContactTab
        v-else-if="activeTab === 'contact'"
        :contact="contact"
        :trainer="trainer"
      />
    </div>

    <!-- Bandeau inférieur droit : Clavier de contrôle bleu & fentes -->
    <div class="mt-4 pt-2 flex items-center justify-between">
      <!-- 2 petits boutons rectangulaires bleus -->
      <div class="flex gap-2">
        <button
          @click="changeTab('projects')"
          class="w-12 h-3.5 rounded bg-sky-500 hover:bg-sky-400 shadow cursor-pointer border border-sky-800"
          title="Raccourci Projets"
        ></button>
        <button
          @click="changeTab('contact')"
          class="w-12 h-3.5 rounded bg-rose-500 hover:bg-rose-400 shadow cursor-pointer border border-rose-800"
          title="Raccourci Contact"
        ></button>
      </div>

      <!-- Boutons ronds jaunes de réglage -->
      <div class="flex gap-2">
        <div class="w-4 h-4 rounded-full bg-amber-400 border border-amber-900 shadow"></div>
        <div class="w-4 h-4 rounded-full bg-slate-900 border border-slate-700 shadow"></div>
      </div>
    </div>
  </div>
</template>
