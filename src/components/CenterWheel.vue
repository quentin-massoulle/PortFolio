<script setup>
const props = defineProps({
  currentIndex: {
    type: Number,
    default: 0
  },
  totalProjects: {
    type: Number,
    default: 6
  }
})

const emit = defineEmits(['prev', 'next', 'select'])

const handleUp = () => {
  emit('prev')
}

const handleDown = () => {
  emit('next')
}

const handleCenter = () => {
  emit('select')
}
</script>

<template>
  <div class="flex flex-col items-center justify-between h-full py-1.5 select-none">
    <!-- Charnière supérieure style DS Lite / 4G -->
    <div class="w-5 h-6 rounded-full bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 border-2 border-slate-950 shadow-inner flex items-center justify-center">
      <div class="w-2 h-2 rounded-full bg-slate-950/80 border border-slate-700"></div>
    </div>

    <!-- ÉLÉMENT CENTRAL POKÉDEX 4G (Grande molette / Pokéball sensor) -->
    <div class="flex flex-col items-center my-auto group">
      <!-- Cadran circulaire extérieur avec rainures métalliques -->
      <div class="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-b from-slate-300 via-slate-400 to-slate-600 border-2 border-slate-950 shadow-xl p-0.5 flex items-center justify-center">
        
        <!-- Rainures de cadran rotatif (4G jog wheel) -->
        <div class="absolute inset-0 rounded-full border border-dashed border-slate-500/50 pointer-events-none"></div>

        <!-- Bouton flèche haut sur la molette -->
        <button
          @click="handleUp"
          class="absolute -top-1 left-1/2 -translate-x-1/2 w-4.5 h-2.5 bg-slate-900 hover:bg-slate-800 active:scale-95 text-emerald-400 rounded-t text-[7px] flex items-center justify-center border border-slate-700 shadow cursor-pointer transition z-10"
          title="Molette : Projet précédent"
        >
          ▲
        </button>

        <!-- Bouton flèche bas sur la molette -->
        <button
          @click="handleDown"
          class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4.5 h-2.5 bg-slate-900 hover:bg-slate-800 active:scale-95 text-emerald-400 rounded-b text-[7px] flex items-center justify-center border border-slate-700 shadow cursor-pointer transition z-10"
          title="Molette : Projet suivant"
        >
          ▼
        </button>

      </div>

      <!-- Indicateur de position (ex: 01 / 06) sous la molette -->
      <div class="mt-1.5 px-1.5 py-0.2 rounded-full bg-slate-950/80 border border-slate-800 text-[7px] font-pixel text-emerald-400 text-center tracking-tighter">
        {{ String(currentIndex + 1).padStart(2, '0') }}/{{ String(totalProjects).padStart(2, '0') }}
      </div>
    </div>

    <!-- Charnière inférieure style DS Lite / 4G -->
    <div class="w-5 h-6 rounded-full bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 border-2 border-slate-950 shadow-inner flex items-center justify-center">
      <div class="w-2 h-2 rounded-full bg-slate-950/80 border border-slate-700"></div>
    </div>
  </div>
</template>

