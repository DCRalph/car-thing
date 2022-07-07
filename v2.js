import fetch from 'node-fetch'

import { SerialPort } from 'serialport'

const FX = {
  STATIC: 0,
  BLINK: 1,
  BREATH: 2,
  COLOR_WIPE: 3,
  COLOR_WIPE_RANDOM: 4,
  RANDOM_COLOR: 5,
  COLOR_SWEEP: 6,
  DYNAMIC: 7,
  RAINBOW: 8,
  RAINBOW_CYCLE: 9,
  SCAN: 10,
  DUAL_SCAN: 11,
  FADE: 12,
  THEATER_CHASE: 13,
  THEATER_CHASE_RAINBOW: 14,
  RUNNING_LIGHTS: 15,
  SAW: 16,
  TWINKLE: 17,
  DISSOLVE: 18,
  DISSOLVE_RANDOM: 19,
  SPARKLE: 20,
  FLASH_SPARKLE: 21,
  HYPER_SPARKLE: 22,
  STROBE: 23,
  STROBE_RAINBOW: 24,
  MULTI_STROBE: 25,
  BLINK_RAINBOW: 26,
  ANDROID: 27,
  CHASE_COLOR: 28,
  CHASE_RANDOM: 29,
  CHASE_RAINBOW: 30,
  CHASE_FLASH: 31,
  CHASE_FLASH_RANDOM: 32,
  CHASE_RAINBOW_WHITE: 33,
  COLORFUL: 34,
  TRAFFIC_LIGHT: 35,
  COLOR_SWEEP_RANDOM: 36,
  RUNNING_COLOR: 37,
  AURORA: 38,
  RUNNING_RANDOM: 39,
  LARSON_SCANNER: 40,
  COMET: 41,
  FIREWORKS: 42,
  RAIN: 43,
  TETRIX: 44,
  FIRE_FLICKER: 45,
  GRADIENT: 46,
  LOADING: 47,
  POLICE: 48,
  POLICE_ALL: 49,
  TWO_DOTS: 50,
  TWO_AREAS: 51,
  RUNNING_DUAL: 52,
  HALLOWEEN: 53,
  TRICOLOR_CHASE: 54,
  TRICOLOR_WIPE: 55,
  TRICOLOR_FADE: 56,
  LIGHTNING: 57,
  ICU: 58,
  MULTI_COMET: 59,
  DUAL_LARSON_SCANNER: 60,
  RANDOM_CHASE: 61,
  OSCILLATE: 62,
  PRIDE_2015: 63,
  JUGGLE: 64,
  PALETTE: 65,
  FIRE_2012: 66,
  COLORWAVES: 67,
  BPM: 68,
  FILLNOISE8: 69,
  NOISE16_1: 70,
  NOISE16_2: 71,
  NOISE16_3: 72,
  NOISE16_4: 73,
  COLORTWINKLE: 74,
  LAKE: 75,
  METEOR: 76,
  METEOR_SMOOTH: 77,
  RAILWAY: 78,
  RIPPLE: 79,
  TWINKLEFOX: 80,
  TWINKLECAT: 81,
  HALLOWEEN_EYES: 82,
  STATIC_PATTERN: 83,
  TRI_STATIC_PATTERN: 84,
  SPOTS: 85,
  SPOTS_FADE: 86,
  GLITTER: 87,
  CANDLE: 88,
  STARBURST: 89,
  EXPLODING_FIREWORKS: 90,
  BOUNCINGBALLS: 91,
  SINELON: 92,
  SINELON_DUAL: 93,
  SINELON_RAINBOW: 94,
  POPCORN: 95,
  DRIP: 96,
  PLASMA: 97,
  PERCENT: 98,
  RIPPLE_RAINBOW: 99,
  HEARTBEAT: 100,
  PACIFICA: 101,
  CANDLE_MULTI: 102,
  SOLID_GLITTER: 103,
  SUNRISE: 104,
  PHASED: 105,
  TWINKLEUP: 106,
  NOISEPAL: 107,
  SINEWAVE: 108,
  PHASEDNOISE: 109,
  FLOW: 110,
  CHUNCHUN: 111,
  DANCING_SHADOWS: 112,
  WASHING_MACHINE: 113,
  CANDY_CANE: 114,
  BLENDS: 115,
  TV_SIMULATOR: 116,
  DYNAMIC_SMOOTH: 117,
}

class wled {
  constructor(type) {
    this.type = type

    if (this.type.type == 'ip') {
      this.ip = this.type.ip
    } else if (this.type.type == 'serial') {
      this.port = new SerialPort({ path: this.type.path, baudRate: 9600 })
    }

    this.brightness = 255
  }

  send(data) {
    console.log(data)
    if (this.type.type == 'ip') {
      fetch(`http://${this.ip}/json/state`, {
        body: JSON.stringify(data),
      })
    } else if (this.type.type == 'serial') {
      this.port.write(data)
    }
  }

  bri(b) {
    this.brightness = b
  }

  off() {
    let led = {
      on: false,
    }
    this.send(JSON.stringify(led))
  }

  color(c1, c2 = [0, 0, 0], c3 = [0, 0, 0]) {
    let led = {
      on: true,
      bri: this.brightness,
      seg: [
        {
          col: [c1, c2, c3],
          fx: 0,
          sx: 128,
          ix: 128,
          pal: 0,
        },
      ],
    }
    this.send(JSON.stringify(led))
  }

  fx(
    fx,
    sx = 128,
    ix = 128,
    c1 = [255, 255, 255],
    c2 = [0, 0, 0],
    c3 = [0, 0, 0]
  ) {
    let led = {
      on: true,
      bri: this.brightness,
      seg: [
        {
          col: [c1, c2, c3],
          fx: fx,
          sx: sx,
          ix: ix,
          pal: 0,
        },
      ],
    }
    this.send(JSON.stringify(led))
  }
}

let led = new wled({ type: 'serial', path: '/dev/tty.usbmodem1442201' })

// led.color(255, 0, 0)
// led.fx(FX.RAINBOW_CYCLE, 127, 127, [0, 0, 0])

while (1) {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  led.color([255, 0, 0])

  await new Promise((resolve) => setTimeout(resolve, 2000))
  led.color([0, 255, 0])

  await new Promise((resolve) => setTimeout(resolve, 2000))
  led.color([0, 0, 255])
}

// setInterval(() => {
//   //   led.color(
//   //     Math.floor(Math.random() * 255),
//   //     Math.floor(Math.random() * 255),
//   //     Math.floor(Math.random() * 255)
//   //   )
// }, 10000)
