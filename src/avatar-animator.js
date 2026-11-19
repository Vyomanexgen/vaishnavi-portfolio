/**
 * VAISHNAVI AI - CLEAN PHOTO ANIMATOR & VOICE REACTIVE ENGINE
 * Renders Lakshmi Vaishnavi's authentic portrait with:
 * - Pristine photo rendering (Zero artificial mouth overlays or dark canvas shapes)
 * - Natural idle breathing & micro-sway
 * - Audio-reactive speaking glow & responsive state tracking
 */

export class VaishnaviAvatarAnimator {
  constructor(canvasElement, imageSrc) {
    this.canvas = canvasElement;
    this.ctx = canvasElement.getContext('2d');
    this.imageSrc = imageSrc;
    this.image = new Image();
    this.isLoaded = false;

    // State machine: 'IDLE' | 'LISTENING' | 'THINKING' | 'SPEAKING' | 'ERROR'
    this.state = 'IDLE';

    // Micro-movement clocks
    this.time = 0;
    this.headTilt = 0;
    this.targetHeadTilt = 0;

    this.initImage();
  }

  initImage() {
    this.image.onload = () => {
      this.isLoaded = true;
      this.resizeCanvas();
      this.startLoop();
    };
    this.image.src = this.imageSrc;
  }

  resizeCanvas() {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.width = rect.width;
    this.height = rect.height;
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.ctx.scale(dpr, dpr);
  }

  setState(newState) {
    this.state = newState;
    if (newState === 'LISTENING') {
      this.targetHeadTilt = 0.012; // slight attentive tilt
    } else if (newState === 'THINKING') {
      this.targetHeadTilt = -0.008; // contemplative tilt
    } else {
      this.targetHeadTilt = 0.0;
    }
  }

  setMouthEnergy(energy) {
    // External mouth morphing removed per user request: "no need just sound is enough"
  }

  startLoop() {
    const loop = (timestamp) => {
      this.update(timestamp);
      this.render();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  update(timestamp) {
    this.time = timestamp * 0.001;
    // Head tilt smoothing
    this.headTilt += (this.targetHeadTilt - this.headTilt) * 0.05;
  }

  render() {
    if (!this.isLoaded || !this.width || !this.height) return;

    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    // Natural gentle breathing & micro-sway
    const breathY = Math.sin(this.time * 1.5) * 1.2;
    const breathScale = 1.0 + Math.sin(this.time * 1.5) * 0.002;
    const swayX = Math.cos(this.time * 0.75) * 0.8;

    ctx.save();

    // Pivot around center of head
    const pivotX = this.width * 0.5;
    const pivotY = this.height * 0.42;

    ctx.translate(pivotX + swayX, pivotY + breathY);
    ctx.rotate(this.headTilt + Math.sin(this.time * 0.6) * 0.003);
    ctx.scale(breathScale, breathScale);
    ctx.translate(-pivotX, -pivotY);

    // Maintain crisp cover aspect ratio inside the canvas
    const imgRatio = this.image.width / this.image.height;
    const canvasRatio = this.width / this.height;
    let drawW, drawH, drawX, drawY;

    if (canvasRatio > imgRatio) {
      drawW = this.width;
      drawH = this.width / imgRatio;
      drawX = 0;
      drawY = (this.height - drawH) * 0.2;
    } else {
      drawH = this.height;
      drawW = this.height * imgRatio;
      drawX = (this.width - drawW) * 0.5;
      drawY = 0;
    }

    // Render Vaishnavi's authentic photo crisply
    ctx.drawImage(this.image, drawX, drawY, drawW, drawH);

    ctx.restore();
  }
}
