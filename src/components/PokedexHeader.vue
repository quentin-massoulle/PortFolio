<script setup>
import { sfx } from '../utils/audio'

defineProps({
  isMuted: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['toggle-audio', 'reset'])

const handleLensClick = () => {
  sfx.playPokedexCry()
  emit('reset')
}
</script>

<template>
  <div class="px-6 py-4 flex items-center justify-between border-b-4 border-red-900 bg-gradient-to-b from-red-600 to-red-700 rounded-t-3xl shadow-inner">
    <!-- Capteur principal bleu & LEDs -->
    <div class="flex items-center gap-3">
      <!-- Grande lentille bleue clignotante -->
      <button
        @click="handleLensClick"
        title="Scanner Pokédex (Réinitialiser)"
        class="relative group w-14 h-14 rounded-full bg-slate-900 border-4 border-slate-200 p-1 shadow-lg hover:scale-105 transition cursor-pointer"
      >
        <div class="w-full h-full rounded-full bg-gradient-to-tr from-sky-600 via-sky-400 to-cyan-200 shadow-[inset_0_0_12px_rgba(255,255,255,0.8)] relative overflow-hidden group-hover:brightness-125">
          <!-- Reflet brillant -->
          <div class="absolute top-1 left-2 w-4 h-2.5 rounded-full bg-white/70 rotate-[-30deg]"></div>
          <div class="absolute inset-0 bg-sky-400/20 animate-pulse"></div>
        </div>
      </button>

      <!-- 3 mini LEDs (Rouge, Jaune, Verte) -->
      <div class="flex items-center gap-2 pl-2">
        <span class="w-3.5 h-3.5 rounded-full bg-rose-500 border border-red-950 shadow-[0_0_8px_rgba(244,63,94,0.9)] animate-ping" style="animation-duration: 3s;"></span>
        <span class="w-3.5 h-3.5 rounded-full bg-amber-400 border border-amber-950 shadow-[0_0_8px_rgba(251,191,36,0.9)]"></span>
        <span class="w-3.5 h-3.5 rounded-full bg-emerald-400 border border-emerald-950 shadow-[0_0_8px_rgba(52,211,153,0.9)]"></span>
      </div>
    </div>

    <!-- Contrôles du coin droit : Audio & statut -->
    <div class="flex items-center gap-3">
      <!-- Bouton Son Rétro 8-bit -->
      <button
        @click="emit('toggle-audio')"
        class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-pixel border-2 transition cursor-pointer"
        :class="isMuted 
          ? 'bg-red-900/60 border-red-950 text-red-200 hover:bg-red-800' 
          : 'bg-emerald-500 border-emerald-300 text-slate-950 font-bold shadow-[0_0_10px_rgba(16,185,129,0.5)]'"
        :title="isMuted ? 'Activer le son 8-bit' : 'Couper le son'"
      >
        <span>{{ isMuted ? '🔇 MUTE' : '🔊 8-BIT' }}</span>
      </button>

      <!-- Badge modèle Pokédex -->
      <div class="hidden sm:block px-3 py-1 bg-red-900/80 border border-red-950 rounded text-[10px] font-pixel text-red-200">
        MODEL: PK-VUE3
      </div>
    </div>
  </div>
</template>
