<script setup>
import { ref, computed } from 'vue'

// Données réactives (JavaScript pur)
const activeFilter = ref('Tous')

const categories = ['Tous', 'Web App', 'Frontend', 'Design']

const projects = ref([
  {
    id: 1,
    title: 'Application E-Commerce',
    description: 'Boutique en ligne interactive avec panier réactif et gestion des filtres.',
    category: 'Web App',
    tags: ['Vue 3', 'Tailwind', 'Pinia'],
    link: '#'
  },
  {
    id: 2,
    title: 'Dashboard Analytique',
    description: 'Tableau de bord de suivi de métriques avec graphiques dynamiques.',
    category: 'Frontend',
    tags: ['Vue.js', 'Vite', 'Charts'],
    link: '#'
  },
  {
    id: 3,
    title: 'Système de Design UI',
    description: 'Bibliothèque de composants modulaires et accessibles sous Tailwind CSS.',
    category: 'Design',
    tags: ['Design System', 'UI/UX'],
    link: '#'
  }
])

const skills = [
  { name: 'Vue.js 3', level: 'Avancé' },
  { name: 'JavaScript ES6+', level: 'Avancé' },
  { name: 'Tailwind CSS', level: 'Avancé' },
  { name: 'Vite', level: 'Intermédiaire' },
  { name: 'Git & GitHub', level: 'Avancé' },
  { name: 'API REST', level: 'Avancé' }
]

const likes = ref(0)
const incrementLikes = () => {
  likes.value++
}

const filteredProjects = computed(() => {
  if (activeFilter.value === 'Tous') return projects.value
  return projects.value.filter(p => p.category === activeFilter.value)
})
</script>

<template>
  <div class="min-h-screen flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
    <!-- Barre de navigation -->
    <header class="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800">
      <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" class="flex items-center gap-2 font-bold text-xl tracking-tight text-white hover:text-emerald-400 transition">
          <span class="inline-block w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
          MonPortfolio
        </a>
        <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#about" class="hover:text-emerald-400 transition">À propos</a>
          <a href="#projets" class="hover:text-emerald-400 transition">Projets</a>
          <a href="#skills" class="hover:text-emerald-400 transition">Compétences</a>
          <a href="#contact" class="hover:text-emerald-400 transition">Contact</a>
        </nav>
        <button
          @click="incrementLikes"
          class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition cursor-pointer"
        >
          <span>👏 Encourager</span>
          <span class="bg-emerald-500 text-slate-950 px-1.5 py-0.5 rounded-full font-bold">{{ likes }}</span>
        </button>
      </div>
    </header>

    <main class="flex-grow">
      <!-- Section Hero -->
      <section class="max-w-6xl mx-auto px-6 pt-24 pb-16 text-center md:text-left">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-slate-900 border border-slate-800 text-slate-400 mb-6">
          <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
          Vue 3 (JavaScript pur) + Tailwind CSS configuré
        </div>
        <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          Développeur Frontend <br />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            Créatif & Passionné
          </span>
        </h1>
        <p class="max-w-2xl text-lg text-slate-400 mb-8 leading-relaxed">
          Bienvenue sur votre nouveau projet Vue.js ! Ce socle est optimisé avec Vite, Tailwind CSS et les meilleures pratiques du Composition API en pur JavaScript.
        </p>
        <div class="flex flex-wrap items-center gap-4 justify-center md:justify-start">
          <a
            href="#projets"
            class="px-6 py-3 rounded-lg font-semibold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition shadow-lg shadow-emerald-500/20"
          >
            Explorer les projets
          </a>
          <a
            href="#contact"
            class="px-6 py-3 rounded-lg font-semibold bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition"
          >
            Me contacter
          </a>
        </div>
      </section>

      <!-- Section Compétences -->
      <section id="skills" class="max-w-6xl mx-auto px-6 py-16 border-t border-slate-900">
        <h2 class="text-2xl font-bold text-white mb-8">Compétences Techniques</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          <div
            v-for="skill in skills"
            :key="skill.name"
            class="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/40 transition text-center"
          >
            <p class="font-semibold text-white text-sm">{{ skill.name }}</p>
            <p class="text-xs text-slate-500 mt-1">{{ skill.level }}</p>
          </div>
        </div>
      </section>

      <!-- Section Projets avec filtres réactifs -->
      <section id="projets" class="max-w-6xl mx-auto px-6 py-16 border-t border-slate-900">
        <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 class="text-2xl font-bold text-white">Projets Récents</h2>
            <p class="text-sm text-slate-400 mt-1">Filtrage réactif propulsé par Vue 3</p>
          </div>
          <!-- Filtres -->
          <div class="flex flex-wrap gap-2">
            <button
              v-for="category in categories"
              :key="category"
              @click="activeFilter = category"
              :class="[
                'px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer',
                activeFilter === category
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              ]"
            >
              {{ category }}
            </button>
          </div>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="project in filteredProjects"
            :key="project.id"
            class="flex flex-col justify-between p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition"
          >
            <div>
              <span class="text-xs font-semibold text-emerald-400 tracking-wider uppercase">
                {{ project.category }}
              </span>
              <h3 class="text-lg font-bold text-white mt-2 mb-2">{{ project.title }}</h3>
              <p class="text-sm text-slate-400 leading-relaxed">{{ project.description }}</p>
            </div>
            <div class="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between">
              <div class="flex flex-wrap gap-1.5">
                <span
                  v-for="tag in project.tags"
                  :key="tag"
                  class="px-2 py-0.5 text-[11px] font-medium bg-slate-800 text-slate-300 rounded"
                >
                  {{ tag }}
                </span>
              </div>
              <a :href="project.link" class="text-sm font-semibold text-emerald-400 hover:underline">
                Voir &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Section Contact -->
      <section id="contact" class="max-w-4xl mx-auto px-6 py-20 text-center">
        <div class="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800">
          <h2 class="text-3xl font-bold text-white mb-4">Un projet en tête ?</h2>
          <p class="text-slate-400 max-w-xl mx-auto mb-8 text-sm sm:text-base">
            Vous pouvez personnaliser ce portfolio avec vos propres réalisations, ajouter de nouveaux composants ou brancher une API.
          </p>
          <a
            href="mailto:contact@example.com"
            class="inline-block px-8 py-3.5 rounded-xl font-semibold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition"
          >
            Démarrer la discussion
          </a>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="border-t border-slate-900 py-8 text-center text-xs text-slate-500">
      <p>© {{ new Date().getFullYear() }} Mon Portfolio — Conçu avec Vue 3, Vite & Tailwind CSS</p>
    </footer>
  </div>
</template>
