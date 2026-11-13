<script setup>
import { ref } from 'vue'
import { sfx } from '../utils/audio'

const props = defineProps({
  contact: {
    type: Object,
    required: true
  },
  trainer: {
    type: Object,
    required: true
  }
})

const copied = ref(false)
const dialogMessage = ref("Un RECRUTEUR sauvage apparaît ! Que doit faire QUENTIN ?")

const copyEmail = async () => {
  sfx.playSelect()
  try {
    await navigator.clipboard.writeText(props.contact.email)
    copied.value = true
    dialogMessage.value = "Adresse email copiée ! Envoyez-lui une Pokéball d'invitation !"
    setTimeout(() => {
      copied.value = false
      dialogMessage.value = "Un RECRUTEUR sauvage apparaît ! Que doit faire QUENTIN ?"
    }, 4000)
  } catch (err) {
    dialogMessage.value = `Contactez-le directement sur : ${props.contact.email}`
  }
}

const onAction = (actionName, url) => {
  sfx.playSelect()
  if (actionName === 'EMBAUCHER') {
    window.location.href = `mailto:${props.contact.email}?subject=Opportunité%20Professionnelle%20-%20Entretien%20Quentin&body=Bonjour%20Quentin,%0D%0A%0D%0ANous%20avons%20découvert%20votre%20portfolio%20Pokédex%20et%20souhaiterions%20échanger%20avec%20vous...`
  } else if (url) {
    window.open(url, '_blank')
  }
}
</script>

<template>
  <div class="flex flex-col h-full text-slate-100 font-sans overflow-y-auto pokedex-scroll">
    <div class="bg-slate-900/90 rounded-xl border-2 border-slate-700 p-4 sm:p-5 shadow-inner flex-1 flex flex-col justify-between">
      <div>
        <!-- Arène de Combat Stylisée -->
        <div class="bg-slate-950 rounded-xl border-2 border-slate-800 p-4 mb-4 relative overflow-hidden">
          <!-- Grille d'ambiance combat rétro -->
          <div class="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] opacity-20"></div>

          <div class="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 py-2">
            <!-- Badge Recruteur Sauvage -->
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-full bg-rose-500/20 border-2 border-rose-500/40 flex items-center justify-center text-2xl shadow-lg">
                👔
              </div>
              <div>
                <span class="text-[10px] font-pixel text-rose-400">ADVERSAIRE</span>
                <h4 class="text-sm font-bold text-white font-pixel">RECRUTEUR</h4>
                <div class="flex items-center gap-1.5 mt-1">
                  <span class="text-[9px] font-pixel text-slate-400">HP:</span>
                  <div class="w-20 h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div class="w-full h-full bg-emerald-400"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Badge Quentin Dresseur -->
            <div class="flex items-center gap-3 text-right">
              <div>
                <span class="text-[10px] font-pixel text-emerald-400">DRESSEUR</span>
                <h4 class="text-sm font-bold text-white font-pixel">{{ trainer.name }}</h4>
                <div class="flex items-center gap-1.5 mt-1 justify-end">
                  <span class="text-[9px] font-pixel text-slate-400">LVL {{ trainer.level }}</span>
                  <div class="w-20 h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div class="w-full h-full bg-emerald-400 animate-pulse"></div>
                  </div>
                </div>
              </div>
              <div class="w-12 h-12 rounded-full bg-emerald-500/20 border-2 border-emerald-500/40 flex items-center justify-center text-2xl shadow-lg">
                👨‍💻
              </div>
            </div>
          </div>
        </div>

        <!-- Boîte de dialogue rétro -->
        <div class="bg-slate-950 p-4 rounded-xl border-2 border-slate-700 mb-4 min-h-[70px] flex items-center">
          <p class="text-xs sm:text-sm font-pixel text-emerald-300 leading-relaxed">
            ► {{ dialogMessage }}
          </p>
        </div>
      </div>

      <!-- Menu des 4 Commandes de Combat -->
      <div>
        <div class="grid grid-cols-2 gap-3 mb-3">
          <!-- 1. EMBAUCHER (Email direct) -->
          <button
            @click="onAction('EMBAUCHER')"
            class="p-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 active:scale-95 text-white font-pixel text-xs text-left shadow-lg border-2 border-rose-400 cursor-pointer transition flex items-center gap-2"
          >
            <span class="text-base">⚔️</span>
            <div>
              <p class="font-bold">EMBAUCHER</p>
              <p class="text-[9px] text-rose-200 font-sans mt-0.5">Envoyer un email</p>
            </div>
          </button>

          <!-- 2. TÉLÉCHARGER CV -->
          <a
            :href="trainer.cvUrl"
            download
            @click="sfx.playSelect()"
            class="p-3.5 rounded-xl bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-500 hover:to-sky-600 active:scale-95 text-white font-pixel text-xs text-left shadow-lg border-2 border-sky-400 cursor-pointer transition flex items-center gap-2"
          >
            <span class="text-base">📄</span>
            <div>
              <p class="font-bold">FICHE CV</p>
              <p class="text-[9px] text-sky-200 font-sans mt-0.5">Télécharger en PDF</p>
            </div>
          </a>

          <!-- 3. LINKEDIN -->
          <a
            :href="contact.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            @click="sfx.playSelect()"
            class="p-3.5 rounded-xl bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-600 hover:to-blue-700 active:scale-95 text-white font-pixel text-xs text-left shadow-lg border-2 border-blue-400 cursor-pointer transition flex items-center gap-2"
          >
            <span class="text-base">💼</span>
            <div>
              <p class="font-bold">LINKEDIN</p>
              <p class="text-[9px] text-blue-200 font-sans mt-0.5">Réseau pro</p>
            </div>
          </a>

          <!-- 4. GITHUB -->
          <a
            :href="contact.github"
            target="_blank"
            rel="noopener noreferrer"
            @click="sfx.playSelect()"
            class="p-3.5 rounded-xl bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 active:scale-95 text-white font-pixel text-xs text-left shadow-lg border-2 border-slate-500 cursor-pointer transition flex items-center gap-2"
          >
            <span class="text-base">🐙</span>
            <div>
              <p class="font-bold">GITHUB</p>
              <p class="text-[9px] text-slate-300 font-sans mt-0.5">Dépôts & Code</p>
            </div>
          </a>
        </div>

        <!-- Bouton Copier l'adresse email -->
        <button
          @click="copyEmail"
          class="w-full py-2.5 px-4 rounded-lg bg-slate-950 border border-slate-800 hover:border-emerald-500/50 text-xs text-slate-300 flex items-center justify-center gap-2 font-mono transition cursor-pointer"
        >
          <span>{{ copied ? '✅ EMAIL COPIÉ !' : `📋 COPIER : ${contact.email}` }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

