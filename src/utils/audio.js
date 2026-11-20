// Effets sonores désactivés à la demande de l'utilisateur
class SoundFX {
  constructor() {
    this.muted = true
  }
  init() {}
  toggleMute() { return true }
  playBeep() {}
  playSelect() {}
  playPokedexCry() {}
  playDamage() {}
}

export const sfx = new SoundFX()

