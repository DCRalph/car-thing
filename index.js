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

const led = new wled(TYPE.IP, '10.123.10.224')

const preset = {
  on: () => {
    led.set.on(true)
    led.set.col([255, 255, 255])
    led.set.bri(255)
    led.send()
  },
  rgb: () => {
    led.set.on(true)
    led.set.col([255, 255, 255])
    led.set.bri(255)
    led.set.fx(FX.Rainbow)
    led.send()
  },
}

preset.rgb()

led.set.on(true)
led.set.col([255, 0, 0])

led.send()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`app on ${PORT}`)
})
