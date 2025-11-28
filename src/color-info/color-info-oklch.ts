import chroma, { type Color } from 'chroma-js';

export interface Oklch {
  l: number;
  c: number;
  h: number;
}

export type Hue = 'red' | 'orange' | 'yellow' | 'green' | 'cyan' | 'blue' | 'purple' | 'pink' | 'achromatic';
export type Brightness = 'light' | 'medium' | 'dark';
export type Saturation = 'gray' | 'muted' | 'moderate' | 'saturated';
export type Temperature = 'warm' | 'cool' | 'neutral';

export class ColorInfo {
  private readonly color: Color;
  private readonly oklch: Oklch;

  constructor(hex: string) {
    this.color = chroma(hex);

    const [l, c, h] = this.color.oklch();
    this.oklch = {
      l: l ?? 0,
      c: c ?? 0,
      h: isNaN(h) ? 0 : h,
    };
  }

  get hue(): Hue {
    const { c, h } = this.oklch;

    if (c < 0.02) return 'achromatic';

    if (h >= 15 && h < 30) return 'red';
    if (h >= 30 && h < 70) return 'orange';
    if (h >= 70 && h < 120) return 'yellow';
    if (h >= 120 && h < 165) return 'green';
    if (h >= 165 && h < 230) return 'cyan';
    if (h >= 230 && h < 285) return 'blue';
    if (h >= 285 && h < 330) return 'purple';
    if ((h >= 330 && h < 360) || (h >= 0 && h < 15)) return 'pink';
    return 'red';
  }

  get brightness(): Brightness {
    const { l } = this.oklch;

    if (l > 0.75) return 'light';
    if (l < 0.4) return 'dark';
    return 'medium';
  }

  get temperature(): Temperature {
    if (this.isWarm) return 'warm';
    if (this.isCool) return 'cool';
    return 'neutral';
  }

  get saturation(): Saturation {
    const { c } = this.oklch;

    if (c < 0.02) return 'gray';
    if (c < 0.08) return 'muted';
    if (c < 0.16) return 'moderate';
    return 'saturated';
  }

  get isNeutral(): boolean {
    return this.hue === 'achromatic';
  }

  get isWarm(): boolean {
    const { h, c } = this.oklch;

    if (c < 0.02) return false;

    return (h >= 0 && h < 140) || h >= 340;
  }

  get isCool(): boolean {
    const { h, c } = this.oklch;

    if (c < 0.02) return false;

    return h >= 140 && h < 340;
  }

  get isPastel(): boolean {
    const { l, c } = this.oklch;

    return l > 0.8 && l < 0.95 && c > 0.02 && c < 0.12;
  }

  get isEarthy(): boolean {
    const { h, c, l } = this.oklch;

    return h >= 30 && h <= 90 && c >= 0.04 && c <= 0.14 && l >= 0.3 && l <= 0.6;
  }

  get isMuted(): boolean {
    const { c, l } = this.oklch;

    return c >= 0.03 && c <= 0.1 && l >= 0.4 && l <= 0.7;
  }

  get info() {
    return {
      hex: this.color.hex(),
      hue: this.hue,
      oklch: this.oklch,
      hsl: {
        h: this.color.hsl()[0],
        s: this.color.hsl()[1],
        l: this.color.hsl()[2],
      },
      rgb: {
        r: this.color.rgb()[0],
        g: this.color.rgb()[1],
        b: this.color.rgb()[2],
      },
      brightness: this.brightness,
      temperature: this.temperature,
      saturation: this.saturation,
      flags: {
        isNeutral: this.isNeutral,
        isWarm: this.isWarm,
        isCool: this.isCool,
        isPastel: this.isPastel,
        isEarthy: this.isEarthy,
        isMuted: this.isMuted,
      },
    };
  }
}
