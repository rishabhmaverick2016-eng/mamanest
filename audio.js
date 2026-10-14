/**
 * MamaNest Audio Engine (Zero external dependencies)
 * Synthesizes peaceful Tibetan singing bowl, calming ocean/breath waves,
 * bubble pop sounds for the Nebulizer game, and gentle soothing voice guidance.
 */

class MamaAudioEngine {
  constructor() {
    this.ctx = null;
    this.speechEnabled = true;
    this.isVoiceSpeaking = false;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Tibetan Singing Bowl Harmonic Chime (instant nervous system calming)
  playSingingBowl(baseFreq = 264, duration = 4.5) {
    this.init();
    const now = this.ctx.currentTime;
    
    // Harmonics for authentic singing bowl resonance
    const harmonics = [
      { ratio: 1.0, gain: 0.35, decay: duration },
      { ratio: 2.76, gain: 0.22, decay: duration * 0.8 },
      { ratio: 5.4, gain: 0.12, decay: duration * 0.5 },
      { ratio: 8.9, gain: 0.05, decay: duration * 0.3 }
    ];

    harmonics.forEach(h => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq * h.ratio, now);
      
      // Slight pitch wobble (vibrato) for organic warmth
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.value = 4.2;
      lfoGain.gain.value = 1.5;
      lfo.connect(osc.frequency);
      lfo.start(now);
      lfo.stop(now + h.decay);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(h.gain, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + h.decay);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + h.decay);
    });
  }

  // Soft Ocean / Inhale Wave
  playBreathSound(phase = 'inhale', duration = 4) {
    this.init();
    const now = this.ctx.currentTime;
    
    // Generate soft pink/brown filtered noise
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + (0.02 * white)) / 1.02; // Brown noise approximation
      lastOut = data[i];
      data[i] *= 3.5;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';

    const gain = this.ctx.createGain();

    if (phase === 'inhale') {
      filter.frequency.setValueAtTime(200, now);
      filter.frequency.exponentialRampToValueAtTime(650, now + duration);
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.18, now + duration * 0.85);
      gain.gain.linearRampToValueAtTime(0.05, now + duration);
    } else { // exhale
      filter.frequency.setValueAtTime(600, now);
      filter.frequency.exponentialRampToValueAtTime(180, now + duration);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    }

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(now);
    noise.stop(now + duration);
  }

  // Bubble Pop Sound for Nebulizer Distraction Game
  playBubblePop(pitch = 1.0) {
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const startFreq = (400 + Math.random() * 200) * pitch;
    const endFreq = startFreq * 1.8;

    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(endFreq, now + 0.08);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  }

  // Gentle Positive Chime for checking off vitamins / meds
  playSuccessChime() {
    this.init();
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const now = this.ctx.currentTime + (idx * 0.08);
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.5);
    });
  }

  // Nebulizer White Noise / Pink Mask Hum (Masks compressor sound)
  startNebulizerHum() {
    this.init();
    if (this.nebulizerHumSource) return;
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.15;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 400;
    filter.Q.value = 1.0;

    const gain = this.ctx.createGain();
    gain.gain.value = 0.05;

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start();
    this.nebulizerHumSource = noise;
    this.nebulizerGain = gain;
  }

  stopNebulizerHum() {
    if (this.nebulizerHumSource) {
      try {
        this.nebulizerHumSource.stop();
        this.nebulizerHumSource.disconnect();
      } catch (e) {}
      this.nebulizerHumSource = null;
    }
  }

  // Soft Soothing Speech Guidance
  speak(text) {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85; // Calmer, slower tempo
      utterance.pitch = 1.05; // Gentle, warm tone
      
      // Select pleasant voice if available
      const voices = window.speechSynthesis.getVoices();
      const gentleVoice = voices.find(v => (v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Zira') || v.name.includes('Google UK English Female') || v.lang.startsWith('en')));
      if (gentleVoice) utterance.voice = gentleVoice;

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.log('Speech synthesis notice', err);
    }
  }

  stopSpeech() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

window.mamaAudio = new MamaAudioEngine();
