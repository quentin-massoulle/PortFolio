<script setup>
const emit = defineEmits(['reset'])

const handleLensClick = () => {
  emit('reset')
}
</script>

<template>
  <div class="px-3 sm:px-5 py-2 flex items-center justify-between border-b-2 sm:border-b-4 border-red-900 bg-gradient-to-b from-red-600 to-red-700 rounded-t-xl sm:rounded-t-2xl shadow-inner">
    <!-- Capteur principal bleu & LEDs -->
    <div class="flex items-center gap-2">
      <!-- Grande lentille bleue clignotante -->
      <button
        @click="handleLensClick"
        title="Scanner Pokédex (Réinitialiser)"
        class="relative group w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-900 border-2 sm:border-3 border-slate-200 p-0.5 shadow-md hover:scale-105 transition cursor-pointer"
      >
        <div class="w-full h-full rounded-full bg-gradient-to-tr from-sky-600 via-sky-400 to-cyan-200 shadow-[inset_0_0_10px_rgba(255,255,255,0.8)] relative overflow-hidden group-hover:brightness-125">
          <!-- Reflet brillant -->
          <div class="absolute top-0.5 left-1 w-2.5 h-1.5 rounded-full bg-white/70 rotate-[-30deg]"></div>
          <div class="absolute inset-0 bg-sky-400/20 animate-pulse"></div>
        </div>
      </button>

      <!-- 3 mini LEDs (Rouge, Jaune, Verte) -->
      <div class="flex items-center gap-1.5 pl-1">
        <span class="w-2.5 h-2.5 rounded-full bg-rose-500 border border-red-950 shadow-[0_0_6px_rgba(244,63,94,0.9)] animate-ping" style="animation-duration: 3s;"></span>
        <span class="w-2.5 h-2.5 rounded-full bg-amber-400 border border-amber-950 shadow-[0_0_6px_rgba(251,191,36,0.9)]"></span>
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 border border-emerald-950 shadow-[0_0_6px_rgba(52,211,153,0.9)]"></span>
      </div>
    </div>
  </div>
</template>

