import fetch from 'node-fetch'
import { z } from 'zod'

const TYPE = {
  IP: 1,
  SERIAL: 2,
}

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

if (!Array.prototype.last) {
  Array.prototype.last = function () {
    return this[this.length - 1]
  }
}

// console.log(Object.values(FX).last())

const ipSend = async (ip, data) => {
  const res = await fetch(`http://${ip}/json/state`, {
    body: JSON.stringify(data),
    method: 'POST',
  })
  if (res.status != 200) return false
  const json = await res.json()
  // console.log(json)
  return json
}

const serialSend = (port, data) => {
  this.port.write(data)
}

class wled {
  constructor(type, x) {
    this.type = type
    if (this.type === TYPE.IP) {
      this.ip = x
    } else if (this.type === TYPE.SERIAL) {
      this.port = new SerialPort({ path: x, baudRate: 9600 })
    }

    this.reset()
  }

  send() {
    this.data = {
      on: this.state.on,
      bri: this.state.bri,
      ps: this.state.ps,
      seg: [
        {
          col: [this.state.c1, this.state.c2, this.state.c3],
          fx: this.state.fx,
          sx: this.state.sx,
          ix: this.state.ix,
          pal: this.state.pal,
        },
      ],
    }
    if (this.type == TYPE.IP) {
      ipSend(this.ip, this.data)
    } else if (this.type == TYPE.SERIAL) {
      serialSend(this.port, this.data)
    }
  }

  reset() {
    this.state = {
      on: false,
      bri: 255,
      ps: -1,

      c1: [0, 0, 0],
      c2: [0, 0, 0],
      c3: [0, 0, 0],

      fx: FX.Solid,
      sx: 128,
      ix: 128,
      pal: PAL.Default,
    }

    this.data = {
      on: this.state.on,
      bri: this.state.bri,
      ps: this.state.ps,
      seg: [
        {
          col: [this.state.c1, this.state.c2, this.state.c3],
          fx: this.state.fx,
          sx: this.state.sx,
          ix: this.state.ix,
          pal: this.state.pal,
        },
      ],
    }
  }

  on(on) {
    try {
      z.boolean().parse(on)
    } catch (err) {
      if (err instanceof z.ZodError) {
        console.log(err.issues)
        return
      }
    }
    this.state.on = on
  }
  ps(ps) {
    try {
      z.number(O).min(-1).parse(ps)
    } catch (err) {
      if (err instanceof z.ZodError) {
        console.log(err.issues)
        return
      }
    }
    this.state.ps = ps
  }
  bri(bri = this.bri) {
    try {
      z.number().min(0).max(255).parse(bri)
    } catch (err) {
      if (err instanceof z.ZodError) {
        console.log(err.issues)
        return
      }
    }
    this.state.bri = bri
  }
  col(c1 = this.state.c1, c2 = this.state.c2, c3 = this.state.c3) {
    try {
      let num = z.union(z.number().min(0).max(255))
      let arr = z.array(num, 3)
      let schema = z.array(arr, 3)
      schema.parse([c1, c2, c3])
    } catch (err) {
      if (err instanceof z.ZodError) {
        console.log(err.issues)
        return
      }
    }

    this.state.c1 = c1
    this.state.c2 = c2
    this.state.c3 = c3
  }
  fx(fx) {
    try {
      z.number().min(0).max(Object.values(FX).last()).parse(fx)
    } catch (err) {
      if (err instanceof z.ZodError) {
        console.log(err.issues)
        return
      }
    }

    this.state.fx = fx
  }
  sx(sx) {
    try {
      z.number().min(0).max(255).parse(sx)
    } catch (err) {
      if (err instanceof z.ZodError) {
        console.log(err.issues)
        return
      }
    }
    this.state.sx = sx
  }
  ix(ix) {
    try {
      z.number().min(0).max(255).parse(ix)
    } catch (err) {
      if (err instanceof z.ZodError) {
        console.log(err.issues)
        return
      }
    }

    this.state.ix = ix
  }
  pal(pal) {
    try {
      z.number().min(0).max(Object.values(PAL).last()).parse(pal)
    } catch (err) {
      if (err instanceof z.ZodError) {
        console.log(err.issues)
        return
      }
    }

    this.state.pal = pal
  }

  set(state = {}) {
    if (typeof state['on'] != 'undefined') this.state.on = state['on']

    if (typeof state['bri'] != 'undefined') this.state.bri = state['bri']
    if (typeof state['ps'] != 'undefined') this.state.ps = state['ps']
    if (typeof state['c1'] != 'undefined') this.state.c1 = state['c1']
    if (typeof state['c2'] != 'undefined') this.state.c2 = state['c2']
    if (typeof state['c3'] != 'undefined') this.state.c3 = state['c3']
    if (typeof state['fx'] != 'undefined') this.state.fx = state['fx']
    if (typeof state['sx'] != 'undefined') this.state.sx = state['sx']
    if (typeof state['ix'] != 'undefined') this.state.ix = state['ix']
    if (typeof state['pal'] != 'undefined') this.state.pal = state['pal']
  }
}

export default wled
export { wled, TYPE, FX, PAL }
