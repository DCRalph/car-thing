import fetch from 'node-fetch'

const TYPE = {
  IP: 1,
  SERIAL: 2,
}

// const FX = {
//   STATIC: 0,
//   BLINK: 1,
//   BREATH: 2,
//   COLOR_WIPE: 3,
//   COLOR_WIPE_RANDOM: 4,
//   RANDOM_COLOR: 5,
//   COLOR_SWEEP: 6,
//   DYNAMIC: 7,
//   RAINBOW: 8,
//   RAINBOW_CYCLE: 9,
//   SCAN: 10,
//   DUAL_SCAN: 11,
//   FADE: 12,
//   THEATER_CHASE: 13,
//   THEATER_CHASE_RAINBOW: 14,
//   RUNNING_LIGHTS: 15,
//   SAW: 16,
//   TWINKLE: 17,
//   DISSOLVE: 18,
//   DISSOLVE_RANDOM: 19,
//   SPARKLE: 20,
//   FLASH_SPARKLE: 21,
//   HYPER_SPARKLE: 22,
//   STROBE: 23,
//   STROBE_RAINBOW: 24,
//   MULTI_STROBE: 25,
//   BLINK_RAINBOW: 26,
//   ANDROID: 27,
//   CHASE_COLOR: 28,
//   CHASE_RANDOM: 29,
//   CHASE_RAINBOW: 30,
//   CHASE_FLASH: 31,
//   CHASE_FLASH_RANDOM: 32,
//   CHASE_RAINBOW_WHITE: 33,
//   COLORFUL: 34,
//   TRAFFIC_LIGHT: 35,
//   COLOR_SWEEP_RANDOM: 36,
//   RUNNING_COLOR: 37,
//   AURORA: 38,
//   RUNNING_RANDOM: 39,
//   LARSON_SCANNER: 40,
//   COMET: 41,
//   FIREWORKS: 42,
//   RAIN: 43,
//   TETRIX: 44,
//   FIRE_FLICKER: 45,
//   GRADIENT: 46,
//   LOADING: 47,
//   POLICE: 48,
//   FAIRY: 49,
//   TWO_DOTS: 50,
//   FAIRYTWINKLE: 51,
//   RUNNING_DUAL: 52,
//   HALLOWEEN: 53,
//   TRICOLOR_CHASE: 54,
//   TRICOLOR_WIPE: 55,
//   TRICOLOR_FADE: 56,
//   LIGHTNING: 57,
//   ICU: 58,
//   MULTI_COMET: 59,
//   DUAL_LARSON_SCANNER: 60,
//   RANDOM_CHASE: 61,
//   OSCILLATE: 62,
//   PRIDE_2015: 63,
//   JUGGLE: 64,
//   PALETTE: 65,
//   FIRE_2012: 66,
//   COLORWAVES: 67,
//   BPM: 68,
//   FILLNOISE8: 69,
//   NOISE16_1: 70,
//   NOISE16_2: 71,
//   NOISE16_3: 72,
//   NOISE16_4: 73,
//   COLORTWINKLE: 74,
//   LAKE: 75,
//   METEOR: 76,
//   METEOR_SMOOTH: 77,
//   RAILWAY: 78,
//   RIPPLE: 79,
//   TWINKLEFOX: 80,
//   TWINKLECAT: 81,
//   HALLOWEEN_EYES: 82,
//   STATIC_PATTERN: 83,
//   TRI_STATIC_PATTERN: 84,
//   SPOTS: 85,
//   SPOTS_FADE: 86,
//   GLITTER: 87,
//   CANDLE: 88,
//   STARBURST: 89,
//   EXPLODING_FIREWORKS: 90,
//   BOUNCINGBALLS: 91,
//   SINELON: 92,
//   SINELON_DUAL: 93,
//   SINELON_RAINBOW: 94,
//   POPCORN: 95,
//   DRIP: 96,
//   PLASMA: 97,
//   PERCENT: 98,
//   RIPPLE_RAINBOW: 99,
//   HEARTBEAT: 100,
//   PACIFICA: 101,
//   CANDLE_MULTI: 102,
//   SOLID_GLITTER: 103,
//   SUNRISE: 104,
//   PHASED: 105,
//   TWINKLEUP: 106,
//   NOISEPAL: 107,
//   SINEWAVE: 108,
//   PHASEDNOISE: 109,
//   FLOW: 110,
//   CHUNCHUN: 111,
//   DANCING_SHADOWS: 112,
//   WASHING_MACHINE: 113,
//   CANDY_CANE: 114,
//   BLENDS: 115,
//   TV_SIMULATOR: 116,
//   DYNAMIC_SMOOTH: 117,
// }

const FX = {
  Solid: 0,
  Blink: 1,
  Breathe: 2,
  Wipe: 3,
  'Wipe Random': 4,
  'Random Colors': 5,
  Sweep: 6,
  Dynamic: 7,
  Colorloop: 8,
  Rainbow: 9,
  Scan: 10,
  'Scan Dual': 11,
  Fade: 12,
  Theater: 13,
  'Theater Rainbow': 14,
  Running: 15,
  Saw: 16,
  Twinkle: 17,
  Dissolve: 18,
  'Dissolve Rnd': 19,
  Sparkle: 20,
  'Sparkle Dark': 21,
  'Sparkle+': 22,
  Strobe: 23,
  'Strobe Rainbow': 24,
  'Strobe Mega': 25,
  'Blink Rainbow': 26,
  Android: 27,
  Chase: 28,
  'Chase Random': 29,
  'Chase Rainbow': 30,
  'Chase Flash': 31,
  'Chase Flash Rnd': 32,
  'Rainbow Runner': 33,
  Colorful: 34,
  'Traffic Light': 35,
  'Sweep Random': 36,
  'Chase 2': 37,
  Aurora: 38,
  Stream: 39,
  Scanner: 40,
  Lighthouse: 41,
  Fireworks: 42,
  Rain: 43,
  Tetrix: 44,
  'Fire Flicker': 45,
  Gradient: 46,
  Loading: 47,
  Police: 48,
  Fairy: 49,
  'Two Dots': 50,
  Fairytwinkle: 51,
  'Running Dual': 52,
  Halloween: 53,
  'Chase 3': 54,
  'Tri Wipe': 55,
  'Tri Fade': 56,
  Lightning: 57,
  ICU: 58,
  'Multi Comet': 59,
  'Scanner Dual': 60,
  'Stream 2': 61,
  Oscillate: 62,
  'Pride 2015': 63,
  Juggle: 64,
  Palette: 65,
  'Fire 2012': 66,
  Colorwaves: 67,
  Bpm: 68,
  'Fill Noise': 69,
  'Noise 1': 70,
  'Noise 2': 71,
  'Noise 3': 72,
  'Noise 4': 73,
  Colortwinkles: 74,
  Lake: 75,
  Meteor: 76,
  'Meteor Smooth': 77,
  Railway: 78,
  Ripple: 79,
  Twinklefox: 80,
  Twinklecat: 81,
  'Halloween Eyes': 82,
  'Solid Pattern': 83,
  'Solid Pattern Tri': 84,
  Spots: 85,
  'Spots Fade': 86,
  Glitter: 87,
  Candle: 88,
  'Fireworks Starburst': 89,
  'Fireworks 1D': 90,
  'Bouncing Balls': 91,
  Sinelon: 92,
  'Sinelon Dual': 93,
  'Sinelon Rainbow': 94,
  Popcorn: 95,
  Drip: 96,
  Plasma: 97,
  Percent: 98,
  'Ripple Rainbow': 99,
  Heartbeat: 100,
  Pacifica: 101,
  'Candle Multi': 102,
  'Solid Glitter': 103,
  Sunrise: 104,
  Phased: 105,
  Twinkleup: 106,
  'Noise Pal': 107,
  Sine: 108,
  'Phased Noise': 109,
  Flow: 110,
  Chunchun: 111,
  'Dancing Shadows': 112,
  'Washing Machine': 113,
  'Candy Cane': 114,
  Blends: 115,
  'TV Simulator': 116,
  'Dynamic Smooth': 117,
}

const PAL = {
  Default: 0,
  '* Random Cycle': 1,
  '* Color 1': 2,
  '* Colors 1&2': 3,
  '* Color Gradient': 4,
  '* Colors Only': 5,
  Party: 6,
  Cloud: 7,
  Lava: 8,
  Ocean: 9,
  Forest: 10,
  Rainbow: 11,
  'Rainbow Bands': 12,
  Sunset: 13,
  Rivendell: 14,
  Breeze: 15,
  'Red & Blue': 16,
  Yellowout: 17,
  Analogous: 18,
  Splash: 19,
  Pastel: 20,
  'Sunset 2': 21,
  Beech: 22,
  Vintage: 23,
  Departure: 24,
  Landscape: 25,
  Beach: 26,
  Sherbet: 27,
  Hult: 28,
  'Hult 64': 29,
  Drywet: 30,
  Jul: 31,
  Grintage: 32,
  Rewhi: 33,
  Tertiary: 34,
  Fire: 35,
  Icefire: 36,
  Cyane: 37,
  'Light Pink': 38,
  Autumn: 39,
  Magenta: 40,
  Magred: 41,
  Yelmag: 42,
  Yelblu: 43,
  'Orange & Teal': 44,
  Tiamat: 45,
  'April Night': 46,
  Orangery: 47,
  C9: 48,
  Sakura: 49,
  Aurora: 50,
  Atlantica: 51,
  'C9 2': 52,
  'C9 New': 53,
  Temperature: 54,
  'Aurora 2': 55,
  'Retro Clown': 56,
  Candy: 57,
  'Toxy Reaf': 58,
  'Fairy Reaf': 59,
  'Semi Blue': 60,
  'Pink Candy': 61,
  'Red Reaf': 62,
  'Aqua Flash': 63,
  'Yelblu Hot': 64,
  'Lite Light': 65,
  'Red Flash': 66,
  'Blink Red': 67,
  'Red Shift': 68,
  'Red Tide': 69,
  Candy2: 70,
}

const ipSend = async (ip, data) => {
  const res = await fetch(`http://${ip}/json/state`, {
    body: JSON.stringify(data),
    method: 'POST',
  })
  if (res.status != 200) return false
  const json = await res.json()
  return json
}

const serialSend = (port, data) => {
  this.port.write(data)
}

class wled {
  constructor(type, x) {
    this.autoSend = false

    this.type = type
    if (this.type === TYPE.IP) {
      this.ip = x
    } else if (this.type === TYPE.SERIAL) {
      this.port = new SerialPort({ path: x, baudRate: 9600 })
    }

    this.on = false
    this.bri = 255
    this.ps = -1

    this.c1 = [0, 0, 0]
    this.c2 = [0, 0, 0]
    this.c3 = [0, 0, 0]

    this.fx = FX.Solid
    this.sx = 128
    this.ix = 128
    this.pal = 0

    this.data = {
      on: this.on,
      bri: this.bri,
      ps: this.ps,
      seg: [
        {
          col: [this.c1, this.c2, this.c3],
          fx: this.fx,
          sx: this.sx,
          ix: this.ix,
          pal: this.pal,
        },
      ],
    }
  }

  send() {
    this.data = {
      on: this.on,
      bri: this.bri,
      ps: this.ps,
      seg: [
        {
          col: [this.c1, this.c2, this.c3],
          fx: this.fx,
          sx: this.sx,
          ix: this.ix,
          pal: this.pal,
        },
      ],
    }
    if (this.type == TYPE.IP) {
      ipSend(this.ip, this.data)
    } else if (this.type == TYPE.SERIAL) {
      serialSend(this.port, this.data)
    }
  }

  set = {
    // this.autoSend && this.send()
    off: () => {
      this.on = false
    },
    on: () => {
      this.on = true
    },
    ps: (ps = this.ps) => {
      this.ps = ps
    },
    bri: (bri = this.bri) => {
      this.bri = bri
    },
    col: (c1 = this.c1, c2 = this.c2, c3 = this.c3) => {
      this.c1 = c1
      this.c2 = c2
      this.c3 = c3
    },
    fx: (fx = this.fx) => {
      this.fx = fx
    },
    sx: (sx = this.sx) => {
      this.sx = sx
    },
    ix: (ix = this.ix) => {
      this.ix = ix
    },
    pal: (pal = this.pal) => {
      this.pal = pal
    },
  }
}

export default wled
export { wled, TYPE, FX, PAL }
