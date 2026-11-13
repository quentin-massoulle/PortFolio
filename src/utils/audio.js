// Gestionnaire d'effets sonores 8-bit rétro via l'API Web Audio (aucun fichier externe requis)
class SoundFX {
  constructor() {
    this.ctx = null
    this.muted = true // Muet par défaut pour respecter le confort du recruteur
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  toggleMute() {
    this.muted = !this.muted
    if (!this.muted) {
      this.init()
      this.playSelect()
    }
    return this.muted
  }

  playBeep(freq = 440, duration = 0.06, type = 'square') {
    if (this.muted) return
    this.init()
    if (!this.ctx) return

    try {
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = type
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime)

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start()
      osc.stop(this.ctx.currentTime + duration)
    } catch (e) {
      console.warn('Audio playback error', e)
    }
  }

  playSelect() {
    if (this.muted) return
    this.playBeep(587.33, 0.05, 'square') // D5
    setTimeout(() => this.playBeep(880, 0.08, 'square'), 50) // A5
  }

  playPokedexCry() {
    if (this.muted) return
    this.init()
    if (!this.ctx) return

    try {
      const notes = [440, 554, 659, 880]
      notes.forEach((freq, i) => {
        setTimeout(() => {
          this.playBeep(freq, 0.07, 'sawtooth')
        }, i * 60)
      })
    } catch (e) {
      console.warn('Audio error', e)
    }
  }

  playDamage() {
    if (this.muted) return
    this.playBeep(180, 0.1, 'sawtooth')
  }
}

export const sfx = new SoundFX()

