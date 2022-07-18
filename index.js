import 'dotenv/config'

import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'

import { SerialPort } from 'serialport'
import { ReadlineParser } from '@serialport/parser-readline'

const PORT = process.env.PORT || 3000
const ENV = process.env.ENV

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)

app.use(express.json())

import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __dirname = dirname(fileURLToPath(import.meta.url))

import fs from 'fs'
import { spawn, exec } from 'child_process'
import treeKill from 'tree-kill'

import { wled, TYPE, FX, PAL } from './wled.js'

const led = new wled(TYPE.IP, '10.123.10.56')

const musicDir = './music'
const pifmrds = '../pifmrds'

let music = []

let radioState = {
  state: false,
  stoping: false,
  song: null,
  freq: null,
  child: null,
}

const presets = {
  rgb: { on: true, bri: 255, fx: FX.Rainbow },
  blueBlink: { on: true, bri: 255, fx: FX.Blink, c1: [0, 0, 255] },
}

class serialPort {
  constructor() {
    this.success = false
    if (ENV === 'prod') {
      const path = ['/dev/ttyUSB0', '/dev/serial0'].find((x) =>
        fs.existsSync(x)
      )
      this.port = new SerialPort({ path: path, baudRate: 115200 }, (err) => {
        if (err) {
          return console.log('Error: ', err.message)
        } else {
          this.success = true
          console.log('Connected to port')
          this.parser = new ReadlineParser()
          this.port.pipe(this.parser)
        }
      })
    }
  }

  on(fn) {
    if (ENV === 'prod' && this.success) {
      const fn2 = (data) => {
        fn(data)
        console.log('[serial in]', data)
      }

      this.parser.on('data', fn2)
    }
  }

  write(data) {
    if (ENV === 'prod' && this.success) {
      const payload = JSON.stringify(data)
      console.log('[serial out]', data)
      this.port.write(payload + '\n')
    }
  }

  pin(pin) {
    if (ENV === 'prod' && this.success) {
      const payload = {
        pin: pin,
      }
      this.write(data)
    }
  }
}

const port = new serialPort()

port.on((data) => {})

// led.set(presets.blueBlink)
// led.send()

let lightState = {
  under: led,
}
const updateMusic = () => {
  music = fs.readdirSync(musicDir)
  music = music.filter((x) => x.endsWith('.wav'))
  // fs.readdirSync(musicDir).forEach((file) => {
  //   if (file.endsWith('.wav')) {
  //     music.push(file)
  //   }
  // })
}

fs.watch(musicDir, (event, file) => {
  updateMusic()
})
updateMusic()

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`)
})

app.get('/data', (req, res) => {
  res.json({
    music,
    presets,
  })
})

app.get('/tailwind', (req, res) => {
  res.sendFile(`${__dirname}/public/tailwind.css`)
})

app.get('/files/:filename', (req, res) => {
  const filename = __dirname + '/public/files/' + req.params.filename
  if (filename.includes('..')) {
    return res.status(403).send('FUCK U')
  }
  if (fs.existsSync(filename)) {
    return res.sendFile(filename)
  } else {
    return res.status(404).send('File not found')
  }
})

const emitData = (socket) => {
  const res = {
    radio: {
      state: radioState.state,
      song: radioState.song,
      freq: radioState.freq,
    },
    light: lightState,
  }
  io.emit('data', res)
}

io.on('connection', (socket) => {
  socket.on('data', () => {
    emitData(socket)
  })

  socket.on('play-radio', (data) => {
    if (radioState.state == true) return

    console.log(data)
    if (data.song == null || data.freq == null) {
      return
    }

    if (music[data.song] == null) {
      return
    }

    if (data.freq < 88 || data.freq > 108) {
      return
    }

    const song = music[data.song]
    const freq = data.freq
    const name = data.name.substring(0, 8) || 'piFM'
    const text = data.text.substring(0, 64) || 'piFM'

    const cmd = `sudo ${pifmrds} -freq ${freq} -audio '${musicDir}/${song}' -ps '${name}' -rt '${text}'`

    // console.log(cmd)

    if (ENV == 'prod') {
      const radioInstance = spawn(cmd, { shell: true })
      radioState.state = true
      radioState.child = radioInstance
      radioState.song = song
      radioState.freq = freq

      radioInstance.on('close', () => {
        radioState.stoping = false
        radioState.state = false
        radioState.child = null
        radioState.song = null
        radioState.freq = null
        console.log('radio stopped')
        emitData(socket)
      })
    } else {
      radioState.state = true
      radioState.child = 'dev'
      radioState.song = song
      radioState.freq = freq
    }

    console.log('radio started')

    port.write({ 'start radio': true })

    emitData(socket)
  })

  socket.on('stop-radio', () => {
    if (radioState.state == false) {
      console.log('radio not running')
      return
    }
    if (radioState.stoping == true) {
      console.log('radio already stoping')
      return
    }
    radioState.stoping = true
    console.log('stopping radio')

    port.write({ 'stoping radio': true })

    if (ENV == 'prod') {
      treeKill(radioState.child.pid)
    } else {
      radioState.stoping = false
      radioState.state = false
      radioState.child = null
      radioState.song = null
      radioState.freq = null
      console.log('radio stopped')
      emitData(socket)
    }
    emitData(socket)
  })

  socket.on('update-light', (data) => {
    if (data.under.preset != 'none' && data.under.on) {
      lightState.under.set(presets[data.under.preset])
    } else {
      lightState.under.set({ ...data.under, fx: FX.Solid })
    }

    port.write({ 'update light': true })

    lightState.under.send()
    emitData(socket)
  })
})

let server = httpServer.listen(PORT, () => {
  console.log(server.address())
})
