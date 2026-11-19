/**
 * VAISHNAVI AI - VOICE SYNTHESIS & RECOGNITION ENGINE
 * Features:
 * - Natural Indian English Female Voice priority selection
 * - Web Speech Synthesis (TTS) & Web Speech Recognition (STT)
 * - Real-time Lip-Sync driver with audio energy modulation & phoneme events
 * - Optional ElevenLabs Neural Voice Streaming integration
 */

export class VaishnaviVoiceEngine {
  constructor(options = {}) {
    this.onLipSyncFrame = options.onLipSyncFrame || (() => {});
    this.onStateChange = options.onStateChange || (() => {});
    this.onTranscript = options.onTranscript || (() => {});
    this.onError = options.onError || (() => {});

    this.isMuted = false;
    this.isSpeaking = false;
    this.isListening = false;
    this.selectedVoice = null;
    this.audioContext = null;
    this.analyser = null;
    this.elevenLabsKey = localStorage.getItem('vaishnavi_elevenlabs_key') || '';
    this.elevenLabsVoiceId = localStorage.getItem('vaishnavi_elevenlabs_voice_id') || '21m00Tcm4TlvDq8ikWAM'; // Rachel/Female default

    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.recognition = null;
    this.animationFrameId = null;

    this.initVoices();
    this.initRecognition();
  }

  initVoices() {
    if (!this.synth) return;

    const findBestVoice = () => {
      const voices = this.synth.getVoices();
      if (!voices || voices.length === 0) return;

      // Priority 1: Indian English Female Voice
      let best = voices.find(v => 
        (v.lang === 'en-IN' || v.lang === 'en_IN') && 
        (v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('heera') || v.name.toLowerCase().includes('neerja') || v.name.toLowerCase().includes('google'))
      );

      // Priority 2: Any Indian English voice
      if (!best) {
        best = voices.find(v => v.lang === 'en-IN' || v.lang === 'en_IN');
      }

      // Priority 3: Premium natural English female voice
      if (!best) {
        best = voices.find(v => 
          v.lang.startsWith('en') && 
          (v.name.toLowerCase().includes('natural') || v.name.toLowerCase().includes('samantha') || v.name.toLowerCase().includes('victoria') || v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('zira'))
        );
      }

      // Priority 4: Any English voice
      if (!best) {
        best = voices.find(v => v.lang.startsWith('en'));
      }

      this.selectedVoice = best || voices[0];
      // console.log('Selected AI Voice:', this.selectedVoice?.name, this.selectedVoice?.lang);
    };

    findBestVoice();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = findBestVoice;
    }
  }

  initRecognition() {
    const SpeechRecognition = typeof window !== 'undefined' ? (window.SpeechRecognition || window.webkitSpeechRecognition) : null;
    if (!SpeechRecognition) {
      // console.warn('Speech Recognition not natively supported in this browser.');
      return;
    }

    try {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-IN'; // Indian English recognition

      this.recognition.onstart = () => {
        this.isListening = true;
        this.onStateChange('LISTENING');
      };

      this.recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        const transcript = finalTranscript || interimTranscript;
        this.onTranscript(transcript, Boolean(finalTranscript));
      };

      this.recognition.onerror = (event) => {
        // console.warn('Speech recognition error:', event.error);
        this.isListening = false;
        this.onStateChange('IDLE');
        if (event.error !== 'no-speech') {
          this.onError(`Voice input error: ${event.error}`);
        }
      };

      this.recognition.onend = () => {
        this.isListening = false;
        if (!this.isSpeaking) {
          this.onStateChange('IDLE');
        }
      };
    } catch (err) {
      console.warn('Could not initialize Speech Recognition:', err);
    }
  }

  startListening() {
    if (this.isSpeaking) {
      this.stopSpeaking();
    }
    if (!this.recognition) {
      this.onError('Microphone voice recognition is not supported in this browser. Please use text chat.');
      return;
    }
    try {
      this.recognition.start();
    } catch (e) {
      // already started or busy
      try {
        this.recognition.stop();
        setTimeout(() => this.recognition.start(), 150);
      } catch (err) {
        console.warn(err);
      }
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (e) {
        console.warn(e);
      }
    }
    this.isListening = false;
  }

  /**
   * Speak a given text using Web Speech API or ElevenLabs
   */
  async speak(text, onComplete = () => {}) {
    this.stopSpeaking();

    if (this.isMuted) {
      // Just visually simulate speaking briefly for text captions
      this.simulateSpeechWithoutAudio(text, onComplete);
      return;
    }

    // Check if ElevenLabs is configured and valid
    if (this.elevenLabsKey) {
      try {
        await this.speakWithElevenLabs(text, onComplete);
        return;
      } catch (e) {
        console.warn('ElevenLabs speech failed, falling back to Web Speech API:', e);
      }
    }

    // Default: Web Speech API
    if (!this.synth) {
      this.simulateSpeechWithoutAudio(text, onComplete);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }
    utterance.rate = 0.97;  // Natural conversational speed
    utterance.pitch = 1.06; // Friendly warm female pitch
    utterance.lang = this.selectedVoice?.lang || 'en-IN';

    // Lip sync cadence simulator for Web Speech API
    let startTime = 0;
    let speakingLoopActive = false;

    utterance.onstart = () => {
      this.isSpeaking = true;
      this.onStateChange('SPEAKING');
      startTime = Date.now();
      speakingLoopActive = true;

      // Realistic acoustic envelope simulation for lip movements
      const runLipSyncLoop = () => {
        if (!speakingLoopActive) return;
        const elapsed = (Date.now() - startTime) / 1000;
        
        // Multi-frequency harmonic envelope simulating human speech cadence
        // Alternates natural syllabic bursts (3 to 5 Hz) with natural micro-pauses
        const syllableCycle = Math.sin(elapsed * 12.0);
        const wordCycle = Math.sin(elapsed * 4.2);
        const microJitter = (Math.random() - 0.5) * 0.15;

        // Energy between 0.0 (closed) and 1.0 (wide open)
        let energy = (syllableCycle * 0.5 + 0.5) * (wordCycle * 0.35 + 0.65) + microJitter;
        energy = Math.max(0, Math.min(1, energy));

        // When nearing comma or period pauses, lower energy
        this.onLipSyncFrame(energy);
        this.animationFrameId = requestAnimationFrame(runLipSyncLoop);
      };

      runLipSyncLoop();
    };

    utterance.onboundary = (event) => {
      // Word / phoneme boundary hit - trigger natural accentuation
      if (speakingLoopActive) {
        this.onLipSyncFrame(0.75 + Math.random() * 0.25);
      }
    };

    utterance.onend = () => {
      speakingLoopActive = false;
      this.isSpeaking = false;
      if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
      this.onLipSyncFrame(0.0);
      this.onStateChange('IDLE');
      onComplete();
    };

    utterance.onerror = (e) => {
      speakingLoopActive = false;
      this.isSpeaking = false;
      if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
      this.onLipSyncFrame(0.0);
      this.onStateChange('IDLE');
      // console.warn('Speech synthesis error:', e);
      onComplete();
    };

    // Speak
    this.synth.speak(utterance);
  }

  /**
   * High-fidelity ElevenLabs TTS with real-time Web Audio Analyser
   */
  async speakWithElevenLabs(text, onComplete) {
    const url = `https://api.elevenlabs.io/v1/text-to-speech/${this.elevenLabsVoiceId}/stream`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': this.elevenLabsKey
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: { stability: 0.65, similarity_boost: 0.82 }
      })
    });

    if (!response.ok) throw new Error(`ElevenLabs error: ${response.status}`);

    const audioData = await response.arrayBuffer();
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    const buffer = await this.audioContext.decodeAudioData(audioData);
    const source = this.audioContext.createBufferSource();
    source.buffer = buffer;

    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 256;
    source.connect(this.analyser);
    this.analyser.connect(this.audioContext.destination);

    this.isSpeaking = true;
    this.onStateChange('SPEAKING');

    const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    let active = true;

    const analyzeLoop = () => {
      if (!active) return;
      this.analyser.getByteFrequencyData(dataArray);

      // Calculate speech RMS energy from frequency bins 4 to 28 (vocal formant region)
      let sum = 0;
      for (let i = 4; i < 28; i++) {
        sum += dataArray[i];
      }
      const avg = sum / 24;
      const energy = Math.min(1.0, Math.max(0.0, (avg - 20) / 140));

      this.onLipSyncFrame(energy);
      this.animationFrameId = requestAnimationFrame(analyzeLoop);
    };

    source.onended = () => {
      active = false;
      this.isSpeaking = false;
      if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
      this.onLipSyncFrame(0.0);
      this.onStateChange('IDLE');
      onComplete();
    };

    source.start(0);
    analyzeLoop();
  }

  simulateSpeechWithoutAudio(text, onComplete) {
    this.isSpeaking = true;
    this.onStateChange('SPEAKING');
    
    // Approximate speaking time ~ 12 characters per second
    const duration = Math.min(6000, Math.max(1500, text.length * 55));
    const startTime = Date.now();

    const loop = () => {
      const elapsed = Date.now() - startTime;
      if (elapsed >= duration || !this.isSpeaking) {
        this.isSpeaking = false;
        this.onLipSyncFrame(0.0);
        this.onStateChange('IDLE');
        onComplete();
        return;
      }
      const energy = (Math.sin(elapsed * 0.015) * 0.5 + 0.5) * 0.8;
      this.onLipSyncFrame(energy);
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  stopSpeaking() {
    if (this.synth) {
      this.synth.cancel();
    }
    if (this.audioContext && this.audioContext.state !== 'closed') {
      try {
        this.audioContext.suspend();
      } catch (e) {}
    }
    this.isSpeaking = false;
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
    this.onLipSyncFrame(0.0);
    this.onStateChange('IDLE');
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.isSpeaking) {
      this.stopSpeaking();
    }
    return this.isMuted;
  }
}

