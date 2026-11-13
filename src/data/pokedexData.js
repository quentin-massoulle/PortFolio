export const pokedexData = {
  trainer: {
    name: "QUENTIN",
    title: "Développeur Frontend Vue.js",
    pokedexId: "N° 024",
    level: 24,
    hp: "100 / 100",
    types: ["FRONTEND", "VUE.JS"],
    status: "DISPONIBLE AU RECRUTEMENT",
    location: "France (Télétravail / Hybride)",
    xp: "8 450 / 10 000 XP",
    bio: "Développeur passionné par l'écosystème Vue.js et l'UI/UX design. Je conçois des applications web rapides, propres et réactives avec une attention maniaque aux détails et à l'expérience utilisateur.",
    cvUrl: "#",
    avatarPlaceholder: "⚡"
  },

  stats: [
    { label: "VUE.JS 3", value: 92, max: 100, color: "bg-emerald-500", statType: "HP" },
    { label: "JAVASCRIPT", value: 88, max: 100, color: "bg-amber-400", statType: "ATK" },
    { label: "TAILWIND CSS", value: 94, max: 100, color: "bg-cyan-400", statType: "DEF" },
    { label: "CLEAN CODE", value: 85, max: 100, color: "bg-indigo-400", statType: "SPA" },
    { label: "GIT & CI/CD", value: 80, max: 100, color: "bg-rose-400", statType: "SPD" },
    { label: "RÉSOL. PROBLÈMES", value: 90, max: 100, color: "bg-purple-400", statType: "SPE" }
  ],

  specialMoves: [
    {
      name: "Composition API",
      type: "VUE",
      pp: "20/20",
      typeColor: "bg-emerald-600",
      description: "Structure le code logique de manière modulaire, réutilisable et ultra-performante."
    },
    {
      name: "Réactivité Ultime",
      type: "JS",
      pp: "15/15",
      typeColor: "bg-amber-600",
      description: "Synchronisation instantanée des données réactives sans saccade ni rechargement."
    },
    {
      name: "Pixel-Perfect UI",
      type: "CSS",
      pp: "25/25",
      typeColor: "bg-cyan-600",
      description: "Intégration fidèle des maquettes avec accessibilité et fluidité sur tous les écrans."
    },
    {
      name: "Débug Éclair",
      type: "DEV",
      pp: "10/10",
      typeColor: "bg-rose-600",
      description: "Traque les bugs et optimise les requêtes réseau pour des temps de réponse minimaux."
    }
  ],

  projects: [
    {
      id: "PROJ-001",
      number: "#001",
      name: "Portfolio Pokédex",
      type: "VUE 3",
      category: "Frontend",
      color: "emerald",
      preview: "🎮",
      summary: "Portfolio interactif reprenant l'esthétique et les fonctionnalités d'un Pokédex rétro pour séduire les recruteurs.",
      details: "Développé avec Vue 3, Vite et Tailwind CSS. Intègre un synthétiseur audio Web Audio API pour les bips rétro, un D-pad cliquable et une navigation double écran responsive.",
      highlights: [
        "Architecture Vue 3 Composition API",
        "Effets sonores 8-bit générés à la volée",
        "Interface responsive mobile & grand écran"
      ],
      stack: ["Vue 3", "Vite", "Tailwind CSS", "Web Audio API"],
      demoUrl: "https://github.com",
      githubUrl: "https://github.com"
    },
    {
      id: "PROJ-002",
      number: "#002",
      name: "E-Shop Évolutif",
      type: "APP WEB",
      category: "Fullstack",
      color: "cyan",
      preview: "🛍️",
      summary: "Plateforme e-commerce fluide avec gestion de panier en temps réel, filtres instantanés et paiement sécurisé.",
      details: "Application Single Page réactive avec système de filtres par facettes, validation de formulaire dynamique et mise en cache des articles.",
      highlights: [
        "Gestion d'état global réactif",
        "Calcul dynamique des remises & taxes",
        "Temps de chargement < 0.5s"
      ],
      stack: ["Vue.js", "Tailwind CSS", "REST API", "LocalStorage"],
      demoUrl: "https://github.com",
      githubUrl: "https://github.com"
    },
    {
      id: "PROJ-003",
      number: "#003",
      name: "Dashboard Analytics",
      type: "SAAS",
      category: "Data Viz",
      color: "amber",
      preview: "📊",
      summary: "Tableau de bord de suivi de données en temps réel avec indicateurs clés et graphiques interactifs.",
      details: "Dashboard conçu pour les décideurs : filtrage temporel, export de données et design système sombre à fort contraste.",
      highlights: [
        "Visualisations de données fluides",
        "Composants réutilisables personnalisés",
        "Adapté aux écrans tactiles et desktop"
      ],
      stack: ["Vue 3", "Chart.js", "Tailwind CSS", "Vite"],
      demoUrl: "https://github.com",
      githubUrl: "https://github.com"
    }
  ],

  badges: [
    {
      id: "badge-1",
      name: "Badge Frontend",
      icon: "⚡",
      gym: "Arène Vue.js",
      year: "2024",
      description: "Maîtrise du framework Vue 3, du cycle de vie des composants et de la réactivité."
    },
    {
      id: "badge-2",
      name: "Badge Intégration",
      icon: "🎨",
      gym: "Arène Tailwind",
      year: "2024",
      description: "Conception d'interfaces responsives, soignées et ergonomiques."
    },
    {
      id: "badge-3",
      name: "Badge Architecture",
      icon: "🏗️",
      gym: "Arène JavaScript",
      year: "2023",
      description: "Code propre, typage, gestion des promesses et modularité du projet."
    },
    {
      id: "badge-4",
      name: "Badge Esprit d'Équipe",
      icon: "🤝",
      gym: "Arène Collaboration",
      year: "Permanent",
      description: "Communication claire, revues de code constructives et respect des délais."
    }
  ],

  contact: {
    email: "quentin.dev@example.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    location: "Paris / Remote",
    message: "Un recruteur sauvage apparaît ! Que souhaitez-vous faire ?"
  }
}
