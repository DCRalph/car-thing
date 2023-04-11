import express from 'express'

const app = express()
const PORT = 3000

app.use(express.json())

import { wled, TYPE, FX, PAL } from './wled.js'

// const res = await fetch(`http://${this.ip}/json`)
// if (res.status == 200) {
//   const json = await res.json()
//   json.effects.forEach((x, i) => {
//     this.FX[x] = i
//   })
//   json.palettes.forEach((x, i) => {
//     this.PAL[x] = i
//   })
// }

const led = new wled(TYPE.IP, '10.123.10.56')

const preset = {
  rgb: { on: true, bri: 255, fx: FX.Rainbow },
  blueBlink: { on: true, bri: 255, fx: FX.Blink, c1: [0, 0, 255] },
}

// preset.rgb()

// led.on(true)
// led.col([255, 0, 0])

led.set(preset.blueBlink)

led.send()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`app on ${PORT}`)
})
