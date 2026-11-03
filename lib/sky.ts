/**
 * Where the sun is over Toronto right now, from a standard low-precision solar
 * model (declination + equation of time). Good to a few minutes, which is all
 * a painted sky needs.
 */
const LAT = 43.65;
const LON = -79.38;
const RAD = Math.PI / 180;

export type SunState = {
  /** 0 at sunrise, 0.5 at solar noon, 1 at sunset; below 0 / above 1 is night */
  phase: number;
  sunrise: Date;
  sunset: Date;
};

function dayOfYear(d: Date) {
  return Math.floor((Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) - Date.UTC(d.getUTCFullYear(), 0, 0)) / 864e5);
}

export function torontoSun(now = new Date()): SunState {
  const n = dayOfYear(now);
  const decl = 23.44 * Math.sin(RAD * (360 / 365) * (284 + n));
  const b = RAD * (360 / 364) * (n - 81);
  const eotMin = 9.87 * Math.sin(2 * b) - 7.53 * Math.cos(b) - 1.5 * Math.sin(b);

  // half the day length, from the sunrise hour angle (sun's centre 0.83° below the horizon)
  const cosH =
    (Math.sin(-0.83 * RAD) - Math.sin(LAT * RAD) * Math.sin(decl * RAD)) /
    (Math.cos(LAT * RAD) * Math.cos(decl * RAD));
  const halfDay = (Math.acos(Math.min(1, Math.max(-1, cosH))) / RAD / 15) * 36e5;

  // solar noon (UTC) on the calendar day closest to now
  const midnightUTC = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  let noon = midnightUTC + (12 - LON / 15 - eotMin / 60) * 36e5;
  if (now.getTime() - noon > 12 * 36e5) noon += 864e5;
  if (noon - now.getTime() > 12 * 36e5) noon -= 864e5;

  return {
    phase: 0.5 + (now.getTime() - noon) / (2 * halfDay),
    sunrise: new Date(noon - halfDay),
    sunset: new Date(noon + halfDay),
  };
}

type RGB = [number, number, number];
const hex = (h: string): RGB => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)) as RGB;
const css = ([r, g, b]: RGB, a = 1) => `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${a})`;
const mix = (a: RGB, b: RGB, t: number): RGB => [0, 1, 2].map((i) => a[i] + (b[i] - a[i]) * t) as RGB;

/** sky colours (top, horizon) keyed by sun phase */
const SKY: [number, string, string][] = [
  [-0.16, '#101a38', '#1e2b52'], // night
  [-0.06, '#26305e', '#6f5888'], // blue hour
  [0.0, '#4b5b93', '#f0a07e'], //   sunrise
  [0.07, '#86b2de', '#f6d6b0'],
  [0.2, '#8cc0e8', '#dcedfb'], //   day
  [0.8, '#8cc0e8', '#dcedfb'],
  [0.93, '#7b9bd2', '#f5c38f'], //  golden hour
  [1.0, '#4a4e8b', '#ee8a68'], //   sunset
  [1.06, '#26305e', '#6f5888'], //  blue hour
  [1.16, '#101a38', '#1e2b52'], //  night
];

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

export type SkyPaint = {
  top: string;
  horizon: string;
  /** 0 at night, 1 in full daylight */
  light: number;
  /** sun disc colour, warmer near the horizon */
  sun: string;
  hillFar: string;
  hillNear: string;
  cloud: string;
};

export function paintSky(phase: number, dark: boolean): SkyPaint {
  const p = Math.min(SKY[SKY.length - 1][0], Math.max(SKY[0][0], phase));
  let i = 0;
  while (i < SKY.length - 2 && p > SKY[i + 1][0]) i++;
  const [p0, t0, h0] = SKY[i];
  const [p1, t1, h1] = SKY[i + 1];
  const t = p1 === p0 ? 0 : (p - p0) / (p1 - p0);

  const light = clamp01(phase < 0.5 ? (phase + 0.06) / 0.16 : (1.06 - phase) / 0.16);
  const elevation = clamp01(Math.sin(Math.PI * clamp01(phase)));

  // hills: a green wash by day that sinks into blue-grey at night
  let far = mix(hex('#283744'), hex('#dbe8cf'), light);
  let near = mix(hex('#1f2c36'), hex('#c4dab0'), light);
  if (dark) {
    // on the dark theme the whole window sits back a little
    far = mix(far, hex('#141414'), 0.45);
    near = mix(near, hex('#141414'), 0.45);
  }

  return {
    top: css(mix(hex(t0), hex(t1), t)),
    horizon: css(mix(hex(h0), hex(h1), t)),
    light,
    sun: css(mix(hex('#ff9f5a'), hex('#ffe39a'), elevation)),
    hillFar: css(far),
    hillNear: css(near),
    cloud: css([255, 255, 255], 0.18 + 0.72 * light),
  };
}
